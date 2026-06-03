import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // used for calling the API

import ProjectCard from "../components/ProjectCard"; // used to render each Project

function ProjectListPage() {

  const [ allProjects, setAllProjects ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    getData()
  }, [])

  const getData = async() => {
    try {

      // call the API here to receive all projects...
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/projects`)
      console.log(response)
      setAllProjects(response.data)

      setIsLoading(false) // render the component once the data finished loading

    } catch (error) {
      console.log(error)
      //todo proper error handling here
    }
  }

  if (isLoading) return <h3>Loading...</h3> //todo proper loading animation here
  
  return (
    <div className="ProjectListPage">

      <Link to="/projects/create">
        <button>Create Project</button>
      </Link>     

      {/* ... list of all projects should be rendered here   */}
      {/* ... for each project, we should render one ProjectCard */}
      {allProjects.map((project) => {
        return <ProjectCard key={project.id} project={project}/>

        //* ...or passing the properties of the object by spreading them
        // return <ProjectCard key={project.id} {...project}/>
      })}
       
    </div>
  );
}

export default ProjectListPage;