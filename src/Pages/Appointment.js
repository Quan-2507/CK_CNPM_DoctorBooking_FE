import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../output.css"
import img from "../img/about-2.jpg";
import dayjs from "dayjs";

const Appointment = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/api/doctors/${id}`)
            .then(response => setDoctor(response.data))
            .catch(error => setError(error));

        axios.get(`http://localhost:8081/api/schedules/doctors/${id}/available`)
            .then(response => {
                const groupedByDate = response.data.reduce((acc, slot) => {
                    const date = dayjs(slot.time).format("YYYY-MM-DD");
                    acc[date] = acc[date] || [];
                    acc[date].push(slot);
                    return acc;
                }, {});
                setSchedules(groupedByDate);
                setSelectedDate(Object.keys(groupedByDate)[0]); // Chọn ngày đầu tiên
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">Error: {error.message}</div>;
    if (!doctor) return <div className="text-center mt-10">Không tìm thấy bác sĩ</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex gap-6 bg-white p-6 rounded-lg shadow-md">
                {/* Ảnh bác sĩ */}
                <img src={img} alt={doctor.name} className="w-36 h-36 rounded-lg object-cover" />

                {/* Thông tin bác sĩ */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold">{doctor.name}</h2>
                    <p className="text-gray-600">{doctor.degree} - {doctor.departmentName}</p>
                    <div className="mt-2 flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm">{doctor.experienceYears} Years</span>
                    </div>
                    <p className="mt-4 text-gray-700 text-sm">{doctor.about || "Thông tin về bác sĩ..."}</p>
                    <p className="mt-2 font-semibold">Appointment fee: <span className="text-blue-600">${doctor.fee || 0}</span></p>
                </div>
            </div>

            {/* Danh sách thời gian đặt lịch */}
            <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Booking Slots</h3>

                {/* Chọn ngày */}
                <div className="flex gap-3 mt-4">
                    {Object.keys(schedules).map((date, index) => (
                        <button
                            key={date}
                            onClick={() => setSelectedDate(date)}
                            className={`flex flex-col items-center px-4 py-2 rounded-lg text-sm font-medium 
                                ${selectedDate === date ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}
                            `}
                        >
                            <span>{dayjs(date).format("ddd").toUpperCase()}</span>
                            <span>{dayjs(date).format("DD")}</span>
                        </button>
                    ))}
                </div>

                {/* Chọn giờ */}
                <div className="flex flex-wrap gap-3 mt-4">
                    {selectedDate && schedules[selectedDate]?.length > 0 ? (
                        schedules[selectedDate].map((slot) => (
                            <button
                                key={slot.id}
                                className={`px-4 py-2 rounded-lg text-sm 
                                    ${slot.remainingSeats > 0
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"}
                                `}
                                disabled={slot.remainingSeats === 0}
                            >
                                {dayjs(slot.time).format("h:mm A")} ({slot.remainingSeats}/{slot.numOfSeats})
                            </button>
                        ))
                    ) : (
                        <p className="text-gray-500">Không có lịch hẹn khả dụng.</p>
                    )}
                </div>

                <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
                    Book an appointment
                </button>
            </div>
        </div>
    );
};

export default Appointment;
