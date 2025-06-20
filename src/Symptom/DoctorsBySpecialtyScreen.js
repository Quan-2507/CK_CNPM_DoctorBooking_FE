import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import Topbar from "../Home/Topbar";

const DoctorsBySpecialtyScreen = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { doctorsBySpecialty, diseaseResults } = state || {};

    if (!doctorsBySpecialty || doctorsBySpecialty.length === 0) return <p>Không tìm thấy bác sĩ nào.</p>;

    return (
        <>
            <Topbar />
            <Navbar />
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5" style={{ maxWidth: 600 }}>
                        <h1>Kết quả dự đoán</h1>
                        {/*<p>Bệnh có thể mắc phải: {diseaseResults?.join(', ')}</p>*/}
                    </div>
                    {doctorsBySpecialty.map((group, idx) => (
                        <div key={idx}>
                            <h3 className="mb-4">Chuyên khoa: {group.specialty}</h3>
                            <div className="row g-4">
                                {group.doctors.map((doctor) => (
                                    <div key={doctor.id} className="col-lg-3 col-md-6">
                                        <div
                                            className="team-item position-relative rounded overflow-hidden"
                                            onClick={() => {
                                                navigate(`/appointment/${doctor.id}`);
                                                window.scrollTo(0, 0);
                                            }}
                                            style={{ cursor: 'pointer' }}
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
                                                <span className="text-black">
                                                    {doctor.degree} - {doctor.experienceYears} năm kinh nghiệm
                                                </span>
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
