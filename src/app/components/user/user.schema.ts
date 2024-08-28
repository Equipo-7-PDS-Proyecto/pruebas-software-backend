import {model, Schema, Document, Model} from "mongoose";
import { User as UserI } from "../../models/user.model";


const definition = {
    discordId: {
        type: String,
        required: true
    },
    identifiers: [{
        id: {type: String, required: true},
        platform: {type: String, required: true}
    }],
    lastSession: { type: Schema.Types.ObjectId, ref: 'Session' },
    companies: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
    profile: {
        name: {type: String, required: true},
        surname: {type: String, required: true},
        birthday: {type: String, required: true}
    },
    /*hours: {
        day:  {type: Number},
        week:  {type: Number},
        month:  {type: Number}
    }*/
};

const schema = new Schema(definition);

const User : Model<UserI> = model<UserI>('User',schema,'users');

export default User;