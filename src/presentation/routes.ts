import { Router } from "express";
import { PostRoutes } from "./post/routes";




export class AppRoutes{
    static get routes():Router{

        const router = Router();

        router.use('/api/posts',PostRoutes.routes);
        

        return router
        
    }
}