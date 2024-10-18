import React from 'react';
import {
    Route,
    Routes,
    useLocation 
} from 'react-router-dom';
import Gallery from './gallery'
import LandingPage from './landingPage';
import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" exact element={ <LandingPage/>} />
                <Route path="/items" element={<Gallery/>} />
            </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;