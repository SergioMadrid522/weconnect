import ProjectList from "./project-list/ProjectList";
import LanguageList from "./language-list/LanguageList.tsx";
import Credits from "./credits/Credits.tsx";
import { projects, credits, languages } from "../data.ts";

function FooterContent() {
  return (
    <div className="footer-content">
      <ProjectList projects={projects} />
      <LanguageList list={languages} />
      <Credits credits={credits} />
    </div>
  );
}
export default FooterContent;
