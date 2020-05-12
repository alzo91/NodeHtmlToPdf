import { Router } from "express";
import PdfController from "../Controllers/PdfController";
import PdfSignController from "../Controllers/PdfSignController";

import { resolve } from "path";

const routes = new Router();

routes.get("/", (req, res) => {
  res.status(200).json({ isOnline: true, date: new Date() });
});

routes.get("/PdfCreate", PdfController.store);
routes.get("/PdfSign", PdfSignController.store);

export default routes;
