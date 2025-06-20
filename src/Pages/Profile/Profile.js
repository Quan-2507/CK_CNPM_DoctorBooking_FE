import React, {useEffect, useState} from "react";
import "./profile.css";

import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from '../../Redux/Store/Store';

import jwt_decode from "jwt-decode";
import Topbar from "../../Home/Topbar";
import Navbar from "../../Component/Navbar";
import Footer from "../../Component/Footer";
import API_BASE_URL from "../../config/api";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {setUser} from "../../Redux/Slice/UserSlice";


function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const [view, setView] = useState('profile');

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const [gender, setGender] = useState('');
    const [initial, setInitial] = useState({
        email: "",
        phoneNumber: "",
        username: "",
        address: "",
        gender: ""
    });

// ✅ Load user từ sessionStorage nếu cần
    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                dispatch(setUser(parsedUser)); // Cập nhật vào Redux store
            } catch (error) {
                console.error("Error parsing user from sessionStorage:", error);
            }
        }
    }, [dispatch]);

// ✅ Khi Redux user cập nhật → gán giá trị cho input
    useEffect(() => {
        if (user && user.email) {
            setEmail(prev => prev || user.email); // chỉ set nếu chưa có
            setUsername(prev => prev || user.username);
            setPhoneNumber(prev => prev || user.phoneNumber);
            setAddress(prev => prev || user.address);
            setGender(prev => prev || user.gender);
            setInitial({
                email: user.email,
                username: user.username,
                phoneNumber: user.phoneNumber,
                address: user.address,
                gender: user.gender
            });
        }
    }, [user]);
//
// // ✅ Kiểm tra có thay đổi hay không
    useEffect(() => {
        const hasChanged =
            email !== initial.email ||
            username !== initial.username ||
            phoneNumber !== initial.phoneNumber ||
            address !== initial.address ||
            gender !== initial.gender;
        setIsChanged(hasChanged);
        console.log(hasChanged);
    }, [email, username, phoneNumber, address, gender, initial]);

    const validate = () => {
        if (!email || !phoneNumber || !address || !username) {
            toast.error("Vui lòng nhập đầy đủ thông tin", {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true
            });
            return false;
        }
        return true;
    };

    //lấy danh sách ngày đã đặt lịch
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const userId = sessionStorage.getItem("userId");
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_BASE_URL}/bookings/history/users/${userId}`,
                    {
                        headers: {Authorization: `Bearer ${token}`}
                    }); // Thay bằng URL API thực tế
                setAppointments(response.data);
                console.log("appointments", appointments);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách lịch hẹn:', error);
            }
        };
        fetchAppointments();
    }, []); // Chạy một lần khi component mount

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const token = localStorage.getItem("token");
                console.log("token", token)
                console.log("gender", gender)
                const response = await axios.put(`${API_BASE_URL}/users/edit`, {
                        email: email,
                        phoneNumber: phoneNumber,
                        username: username,
                        address: address,
                        gender: gender // hoặc user.gender
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}` // ✅ Thêm header Authorization
                        }
                    }
                );
                // Cập nhật lại sessionStorage và Redux nếu cần
                const updatedUser = {
                    email,
                    phoneNumber,
                    username,
                    address,
                    gender: gender
                };
                sessionStorage.setItem("user", JSON.stringify(updatedUser));
                dispatch(setUser(updatedUser));
                setInitial(updatedUser);
                setIsChanged(false);
                toast.success("Cập nhật thành công!", {position: "top-center"});
            } catch (error) {
                setError(error.response ? error.response.data : error.message);
                toast.error("Cập nhật thất bại!", {position: "top-center"});
                console.error("Lỗi khi cập nhật:", error.response ? error.response.data : error.message);
            }
        }
    };
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const validatePassword = () => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
        if (password.length < minLength) {
            toast.error("Password must be at least 8 characters long!", {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true
            });
            return false;
        }
        if (!hasUpperCase) {
            toast.error("Password must include at least one uppercase letter", {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true
            });
            return false;
        }
        if (!hasLowerCase) {
            toast.error("Password must include at least one lowercase letter", {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true
            });
            return false;
        }
        if (!hasDigit) {
            toast.error("Password must include at least one number", {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true
            });
            return false;
        }
        if (!hasSpecialChar) {
            toast.error("Password must include at least one special character", {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true
            });
            return false;
        }
        if (!password || !newPassword || !confirmPassword) {
            toast.error("Please fill in the blank!", {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true
            });
            return false;
        }
        if (password === newPassword) {
            toast.error("New password cannot be duplicated", {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true
            });
            return false;
        }
        if (confirmPassword !== newPassword) {
            toast.error("Password do not match!", {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true
            });
            return false;
        }
        return true;
    };
    const handleChange = async (e) => {
        e.preventDefault();
        if (validatePassword()) {
            try {
                const token = localStorage.getItem("token");
                console.log("token", token)
                const response = await axios.put(`${API_BASE_URL}/users/edit`, {}, {
                        headers: {
                            Authorization: `Bearer ${token}` // ✅ Thêm header Authorization
                        }
                    }
                );
                toast.success("Cập nhật thành công!", {position: "top-center"});
            } catch (error) {
                setError(error.response ? error.response.data : error.message);
                toast.error("Cập nhật thất bại!", {position: "top-center"});
                console.error("Lỗi khi cập nhật:", error.response ? error.response.data : error.message);
            }
        }
    };
    return (
        <>
            <Topbar/>
            <Navbar/>
            <section className="register-section">
                <div className="profile-container flex-center">
                    <div className="nav-buttons" style={{textAlign: "center", marginBottom: '20px'}}>
                        <button onClick={() => setView('profile')}
                                className={view === 'profile' ? 'active navigate-profile' + " form-input" : '' + " form-input"}
                                style={{width: '30%',border: 'none', background: "white", margin: 0}}>Hồ sơ
                        </button>
                        <button onClick={() => setView('changePassword')}
                                className={view === 'changePassword' ? 'active navigate-profile' + " form-input" : '' + " form-input"}
                                style={{width: '30%',border: 'none', background: "white", margin: 0}}>Đổi mật khẩu
                        </button>

                    </div>
                    {view === 'profile' && (
                        <div className="main-components">
                            <h2 className="form-heading">Hồ sơ</h2>
                            <div className="img-container">
                                <img
                                    src={'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'}
                                    alt="profile"
                                    className="profile-image"
                                />
                            </div>
                            <div style={{width: '100%', textAlign: "center", minHeight: "25px"}}>
                                <span className="text-error"
                                      style={{height: "20px", color: "red", fontSize: "13px"}}>{error}</span>
                            </div>
                            <form
                                onSubmit={handleUpdate}
                                className="register-form"
                            >
                                <div className="form-same-row">
                                    <label className={"left-label"}>Họ và tên: </label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        className="form-input right-input"
                                        placeholder="Nhập tên của bạn"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="form-same-row">
                                    <label className={"left-label"}>Email: </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-input right-input"
                                        placeholder="Nhập email của bạn"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-same-row">
                                    <label className={"left-label"}>Số điện thoại: </label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        className="form-input right-input"
                                        placeholder="Nhập số điện thoại của bạn"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                <div className="form-same-row">
                                    <label className={"left-label"}>Địa chỉ: </label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        className="form-input right-input"
                                        placeholder="Nhập địa chỉ của bạn"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="form-same-row">
                                    <label className={"left-label"}>Giới tính: </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="MALE"
                                            checked={gender === 'MALE'}
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                        Nam
                                    </label><br/>

                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="FEMALE"
                                            checked={gender === 'FEMALE'}
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                        Nũ
                                    </label><br/>

                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="OTHER"
                                            checked={gender === 'OTHER'}
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                        Khác
                                    </label>
                                </div>
                                {/*<div className="form-same-row">*/}
                                {/*    <label className={"left-label"}>Date of Birth: </label>*/}
                                {/*    <input*/}
                                {/*        type="date"*/}
                                {/*        name="mobile"*/}
                                {/*        className="form-input right-input"*/}
                                {/*        placeholder="Enter your address"*/}
                                {/*        value={user?.dateOfBirth}*/}
                                {/*        onChange={(e) => setDate(e.target.value)}*/}
                                {/*    />*/}
                                {/*</div>*/}
                                <div className="btn-update-profile">
                                    <button
                                        disabled={!isChanged}
                                        type="submit"
                                        className="btn form-btn update-button"
                                    >
                                        update
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                    {view === 'changePassword' && (
                        <div className="change-password-form main-components" style={{height: '400px'}}>
                            <h2 className="form-heading" style={{marginBottom: "40px"}}>Đổi mật khẩu </h2>
                            <form className="register-form" onSubmit={handleChange}>
                                <div className="form-same-row" style={{marginBottom: "10px"}}>
                                    <label className={"left-label"}>Mật khẩu hiện tại: </label>
                                    <input
                                        type="password"
                                        name="mobile"
                                        className="form-input right-input"
                                        placeholder="Nhập mật khẩu hiện tại"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-same-row" style={{marginBottom: "10px"}}>
                                    <label className={"left-label"}>Mật khẩu mới: </label>
                                    <input
                                        type="password"
                                        name="mobile"
                                        className="form-input right-input"
                                        placeholder="Nhập mật khẩu mới"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-same-row" style={{marginBottom: "10px"}}>
                                    <label className={"left-label"}>Xác nhận mật khẩu: </label>
                                    <input
                                        type="password"
                                        name="mobile"
                                        className="form-input right-input"
                                        placeholder="Nhập lại mật khẩu mới"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <div className="btn-update-profile" style={{marginTop: '50px'}}>
                                    <button
                                        type="submit"
                                        className="btn form-btn update-button"
                                    >
                                        Change password
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                    <ToastContainer position="top-right" autoClose={2000}/>
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default Profile;
