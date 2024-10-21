import express,{ Express } from "express";
import router from "./clothe.network";

const clothe:Express = express();
clothe.use('/clothe',router);

export default clothe;