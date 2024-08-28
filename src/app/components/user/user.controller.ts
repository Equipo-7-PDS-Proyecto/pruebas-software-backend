import repository from "./user.repository";
import { User } from "../../models/user.model";

function addUser(User : User): Promise<User>{
    //User.createdAt = new Date;
    //User.modifiedAt = new Date;
    return repository.addUser(User)
}

function deleteUserByDiscordId(id : string){
    return repository.deleteUserByDiscordId(id)
}

function getUserByDiscordId(id : string):Promise<User | null>{
    return repository.getUserByDiscordId(id)
}
function getUserByTrelloId(trelloId : string):Promise<User | null>{
    return repository.getUserByTrelloId(trelloId)
}

function getUsers():Promise<User[] | null>{
    return repository.getUsers()
}

function updateUserByDiscordId(id : string, User:Partial<User>):Promise<User|null>{
    //User.modifiedAt = new Date;
    return repository.updateUserByDiscordId(id, User)
}

function getUsersByCompanyId(id : string) {
    return repository.getUsersByCompanyId(id);
}

export default{
    addUser,
    deleteUserByDiscordId,
    getUserByDiscordId,
    getUserByTrelloId,
    getUsers,
    updateUserByDiscordId,
    getUsersByCompanyId
}