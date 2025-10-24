import { useContext, useMemo } from "react";
import { ProjectContext } from "../../Projects/context/ProjectContext";

export default function PlanningRequirementsList() {
  const { projects } = useContext(ProjectContext);

  const planningProjects = useMemo(
    () => projects.filter(p => p?.status === "planning" && p?.pattern?.id),
    [projects]
  );

  return (
    <div>
      <h2>Planning Projects - Materials Needed</h2>

      {planningProjects.length === 0 && <p>No projects in planning.</p>}

      {planningProjects.map(project => {
        const pattern = project.pattern;
        const reqs = pattern?.pattern_requirements ?? [];

        return (
          <div key={project.id} className="req-card">
            <h2>{project.title}</h2>
			<div className="table" >
            {reqs.length > 0 ? (
              <table className="req_table">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Material</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>Size</th>
                  </tr>
                </thead>
                <tbody>
                  {reqs.map((r) => (
                    <tr key={r.id}>
                      <td>{r.role}</td>
                      <td>{r.material_type}</td>
                      <td>{r.quantity}</td>
                      <td>{r.unit}</td>
                      <td>{r.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No requirements found.</p>
            )}
			</div>
          </div>
        );
      })}
	  
    </div>
  );
}