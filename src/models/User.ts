import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    handle: string
    name: string
    email: string
    password: string
    description: string
    image: string
}

const userSchema = new Schema({
    handle: {
        type: String,
        required: true, // requerido
        trim: true, // sin espacion en blanco
        lowercase: true,
        unique: true
    },
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
    },
    description: {
        type: String,
        default: "", // por defecto
    },
    image: {
        type: String,
        default: "", // por defecto
    }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;