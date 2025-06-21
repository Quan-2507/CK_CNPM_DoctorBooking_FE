import React from 'react';

const About = () => (
    <div className="container-xxl py-5">
        <div className="container">
            <div className="row g-5">
                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                    <div className="d-flex flex-column">
                        <img className="img-fluid rounded w-75 align-self-end" src="/assets/img/about-1.jpg" alt="about" />
                        <img className="img-fluid rounded w-50 bg-white pt-3 pe-3" src="/assets/img/about-2.jpg" alt="about" style={{ marginTop: '-25%' }} />
                    </div>
                </div>
                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                    <p className="d-inline-block border rounded-pill py-1 px-4">Về Chúng Tôi</p>
                    <h1 className="mb-4">Tại sao bạn nên tin tưởng chúng tôi? Hãy tìm hiểu về chúng tôi!</h1>
                    <p>Chúng tôi cam kết cung cấp dịch vụ y tế chất lượng cao, tận tâm với từng bệnh nhân, với đội ngũ bác sĩ giàu kinh nghiệm và cơ sở vật chất hiện đại.</p>
                    <p className="mb-4">Sứ mệnh của chúng tôi là mang lại sức khỏe và sự an tâm cho cộng đồng thông qua các dịch vụ chăm sóc sức khỏe chuyên nghiệp và tận tình.</p>
                    <ul className="list-unstyled">
                        <li><i className="far fa-check-circle text-primary me-3"></i>Dịch vụ y tế chất lượng</li>
                        <li><i className="far fa-check-circle text-primary me-3"></i>Đội ngũ bác sĩ đạt chuẩn</li>
                        <li><i className="far fa-check-circle text-primary me-3"></i>Chuyên gia nghiên cứu y khoa</li>
                    </ul>
                    <a className="btn btn-primary rounded-pill py-3 px-5 mt-3" href="#">Xem Thêm</a>
                </div>
            </div>
        </div>
    </div>
);

export default About;
