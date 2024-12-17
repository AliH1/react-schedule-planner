import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes';
import eventRouter from './routes/eventRoutes';

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

const password = process.env.DB_PASSWORD;

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Schedule Planner DB',
  password: password
});

// User routes
app.use('/api/user', userRouter);
//event routes
app.use('/api/event', eventRouter);

// Start the server
app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});