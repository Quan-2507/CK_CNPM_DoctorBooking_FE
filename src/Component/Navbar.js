import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
const Navbar = () => (
    <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
        <Link to={"/"} className="navbar-brand d-flex align-items-center px-4 px-lg-5">
            <h1 className="m-0 text-primary">
                <i className="far fa-hospital me-3"></i>Klinik
            </h1>
        </Link>
        <button
            type="button"
            className="navbar-toggler me-4"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto p-4 p-lg-0">
                <a href="/" className="nav-item nav-link active">Home</a>
                <a href="/about" className="nav-item nav-link">About</a>
                <a href="/service" className="nav-item nav-link">Service</a>
                <div className="nav-item dropdown">
                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                    <div className="dropdown-menu rounded-0 rounded-bottom m-0">
                        <a href="/feature" className="dropdown-item">Feature</a>
                        <a href="/team" className="dropdown-item">Our Doctor</a>
                        <a href="/appointment" className="dropdown-item">Appointment</a>
                        <a href="/testimonial" className="dropdown-item">Testimonial</a>
                    </div>
                </div>
                <a href="/contact" className="nav-item nav-link">Contact</a>
            </div>
            <a href="/appointment" style={{zIndex:50}} className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">
                Appointment<i className="fa fa-arrow-right ms-3"></i>
            </a>
        </div>
    </nav>
);

export default Navbar;
