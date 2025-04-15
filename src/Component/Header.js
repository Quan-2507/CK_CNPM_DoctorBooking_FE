import React from "react";
import './style.css'; // Import tệp CSS

const Header = () => {
    return (
        <div className="header-container">
            <div className="header-info">
                <div className="header-left">
                    <small className="fa fa-map-marker-alt"></small>
                    <small>123 Street, New York, USA</small>
                    <small className="far fa-clock"></small>
                    <small>Mon - Fri: 09.00 AM - 09.00 PM</small>
                </div>
                <div className="header-right">
                    <small className="fa fa-phone-alt"></small>
                    <small>+012 345 6789</small>
                </div>
            </div>
            <div className="header-title">
                <h1>Klinik</h1>
            </div>
            <nav className="header-nav">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/pages">Pages</a></li>
                    <li><a href="/service">Service</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
            <div className="header-appointment">
                <a href="/src/Pages/Appointment">Appointment</a>
            </div>
        </div>
    );
};

export default Header;