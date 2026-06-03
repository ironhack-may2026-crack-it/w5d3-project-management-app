import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // used for calling the API

function EditProjectPage() {

  const navigate = useNavigate()
  const { projectId } = useParams() // destructuring the project id from dynamic params (see App.jsx => /:projectId)
  
  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ isLoading, setIsLoading ] = useState(true)
  const [ isDeleteConfirmationShowing, setIsDeleteConfirmationShowing] = useState(false)

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_SERVER_URL}/projects/${projectId}`)
    .then((response) => {
      console.log(response.data)
      setTitle(response.data.title)
      setDescription(response.data.description)
      setIsLoading(false)
    })
    .catch((error) => {
      console.log(error)
    })

  }, [])

  const handleFormSubmit = async(e) => {
    e.preventDefault();

    const body = {
      title, // => title: title
      description // => description: description
    }

    try {
      // call the API here to edit one project...
      await axios.put(`${import.meta.env.VITE_SERVER_URL}/projects/${projectId}`, body)
      
      navigate(`/projects/${projectId}`)

    } catch (error) {
      console.log(error)
      //todo proper error handling here 
    }
  };

  const deleteProject = async() => {
    try {
      // call the API here to delete one task...
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/projects/${projectId}`)
      navigate("/projects")
      
    } catch (error) {
      console.log(error)
      //todo proper error handling here
    }
  }; 

  if (isLoading) return <h3>Loading...</h3> //todo proper loading animation here

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>

      <button onClick={() => setIsDeleteConfirmationShowing(true)}>Delete Project</button>

      {isDeleteConfirmationShowing && <div>
        <p>Are you sure?</p>
        <button onClick={deleteProject}>YES</button>      
      </div>}
    </div>
  );
}

export default EditProjectPage;
