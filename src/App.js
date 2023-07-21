import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/pages/Home';
import Contact from './Components/pages/Contact';
import Company from './Components/pages/Company';
import NewProject from './Components/pages/Newproject';
import Container from './Components/layout/Container';
import Navbar from './Components/layout/Navbar'
import Footer from './Components/layout/Footer';
import Projects from './Components/pages/Projects';

function App() {
  return (
    <Router>
      <Navbar/>

      <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/projects" element={<Projects/>}/>
          <Route exact path="/company" element={<Company/>}/>
          <Route exact path="/contact" element={<Contact/>}/>
          <Route exact path="/newproject" element={<NewProject/>}/>
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
