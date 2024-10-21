import { User } from "../../models/user.model";
import model from "./user.schema"

async function addUser(User : User): Promise<User>{
    return model.create<User>(User)
}

async function deleteUserById(id : string){
    return model.findByIdAndRemove({_id : id})
}
    
async function getUserById(id : string):Promise<User | null>{
    return model.findById(id)
}

async function getUserByEmail(email : string):Promise<User | null>{
    return model.findOne({email : email});
}

async function getUsers():Promise<User[] | null>{
    return model.find()
}

async function updateUserById(id : string, User:Partial<User>):Promise<User|null>{
    return model.findOneAndUpdate({_id: id}, User)
}

export default{
    addUser,
    deleteUserById,
    getUserById,     // filterById,
    getUserByEmail,
    getUsers,               // list
    updateUserById,  // patch
}