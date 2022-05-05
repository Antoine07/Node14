import http from "http";
import { readFileSync, readFile } from "fs";

import { dirname } from "path";
import url, { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const hostname = "localhost";
const port = "8080";

const server = http.createServer((req, res) => {
  const basicUrl = req.url.replace("/", "");
  const currentUrl = url.parse( basicUrl, true ).query;

  console.log(currentUrl.id);

  if (basicUrl === "") {
    // console.log(__dirname + "/data/alan.json");

    res.end("hello");
    return;
  }

  if (basicUrl === "alan") {
    console.log(__dirname + "/Data/alan.json");

    const alan = JSON.parse( readFileSync(__dirname + "/Data/alan.json", "utf-8") );

    readFile(__dirname + "/Data/alan.json", "utf-8", (err, data) => {
      JSON.parse( readFileSync(__dirname + "/Data/alan.json", "utf-8") );
    });


    console.log(alan);

    res.end("hello");
    return;
  }

  if (url === "favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });

    res.end();
    return;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
