import './App.css'
import { BrowserRouter as Router, Link} from 'react-router-dom';
import AnimatedRoutes from './AnimatedRoutes';

function App() {

  return (
    <Router>
      {/* <Link to="/">
        <p className="fixed top-0 text-red-800 z-10">
          JEWELS BY BAM
        </p>
      </Link> */}
      <AnimatedRoutes/>
    </Router>
  );
}

export default App;
