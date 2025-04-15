import React from 'react';
import './DoctorDetail.css'; // Import tệp CSS

const DoctorDetail = ({ doctor }) => {
    return (
        <div className="doctor-detail">
            <div className="doctor-header">
                <img src={doctor.imageUrl} alt={doctor.name} className="doctor-image"/>
                <div className="doctor-info">
                    <h2 className="doctor-name">{doctor.name}</h2>
                    <p className="doctor-specialty">{doctor.specialty}</p>
                    <p className="doctor-experience">{doctor.experience} năm kinh nghiệm</p>
                </div>
            </div>
            <div className="doctor-description">
                <h3>Giới thiệu</h3>
                <p>{doctor.description}</p>
            </div>
            <div style={{display:"flex"}}>
                <button className="book-appointment">Đặt khám ngay</button>
                <p>Hotline:19001286 </p>
            </div>
        </div>
    );
};

export default DoctorDetail;