import http from "http";
import { readFileSync } from "fs";

import { students } from "./Data/students.js";
import { shuffle, showStudents } from "./src/utils.js";

const hostname = "localhost";
const port = "8080";

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");

  if (url === "favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });

    res.end();
    return;
  }

  if (url === "") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Students</title>
    </head>
    <body>
        <h1>Students</h1>
        ${readFileSync("./pages/menus/main.html", "utf-8")}
        ${showStudents(students)}
    </body>
    </html>`);

    res.end();

    return;
  }

  if (url === "shuffle") {
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Students</title>
    </head>
    <body>
        <h1>Students</h1>
        ${readFileSync("./pages/menus/main.html", "utf-8")}
        ${showStudents(shuffle(students))}
    </body>
    </html>`);

    res.end();

    return;
  }

  res.writeHead(404, {
    "Content-Type": "text/html",
  });

  res.write(readFileSync("./pages/404.html", "utf-8"));
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
