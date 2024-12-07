import express from 'express';
import 'dotenv/config'
import router from './router';
import {connectDB} from "./config/db";
import cors from 'cors';
import {corsConfig} from "./config/cors";

const app = express();
connectDB()

// Middleware para parsear JSON
app.use(express.json());
// Cors
app.use(cors(corsConfig));
// use principal function to entry points
app.use('/', router );

export default app;