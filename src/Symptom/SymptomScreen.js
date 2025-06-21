import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Symptom.module.css';
import axios from "axios";
import Fuse from 'fuse.js';
import API_BASE_URL from '../config/api';
import Topbar from "../Home/Topbar";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import BackToTop from "../Home/BackToTop";

const SymptomScreen = () => {
    const [symptoms, setSymptoms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_BASE_URL}/symptoms`)
            .then(response => {
                setSymptoms(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleSelectSymptom = (symptom) => {
        if (!selectedSymptoms.some((selected) => selected.nameVi === symptom.nameVi)) {
            setSelectedSymptoms([...selectedSymptoms, symptom]);
        }
    };

    const handleRemoveSymptom = (symptom) => {
        setSelectedSymptoms(selectedSymptoms.filter((item) => item !== symptom));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const fuse = new Fuse(symptoms, {
        keys: ['nameVi'],
        threshold: 0.3,
    });

    const filteredSymptoms = searchTerm
        ? fuse.search(searchTerm).map(result => result.item)
        : symptoms;

    const handleContinue = async () => {
        if (selectedSymptoms.length === 0) {
            alert('Vui lòng chọn ít nhất một triệu chứng trước khi tiếp tục!');
            return;
        }

        try {
            const symptomsToSend = selectedSymptoms.map(symptom => symptom.nameEn);

            const res = await axios.post("http://localhost:8000/predict", {
                symptoms: symptomsToSend,
            });

            const { predicted_disease, predicted_specialty } = res.data;

            const doctorsBySpecialty = [];

            for (const specialty of predicted_specialty) {
                const response = await axios.get(`${API_BASE_URL}/doctors/department/name/${specialty}`);
                doctorsBySpecialty.push({
                    specialty,
                    doctors: response.data,
                });
            }

            navigate('/doctors-by-specialty', {
                state: {
                    doctorsBySpecialty,
                    diseaseResults: predicted_disease,
                },
            });

        } catch (err) {
            console.error("Lỗi khi gửi triệu chứng hoặc lấy dữ liệu bác sĩ:", err);
            alert("Đã xảy ra lỗi khi xử lý. Vui lòng thử lại.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <Topbar />
            <Navbar />
            <div className={styles['search-container']}>
                <input
                    type="text"
                    className={styles['search-input']}
                    placeholder="Tìm kiếm triệu chứng..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className={styles.container}>
                <div className={styles['column-left']}>
                    <h3 className={styles.header}>Danh sách triệu chứng</h3>
                </div>
                <div className={styles['column-right']}>
                    <h3 className={styles.header}>Danh sách triệu chứng đã chọn</h3>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles['column-left']}>
                    <div className={styles['symptom-list']}>
                        {filteredSymptoms.length > 0 ? (
                            filteredSymptoms.map((symptom, index) => (
                                <div
                                    key={index}
                                    className={`${styles['symptom-item']} ${selectedSymptoms.some((s) => s.nameVi === symptom.nameVi) ? styles.selected : ''}`}
                                    onClick={() => handleSelectSymptom(symptom)}
                                >
                                    <h2 className={styles['symptom-name']}>{symptom.nameVi}</h2>
                                </div>
                            ))
                        ) : (
                            <p className={styles['no-data']}>Không tìm thấy triệu chứng</p>
                        )}
                    </div>
                </div>

                <div className={styles['column-right']}>
                    <div className={styles['symptom-list']}>
                        {selectedSymptoms.length > 0 ? (
                            selectedSymptoms.map((symptom, index) => (
                                <div
                                    key={index}
                                    className={styles['symptom-item']}
                                    onClick={() => handleRemoveSymptom(symptom)}
                                >
                                    <h2 className={styles['symptom-name']}>{symptom.nameVi}</h2>
                                </div>
                            ))
                        ) : (
                            <p className={styles['no-data']}>Chưa có triệu chứng nào được chọn</p>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles['button-container']}>
                <button className={styles['pass-btn']} onClick={handleContinue}>Bỏ qua</button>
                <button className={styles['continue-btn']} onClick={handleContinue}>Tiếp tục</button>
            </div>
            <Footer />
            <BackToTop />
        </>
    );
};

export default SymptomScreen;
