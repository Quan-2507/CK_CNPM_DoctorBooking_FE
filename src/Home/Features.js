// components/Features.jsx
import React from 'react';

const features = [
    { icon: 'fa-user-md', title: 'Doctors', label: 'Experience' },
    { icon: 'fa-check', title: 'Services', label: 'Quality' },
    { icon: 'fa-comment-medical', title: 'Consultation', label: 'Positive' },
    { icon: 'fa-headphones', title: 'Support', label: '24 Hours' }
];

const Features = () => (
    <div className="container-fluid bg-primary overflow-hidden my-5 px-lg-0">
        <div className="container feature px-lg-0">
            <div className="row g-0 mx-lg-0">
                <div className="col-lg-6 feature-text py-5 wow fadeIn" data-wow-delay="0.1s">
                    <div className="p-lg-5 ps-lg-0">
                        <p className="d-inline-block border rounded-pill text-light py-1 px-4">Features</p>
                        <h1 className="text-white mb-4">Why Choose Us</h1>
                        <p className="text-white mb-4 pb-2">Tempor erat elitr rebum at clita...</p>
                        <div className="row g-4">
                            {features.map((f, i) => (
                                <div key={i} className="col-6">
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{ width: 55, height: 55 }}>
                                            <i className={`fa ${f.icon} text-primary`}></i>
                                        </div>
                                        <div className="ms-4">
                                            <p className="text-white mb-2">{f.label}</p>
                                            <h5 className="text-white mb-0">{f.title}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 pe-lg-0 wow fadeIn" data-wow-delay="0.5s" style={{ minHeight: '400px' }}>
                    <div className="position-relative h-100">
                        <img className="position-absolute img-fluid w-100 h-100" src="/assets/img/feature.jpg" style={{ objectFit: 'cover' }} alt="Feature" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Features;
