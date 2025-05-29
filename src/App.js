import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Pages/Home';
import Appointment from "./Pages/Appointment";

import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/lib/animate/animate.min.css';
import './assets/lib/owlcarousel/assets/owl.carousel.min.css';
import './assets/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css';
import SymptomScreen from "./Symptom/SymptomScreen";
import Header from "./Component/Header";
import SignIn from "./SignIn/SignIn";
import Admin from "./Pages/Admin/Admin";
import Doctor from "./Pages/Doctor/Doctor";
import Profile from "./Pages/Profile/Profile";
import {Provider} from 'react-redux';
import {store} from './Redux/Store/Store'; // Import store
function App() {
    return (
        <Provider store={store}>
            <Router>
                {/*<Navbar />*/}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/doctors/:id" element={<Appointment/>}/>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/doctor" element={<Doctor/>}/>
                    <Route path="/profile" element={<Profile/>}/>

                    {/*<Route path="/services" element={<Services />} />*/}
                    {/*<Route path="/contact" element={<Contact />} />*/}
                    {/*<Route path="/appointment" element={<Appointment />} />*/}
                    {/*<Route path="/testimonial" element={<Testimonial />} />*/}
                    {/*<Route path="/team" element={<Team />} />*/}
                    {/*<Route path="/feature" element={<Feature />} />*/}
                    {/*<Route path="*" element={<NotFound />} />*/}
                    <Route path="/symptoms" element={<SymptomScreen/>}/>
                </Routes>


            </Router>
        </Provider>
    );
}

export default App;