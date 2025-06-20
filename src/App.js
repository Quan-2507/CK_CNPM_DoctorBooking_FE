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
import {store} from './Redux/Store/Store';
import SignUp from "./SignUp/SignUpScreen";
import DoctorsBySpecialtyScreen from "./Symptom/DoctorsBySpecialtyScreen"; // Import store
import { createBrowserHistory } from "history";
import DoctorDetail from "./Detail/DoctorDetail";
import DoctorManagement from "./Pages/Admin/DoctorManagement/DoctorManagement";
import EditDoctor from "./Pages/Admin/DoctorManagement/EditDoctor";
import AddDoctor from "./Pages/Admin/DoctorManagement/AddDoctor";
import PatientManagement from "./Pages/Admin/PatientManagement/PatientManagement";
import DepartmentManagement from "./Pages/Admin/DepartmentManagement/DepartmentManagement";
import History from "./Pages/Profile/History";
import SymptomManagement from "./Pages/Admin/SymptomManagement/SymptomManagement";
import ScheduleManagement from "./Pages/Admin/ScheduleManagement/ScheduleManagement";
import AddDepartment from "./Pages/Admin/DepartmentManagement/AddDepartment";

import AppointmentManagement from "./Pages/Admin/AppointmentManagement/AppointmentManagement";
export const history = createBrowserHistory();
function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                {/*<Navbar />*/}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/appointment/:id" element={<Appointment />} />
                    {/*<Route path="/doctors/:id" element={<Appointment/>}/>*/}
                    <Route path="/signin" element={<SignIn/>}/>

                    <Route path="/doctor" element={<Doctor/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    {/*<Route path="/services" element={<Services />} />*/}
                    {/*<Route path="/contact" element={<Contact />} />*/}
                    {/*<Route path="/appointment" element={<Appointment />} />*/}
                    {/*<Route path="/testimonial" element={<Testimonial />} />*/}
                    {/*<Route path="/team" element={<Team />} />*/}
                    {/*<Route path="/feature" element={<Feature />} />*/}
                    {/*<Route path="*" element={<NotFound />} />*/}
                    <Route path="/history" element={<History />} />
                    <Route path="/symptoms" element={<SymptomScreen/>}/>
                    <Route path="/doctors-by-specialty" element={<DoctorsBySpecialtyScreen />} />

                    {/*Admin*/}
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/patientManagement" element={<PatientManagement/>}/>


                    <Route path="/doctorManagement" element={<DoctorManagement/>}/>
                    <Route path="/admin/doctormng/edit/:id" element={<EditDoctor />} />
                    <Route path="/admin/doctormng/adddoc" element={<AddDoctor />} />
                    <Route path="/departmentManagement" element={<DepartmentManagement/>}/>
                    <Route path="/symptomManagement" element={<SymptomManagement/>}/>
                    <Route path="/scheduleManagement" element={<ScheduleManagement/>}/>
                    <Route path="/addDepartment" element={<AddDepartment/>}/>
                    {/*<Route path="/symptomManagement" element={<SymptomtManagement/>}/>*/}


                    {/*<Route path="/scheduleManagement" element={<ScheduleManagement/>}/>*/}


                    <Route path="/appointmentManagement" element={<AppointmentManagement/>}/>


                </Routes>


            </Router>
        </Provider>
    );
}

export default App;