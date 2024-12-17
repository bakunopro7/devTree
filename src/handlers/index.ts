import express, {Request, Response} from 'express';
import User from "../models/User";
import {checkPassword, hashPassword} from "../utils/auth";
import { validationResult } from "express-validator";
import slug from "slug";
import {generateJWT} from "../utils/jwt";

export const createAccount = async (req: express.Request, res) => {

    const { email, password } = req.body;
    // handle edit

    const handle = slug(req.body.handle, '')
    const handleExists = await User.findOne({ handle });
    if (handleExists) {
        const error = new Error('Handle already exists')
        res.status(409).json({ error : error.message })
        return
    }
    const userExists = await User.findOne({ email });
    if (!userExists) {
        const user = new User(req.body)
        user.password = await hashPassword(password)
        user.handle = handle
        await user.save()
        res.status(200).json({success: true, message: 'Account created successfully'})
    } else {
        const error = new Error('Email already exists')
        return res.status(409).json({ error : error.message })
    }

}

export const login = async (req: Request, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()});
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error('User not exist')
        return res.status(404).json({errors : error.message});
    }
    const isPasswordCorrect = await checkPassword(password, user.password);
    if (!isPasswordCorrect) {
        const error = new Error('Password incorrect')
        return res.status(401).json({errors : error.message});
    }
    const token = generateJWT({id: user._id})
    res.send(token)
}

export const getUser = async (req: Request, res) => {
    res.json(req.user);
}