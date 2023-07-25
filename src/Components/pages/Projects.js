import { useLocation } from "react-router"
import Message from "../layout/Message"
import styles from './Project.module.css'
import Container from '../layout/Container'
import LinkButton from "../layout/LinkButton"

    function Projects(){
       const location = useLocation()
       let message = ''

       if(location.state){
        message = location.state.message
       }
       
        return (
            <div className={styles.projects_container}>
                <div className={styles.title_container}>
                    <h1>Meus projetos</h1>
                    <LinkButton to="/newproject" text="Criar Projeto"/>
                </div>
                {message && <Message type="success" msg={message}/> }
                <Container customClass="start">
                    <p>Projetos</p>
                </Container>
            </div>
        )
    }
    export default Projects