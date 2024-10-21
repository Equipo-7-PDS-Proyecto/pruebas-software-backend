import { Express } from "express";
import user from "./user"
import clothe from "./clothe"
import transaction from "./transaction";

const components : Express[] = [user, clothe, transaction];

export default components;