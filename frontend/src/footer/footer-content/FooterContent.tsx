import ProjectList from "./project-list/ProjectList";
//import Rights from "./rights/Rights";
import { projects, credits } from "../data.ts";
import Credits from "./credits/Credits.tsx";

function FooterContent() {
  return (
    <div className="footer-content">
      <ProjectList projects={projects} />
      {/* <Rights /> */}
      <Credits credits={credits} />
    </div>
  );
}
export default FooterContent;
