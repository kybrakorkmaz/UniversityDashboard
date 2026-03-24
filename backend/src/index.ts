import 'dotenv/config';
import express from "express";
import subjectsRouter from "./routes/subjects"
import cors from "cors";


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

app.use('/api/subjects', subjectsRouter);
app.use('/', (req, res)=>{
    res.send('Hello, welcome to API')
})

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})