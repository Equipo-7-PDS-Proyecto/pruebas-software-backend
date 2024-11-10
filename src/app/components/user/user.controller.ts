import repository from "./user.repository";
import { User } from "../../models/user.model";
import bcrypt from "bcrypt";

// Método para agregar un usuario, sin devolver la contraseña
function addUser(user: User): Promise<{ name: string; email: string; user_type: number}> {
    return repository.addUser(user)
        .then(savedUser => {
            // Convertir el documento de Mongoose a un objeto plano
            const userObject = savedUser.toObject();
            
            // Removemos la contraseña antes de devolver el usuario
            const { pass, ...userWithoutPass } = userObject;
            
            // Retornamos solo las propiedades que queremos devolver
            return {
                name: userWithoutPass.name,
                email: userWithoutPass.email,
                user_type: userWithoutPass.user_type,
            };
        });
}

// Método para login
async function loginUser({ email, pass }: { email: string, pass: string }): Promise<{ id : string; user_type: number; address: string; phone_number: string; name: string  } | null> {
    const user = await repository.getUserByEmail(email); // Obtener el usuario por email
    if (!user) {
        return null; // Si no encuentra al usuario, retorna null
    }

    const isMatch = await bcrypt.compare(pass, user.pass); // Comparar la contraseña
    if (!isMatch) {
        return null; // Si la contraseña no coincide, retornamos null
    }

    // Convertir el documento a objeto plano y eliminar la contraseña
    const userObject = user.toObject();
    const { pass: _, ...userWithoutPass } = userObject;

    // Retornamos solo las propiedades necesarias
    return {
        id : userWithoutPass._id,
        user_type: userWithoutPass.user_type,
        address: userWithoutPass.address,
        phone_number: userWithoutPass.phone_number,
        name : userWithoutPass.name
    };
}

function deleteUserById(id : string){
    return repository.deleteUserById(id)
}

function getUserById(id : string):Promise<User | null>{
    return repository.getUserById(id)
}

function getUsers():Promise<User[] | null>{
    return repository.getUsers()
}

function updateUserById(id : string, User:Partial<User>):Promise<User|null>{
    //User.modifiedAt = new Date;
    return repository.updateUserById(id, User)
}


export default{
    addUser,
    loginUser,
    deleteUserById,
    getUserById,
    getUsers,
    updateUserById,
}