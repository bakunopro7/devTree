import mongoose, {Schema} from "mongoose";

interface IUser {
    name: string
    email: string
    password: string
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true, // requerido
        trim: true // sin espacion en blanco
    },
    email: {
        type: String,
        required: true, // requerido
        trim: true, // sin espacion en blanco
        unique: true // unico
    },
    password: {
        type: String,
        required: true, // requerido
        trim: true // sin espacion en blanco
    }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;