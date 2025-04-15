import React from 'react';
import './DoctorCard.css'; // Import tệp CSS

const Doctor = ({ name, department, imageUrl,exp }) => {
    return (
        <div className="doctor-card">
            <img src={imageUrl} alt={name} className="doctor-image"/>
            <h3 className="doctor-name">{name}</h3>
            <p className="doctor-department">{department}</p>
            <p className="doctor-department">{exp} years</p>
        </div>
    );
};

export default Doctor;