import hmtlPdf from 'html-pdf';
import signer from 'node-signpdf';
import { resolve } from 'path';

const PDFDocument = require('pdfkit');
const fs = require('fs');

const ejs = require('ejs');

class PdfController {
  async store(req, res) {
    console.log(`Pdf a ser criado`);
    const { name } = req.query;
    const date = new Date();

    const directory = resolve(__dirname, '..', '..', 'tmp', 'pdf');
    const fileName = `${directory}/${date.getDay()}-${date.getMilliseconds()}-${name}.pdf`;

    console.log(fileName);

    const itens = [
      {
        id: 0,
        descr: 'Lisador',
        information: 'tomar sempre que sentir dor de cabeca',
        qtd: '1cx',
      },
      {
        id: 1,
        descr: 'Enxak',
        information: 'tomar 1 ao dia',
        qtd: '2cx',
      },
      {
        id: 2,
        descr: 'Cefalium',
        information: 'tomar 3x ao dia se estiver com dores na cabeca forte',
        qtd: '3cx',
      },
    ];

    // <!-- variables title, patient, -->
    // <!-- doctorName, crm, doctorState, hospitalName,address,city, neighboor, state, phone, emission -->
    const objTemplate = {
      title: 'Receituario simple',
      patient: name,
      doctorName: 'Doctor Chat is name of doctor',
      crm: 123456,
      doctorState: 'SP',
      hospitalName: 'VERA CRUZ',
      cnes: '6436366',
      address: 'Centro de campinas 13 de agosto',
      neighboor: 'Centro',
      city: 'Campinas',
      state: 'SP',
      phone: '(19) 3232=000',
      emission: '11/05/2020',
      itens,
      version: '2.0',
      month: 'Maio',
      year: '2020',
    };

    // console.log(objTemplate);

    ejs.renderFile(
      `${__dirname}/temp2.ejs`,
      objTemplate,
      {},
      (error, success) => {
        if (!!error) {
          console.log(error);
          return res.status(400).json({ error });
        }
        console.log(success);
        console.log('----------');

        hmtlPdf
          .create(success, {
            orientation: 'portrait',
            format: 'A4',
            type: 'pdf',
          })
          .toBuffer((err, buffer) => {
            console.log(err);
            const certp12 = `${resolve(__dirname)}/withpass.p12`;
            const p12Buffer = fs.readFileSync(certp12);
            const pdfSign = signer.sign(buffer, p12Buffer);
            console.log(pdfSign);
            res.status(200).json({ teste: success, error });
          });

        /* .toFile(`${fileName}`, (err, resp) => {
            if (!!error) {
              console.log(error);
              res.status(401).json({ msg: "Pdf was not created" });
            }
            if (resp) {
              res
                .status(200)
                .json({ error, err, html: success, msg: "Pdf was created" });
            }
          }); */
        //res.status(200).json({ teste: success, error });
      }
    );
  }
}

export default new PdfController();
