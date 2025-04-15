import React, { useEffect, useState } from "react";
import axios from "axios";

const ListSymptom = ({ onSelectDepartment }) => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/api/departments/symptoms')
            .then(response => {
                setDepartments(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleSelectDepartment = (departmentName) => {
        const newSelected = selectedDepartment === departmentName ? null : departmentName;
        setSelectedDepartment(newSelected);
        onSelectDepartment(newSelected);
    };

    return (
        <div style={{margin: '20px auto'}}>
            <h1 style={{marginLeft: '10px'}}>Danh sách Khoa bệnh</h1>
            {departments.length > 0 ? (
                departments.map((department, index) => (
                    <div key={index}
                         style={{marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px'}}>
                        <h2
                            style={{cursor: 'pointer'}}
                            onClick={() => handleSelectDepartment(department.name)}
                        >
                            {department.name}
                        </h2>
                        {/* Hiển thị triệu chứng nếu khoa này đang được chọn */}
                        {selectedDepartment === department.departments && (
                            <ul>
                                {departments.symptoms.map((symptom, i) => (
                                    <li key={i}><strong>{symptom.name}:</strong> {symptom.description}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))
            ) : (
                <p>Không có dữ liệu</p>
            )}
        </div>
    );
};

export default ListSymptom;
