import express from 'express';
import 'dotenv/config'
import router from './router';
import {connectDB} from "./config/db";

const app = express();
connectDB()

// Middleware para parsear JSON
app.use(express.json());

// use principal function to entry points
app.use('/', router );

export default app;