import { Request, Response } from "express";
import { prisma } from "../../data/postgres/index";
import { CreatePostDto } from "../../domain/dtos/posts";

export class PostController {
  constructor() {}

  public getPosts = async (req: Request, res: Response) => {
    const allpost = await prisma.post.findMany();
    res.json(allpost);
    return;
  };

  public getPostsbyTitle = async (req: Request, res: Response) => {
    const titulo = req.params.titulo;

    const posts: any = await prisma.$queryRaw`
  SELECT * FROM Post WHERE titulo = ${titulo}
`;
    console.log(posts);

    posts.length > 0
      ? res.json(posts)
      : res.status(404).json({ error: `No hay posts con el título ${titulo}` });
  };

  public createPost = async (req: Request, res: Response) => {
    const [error, createPostDto] = CreatePostDto.create(req.body);

    if (error) {
      res.status(400).json({ error });
      return;
    }

    const post = await prisma.post.create({
      data: createPostDto as any,
    });

    res.status(201).json(post);
  };

  public updatePost = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, updatePostDto] = CreatePostDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }
    if (isNaN(id)) {
      res.status(400).json({ error: "Id es requerido" });
      return;
    }

    const post = await prisma.post.findFirst({
      where: { id },
    });
    if (!post) {
      res.status(404).json({ error: `Post con id ${id} no existe` });
      return;
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: updatePostDto as any,
    });

    res.json(updatedPost);
  };

  public deletePost = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const post = await prisma.post.findFirst({
      where: { id },
    });

    if (!post) {
      res.status(404).json({ error: `Post con id ${id} no existe` });
      return;
    }

    const deleted = await prisma.post.delete({
      where: { id },
    });
    res.json(post);
  };
}
