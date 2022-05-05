const PRECISION = 100;

export function s(name) {
  return name.toLocaleLowerCase().trim();
}

export function error404({ ejs, title }) {
  const page404 = `<html><head></head><boby><%= title %></body></html>`;

  return ejs.render(page404, { title: "Page Not Found 404" });
}


export function avg(notes){

  if(notes.length > 0 )
    return Math.floor( ( notes.reduce((acc, curr) => acc + curr ) /notes.length) * PRECISION ) / PRECISION;

  return null;
}