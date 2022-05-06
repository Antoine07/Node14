import { readFileSync } from "fs";
import ejs from "ejs";
import "dotenv/config";
import { error404, __dirname } from "../src/utils.js";

import homeController from "../controllers/homeController.js";
import adduserController from "../controllers/adduserController.js";

export default (req, res) => {
  const basicUrl = req.url.replace("/", "");

  if (basicUrl.includes("images")) {
    const avatar = readFileSync(
      __dirname + "/../assets/images/" + basicUrl.slice(7)
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
    homeController(req, res);

    return;
  }

  if (basicUrl === "add" && req.method === "POST") {
    adduserController(req, res);

    return;
  }

  const page404 = error404({ ejs, title: "Page Not Found 404" });
  res.write(page404);
  res.end();

  return;
};
