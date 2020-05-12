import "dotenv";
import express from "express";
import routes from "./Routes";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use((req, res, next) => {
      req.header("Access-Control-Allow-Origin", "*");

      res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      res.header("Access-Control-Allow-Headers", "*");
      res.header(
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );

      next();
    });
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
