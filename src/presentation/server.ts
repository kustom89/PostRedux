import express, { Router } from "express";
import compression from "compression";
import cors from 'cors'; // Importar cors

import path from "path";

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = "public" } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {
    this.app.use(cors()); // Usar las opciones personalizadas para CORS


    // midlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());

    //  public folder
    this.app.use(express.static(this.publicPath));

    // Routes
    this.app.use(this.routes);

    this.app.get("/", (req, res) => {
      const indexPath = path.resolve(__dirname, "../../public/index.html");
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`server running in port ${this.port}`);
    });
  }
}
