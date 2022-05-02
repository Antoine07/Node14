/** 
1. Lisez le fichier à l'aide de la méthode asynchrone. 

2. Recherchez dans le tableau tous les étudiants qui ont eu plus de 17 strictement.

3. Recherchez dans le tableau l'étudiant qui a eu la meilleur note.

4. Récupérez les données dans l'objet student (voir ci-dessous), puis ajoutez chaque étudiant dans un tableau students.

5. Ordonnez maintenant l'ensemble des données dans le tableau.

-- exercices supplémentaires

6. Ajoutez dans le fichier students.text les étudiants suivants :

7. Récupérez tous les étudiants habitant à Paris et placez les dans un nouveau fichier.

*/

import { appendFile, writeFile, readFileSync, readFile } from "fs";

readFile("./Data/students.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

 //  console.log(data);
});
// synchrone
const students = readFileSync("./Data/students.txt", "utf-8").split("\n").map(s => s.split(' ')).filter(s => s[0] != 'Notes' );
console.log(students);

// Plus de 17
const more17 = students.filter( s => s[0] > 17 );
console.log(more17);
const bestStudent = students.reduce((acc, curr) =>  (curr[0] > acc[0]) ? curr :  acc ) 
console.log(bestStudent);

// Ordonnez les données dans le tableau

students.sort( (s1, s2) => s1[0] - s2[0] );

console.log(students);
