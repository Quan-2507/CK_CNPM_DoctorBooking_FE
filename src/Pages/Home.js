import React from 'react';
import './HomeStyle.css'; // Import CSS
import img from "../img/feature.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faCheck, faCommentMedical, faHeadphones } from '@fortawesome/free-solid-svg-icons';
import Content from "./Content";

const Home = () => {
    return (
        <div>
        <div className="feature-container">
            <div className="feature-content">
                <div className="feature-text">
                    <p className="feature-title">Đặt lịch</p>
                    <h1>Tại sao chọn chúng tôi</h1>
                    <p>
                        Chúng tôi cam kết cung cấp dịch vụ chăm sóc sức khỏe tốt nhất cho cộng đồng.
                        Đội ngũ bác sĩ và nhân viên của chúng tôi luôn sẵn sàng lắng nghe
                        và đáp ứng nhu cầu của bệnh nhân với sự tận tâm và chuyên nghiệp.
                        Chúng tôi tin rằng mỗi bệnh nhân đều xứng đáng nhận được sự chăm sóc tận tình và hiệu quả,
                        giúp họ nhanh chóng hồi phục và nâng cao chất lượng cuộc sống.
                    </p>
                    <div className="feature-items">
                        <FeatureItem icon={faUserMd} title="Bác Sĩ" subtitle="Kinh Nghiệm" />
                        <FeatureItem icon={faCheck} title="Dịch Vụ" subtitle="Chất Lượng" />
                        <FeatureItem icon={faCommentMedical} title="Tư Vấn" subtitle="Tích Cực" />
                        <FeatureItem icon={faHeadphones} title="Hỗ Trợ" subtitle="24 Giờ" />
                    </div>
                </div>
            </div>
            <div className="feature-image">
                <img src={img} alt="Feature" />
            </div>
        </div>
            <Content/>
        </div>
    );
};

const FeatureItem = ({ icon, title, subtitle }) => (
    <div className="feature-item">
        <div className="icon-container">
            <FontAwesomeIcon icon={icon} />
        </div>
        <div className="feature-item-text">
            <div>{subtitle}</div>
            <div>{title}</div>
        </div>
    </div>
);

export default Home;