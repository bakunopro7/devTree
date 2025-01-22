import {Request, Response, NextFunction} from 'express';
import jwt from "jsonwebtoken";
import User, {IUser} from "../models/User";

// creamos una declaracion golabla del reques de express para pasar datos de tipo opcional
declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

export const autenticate =  async  (req : Request, res, next: NextFunction) => {

    const bearer = req.headers.authorization;

    if (!bearer) {
        const error = new Error('Authorization required')
        return res.status(401).json({error: error.message});
    }

    const [, token] = bearer.split(' ');

    if (!token) {
        const error = new Error('Token incorrect')
        return res.status(401).json({error : error.message});
    }

    try {
        const result = jwt.verify(token, process.env.JWT_SECRET);
        if(typeof  result === 'object' && result.id) {
            const user = await User.findById(result?.id).select('-password')
            if(!user) {
                const error = new Error('User does not exist')
                return res.status(404).json({error : error.message});
            }
            // pasar el resultado al controlador
            req.user = user;
            next()
        }
    } catch (e) {
        res.status(500).json({error : e})
    }
}