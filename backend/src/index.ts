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

// close ETag
app.disable("etag");

if (!process.env.FRONTEND_URL) {
    console.warn('FRONTEND_URL is not set. CORS origin will be undefined.');
}
const allowedOrigin = process.env.FRONTEND_URL;
const allowedDomain = process.env.FRONTEND_DOMAIN;
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || origin.includes("localhost")) {
            return callback(null, true);
        }

        const frontendUrl = process.env.FRONTEND_URL?.trim();

        if (origin === frontendUrl) {
            return callback(null, true);
        }

        console.warn("Blocked by CORS. Origin:", origin, "Expected:", frontendUrl);
        return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));


app.all('/api/auth/*splat', toNodeHandler(auth));
app.use(express.json());
// Add authentication middleware here so it can populate req.user for securityMiddleware
// app.use(authMiddleware); 
//app.use(securityMiddleware);

app.use('/api/subjects', subjectsRouter);
app.use("/api/users", usersRouter);
app.use('/api/classes', classesRouter);

app.use('/', (req, res) => {
    res.json({ message: 'Hello, welcome to API' });
});


app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})