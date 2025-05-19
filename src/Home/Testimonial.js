// components/Testimonial.jsx
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const testimonials = [1, 2, 3];

const Testimonial = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            { breakpoint: 768, settings: { slidesToShow: 1 } },
            { breakpoint: 992, settings: { slidesToShow: 2 } }
        ]
    };

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="text-center mx-auto mb-5" style={{ maxWidth: 600 }}>
                    <p className="d-inline-block border rounded-pill py-1 px-4">Testimonial</p>
                    <h1>What Say Our Patients!</h1>
                </div>
                <Slider {...settings}>
                    {testimonials.map((i) => (
                        <div key={i} className="p-3">
                            <div className="testimonial-item text-center">
                                <img className="img-fluid bg-light rounded-circle p-2 mx-auto mb-4" src={`/assets/img/testimonial-${i}.jpg`} alt="" style={{ width: 100, height: 100 }} />
                                <div className="testimonial-text rounded text-center p-4 bg-light">
                                    <p>Clita clita tempor justo dolor ipsum amet kasd...</p>
                                    <h5 className="mb-1">Patient Name</h5>
                                    <span className="fst-italic">Profession</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Testimonial;
