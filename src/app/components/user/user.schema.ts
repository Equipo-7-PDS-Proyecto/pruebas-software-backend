import {model, Schema, Model} from "mongoose";
import { User as UserI } from "../../models/user.model";
import { UserType } from "../../models/user.model";
import bcrypt from "bcrypt";

const definition = {
    name: { type: String, required: true },
    pass: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: [/.+@.+\..+/, 'Invalid email'] },
    user_type: { type: Number, enum: UserType, default: UserType.Regular },
    address: {type: String, default: ""},
    phone_number: {type: String, default: ""}
}

const schema = new Schema(definition, { timestamps: true });

// Método para hashear la contraseña antes de guardarla
schema.pre('save', async function(next) {
    const user = this as UserI;
    if (!user.isModified('pass')) return next();
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.pass, salt);
    user.pass = hash;
    next();
});

// Método para comparar la contraseña
schema.methods.comparePassword = async function (candidatePassword: string) {
    const user = this as UserI;  // Definir correctamente el tipo de `this`
    return await bcrypt.compare(candidatePassword, user.pass); // Compara la contraseña con el hash almacenado
};

const User : Model<UserI> = model<UserI>('User',schema,'users');

export default User;