import React, {useState} from "react";
import './style.css';
import axios from "axios";

const SignUp = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rePassword, setRePassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [phoneNumber, setPhone] = React.useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
            try {
                const response = await axios.post("${API_BASE_URL}/auth/signup", {
                   phoneNumber,
                    email,
                    name,
                    password
                });
                // Lưu JWT Token vào LocalStorage hoặc Context
                localStorage.setItem("token", response.data.token);

                alert("Đăng nhập thành công!");
                console.log(response.data.token);
                return response.data;
            } catch (error) {
                console.error("Lỗi đăng nhập:", error.response ? error.response.data : error.message);
            }
    }


    return (
        <>
                <div className="container">
                    <div className="form-container">
                        <h2>Đăng Ký</h2>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <h4>Họ và Tên</h4>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Vd: Nguyễn Văn A"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <h4>Email<span style={{color: "red", display: "none"}}>Email đã tồn tại</span></h4>
                            <input
                                type="email"
                                name="email"
                                placeholder="Vd: thanhsang@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}

                                required
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Vd: 0123456789"
                                value={phoneNumber}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                            <h4>Mật khẩu</h4>
                            <input
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
                                type="password"
                                name="confirmPassword"
                                placeholder="Nhập lại mật khẩu"
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                            >
                                Đăng Ký
                            </button>
                            <div style={{display: "flex", justifyContent: "center"}}><span
                                style={{padding: "5px", fontWeight: "500"}}>Trở lại đăng nhập</span><a
                                style={{marginTop: "3px"}} href="#">Đăng nhập</a>
                            </div>
                        </form>
                    </div>
                </div>

        </>
    );
};

export default SignUp;