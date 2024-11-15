import { AnimatePresence } from 'framer-motion';
import {
  Route,
  Routes,
  useLocation,
  useParams
} from 'react-router-dom';
import Gallery from './gallery';
import LandingPage from './landingPage';

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" exact element={ <LandingPage/>} />
                <Route path="/items" element={<Gallery/>} />
                <Route path="details:id" element={<About/>}/>
            </Routes>
    </AnimatePresence>
  );
}

function About() {
    const { id } = useParams();
    return (
      <div>
        <h2>Now showing post {id}</h2>
      </div>
    );
  }

export default AnimatedRoutes;