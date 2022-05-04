export function shuffle(students) {
  if (students.length > 0) {
    // copie peu profonde
    const newStudents = [...students];

    newStudents.sort((_) => Math.random() - 0.5);

    return newStudents;
  }

  return null;
}

export function showStudents(students) {
  if (students.length > 0)
    return `<ul>
    ${students.map((student) => `<li>${student}</li>`).join("")}
    </ul>`;

  return `<ul><li>No student</li></ul>`;
}
