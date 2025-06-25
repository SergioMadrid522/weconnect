import type { creditsProps } from "../../type.ts";
function Credits({ credits }: creditsProps) {
  return (
    <div className="credits">
      <h3>Credits</h3>
      <ul>
        {credits.map((credit, index) => (
          <li key={index}>{credit}</li>
        ))}
      </ul>
    </div>
  );
}
export default Credits;
