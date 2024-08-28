import { User } from "../../models/user.model";
import model from "./user.schema"

async function addUser(User : User): Promise<User>{
    return model.create<User>(User)
}

async function deleteUserByDiscordId(id : string){
    return model.findByIdAndRemove({discordId : id}).populate('lastSession').populate('companies')
}
    
async function getUserByDiscordId(id : string):Promise<User | null>{
    return model.findOne({discordId : id}).populate('lastSession').populate('companies')
}
async function getUserByTrelloId(trelloId : string):Promise<User | null>{
    return model.findOne({identifiers : {$elemMatch: {id: trelloId, platform: 'trello'}}}).populate('lastSession').populate('companies')
}

async function getUsers():Promise<User[] | null>{
    return model.find().populate('lastSession').populate('companies')
}

async function updateUserByDiscordId(id : string, User:Partial<User>):Promise<User|null>{
    return model.findOneAndUpdate({discordId: id}, User)
}
async function getUsersByCompanyId(id:string){
    return model.find({company:id})
}
export default{
    addUser,
    deleteUserByDiscordId,
    getUserByDiscordId,     // filterById
    getUserByTrelloId,
    getUsers,               // list
    updateUserByDiscordId,  // patch
    getUsersByCompanyId
}