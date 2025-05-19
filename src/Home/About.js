// components/About.jsx
import React from 'react';

const About = () => (
    <div className="container-xxl py-5">
        <div className="container">
            <div className="row g-5">
                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                    <div className="d-flex flex-column">
                        <img className="img-fluid rounded w-75 align-self-end" src="/assets/img/about-1.jpg" alt="about" />
                        <img className="img-fluid rounded w-50 bg-white pt-3 pe-3" src="/assets/img/about-2.jpg" alt="about" style={{ marginTop: '-25%' }} />
                    </div>
                </div>
                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                    <p className="d-inline-block border rounded-pill py-1 px-4">About Us</p>
                    <h1 className="mb-4">Why You Should Trust Us? Get Know About Us!</h1>
                    <p>Tempor erat elitr rebum at clita...</p>
                    <p className="mb-4">Stet no et lorem dolor et diam...</p>
                    <ul className="list-unstyled">
                        <li><i className="far fa-check-circle text-primary me-3"></i>Quality health care</li>
                        <li><i className="far fa-check-circle text-primary me-3"></i>Only Qualified Doctors</li>
                        <li><i className="far fa-check-circle text-primary me-3"></i>Medical Research Professionals</li>
                    </ul>
                    <a className="btn btn-primary rounded-pill py-3 px-5 mt-3" href="#">Read More</a>
                </div>
            </div>
        </div>
    </div>
);

export default About;
