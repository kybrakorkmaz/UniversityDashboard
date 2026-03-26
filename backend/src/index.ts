import 'dotenv/config';
import express from "express";
import subjectsRouter from "./routes/subjects"
import cors from "cors";
import securityMiddleware from "./middleware/security";


const app = express();
const PORT = 8000;
if (!process.env.FRONTEND_URL) {
    console.warn('FRONTEND_URL is not set. CORS origin will be undefined.');
}

app.use(cors({
    origin: process.env.FRONTEND_URL || false, // false disables CORS if not configured
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(express.json());
// TODO: Register authentication middleware here (e.g., Better Auth or custom auth)
// securityMiddleware is moved here so it can read req.user from auth middleware
app.use(securityMiddleware);

app.use('/api/subjects', subjectsRouter);
app.use('/', (req, res)=>{
    res.send('Hello, welcome to API')
})

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})