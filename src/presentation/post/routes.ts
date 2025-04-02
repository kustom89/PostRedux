import { Router } from "express";
import { PostController } from "./controller";




export class PostRoutes{
    static get routes():Router{

        const router = Router();
        const postController = new PostController();

        router.get('/', postController.getPosts);
        router.get('/:titulo',postController.getPostsbyTitle);
        router.post('/',postController.createPost);
        router.put('/:id',postController.updatePost);
        router.delete('/:id',postController.deletePost);


        return router
        
    }
}