import express, { Router } from 'express';

const router = Router();

// Routing
router.get("/", (req: express.Request, res: express.Response) => {
    res.send("Hello World");
})

router.get("/nosotros", (req: express.Request, res: express.Response) => {
    res.send("Nosotros");
})

router.get("/blog", (req: express.Request, res: express.Response) => {
    res.send("Blog");
})

export default router;