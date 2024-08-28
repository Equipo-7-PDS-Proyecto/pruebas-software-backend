import express,{ Express } from "express";
import router from "./user.network";

const user:Express = express();
user.use('/user',router);

export default user;