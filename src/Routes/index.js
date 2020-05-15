import { Router } from 'express';
import PdfController from '../Controllers/PdfController';
import PdfSignController from '../Controllers/PdfSignController';
import ExtractFieldsPdfController from '../Controllers/ExtractFieldsPdfController';

const routes = new Router();

routes.get('/', (req, res) => {
  res.status(200).json({ isOnline: true, date: new Date() });
});

/** Create a PDF file based in HTML */
routes.get('/PdfCreate', PdfController.store);

/** Extract the fields and ids that them have inside PDF */
routes.get('/ExtractFields', ExtractFieldsPdfController.store);

/** */
//routes.get('/PdfSign', PdfSignController.store);

export default routes;
