import http from "http";
import { readFileSync, renameSync, rename } from "fs";
import { dirname } from "path";
import url, { fileURLToPath } from "url";
import ejs from "ejs";
import formidable from "formidable";

import "dotenv/config";

import { error404, parser, showMessage } from "./src/utils.js";
import { students } from "./Data/students.js";

// import { s, error404, avg } from "./src/utils.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const { APP_TITLE } = process.env;
const hostname = "localhost";
const port = "8080";

// Gestion des erreurs pour le serveur
let message = null;

const server = http.createServer((req, res) => {
  const basicUrl = req.url.replace("/", "");
  const currentUrl = url.parse(basicUrl, true).query;

  if (basicUrl.includes("images")) {
    const avatar = readFileSync(
      __dirname + "/assets/images/" + basicUrl.slice(7)
    );

    res.writeHead(200, { "Content-Type": "image/png" });
    res.write(avatar);
    res.end();
    return;
  }

  if (basicUrl === "favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });

    res.end();
    return;
  }

  if (basicUrl === "bootstrap") {
    res.writeHead(200, { "Content-Type": "text/css" });
    const css = readFileSync("./assets/css/bootstrap.min.css");
    res.write(css);
    res.end();

    return;
  }

  if (basicUrl === "") {
    ejs.renderFile(
      __dirname + "/views/home.ejs",
      { students, title: APP_TITLE, message },
      {},
      function (err, str) {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end(err.message);

          return;
        }

        res.end(str);
      }
    );

    return;
  }

  if (basicUrl === "add" && req.method === "POST") {
    const form = formidable({ multiples: true });
    message =  null;

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(String(err));

        return;
      }

      const { name, age } = fields;

      if (name === "" || age === "") {
        message = showMessage({
          message: "Vous devez remplir tous les champs du formulaire",
          old: { name, age },
          type: "Error Data Form",
        });
        res.writeHead(301, { Location: "/" });
        res.end();

        return;
      }

      // assignation par destructuration
      const {
        avatar: { filepath, mimetype, originalFilename },
      } = files;

      const avatarName = `avatar${new Date().getTime()}.${mimetype.slice(6)}`;
      renameSync(filepath, `${__dirname}/assets/images/${avatarName}`);

      students.push({ name, age, avatar : avatarName });

      message = showMessage({
        message: "Merci pour vos informations",
        old: null,
        type: "Ok",
      });

      res.writeHead(301, { Location: "/" });
      res.end();

      return;
    });

    return;
  }

  const page404 = error404({ ejs, title: "Page Not Found 404" });
  res.write(page404);
  res.end();

  return;
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
