import { Document } from "mongoose"
import { Session } from "../models/session.model"
import { Company } from "../models/company.model"

export interface User extends Document {
    discordId   : string;
    identifiers : {
        id: string,
        platform: string
    }[];
    lastSession : Session;
    companies   : Company[];
    profile: {
        name: string,
        surname: string,
        birthday: string
    };
    /*hours:{
        day: number,
        week: number,
        month: number
    };*/
}