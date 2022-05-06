import formidable from "formidable";
import { renameSync } from "fs";
import { __dirname, showMessage, message } from "../src/utils.js";
import { students } from "../Data/students.js";

export default (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(String(err));

      return;
    }

    const { name, age } = fields;

    if (name === "" || age === "") {
      message[0] = showMessage({
        content: "Vous devez remplir tous les champs du formulaire",
        old: { name, age },
        type: "Error Data Form",
      });

      res.writeHead(301, { Location: "/" });
      res.end();

      return;
    }

    const {
      avatar: { filepath, mimetype, originalFilename, size },
    } = files;

    if ( size > 0 ) {
      const avatarName = `avatar${new Date().getTime()}.${mimetype.slice(6)}`;
      renameSync(filepath, `${__dirname}/../assets/images/${avatarName}`);
      students.push({ name, age, avatar: avatarName });
    } else {
      students.push({ name, age });
    }

    message[0] = showMessage({
      content: "Merci pour vos informations",
      old: null,
      type: "Ok",
    });

    res.writeHead(301, { Location: "/" });
    res.end();
  });
};
