import React, {useState} from "react";
import './style.css';
import axios from "axios";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import API_BASE_URL from '../config/api';
import {useNavigate} from "react-router-dom"; // Điều chỉnh đường dẫn tùy theo vị trí file

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rePassword, setRePassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [phoneNumber, setPhone] = React.useState('');
    const [error, setError] = useState('');
    const validate = () => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
        const rightNumber = /^[0-9]{10}$/.test(phoneNumber);
        if(!rightNumber){
            setError( "Phone must be at least 10 numbers.");
            return false;
        }
        if (password.length < minLength) {
            setError( "Password must be at least 8 characters long.");
            return false;
        }
        if (!hasUpperCase) {
            setError( "Password must include at least one uppercase letter.")
            return false;
        }
        if (!hasLowerCase) {
            setError( "Password must include at least one lowercase letter.")
            return false;
        }
        if (!hasDigit) {
            setError( "Password must include at least one number.")
            return false;
        }
        if (!hasSpecialChar) {
            setError( "Password must include at least one special character.")
            return false;
        }
        if (password !== rePassword) {
            setError("Password do not match. Please try again")
            return false;
        } else {
            return true;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
                    phoneNumber: phoneNumber,
                    email: email,
                    username: name,
                    password: password
                });
                navigate("/signin")
            } catch (error) {
                setError(error.response ? error.response.data : error.message);
                console.error("Lỗi đăng ký:", error.response ? error.response.data : error.message);
            }
        }
    }
    return (
        <>
            <Navbar/>
            <div className="container-sign-up">
                <div className="form-container-sign-up">
                    <h2>Đăng Ký</h2>
                    <div style={{width: '100%', textAlign: "center", minHeight: "25px"}}>
                            <span className="text-error"
                                  style={{height: "20px", color: "red", fontSize: "13px"}}>{error}</span>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <h4>Họ và Tên</h4>
                        <input
                            className={"input-sign-up"}
                            type="text"
                            name="fullName"
                            placeholder="Vd: Nguyễn Văn A"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <h4>Email</h4>
                        <input
                            className={"input-sign-up"}
                            type="email"
                            name="email"
                            placeholder="Vd: thanhsang@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                            required
                        />
                        <h4>Số điện thoại</h4>
                        <input
                            className={"input-sign-up"}
                            type="text"
                            name="phone"
                            placeholder="Vd: 0123456789"
                            value={phoneNumber}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        <h4>Mật khẩu</h4>
                        <input
                            className={"input-sign-up"}
                            type="password"
                            name="password"
                            placeholder="Vd: 123456zZ#"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span>Có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt, độ dài </span>
                        <span>mật khẩu trên 8 kí tự</span>
                        <h4>Xác nhận mật khẩu</h4>
                        <input
                            className={"input-sign-up"}
                            type="password"
                            name="confirmPassword"
                            placeholder="Nhập lại mật khẩu"
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                            required
                        />
                        <button className={"button-sign-up"}
                                type="submit"
                        >
                            Đăng Ký
                        </button>
                        <div style={{display: "flex", justifyContent: "center"}}><span
                            style={{padding: "5px", fontWeight: "500"}}>Trở lại đăng nhập</span><a
                            style={{marginTop: "3px"}} href="/signin">Đăng nhập</a>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default SignUp;