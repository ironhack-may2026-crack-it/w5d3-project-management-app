import { Link } from "react-router-dom";

function ProjectCard(props) {
  
  return (
    <div className="ProjectCard card">
      <Link to={`/projects/${props.project.id}`}>
        <h3>{props.project.title}</h3>
      </Link>
      <p>{props.project.description}</p>
    </div>
  );
}

//* or by receiving the spread props
// function ProjectCard({ id, title, description }) {
  
//   return (
//     <div className="ProjectCard card">
//       <Link to={`/projects/${id}`}>
//         <h3>{title}</h3>
//       </Link>
//       <p>{description}</p>
//     </div>
//   );
// }

export default ProjectCard;