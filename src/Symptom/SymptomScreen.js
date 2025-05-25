import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styles from './Symptom.module.css';
import {useState} from 'react';
import axios from "axios";
import Fuse from 'fuse.js';
import  API_BASE_URL  from '../config/api'; // Điều chỉnh đường dẫn tùy theo vị trí file
const SymptomScreen = () => {
    // const navigate = useNavigate();
    // const symptoms = [{name: 'Sốt', department: 'khoa nội'}, {name: 'ho', department: 'khoa ngoại'}, {
    //     name: 'Sổ mũi',
    //     department: 'khoa ngoại'
    // }, {name: 'Đau đầu', department: 'khoa ngoại'}, {name: 'Mệt mỏi', department: 'khoa ngoại'}];
    // const symptoms =[];
    const [symptoms, setSymptoms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

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
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);


    const handleSelectSymptom = (symptom) => {
        // Kiểm tra xem triệu chứng đã được chọn chưa
        const isAlreadySelected = selectedSymptoms.some(
            (selected) => selected.name === symptom.name
        );

        if (!isAlreadySelected) {
            // Nếu chưa tồn tại, thêm vào danh sách
            setSelectedSymptoms([...selectedSymptoms, symptom]);
        }
    };
    const handleRemoveSymptom = (symptom) => {
        setSelectedSymptoms(selectedSymptoms.filter((item) => item !== symptom));
    };
    // State để lưu giá trị của input
    const [searchTerm, setSearchTerm] = useState('');

    // Hàm xử lý khi người dùng nhập vào input
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Lọc danh sách triệu chứng dựa trên giá trị tìm kiếm
    const fuse = new Fuse(symptoms, {
        keys: ['name'], // Tìm kiếm trên field 'name'
        threshold: 0.3, // Độ chính xác (0: chính xác tuyệt đối, 1: rất mờ)
    });

    const filteredSymptoms = searchTerm
        ? fuse.search(searchTerm).map(result => result.item)
        : symptoms;
    const handleContinue = () => {
        if (selectedSymptoms.length === 0) {
            alert('Vui lòng chọn ít nhất một triệu chứng trước khi tiếp tục!');
            return;
        }

        // In danh sách triệu chứng đã chọn ra console (có thể thay bằng gọi API)
        console.log('Danh sách triệu chứng đã chọn:', selectedSymptoms);


    };
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <>
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
                {/* Cột bên trái */}
                <div className={styles['column-left']}>
                    <div className={styles['symptom-list']}>
                        {searchTerm === '' ? (
                            symptoms.length > 0 ? (
                                symptoms.map((symptom, index) => (
                                    <div
                                        key={index}
                                        className={`${styles['symptom-item']} ${
                                            selectedSymptoms.some((s) => s.name === symptom.name) ? styles.selected : ''
                                        }`}
                                        onClick={() => handleSelectSymptom(symptom)}
                                    >
                                        <h2 className={styles['symptom-name']}>{symptom.name}</h2>
                                    </div>
                                ))
                            ) : (
                                <p className={styles['no-data']}>Không có dữ liệu</p>
                            )
                        ) : (
                            filteredSymptoms.length > 0 ? (
                                filteredSymptoms.map((symptom, index) => (
                                    <div
                                        key={index}
                                        className={styles['symptom-item']}
                                        onClick={() => handleSelectSymptom(symptom)}
                                    >
                                        <h2 className={styles['symptom-name']}>{symptom.name}</h2>
                                    </div>
                                ))
                            ) : (
                                <p className={styles['no-data']}>Không tìm thấy triệu chứng</p>
                            )
                        )}
                    </div>
                </div>

                {/* Cột bên phải */}
                <div className={styles['column-right']}>
                    <div className={styles['symptom-list']}>
                        {selectedSymptoms.length > 0 ? (
                            selectedSymptoms.map((symptom, index) => (
                                <div
                                    key={index}
                                    className={styles['symptom-item']}
                                    onClick={() => handleRemoveSymptom(symptom)}
                                >
                                    <h2 className={styles['symptom-name']}>{symptom.name}</h2>
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

        </>
    );
};

export default SymptomScreen;