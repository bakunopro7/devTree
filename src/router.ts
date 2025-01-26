import { Router } from 'express';
import colors from "colors";
import { createAccount, getUser, login, updateProfile } from "./handlers";
import { body } from "express-validator";
import { handleInputErrors } from "./middleware/validation";
import { autenticate } from "./middleware/auth";

const router = Router();

// Routing
router.get('/hola', (req, res) => {
    console.log(colors.bgBlue.white.italic('Hola!'));
    res.send("Hola!");
});

// @ts-ignore
router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('Handle not exist'),
    body('name')
        .notEmpty()
        .withMessage('Name not exist'),
    body('email')
        .isEmail()
        .withMessage('Email not valid'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password too short, minimun 8 characters'),
    handleInputErrors,
    createAccount);

router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('Email not valid'),
    body('password')
        .notEmpty()
        .withMessage('Password required'),
    login);

router.get('/user', autenticate, getUser)
// router para actualizar el handler
router.patch('/user',
    body('handle')
        .notEmpty()
        .withMessage('Handle not send empty'),
    body('description')
        .notEmpty()
        .withMessage('Description not send empty'),
    handleInputErrors,
    autenticate,
    updateProfile)
export default router;