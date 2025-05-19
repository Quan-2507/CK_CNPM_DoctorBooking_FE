// components/Team.jsx
import React from 'react';

const doctors = [1, 2, 3, 4];

const Team = () => (
    <div className="container-xxl py-5">
        <div className="container">
            <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 600 }}>
                <p className="d-inline-block border rounded-pill py-1 px-4">Doctors</p>
                <h1>Our Experience Doctors</h1>
            </div>
            <div className="row g-4">
                {doctors.map((num, i) => (
                    <div key={i} className={`col-lg-3 col-md-6 wow fadeInUp`} data-wow-delay={`${0.1 + i * 0.2}s`}>
                        <div className="team-item position-relative rounded overflow-hidden">
                            <div className="overflow-hidden">
                                <img className="img-fluid" src={`/assets/img/team-${num}.jpg`} alt={`Doctor ${num}`} />
                            </div>
                            <div className="team-text bg-light text-center p-4">
                                <h5>Doctor Name</h5>
                                <p className="text-primary">Department</p>
                                <div className="team-social text-center">
                                    <a className="btn btn-square" href="#"><i className="fab fa-facebook-f"></i></a>
                                    <a className="btn btn-square" href="#"><i className="fab fa-twitter"></i></a>
                                    <a className="btn btn-square" href="#"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default Team;
