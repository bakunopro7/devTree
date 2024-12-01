import { Router } from 'express';
import colors from "colors";
import {createAccount} from "./handlers";

const router = Router();

// Routing
router.get('/hola', (req, res) => {
    console.log(colors.bgBlue.white.italic( 'Hola!' ));
    res.send("Hola!");
});

// @ts-ignore
router.post('/auth/register', createAccount);

export default router   ;