const a=[{link:"",projectName:"Personal portfolio"},{link:"",projectName:"E-Commerce"},{link:"https://fabian-gallery.netlify.app",projectName:"Fabian Gallery"}],t=[{data:"",language:"English"},{data:"",language:"Spanish"},{data:"",language:"Français"}],n=["Made with ❤️ by Fabian","Powered by React & Figma","Portfolio Project - 2025"],l=document.getElementById("projects-list");a.forEach(e=>{l.innerHTML+=`
    <li>
      <a 
      href="${e.link}" 
      target="_blank" 
      rel="noopener noreferrer">
        ${e.projectName}
      </a>
    </li>
  `});const i=document.getElementById("languages-list");t.forEach(e=>{i.innerHTML+=`
    <li>${e.language}</li>
  `});const r=document.getElementById("credits");n.forEach(e=>{r.innerHTML+=`
    <li>${e}</li>
  `});
