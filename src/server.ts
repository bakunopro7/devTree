import express from 'express';
import router from './router';
import {connectDB} from "./config/db";

const app = express();
connectDB()
// use principal function to entry points
app.use('/', router );

export default app;