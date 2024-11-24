import express from 'express';
import router from './router';
const app = express();

// use principal function to entry points
app.use('/', router );

export default app;