import React from 'react';

const Footer = () => (
    <div className="container-fluid bg-dark text-light footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
            <div className="row g-5">
                <div className="col-lg-3 col-md-6">
                    <h5 className="text-light mb-4">Địa chỉ</h5>
                    <p><i className="fa fa-map-marker-alt me-3"></i>Trường Đại học Nông Lâm TP. Hồ Chí Minh, khu phố 6, Thủ Đức, Hồ Chí Minh</p>
                    <p><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                    <p><i className="fa fa-envelope me-3"></i>info@example.com</p>
                    <div className="d-flex pt-2">
                        {['twitter', 'facebook-f', 'youtube', 'linkedin-in'].map((net, idx) => (
                            <a key={idx} className="btn btn-outline-light btn-social rounded-circle me-2" href="#"><i className={`fab fa-${net}`}></i></a>
                        ))}
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h5 className="text-light mb-4">Dịch vụ</h5>
                    {['Tim mạch', 'Hô hấp', 'Thần kinh', 'Chỉnh hình', 'Xét nghiệm'].map((s, i) => (
                        <a key={i} className="btn btn-link" href="#">{s}</a>
                    ))}
                </div>
                <div className="col-lg-3 col-md-6">
                    <h5 className="text-light mb-4">Liên kết nhanh</h5>
                    {['Về chúng tôi', 'Liên hệ', 'Dịch vụ của chúng tôi', 'Điều khoản & Điều kiện', 'Hỗ trợ'].map((l, i) => (
                        <a key={i} className="btn btn-link" href="#">{l}</a>
                    ))}
                </div>
                <div className="col-lg-3 col-md-6">
                    <h5 className="text-light mb-4">Bản tin</h5>
                    <p>Hãy đăng ký nhận bản tin để cập nhật những thông tin mới nhất.</p>
                    {/*<div className="position-relative mx-auto" style={{ maxWidth: 400 }}>*/}
                    {/*    <input className="form-control border-0 w-100 py-3 ps-4 pe-5" type="text" placeholder="Email của bạn" />*/}
                    {/*    <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">Đăng ký</button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
        <div className="container">
            <div className="copyright text-center pt-4">
                &copy; <a className="border-bottom" href="#">Tên trang web của bạn</a>, Bảo lưu mọi quyền. Thiết kế bởi <a className="border-bottom" href="https://htmlcodex.com">HTML Codex</a>
            </div>
        </div>
    </div>
);

export default Footer;
