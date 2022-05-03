import "dotenv/config";
const { PRECISION } = process.env;

export function avg(notes) {
  const len = notes.length;

  if (len > 0)
    return (
      Math.floor((notes.reduce((acc, curr) => acc + curr) / len) * PRECISION) /
      PRECISION
    );
}

export function findStudent({ name, students }) {

  const search = students.find((s) => s.name.toUpperCase() === name.toUpperCase());

  if (search) return search;

  return false;
}
