import { Express } from "express";
import history from "./history";
import session from "./session";
import user from "./user"

const components : Express[] = [history, session, user];

export default components;