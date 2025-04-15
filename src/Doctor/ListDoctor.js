import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import DoctorCard from "../Doctor/Doctor";
import axios from "axios";
import img from "../img/about-2.jpg";

const ListDoctor = ({ selectedDepartment }) => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook để điều hướng

    useEffect(() => {
        axios.get('http://localhost:8081/api/doctors')
            .then(response => {
                setDoctors(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const filteredDoctors = selectedDepartment
        ? doctors.filter(doctor => doctor.department.name === selectedDepartment)
        : doctors;

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                    <div
                        key={doctor.id}
                        onClick={() => navigate(`/doctors/${doctor.id}`)} // Điều hướng khi click
                        style={{ cursor: "pointer" }} // Biến đổi con trỏ để chỉ ra có thể click
                    >
                        <DoctorCard
                            name={doctor.name}
                            department={doctor.department.name}
                            imageUrl={img}
                            exp={doctor.experienceYears}
                        />
                    </div>
                ))
            ) : (
                <p>Không có bác sĩ trong khoa này.</p>
            )}
        </div>
    );
};

export default ListDoctor;
