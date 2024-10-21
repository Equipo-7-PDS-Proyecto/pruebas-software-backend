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

    handler.verification(controller.getUserById,[id],res,next)
});

// Ruta para crear un nuevo usuario (registro)
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    const { name, pass, email, user_type } = req.body;

    // Creamos un objeto que cumple con la interfaz UserI
    const newUser: User = {
        name,
        pass,
        email,
        user_type
    } as User;
    
    handler.verification(controller.addUser,[newUser],res,next);
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { email, pass } = req.body;

    handler.verification(controller.loginUser,[{ email, pass }],res,next);
});

export default router;