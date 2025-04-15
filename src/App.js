import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Component/Header";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Home from "./Pages/Home";
// import About from "./pages/About";
// import Services from "./pages/Services";
// import Contact from "./pages/Contact";
// import Appointment from "./pages/Appointment";
// import Testimonial from "./pages/Testimonial";
// import Team from "./pages/Team";
// import Feature from "./pages/Feature";
import NotFound from "./Pages/NotFound";
import ListSymptom from "./Symptom/ListSymptom";
import "./App.css";
import Content from "./Pages/Content";
import Test from "./Doctor/Doctor";
import ListDoctor from "./Doctor/ListDoctor";
import SignUp from "./SignUp/SignUpScreen";
import SignIn from "./SignIn/SignIn";
import Confirm from "./SignUp/ConfirmScreen";
import DoctorDetail from "./Detail/DoctorDetail";
import Appointment from "./Pages/Appointment";

function App() {
    return (
        <Router>
            <Header />
            {/*<Navbar />*/}
            <Routes>
                <Route path="/" element={<Content />} />
                <Route path="/doctors/:id" element={<Appointment />} />
                <Route path="/home" element={<Home />} />
                {/*<Route path="/services" element={<Services />} />*/}
                {/*<Route path="/contact" element={<Contact />} />*/}
                {/*<Route path="/appointment" element={<Appointment />} />*/}
                {/*<Route path="/testimonial" element={<Testimonial />} />*/}
                {/*<Route path="/team" element={<Team />} />*/}
                {/*<Route path="/feature" element={<Feature />} />*/}
                {/*<Route path="*" element={<NotFound />} />*/}
                 <Route path="/signIn" element={<SignIn />} />
            {/*</Routes>*/}
            <Footer />
                {/*<SignIn />*/}
            </Routes>
            {/*<Footer />*/}

        </Router>

    );
}

export default App;
