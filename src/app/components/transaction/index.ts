import express,{ Express } from "express";
import router from "./transaction.network";

const transaction:Express = express();
transaction.use('/transaction',router);

export default transaction;