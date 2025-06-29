import React from 'react';
import Slider from 'react-slick';

const Header = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        arrows: false,
    };

    const carouselItems = [
        { img: '/assets/img/carousel-1.jpg', title: 'Tim mạch' },
        { img: '/assets/img/carousel-2.jpg', title: 'Thần kinh' },
        { img: '/assets/img/carousel-3.jpg', title: 'Hô hấp' }
    ];

    return (
        <div className="container-fluid header bg-primary p-0 mb-5">
            <div className="row g-0 align-items-center flex-column-reverse flex-lg-row">
                <div className="col-lg-6 p-5">
                    <h1 className="display-4 text-white mb-5">Sức khỏe tốt là gốc rễ của mọi hạnh phúc</h1>
                    <div className="row g-4">
                        {[
                            { count: 123, label: 'Bác sĩ chuyên gia' },
                            { count: 1234, label: 'Nhân viên y tế' },
                            { count: 12345, label: 'Tổng số bệnh nhân' }
                        ].map((item, idx) => (
                            <div key={idx} className="col-sm-4">
                                <div className="border-start border-light ps-4">
                                    <h2 className="text-white mb-1">{item.count}</h2>
                                    <p className="text-light mb-0">{item.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-lg-6">
                    <Slider {...settings} className="header-carousel">
                        {carouselItems.map((item, i) => (
                            <div key={i} className="position-relative">
                                <img className="img-fluid" src={item.img} alt={item.title} />
                                <div className="position-absolute top-50 start-50 translate-middle text-center">
                                    <h1 className="display-1 text-white mb-0">{item.title}</h1>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Header;
