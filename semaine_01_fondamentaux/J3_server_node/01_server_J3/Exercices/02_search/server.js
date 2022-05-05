import http from "http";
import { readFileSync, readFile } from "fs";
import { dirname } from "path";
import url, { fileURLToPath } from "url";
import ejs from "ejs";
import 'dotenv/config';

import { s, error404, avg } from "./src/utils.js";

const { APP_TITLE } = process.env;

const __dirname = dirname(fileURLToPath(import.meta.url));

const hostname = "localhost";
const port = "8080";

const server = http.createServer((req, res) => {
  const basicUrl = req.url.replace("/", "");
  const currentUrl = url.parse(basicUrl, true).query;

  if (url === "favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });

    res.end();
    return;
  }

  console.log(basicUrl)

  if (basicUrl === "") {
    const students = JSON.parse(
      readFileSync(__dirname + "/Data/all.json", "utf-8")
    ).students;

    ejs.renderFile(
      __dirname + "/views/home.ejs",
      { students, title : APP_TITLE },
      {},
      function (err, str) {
        if (err) {
          res.writeHead(404, {
            "Content-Type": "text/html",
          });

          const page404 = error404({ ejs, title: "Page Not Found 404" });
          res.write(page404);
          res.end();

          return;
        }

        res.end(str);
      }
    );

    return;
  }

  if (currentUrl?.name) {
    const { name } = currentUrl;

    const student = JSON.parse(
      readFileSync(  __dirname + `/Data/${s(name)}.json`, "utf-8")
    );

    ejs.renderFile(
      __dirname + "/views/single.ejs",
      { student, avg : avg(student.notes), single: true },
      {},
      function (err, str) {
        if (err) {
          return;
        }

        res.end(str);
      }
    );

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
