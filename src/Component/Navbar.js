import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 wow fadeIn" data-wow-delay="0.1s">
            <Link to="/" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
                <h1 className="m-0 text-primary"><i className="far fa-hospital me-3"></i>Klinik</h1>
            </Link>
            <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto p-4 p-lg-0">
                    <Link to="/" className="nav-item nav-link">Home</Link>
                    <Link to="/about" className="nav-item nav-link">About</Link>
                    <Link to="/services" className="nav-item nav-link">Services</Link>
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle active" data-bs-toggle="dropdown">Pages</a>
                        <div className="dropdown-menu rounded-0 rounded-bottom m-0">
                            <Link to="/feature" className="dropdown-item">Feature</Link>
                            <Link to="/team" className="dropdown-item">Our Doctor</Link>
                            <Link to="/appointment" className="dropdown-item">Appointment</Link>
                            <Link to="/testimonial" className="dropdown-item">Testimonial</Link>
                            <Link to="/404" className="dropdown-item active">404 Page</Link>
                        </div>
                    </div>
                    <Link to="/contact" className="nav-item nav-link">Contact</Link>
                </div>
                <Link to="/appointment" className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">Appointment<i className="fa fa-arrow-right ms-3"></i></Link>
            </div>
        </nav>
    );
};

export default Navbar;