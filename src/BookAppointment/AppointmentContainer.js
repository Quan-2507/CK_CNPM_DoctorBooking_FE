import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './BookAppointment.css';

const AppointmentContainer = () => {
    const { id: docId } = useParams();
    const navigate = useNavigate();
    const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    const [docInfo, setDocInfo] = useState(null);
    const [schedules, setSchedules] = useState({});
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');
    const [selectedSlotId, setSelectedSlotId] = useState(null);

    const fetchDocInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/doctors/${docId}`);
            setDocInfo(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy thông tin bác sĩ:", error);
        }
    };

    const fetchSchedules = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/schedules/doctors/${docId}/available`);
            const data = response.data;

            const groupedByDate = {};
            data.forEach(slot => {
                if (!groupedByDate[slot.date]) {
                    groupedByDate[slot.date] = [];
                }
                groupedByDate[slot.date].push(slot);
            });

            const sorted = Object.keys(groupedByDate).sort().reduce((obj, key) => {
                obj[key] = groupedByDate[key];
                return obj;
            }, {});

            setSchedules(sorted);
        } catch (error) {
            console.error("Lỗi khi lấy lịch khám:", error);
        }
    };

    const handleBooking = async () => {
        const userId = parseInt(sessionStorage.getItem("userId"), 10);
        const token = localStorage.getItem("token");
        const now = new Date();
        const vietnamTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
        const appointmentTime = vietnamTime.toISOString();

        if (!userId || selectedSlotId == null) {
            alert("Vui lòng chọn khung giờ khám.");
            return;
        }

        const requestBody = {
            userId,
            doctorId: parseInt(docId, 10),
            scheduleId: selectedSlotId,
            appointmentTime
        };

        try {
            await axios.post('http://localhost:8080/api/bookings', requestBody, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Đặt lịch khám thành công!");
            navigate("/");
        } catch (error) {
            console.error("Lỗi khi đặt lịch:", error);
            alert("Đặt lịch khám thất bại.");
        }
    };

    useEffect(() => {
        fetchDocInfo();
    }, [docId]);

    useEffect(() => {
        if (docInfo) fetchSchedules();
    }, [docInfo]);

    const dateKeys = Object.keys(schedules);

    return docInfo && (
        <div>
            <div className='book-appointment-container'>
                <div>
                    <img className='doctor-image' src={`/assets/img/team-1.jpg`} alt={docInfo.name} />
                </div>
                <div className='doctor-infos'>
                    <p className='doctor-name'>{docInfo.name}</p>
                    <div className='doctor-degree'>
                        <p>{docInfo.degree} - {docInfo.departmentName}</p>
                        <button className='doctor-exp'>{docInfo.experienceYears} năm kinh nghiệm</button>
                    </div>
                    <div className='doctor-description'>
                        <p className='doctor-description-content'>
                            Bác sĩ giàu kinh nghiệm trong chuyên khoa {docInfo.departmentName}.
                        </p>
                    </div>
                </div>
            </div>

            <div className='booking'>
                <p>Chọn lịch khám</p>
                <div className='book-day'>
                    {dateKeys.map((date, index) => {
                        const dateObj = new Date(date);
                        const day = daysOfWeek[dateObj.getDay()];
                        const dateNum = dateObj.getDate().toString().padStart(2, '0');
                        const monthNum = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                        return (
                            <div
                                onClick={() => {
                                    setSlotIndex(index);
                                    setSlotTime('');
                                }}
                                className={`book-day-1 ${slotIndex === index ? 'book-day-2' : 'book-day-3'}`}
                                key={index}
                            >
                                <p>{day}</p>
                                <p>{`${dateNum}/${monthNum}`}</p>
                            </div>
                        );
                    })}
                </div>

                <div className='book-time'>
                    {dateKeys.length > 0 && schedules[dateKeys[slotIndex]]?.map((slot, index) => {
                        const timeRange = `${slot.startTime.slice(0, 5)} - ${slot.endTime.slice(0, 5)}`;
                        return (
                            <p
                                onClick={() => {
                                    setSlotTime(timeRange);
                                    setSelectedSlotId(slot.id);
                                }}
                                className={`book-time-1 ${slotTime === timeRange ? 'book-time-2' : 'book-time-3'}`}
                                key={index}
                            >
                                {timeRange}
                            </p>
                        );
                    })}
                </div>

                <button className='book-button' onClick={handleBooking}>
                    Đặt lịch khám
                </button>
            </div>
        </div>
    );
};

export default AppointmentContainer;
