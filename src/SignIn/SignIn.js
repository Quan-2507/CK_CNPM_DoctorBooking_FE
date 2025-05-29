import React from "react";
import './style.css';
import axios from "axios";
import API_BASE_URL from '../config/api'; // Điều chỉnh đường dẫn tùy theo vị trí file
import {jwtDecode} from 'jwt-decode';
import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import {setUser} from "../Redux/Slice/UserSlice";

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
                const id = decodedToken.id;
                const role = decodedToken.role;
                await localStorage.setItem("token", response.data.token);
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
                console.error("Lỗi đăng nhập:", error.response ? error.response.data : error.message);
            }
        }
    }
    return (
        <>
            <div className="container-sign-in">
                <div className="form-container">
                    <h2>Đăng nhập</h2>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <h4><span style={{color: "red", display: "none"}}>Email đã tồn tại</span></h4>
                        <input
                            className={"input-signin-process"}
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                            required
                        />
                        <input
                            className={"input-signin-process "}
                            type="password"
                            name="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                        >
                            Đăng nhập
                        </button>
                        <div style={{textAlign: "right", marginTop: "5px"}}><a
                            style={{marginTop: "3px", textDecoration: "none"}} href="#">Quên
                            mật khẩu</a></div>
                        <div style={{display: "flex", justifyContent: "center"}}><span
                            style={{padding: "5px", fontWeight: "500", fontSize: "medium"}}>Chưa có tài khoản</span><a
                            style={{marginTop: "5px"}} href="#">Đăng ký</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignIn;