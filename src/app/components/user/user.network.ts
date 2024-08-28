import controller from "./user.controller";
import { User } from "../../models/user.model";
import express,{Response, Request, Router, json, NextFunction} from "express";

import handler from '../../middlewares/handler.middleware';

const router : Router = express.Router();

router.get('/all', async (req : Request, res : Response, next: NextFunction) => {

    handler.verification(controller.getUsers,[],res,next)

});


router.get('/:id', async (req : Request, res : Response, next : NextFunction) => {
    const id : string = req.params['id'];

    handler.verification(controller.getUserByDiscordId,[id],res,next)
});

export default router;