import React, { useEffect, useState } from "react";
import "./profile.css";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../Redux/Store/Store';

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
    console.log("username",user?.email);



    // const inputChange = (e) => {
    //     const { name, value } = e.target;
    //     return setFormDetails({
    //         ...formDetails,
    //         [name]: value,
    //     });
    // };

    // const formSubmit = async (e) => {
    //     try {
    //         e.preventDefault();
    //         const {
    //             firstname,
    //             lastname,
    //             email,
    //             age,
    //             mobile,
    //             address,
    //             gender,
    //             password,
    //             confpassword,
    //         } = formDetails;
    //
    //         if (!email) {
    //             return toast.error("Email should not be empty");
    //         } else if (firstname.length < 3) {
    //             return toast.error("First name must be at least 3 characters long");
    //         } else if (lastname.length < 3) {
    //             return toast.error("Last name must be at least 3 characters long");
    //         } else if (password.length < 5) {
    //             return toast.error("Password must be at least 5 characters long");
    //         } else if (password !== confpassword) {
    //             return toast.error("Passwords do not match");
    //         }
    //         await toast.promise(
    //             axios.put(
    //                 "/user/updateprofile",
    //                 {
    //                     firstname,
    //                     lastname,
    //                     age,
    //                     mobile,
    //                     address,
    //                     gender,
    //                     email,
    //                     password,
    //                 },
    //                 {
    //                     headers: {
    //                         authorization: `Bearer ${localStorage.getItem("token")}`,
    //                     },
    //                 }
    //             ),
    //             {
    //                 pending: "Updating profile...",
    //                 success: "Profile updated successfully",
    //                 error: "Unable to update profile",
    //                 loading: "Updating profile...",
    //             }
    //         );
    //
    //         setFormDetails({ ...formDetails, password: "", confpassword: "" });
    //     } catch (error) {
    //         return toast.error("Unable to update profile");
    //     }
    // };

    return (
        <>
            <Topbar />
            <Navbar/>
                <section className="register-section">
                    <div className="profile-container flex-center">
                        <h2 className="form-heading">Profile</h2>
                        <img
                            src={file}
                            alt="profile"
                            className="profile-pic"
                        />
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
                                    // onChange={inputChange}
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
                                    placeholder="Enter your mobile number"
                                    value={user?.dateOfBirth}
                                    // onChange={inputChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn form-btn update-button"
                            >
                                update
                            </button>
                        </form>
                    </div>
                </section>
            <Footer/>
        </>
    );
}

export default Profile;
