import  "./table.css"
export default function LiveTable() {
    const learningBenefits = [
      { id: 1, description: "Self-paced, flexible, online learning", available: true },
      { id: 2, description: "Project-based lessons with downloadable course materials", available: true, notavilbale: true },
      { id: 3, description: "Live weekly sessions with industry experts and best-in-class instructors", available: true, notavilbale: true },
      { id: 4, description: "Year-long Pro access to the FormulaBI LABS platform (₹ 60000 value)", available: true, notavilbale: true },
      { id: 5, description: "Structured learning with assignments and deadlines to keep you on track", available: true , notavilbale: true},
      { id: 6, description: "Collaborative, supportive, and goal-focused learning environment", available: true , notavilbale: true},
    ];
  
    return (
      <div className="table-l-container">
        <h2>Learning Benefits</h2>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Symposium Learning</th>
              <th>Online Learning</th>
            </tr>
          </thead>
          <tbody>
            {learningBenefits.map((benefit) => (
              <tr key={benefit.id}>
                <td>{benefit.description}</td>
                <td>{benefit.available ?
                   <span className="tick"></span>
                 : <span className="cross"></span>
                 }</td>
                <td>{benefit.notavilbale ? 
                      <span className="cross"></span>
                      : <span className="tick"></span>
                }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }