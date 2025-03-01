import express, {Request, Response} from 'express';
import User from "../models/User";
import {checkPassword, hashPassword} from "../utils/auth";
import { validationResult } from "express-validator";
import slug from "slug";
import formidable from "formidable";
import cloudinary from '../config/cloudinary';
import {generateJWT} from "../utils/jwt";
import {v4 as uuid} from "uuid"

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

export const updateProfile = async (req: Request, res) => {
    try {
        // cambiar perfil de usuario
        const { description, links } = req.body;
        const handle = slug(req.body.handle, '')
        const handleExists = await User.findOne({handle});
        if (handleExists && handleExists.email !== req.user.email) {
            const error = new Error('Handle already exists')
            return res.status(409).json({errors : error.message});
        }

        // actualizar usuario
        req.user.description = description;
        req.user.handle = handle;
        req.user.links = links;
        await req.user.save();
        res.send('Perfil actualizado');
    } catch (e) {
        const error = new Error('Error updating profile')
        return res.status(500).json({errors : error.message});
    }
}

export const uploadImage = async (req: Request, res) => {
    const form = formidable({ multiples: true });

    try {

        form.parse(req, (error, fields, files) => {

            console.log(files)
            cloudinary.uploader.upload(files.file[0].filepath, {public_id: uuid()}, async function(error, result) {
                if (error) {
                    const error = new Error('Error uploading image');
                    return res.status(500).json({errors : error.message});
                }
                if (result) {
                    console.log(result.secure_url)
                    req.user.image = result.secure_url;
                    await req.user.save();
                    res.json({image: result.secure_url});
                }
            })
        })
    } catch (e) {
        const error = new Error('Error updating profile')
        return res.status(500).json({errors : error.message});
    }
}