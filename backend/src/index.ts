import AgentAPI from "apminsight";
AgentAPI.config();
import 'dotenv/config';
import express from "express";
import subjectsRouter from "./routes/subjects.js"
import cors from "cors";
import securityMiddleware from "./middleware/security.js";
import {toNodeHandler} from "better-auth/node";
import {auth} from "./lib/auth";


const app = express();
const PORT = 8000;
if (!process.env.FRONTEND_URL) {
    console.warn('FRONTEND_URL is not set. CORS origin will be undefined.');
}

app.use(cors({
    origin: process.env.FRONTEND_URL || false, // false disables CORS if not configured
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.all('/api/auth/*splat', toNodeHandler(auth));
app.use(express.json());
// Add authentication middleware here so it can populate req.user for securityMiddleware
// app.use(authMiddleware); 
app.use(securityMiddleware);

app.use('/api/subjects', subjectsRouter);
app.use('/', (req, res)=>{
    res.send('Hello, welcome to API')
})

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})