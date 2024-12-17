import jwt, {JwtPayload} from 'jsonwebtoken'

export const generateJWT = (payload: JwtPayload) => {
    console.log(payload);
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    })
    return token;
}