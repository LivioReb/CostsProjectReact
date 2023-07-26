import { useLocation } from "react-router"
import Message from "../layout/Message"
import styles from './Project.module.css'
import Container from '../layout/Container'
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../project/ProjectCard"
import { useState, useEffect } from "react"

    function Projects(){
        const [projects, setProjects] = useState([])

       const location = useLocation()
       let message = ''

       if(location.state){
        message = location.state.message
       }
       
       useEffect(() =>{
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                
            },
        })
        .then(resp => resp.json())
        .then(data =>{
            console.log(data)
            setProjects(data)
        })
        .catch((err) => console.log(err) )
       }, [])

        return (
            <div className={styles.projects_container}>
                <div className={styles.title_container}>
                    <h1>Meus projetos</h1>
                    <LinkButton to="/newproject" text="Criar Projeto"/>
                </div>
                {message && <Message type="success" msg={message}/> }
                <Container customClass="start">
                    {projects && projects.length > 0 && 
                    projects.map((project) => (
                        <ProjectCard                       
                        name={project.name}
                        id={project.id}
                        budget={project.budget}
                        category={project.category}
                        key={project.id}
                        />
                    ))}
                </Container>
            </div>
        )
    }
    export default Projects