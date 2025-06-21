import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import Topbar from "../Home/Topbar";

const DoctorsBySpecialtyScreen = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { doctorsBySpecialty } = state || {};
    const [detailedDoctorsBySpecialty, setDetailedDoctorsBySpecialty] = useState([]);
    const specialtyMapping = {
        "Allergy": "Dị ứng",
        "Orthopedics": "Chỉnh hình",
        "Dentistry": "Nha khoa",
        "Neurology": "Thần kinh",
        "Gastroenterology": "Tiêu hóa",
        "Urology": "Tiết niệu",
        "Hepatology": "Gan mật",
        "Dermatology": "Da liễu",
        "Psychiatry": "Tâm thần",
        "Otorhinolaryngology (ENT)": "Tai Mũi Họng",
        "General Medicine": "Nội tổng quát",
        "Obstetrics and Gynecology": "Sản phụ khoa",
        "Pulmonology": "Hô hấp",
        "Endocrinology": "Nội tiết",
        "Hematology": "Huyết học",
        "Nephrology": "Thận - Tiết niệu",
        "Cardiology": "Tim mạch",
        "Rheumatology": "Cơ xương khớp",
        "Ophthalmology": "Mắt",
    };

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const updatedGroups = await Promise.all(
                    doctorsBySpecialty.map(async (group) => {
                        const doctorDetails = await Promise.all(
                            group.doctors.map(async (doctor) => {
                                const res = await fetch(`http://localhost:8080/api/doctors/${doctor.id}`);
                                const data = await res.json();
                                return data; // Trả về dữ liệu chi tiết bác sĩ
                            })
                        );
                        return {
                            specialty: group.specialty,
                            doctors: doctorDetails, // Danh sách bác sĩ đã có đủ thông tin chi tiết
                        };
                    })
                );
                setDetailedDoctorsBySpecialty(updatedGroups);
            } catch (error) {
                console.error("Error fetching detailed doctors:", error);
            }
        };

        if (doctorsBySpecialty && doctorsBySpecialty.length > 0) {
            fetchDoctorDetails();
        }
    }, [doctorsBySpecialty]);

    if (!doctorsBySpecialty || doctorsBySpecialty.length === 0) return <p>Không tìm thấy bác sĩ nào.</p>;

    return (
        <>
            <Topbar />
            <Navbar />
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5" style={{ maxWidth: 600 }}>
                        <h1>Kết quả dự đoán</h1>
                    </div>

                    {detailedDoctorsBySpecialty.map((group, idx) => (
                        <div key={idx}>
                            <h3 className="mb-4">Chuyên khoa: {specialtyMapping[group.specialty] || group.specialty}</h3>
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
                                                <p className="text-primary">Chuyên khoa: {doctor.departmentNameVi || 'Không rõ'}</p>
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
