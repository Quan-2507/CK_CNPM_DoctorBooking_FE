import React, {useState} from "react";
import './style.css';
import axios from "axios";
import API_BASE_URL from '../config/api'; // Điều chỉnh đường dẫn tùy theo vị trí file
import {jwtDecode} from 'jwt-decode';
import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import {setUser} from "../Redux/Slice/UserSlice";
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";
import Topbar from "../Home/Topbar";

const SignIn = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const validateLogin = () => {
        if (!email || !password) {
            alert('Vui lòng điền đầy đủ thông tin của bạn');
            return false;
        } else {
            return true;
        }
    };
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateLogin()) {
            try {
                const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                    email,
                    password,
                });
                // Lưu JWT Token vào LocalStorage hoặc Context
                const token = response.data.token;
                const decodedToken = jwtDecode(token);
                console.log(decodedToken);
                const id = decodedToken.sub;
                const role = decodedToken.role;
                console.log('id',id);
                sessionStorage.setItem("userId", id.toString());
                console.log("Set userId to sessionStorage:", id.toString());
                localStorage.setItem("token", response.data.token);
                if (token) {
                    axios.get(`${API_BASE_URL}/users/${id}`, {
                        headers: {Authorization: `Bearer ${token}`}
                    }).then((response) => {
                        const user = response.data;
                        if (user) {
                            console.log("user", user)
                            sessionStorage.setItem("user", JSON.stringify(user));
                            dispatch(setUser(user));
                            if (role === "ROLE_ADMIN") {
                                navigation("/admin")
                            }else if(role === "ROLE_DOCTOR") {
                                navigation("/doctor")
                            }else{
                                navigation("/")
                            }
                        } else {
                            console.log("user null")
                        }
                    }).catch(err => {
                        console.log('Error:', err);
                    });
                }
                // alert("Đăng nhập thành công!");
            } catch (error) {
                setError(error.response ? error.response.data : error.message);
                console.error("Lỗi đăng nhập:", error.response ? error.response.data : error.message);
            }
        }
    }
    return (
        <>
            <Topbar />
            <Navbar/>
            <div className="container-sign-in">
                <div className="form-container-sign-in">
                    <h2>Đăng nhập</h2>
                    <div style={{width:'100%', textAlign:"center", minHeight:"25px"}}>
                    <span className="text-error" style={{height:"20px",color:"red",fontSize:"13px"}}>{error}</span>
                    </div>
                    <form
                        onSubmit={handleSubmit} style={{}}
                    >
                        <h4><span style={{color: "red", display: "none"}}>Email đã tồn tại</span></h4>
                        <input
                            className={"input-sign-in"}
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                            required
                        />
                        <input
                            className={"input-sign-in"}
                            type="password"
                            name="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit" className={"button-sign-in"}
                        >
                            Đăng nhập
                        </button>
                        <div style={{textAlign: "right", marginTop: "5px", width: "95%"}}><a
                            style={{marginTop: "3px", textDecoration: "none"}} href="#">Quên
                            mật khẩu</a></div>
                        <div style={{display: "flex", justifyContent: "center"}}><span
                            style={{padding: "5px", fontWeight: "500", fontSize: "medium"}}>Chưa có tài khoản</span><a
                            style={{marginTop: "5px"}} href="/signup">Đăng ký</a>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default SignIn;