import React from 'react';

const features = [
    { icon: 'fa-user-md', title: 'Bác sĩ', label: 'Kinh nghiệm' },
    { icon: 'fa-check', title: 'Dịch vụ', label: 'Chất lượng' },
    { icon: 'fa-comment-medical', title: 'Tư vấn', label: 'Tích cực' },
    { icon: 'fa-headphones', title: 'Hỗ trợ', label: '24/7' }
];

const Features = () => (
    <div className="container-fluid bg-primary overflow-hidden my-5 px-lg-0">
        <div className="container feature px-lg-0">
            <div className="row g-0 mx-lg-0">
                <div className="col-lg-6 feature-text py-5 wow fadeIn" data-wow-delay="0.1s">
                    <div className="p-lg-5 ps-lg-0">
                        <p className="d-inline-block border rounded-pill text-light py-1 px-4">Đặc Điểm Nổi Bật</p>
                        <h1 className="text-white mb-4">Tại Sao Chọn Chúng Tôi</h1>
                        <p className="text-white mb-4 pb-2">Chúng tôi cung cấp dịch vụ y tế chất lượng với đội ngũ bác sĩ giàu kinh nghiệm, luôn sẵn sàng hỗ trợ và tư vấn tận tâm cho bệnh nhân.</p>
                        <div className="row g-4">
                            {features.map((f, i) => (
                                <div key={i} className="col-6">
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{ width: 55, height: 55 }}>
                                            <i className={`fa ${f.icon} text-primary`}></i>
                                        </div>
                                        <div className="ms-4">
                                            <p className="text-white mb-2">{f.label}</p>
                                            <h5 className="text-white mb-0">{f.title}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 pe-lg-0 wow fadeIn" data-wow-delay="0.5s" style={{ minHeight: '400px' }}>
                    <div className="position-relative h-100">
                        <img className="position-absolute img-fluid w-100 h-100" src="/assets/img/feature.jpg" style={{ objectFit: 'cover' }} alt="Tính năng" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Features;
