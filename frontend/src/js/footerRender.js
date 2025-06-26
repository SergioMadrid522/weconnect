import { projects, languages, credits } from "./data/data.js";

//Projects
const projectsList = document.getElementById("projects-list");
projects.forEach((project) => {
  projectsList.innerHTML += `
    <li>
      <a 
      href="${project.link}" 
      target="_blank" 
      rel="noopener noreferrer">
        ${project.projectName}
      </a>
    </li>
  `;
});
//Languages
const languagesList = document.getElementById("languages-list");
languages.forEach((language) => {
  languagesList.innerHTML += `
    <li>${language.language}</li>
  `;
});
//Credits
const creditsList = document.getElementById("credits");
credits.forEach((credit) => {
  creditsList.innerHTML += `
    <li>${credit}</li>
  `;
});
