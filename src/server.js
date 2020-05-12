import server from "./app";
import { resolve } from "path";

const dirPdf = resolve(__dirname, "..", "tmp", "pdf");
server.listen(3335);

console.log(`acesse o browser e coloque o link abaixo para testar`);
console.log(`Altere o parametro name para seu nome`);
console.log(`http://localhost:3335/PdfCreate?name=alisson`);
console.log(``);
console.log(``);
console.log(`Abaixo o diretorio onde criaremos o pdf`);
console.log(dirPdf);
