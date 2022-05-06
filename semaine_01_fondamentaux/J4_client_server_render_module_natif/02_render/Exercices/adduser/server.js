import http from "http";
import { readFileSync } from "fs";
import { dirname } from "path";
import url, { fileURLToPath } from "url";
import ejs from "ejs";
import "dotenv/config";

import { error404, parser, errorData } from "./src/utils.js";
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
    let body = "";
    req.on("data", (data) => {
      body += data;
    });

    // On écoute maintenant la fin de l'envoi des données avec la méthode on et l'attribut end
    req.on("end", () => {
      const student = parser(body);

      const { name, age } = student;
      if (name === "" || age === "") {
        message = errorData({
          message: "Vous devez remplir tous les champs du formulaire",
          old: { name, age },
          type: "Error Data Form",
        });
        res.writeHead(301, { Location: "/" });
        res.end();

        return;
      }

      message = null;
      students.push(student);
      res.writeHead(301, { Location: "/" });
      res.end();
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
