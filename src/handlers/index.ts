import {Request, Response} from 'express';
import User from "../models/User";
import {hashPassword} from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // handle edit
    const slug = (await import('slug')).default;

    const handle = slug(req.body.handle, '')
    const handleExists = await User.findOne({ handle });
    if (handleExists) {
        const error = new Error('Handle already exists')
        return res.status(409).json({ error : error.message })
    }
    const userExists = await User.findOne({ email });
    if (!userExists) {
        const user = new User(req.body)
        user.password = await hashPassword(password)
        user.handle = handle
        await user.save()
        res.status(200).json({success: true, message: 'Email already exists'})
    } else {
        const error = new Error('User already exists')
        return res.status(409).json({ error : error.message })
    }


}