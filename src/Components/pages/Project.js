import styles from './Projects.module.css'
import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'


function Project(){
    
    const {id}= useParams()
    

    const [project, setProject]   = useState([]);
    const [showProjectForm, setshowProjectForm] = useState(false)
    const [showServiceForm, setshowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    
    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) =>{
            console.log(data)
            setProject(data)
        })
        .catch((err) => console.log(err))
        }, 3000);
    }, [id])

    function editPost(project){
       setMessage('')
       
        //budget validation

         if(project.budget < project.cost){
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
         }

         fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
         })
         .then((resp) => resp.json())
         .then((data)=>{
            setProject(data)
            setshowProjectForm(false)
            setMessage('Projeto atualizado!')
            setType('success')
            //message
         })
         .catch((err) => console.log(err))
    }
    
    function toggleProjectForm(){
        setshowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        setshowServiceForm(!showServiceForm)
    }


    return(
        <> 
            {project.name ?  
        <div className={styles.project_details}>
            {message && <Message type={type} msg={message}/>}
            <Container customClass="column">  
            <div className={styles.details_container}>
                <h1>Projeto: {project.name}</h1>
                <button className={styles.btn} onClick={toggleProjectForm}>
                    {!showProjectForm ? 'Editar projeto' : 'Fechar' }
                    </button>
                    
                    {!showProjectForm ? (
                        <div className={styles.project_info}>
                            <p><span>Categoria:</span>{project.category.name}</p> 
                            
                            <p><span>Total de Orçamento:</span>R$:{project.budget}</p>
                            
                            <p><span>Total Utilizado:</span>R$:{project.cost}</p>
                        </div>
                    ):(
                        <div className={styles.project_info}>
                            <ProjectForm 
                            handleSubmit={editPost} 
                            btnText="Concluir Edição" 
                            projectData={project}/>
                        </div>
                    )}
            </div>
            <div className={styles.service_form_container}>
                        <h2>
                            Adcione um serviço:
                        </h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                    {!showServiceForm ? 'Adicionar serviço' : 'Fechar' }
                    </button>
                    <div className={styles.project_info}>
                        {showServiceForm && <div>formulario do serviço </div>}
                    </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
                    <p>Itens do serviços</p>
            </Container>
            </Container>
        </div>  
        : ( <Loading/> )} </>)
     
}

export default Project