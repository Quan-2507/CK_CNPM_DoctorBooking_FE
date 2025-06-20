import React, {useEffect, useState} from "react";
import "./profile.css";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import Topbar from "../../Home/Topbar";
import Navbar from "../../Component/Navbar";
import Footer from "../../Component/Footer";
function History() {
    //lấy danh sách ngày đã đặt lịch
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const userId = sessionStorage.getItem("userId");
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_BASE_URL}/bookings/history/users/${userId}`,
                    {
                        headers:{Authorization: `Bearer ${token}`}
                    }); // Thay bằng URL API thực tế
                setAppointments(response.data);
                console.log("appointments",appointments);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách lịch hẹn:', error);
            }
        };
        fetchAppointments();
    }, []); // Chạy một lần khi component mount
    return (
        <>
            <Topbar/>
            <Navbar/>
            <section className="register-section">
                <div className="profile-container flex-center">
                        <div className="main-components" style={{height: '400px'}}>
                            <h2 className="form-heading" style={{marginBottom: "40px"}}>Lịch sử</h2>
                            <div className="table-container">
                                <table className="table-history">
                                    <thead className="table-thead">
                                    <tr>
                                        <th className="table-th">STT</th>
                                        <th className="table-th">Ngày đặt lịch</th>
                                        <th className="table-th">Thời gian đặt</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {appointments.map((appointment, index) => (
                                        <tr key={index} className="table-tr">
                                            <td className="table-td">{index+1}</td>
                                            <td className="table-td">{appointment.appointmentDate}</td>
                                            <td className="table-td">{appointment.appointmentTime}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    <ToastContainer position="top-right" autoClose={2000}/>
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default History;