import ejs from "ejs";
import { __dirname, message } from "../src/utils.js";
import "dotenv/config";
import { students } from "../Data/students.js";

const { APP_TITLE } = process.env;

export default (req, res) => {
  const flashMessage = message[0];
  message[0] = null;
  ejs.renderFile(
    __dirname + "/../views/home.ejs",
    { students, title: APP_TITLE, message : flashMessage},
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
};
