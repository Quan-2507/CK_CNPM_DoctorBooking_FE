import React from 'react';
import Spinner from '../Home/Spinner';
import Topbar from '../Home/Topbar';
import Navbar from '../Component/Navbar';
import Header from '../Component/Header';
import About from '../Home/About';
import Services from '../Home/Services';
import Features from '../Home/Features';
import Team from '../Home/Team';
import Testimonial from '../Home/Testimonial';
import Footer from '../Component/Footer';
import BackToTop from '../Home/BackToTop';

import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/lib/animate/animate.min.css';
import '../assets/lib/owlcarousel/assets/owl.carousel.min.css';
import '../assets/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css';

const Home = () => {
    return (
        <>
            {/*<Spinner />*/}
            <Topbar />
            <Navbar />
            <Header />
            <About />
            <Services />
            <Features />
            <Team />
            <Testimonial />
            <Footer />
            <BackToTop />
        </>
    );
};

export default Home;
