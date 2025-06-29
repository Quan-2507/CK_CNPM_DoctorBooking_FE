import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Team = () => {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/doctors');
                const sortedDoctors = response.data
                    .sort((a, b) => b.experienceYears - a.experienceYears) // Sắp xếp theo kinh nghiệm giảm dần
                    .slice(0, 4); // Lấy 4 bác sĩ đầu tiên
                setDoctors(sortedDoctors);
            } catch (error) {
                console.error('Lỗi khi tải danh sách bác sĩ:', error);
            }
        };
        fetchDoctors();
    }, []);

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 600 }}>
                    <p className="d-inline-block border rounded-pill py-1 px-4">Đội Ngũ Bác Sĩ</p>
                    <h1>Những Bác Sĩ Giàu Kinh Nghiệm Của Chúng Tôi</h1>
                </div>
                <div className="row g-4">
                    {doctors.map((doctor, i) => (
                        <div key={doctor.id} className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay={`${0.1 + i * 0.2}s`}>
                            <div
                                className="team-item position-relative rounded overflow-hidden"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    navigate(`/appointment/${doctor.id}`);
                                    window.scrollTo(0, 0);
                                }}
                            >
                                <div className="overflow-hidden">
                                    <img
                                        className="img-fluid"
                                        src={`/assets/img/team-1.jpg`}
                                        alt={doctor.name}
                                    />
                                </div>
                                <div className="team-text bg-light text-center p-4">
                                    <h5>{doctor.name}</h5>
                                    <p className="text-primary">Chuyên khoa: {doctor.department?.nameVi || 'Chưa xác định'}</p>
                                    <div className="team-social text-center">
                                        <span className="text-black">
                                            {doctor.degree} - {doctor.experienceYears} năm kinh nghiệm
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Team;
