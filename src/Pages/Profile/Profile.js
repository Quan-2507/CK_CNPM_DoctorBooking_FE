import React, {useEffect, useState} from "react";
import "./profile.css";

import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from '../../Redux/Store/Store';

import jwt_decode from "jwt-decode";
import Topbar from "../../Home/Topbar";
import Navbar from "../../Component/Navbar";
import Footer from "../../Component/Footer";


function Profile() {
    const dispatch = useDispatch();
    const [file, setFile] = useState("");
    const [user, setUser] = React.useState('');
    // const user = useSelector((state: RootState) => state.user);
    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                dispatch(setUser(parsedUser));
            } catch (error) {
                console.error("Error parsing user from sessionStorage:", error);
            }
        }
    }, [dispatch]);
    console.log("username", user?.email);
    const [view, setView] = useState('profile');

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");


    return (
        <>
            <Topbar/>
            <Navbar/>
            <section className="register-section">
                <div className="profile-container flex-center">
                    <div className="nav-buttons" style={{textAlign: "center",marginBottom:'20px'}}>
                        <button onClick={() => setView('profile')}
                                className={view === 'profile' ? 'active navigate-profile' : '' + " form-input"}
                                style={{width: '30%', borderBottom: 'none'}}>Profile
                        </button>
                        <button onClick={() => setView('changePassword')}
                                className={view === 'changePassword' ? 'active navigate-profile' : '' + " form-input"}
                                style={{width: '30%', borderBottom: 'none'}}>Change Password
                        </button>
                    </div>
                    {view === 'profile' ? (
                        <div>
                            <h2 className="form-heading">Profile</h2>
                            <div className="img-container">
                                <img
                                    src={'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'}
                                    alt="profile"
                                    className="profile-image"
                                />
                            </div>
                            <form
                                // onSubmit={formSubmit}
                                className="register-form"
                            >
                                <div className="form-same-row">
                                    <label className={"left-label"}>Full name: </label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        className="form-input right-input"
                                        placeholder="Enter your first name"
                                        value={user?.username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="form-same-row">
                                    <label className={"left-label"}>Email: </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-input right-input"
                                        placeholder="Enter your email"
                                        value={user?.email}
                                        // onChange={inputChange}
                                    />
                                </div>
                                <div className="form-same-row">
                                    <label className={"left-label"}>Phone: </label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        className="form-input right-input"
                                        placeholder="Enter your mobile number"
                                        value={user?.phoneNumber}
                                        // onChange={inputChange}
                                    />
                                </div>
                                <div className="form-same-row">
                                    <label className={"left-label"}>Address: </label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        className="form-input right-input"
                                        placeholder="Enter your mobile number"
                                        value={user?.address}
                                        // onChange={inputChange}
                                    />
                                </div>
                                <div className="form-same-row">
                                    <label className={"left-label"}>Date of Birth: </label>
                                    <input
                                        type="date"
                                        name="mobile"
                                        className="form-input right-input"
                                        placeholder="Enter your address"
                                        value={user?.dateOfBirth}
                                        // onChange={inputChange}
                                    />
                                </div>
                                <div className="btn-update-profile">
                                    <button
                                        type="submit"
                                        className="btn form-btn update-button"
                                    >
                                        update
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="change-password-form" style={{height:'400px'}}>
                            <h2 className="form-heading" style={{marginBottom:"40px"}}>Change Password</h2>
                            <form className="register-form">
                                <div className="form-same-row" style={{marginBottom:"10px"}}>
                                    <label className={"left-label"}>Current Password: </label>
                                    <input
                                        type="password"
                                        name="mobile"
                                        className="form-input right-input"
                                        placeholder="Enter your current password"
                                        value={user?.dateOfBirth}
                                        // onChange={inputChange}
                                    />
                                </div>
                                <div className="form-same-row" style={{marginBottom:"10px"}}>
                                    <label className={"left-label"}>New Password: </label>
                                    <input
                                        type="password"
                                        name="mobile"
                                        className="form-input right-input"
                                        placeholder="Enter your new password"
                                        value={user?.dateOfBirth}
                                        // onChange={inputChange}
                                    />
                                </div>
                                <div className="form-same-row" style={{marginBottom:"10px"}}>
                                    <label className={"left-label"}>Re-enter password: </label>
                                    <input
                                        type="password"
                                        name="mobile"
                                        className="form-input right-input"
                                        placeholder="Re-enter your current password"
                                        value={user?.dateOfBirth}
                                        // onChange={inputChange}
                                    />
                                </div>
                            </form>
                            <div className="btn-update-profile" style={{marginTop:'50px'}}>
                                <button
                                    type="submit"
                                    className="btn form-btn update-button"
                                >
                                    Change password
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default Profile;
