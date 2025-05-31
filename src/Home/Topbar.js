import React from 'react';
import  { useEffect, useState } from 'react';
import './style.topbar.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
const Topbar = () => {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        // Lấy dữ liệu từ sessionStorage với key là 'user'
        const storedData = sessionStorage.getItem('user');

        // Kiểm tra nếu dữ liệu tồn tại
        if (storedData) {
            // Parse dữ liệu nếu nó là JSON
            setUserData(JSON.parse(storedData));
        } else {
            console.log('Không tìm thấy dữ liệu trong sessionStorage');
        }
    }, []);
    console.log("user", userData)
    // const userData = {fullname:"dang thanh sang"};
    const handleLogout = () => {
        // Xóa dữ liệu user trong sessionStorage (giả lập đăng xuất)
        sessionStorage.removeItem('user');

        alert('Đăng xuất thành công!');
        // Có thể điều hướng đến trang đăng nhập: window.location.href = '/login'
    };
    return (
        <>
            <div className="container-fluid bg-light p-0 wow fadeIn" data-wow-delay="0.1s">
                <div className="row gx-0 d-none d-lg-flex">
                    <div className="col-lg-7 px-5 text-start">
                        <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                            <small className="fa fa-map-marker-alt text-primary me-2"></small>
                            <small>123 Street, New York, USA</small>
                        </div>
                        <div className="h-100 d-inline-flex align-items-center py-3">
                            <small className="far fa-clock text-primary me-2"></small>
                            <small>Mon - Fri : 09.00 AM - 09.00 PM</small>
                        </div>
                    </div>
                    <div className="col-lg-5 px-5 text-end">
                        {userData?.username ? (
                            <div className="h-100 d-inline-flex align-items-center py-3 me-4"
                            >
                                <div className="nav-item dropdown">
                                    <a href="/profile" className="nav-link dropdown-toggle"
                                       style={{position: 'relative', zIndex: 1000}}><FontAwesomeIcon icon={faUser}/> {userData?.username}</a>
                                    <div className="dropdown-menu rounded-0 rounded-bottom m-0" style={{zIndex: 3000}}>
                                        <div className="dropdown-item" style={{color: "red", fontStyle: "italic"}}
                                             onClick={handleLogout}>Đăng xuất
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                                <a href="/signin" style={{
                                    color: "qua",
                                    fontStyle: "normal",
                                    //textDecoration: "underline",
                                    fontSize: "large"

                                }}>Đăng Nhập</a>
                            </div>
                        )}
                        {/*<div className="h-100 d-inline-flex align-items-center py-3 me-4">*/}
                        {/*    <small className="fa fa-phone-alt text-primary me-2"></small>*/}
                        {/*    <small>+012 345 6789</small>*/}
                        {/*</div>*/}
                        {/*<div className="h-100 d-inline-flex align-items-center">*/}
                        {/*    <a className="btn btn-sm-square rounded-circle bg-white text-primary me-1" href="#"><i className="fab fa-facebook-f"></i></a>*/}
                        {/*    <a className="btn btn-sm-square rounded-circle bg-white text-primary me-1" href="#"><i className="fab fa-twitter"></i></a>*/}
                        {/*    <a className="btn btn-sm-square rounded-circle bg-white text-primary me-1" href="#"><i className="fab fa-linkedin-in"></i></a>*/}
                        {/*    <a className="btn btn-sm-square rounded-circle bg-white text-primary me-0" href="#"><i className="fab fa-instagram"></i></a>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </>
    )
};

export default Topbar;

