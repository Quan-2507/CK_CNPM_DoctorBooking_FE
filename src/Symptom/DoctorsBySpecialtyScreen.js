import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import Topbar from "../Home/Topbar";
import axios from 'axios';

const DoctorsBySpecialtyScreen = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { doctorIds, doctorsBySpecialty } = state || {};

    const [doctorsGroupedBySpecialty, setDoctorsGroupedBySpecialty] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const doctorMap = new Map(); // id -> doctor

                // 1. Fetch all doctor info from ids
                const doctorPromises = doctorIds.map(id =>
                    axios.get(`http://localhost:8080/api/doctors/${id}`).then(res => {
                        doctorMap.set(id, res.data);
                        return res.data;
                    })
                );
                await Promise.all(doctorPromises);

                // 2. Group doctors by specialty
                const grouped = doctorsBySpecialty.map(group => {
                    const doctorsInGroup = group.doctors
                        .map(d => doctorMap.get(d.id))
                        .filter(Boolean); // remove undefined/null
                    return {
                        specialty: group.specialty,
                        doctors: doctorsInGroup,
                    };
                });

                setDoctorsGroupedBySpecialty(grouped);
                setLoading(false);
            } catch (err) {
                setError("Lỗi khi tải dữ liệu bác sĩ.");
                setLoading(false);
            }
        };

        if (doctorIds && doctorIds.length > 0 && doctorsBySpecialty) {
            fetchDoctors();
        } else {
            setLoading(false);
        }
    }, [doctorIds, doctorsBySpecialty]);

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>{error}</p>;
    if (!doctorsGroupedBySpecialty || doctorsGroupedBySpecialty.length === 0) return <p>Không tìm thấy bác sĩ nào.</p>;

    return (
        <>
            <Topbar />
            <Navbar />
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 600 }}>
                        <h1>Bác sĩ theo chuyên khoa được đề xuất</h1>
                    </div>
                    {doctorsGroupedBySpecialty.map((group, idx) => (
                        <div key={idx}>
                            <h3 className="mb-4">Chuyên khoa: {group.specialty}</h3>
                            <div className="row g-4">
                                {group.doctors.map((doctor, i) => (
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
                                                <p className="text-primary">Chuyên khoa: {doctor.department?.nameVi || 'Không rõ'}</p>
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
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DoctorsBySpecialtyScreen;
