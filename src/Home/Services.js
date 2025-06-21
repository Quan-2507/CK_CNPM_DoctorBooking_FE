import React from 'react';

const services = [
    { icon: 'fa-heartbeat', title: 'Tim mạch' },
    { icon: 'fa-x-ray', title: 'Hô hấp' },
    { icon: 'fa-brain', title: 'Thần kinh' },
    { icon: 'fa-wheelchair', title: 'Chỉnh hình' },
    { icon: 'fa-tooth', title: 'Phẫu thuật Nha khoa' },
    { icon: 'fa-vials', title: 'Xét nghiệm' }
];

const Services = () => (
    <div className="container-xxl py-5">
        <div className="container">
            <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
                <p className="d-inline-block border rounded-pill py-1 px-4">Dịch Vụ</p>
                <h1>Giải Pháp Chăm Sóc Sức Khỏe</h1>
            </div>
            <div className="row g-4">
                {services.map((service, idx) => (
                    <div key={idx} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`${0.1 + idx * 0.2}s`}>
                        <div className="service-item bg-light rounded h-100 p-5">
                            <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: '65px', height: '65px' }}>
                                <i className={`fa ${service.icon} text-primary fs-4`}></i>
                            </div>
                            <h4 className="mb-3">{service.title}</h4>
                            <p className="mb-4">Chúng tôi cung cấp dịch vụ y tế hiện đại, đáp ứng nhu cầu chăm sóc sức khỏe toàn diện cho bạn và gia đình.</p>
                            <a className="btn" href="#"><i className="fa fa-plus text-primary me-3"></i>Xem Thêm</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default Services;
