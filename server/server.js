import express from 'express';
import dotenv from 'dotenv';


import { connectDB } from './config/dbConfig.js';
import usersRoute from './routes/usersRoute.js';
import examsRoute from './routes/examsRoute.js';
import reportsRoute from './routes/reportRoute.js';


const app = express();
app.use(express.json());

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const port = process.env.PORT || 5000;

connectDB();




app.use('/api/users', usersRoute);
app.use('/api/exams', examsRoute);
app.use('/api/reports', reportsRoute);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
