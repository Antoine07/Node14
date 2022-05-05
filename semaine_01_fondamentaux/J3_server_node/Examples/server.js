// server.js
const http = require("http");
const hostname = "localhost";
const port = "8080";

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");

  if (url === 'favicon.ico') {
    res.writeHead(200, { 'Content-Type': 'image/x-icon' });

    res.end();
    return; // pensez à arrêter l'exécution des scripts côté serveur une fois la réponse envoyée.
}

  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  res.write("Hello, World!");
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
