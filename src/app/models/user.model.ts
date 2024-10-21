import { Document } from "mongoose"

// Enum para tipos de usuarios
export enum UserType {
    Admin = 0,
    Regular = 1,
    Guest = 2,
}

export interface User extends Document {
    name: string;
    pass: string;
    email: string;
    user_type: UserType;  // Usamos un enum para clarificar los tipos de usuario
    comparePassword: (candidatePassword: string) => Promise<boolean>; // Para comparar el hash de la contraseña
}
