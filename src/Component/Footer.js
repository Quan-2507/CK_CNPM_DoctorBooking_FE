import React from "react";
import './style.css'; // Import tệp CSS chung

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <h5>Address</h5>
                    <p>123 Street, New York, USA</p>
                    <p>+012 345 6789</p>
                    <p>info@example.com</p>
                    <div className="social-icons">
                        <a href="/"><i className="fab fa-facebook-f"></i></a>
                        <a href="/"><i className="fab fa-twitter"></i></a>
                        <a href="/"><i className="fab fa-linkedin-in"></i></a>
                        <a href="/"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div className="footer-section">
                    <h5>Services</h5>
                    <ul>
                        <li>Cardiology</li>
                        <li>Pulmonary</li>
                        <li>Neurology</li>
                        <li>Orthopedics</li>
                        <li>Laboratory</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h5>Quick Links</h5>
                    <ul>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Our Services</li>
                        <li>Terms & Condition</li>
                        <li>Support</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h5>Newsletter</h5>
                    <input type="email" placeholder="Your email" />
                    <button>Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default Footer;