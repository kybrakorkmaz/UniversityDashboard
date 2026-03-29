import AgentAPI from "apminsight";
AgentAPI.config();
import 'dotenv/config';
import express from "express";
import subjectsRouter from "./routes/subjects.js";
import usersRouter from "./routes/users.js";
import classesRouter from "./routes/classes.js";
import cors from "cors";
import securityMiddleware from "./middleware/security.js";
import {toNodeHandler} from "better-auth/node";
import {auth} from "./lib/auth.js";


const app = express();
const PORT = 8000;
if (!process.env.FRONTEND_URL) {
    console.warn('FRONTEND_URL is not set. CORS origin will be undefined.');
}
const allowedOrigins = [
    process.env.FRONTEND_URL
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // Postman, curl vb.
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, false); // hata fırlatma yerine false dön
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.all('/api/auth/*splat', toNodeHandler(auth));
app.use(express.json());
// Add authentication middleware here so it can populate req.user for securityMiddleware
// app.use(authMiddleware); 
app.use(securityMiddleware);

app.use('/api/subjects', subjectsRouter);
app.use("/api/users", usersRouter);
app.use('/api/classes', classesRouter);

app.use('/', (req, res)=>{
    res.send('Hello, welcome to API')
})

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})