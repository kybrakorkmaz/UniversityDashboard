import express from "express";
import {and, desc, eq, getTableColumns, ilike, or, sql} from "drizzle-orm";
import {departments, subjects} from "../db/schema/index.js";
import {db} from "../db/index.js";

const router = express.Router();

router.get("/", async (req, res)=>{
    try{
        const {search, department, page=1, limit=10}= req.query;

        const parsedPage = parseInt(String(page), 10);
        const parsedLimit = parseInt(String(limit), 10);
        const currentPage = Number.isNaN(parsedPage) ? 1 : Math.max(1, parsedPage);
        const limitPerPage = Number.isNaN(parsedLimit) ? 10 : Math.max(1, parsedLimit);

        const offset = (currentPage-1)*limitPerPage;

        const filterConditions = [];

        // if search query exists, filter by subject name OR subject code
        if(search){
            filterConditions.push(
                or(
                    ilike(subjects.name, `%${search}%`),
                    ilike(subjects.code, `%${search}%`)
                )
            );
        }
        // If department filter exists, match department name
        if(department){
            filterConditions.push(ilike(departments.name, `%${department}%`));
        }

        // Combine all filters using AND if any exist
        const whereClause = filterConditions.length > 0 ? and(...filterConditions):undefined;

        const countResult = await db
            .select({count: sql<number>`count(*)`})
            .from(subjects)
            .leftJoin(departments, eq(subjects.departmentId, departments.id))
            .where(whereClause);

        const totalCount = countResult[0]?.count ?? 0;

        // Data query
        const subjectList = await db
            .select({
            ...getTableColumns(subjects),
            department: {
                ...getTableColumns(departments)
            }
        }).from(subjects)
            .leftJoin(departments, eq(subjects.departmentId, departments.id))
            .where(whereClause)
            .orderBy(desc(subjects.createdAt))
            .limit(limitPerPage)
            .offset(offset);

        res.status(200).json({
            data: subjectList,
            pagination: {
                page: currentPage,
                limit: limitPerPage,
                total: totalCount,
                totalPage: Math.ceil(totalCount/limitPerPage),
            }
        });
    }catch (e){
        console.error(`GET /subjects error ${e}`);
        res.status(500).json({error: 'Failed to get subjects'});
    }
})

export default  router;