import mongoose, {Schema} from "mongoose";

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

const user = mongoose.model("User", userSchema);
export default user;