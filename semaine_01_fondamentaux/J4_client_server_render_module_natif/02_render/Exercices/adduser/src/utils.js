import { dirname } from "path";
import url, { fileURLToPath } from "url";

export const __dirname = dirname(fileURLToPath(import.meta.url));
export const PRECISION = 100;

export function s(name) {
  return name.toLocaleLowerCase().trim();
}

export function error404({ ejs, title }) {
  const page404 = `<html><head></head><boby><%= title %></body></html>`;

  return ejs.render(page404, { title: "Page Not Found 404" });
}

export function avg(notes) {
  if (notes.length > 0)
    return (
      Math.floor(
        (notes.reduce((acc, curr) => acc + curr) / notes.length) * PRECISION
      ) / PRECISION
    );

  return null;
}

// On ne l'utilise plus car on a un module, formidable, qui parse maintenant les données POST
export function parser(body) {
  // "name=Harry+Potter+XII&age=12"
  // [ [ 'name', 'Harry Potter XII' ], [ 'age', '12' ] ]
  //[ { name : 'Harry Potter XII'  , age : 12 }]

  let struct = {};

  for (const s of body.split("&")) {
    if (s.split("=")[0] === "avatar") continue;

    // struct = { ...struct, [ s.split('=')[0] ] : s.split('=')[1].replaceAll('+', ' ').trim()  }
  }

  return struct;
}

export function showMessage({ content, old, type }) {
  return {
    content,
    type,
    old,
  };
}

export const message = [
  {
    content : '',
    type : 'Ok',
    old : null,
  },
];
