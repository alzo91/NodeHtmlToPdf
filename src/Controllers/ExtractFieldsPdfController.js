import { resolve } from 'path';
const PDFParser = require('pdf2json');
const fs = require('fs');

class ExtractFieldsPdfController {
  async store(req, res) {
    const dirPDF = resolve(__dirname, '..', 'assets', 'doc');
    const filePDF = `${dirPDF}/receituario_simples.pdf`;
    const dirJSON = resolve(__dirname, '..', '..', 'tmp', 'json');
    const fileJSON = `${dirJSON}/ExtractPDF`;
    const dirTXT = resolve(__dirname, '..', '..', 'tmp', 'text');
    const fileText = `${dirTXT}/ExtractTxt`;

    let pdfParser = new PDFParser();
    // Abaixo a maneira para pegar o context em txt
    // new PDFParser(this,1);

    console.log(pdfParser);

    pdfParser.on('pdfParser_dataError', (errData) =>
      console.error(errData.parserError)
    );

    pdfParser.on('pdfParser_dataReady', (pdfData) => {
      console.log('--------->');
      console.log(pdfData);
      console.log('<---------');
      console.log(fileJSON);

      /** Gerando JSON */
      fs.writeFile(`${fileJSON}-all.json`, JSON.stringify(pdfData), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });

      fs.writeFile(
        `${fileJSON}-fields.json`,
        JSON.stringify(pdfParser.getAllFieldsTypes()),
        (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        }
      ); /**/

      /*
      fs.writeFile(
        `${fileText}-content.txt`,
        pdfParser.getRawTextContent(),
        (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        }
      );*/
    }); /**/

    pdfParser.loadPDF(filePDF);

    res.status(200).json({ docExtracted: true });
  }
}

export default new ExtractFieldsPdfController();
