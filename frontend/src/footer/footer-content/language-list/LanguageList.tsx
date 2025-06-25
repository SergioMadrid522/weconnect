import type { languageList } from "../../type.ts";
function LanguageList({ list }: languageList) {
  return (
    <div className="languages">
      <h3>Languages</h3>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item.language}</li>
        ))}
      </ul>
    </div>
  );
}
export default LanguageList;
