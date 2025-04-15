import React from 'react';
import DoctorDetail from "../Detail/DoctorDetail";
import img from "../img/about-2.jpg"
const Detail = () => {
    const containerStyle = {
        display: 'flex',
        maxWidth: '80%',
        margin: '0 auto',
        gap: '20px', // Khoảng cách giữa hai cột
    };

    const leftColumnStyle = {
        flex: '2', // Cột trái chiếm 1 phần
        minWidth: '0', // Để tránh overflow
    };

    const rightColumnStyle = {
        flex: '1', // Cột phải chiếm 2 phần
        minWidth: '0', // Để tránh overflow
    };
    const doctor = {
        id: 1,
        name: "Nguyễn Thị Thu Hà",
        specialty: "Bác sĩ chuyên khoa 2",
        experience: 36,
        imageUrl: img,
        description: "Đặt khám với BSCKII. Nguyễn Thị Thu Hà\n" +
            "\n" +
            "Khi có nhu cầu đến thăm khám, quý bệnh nhân vui lòng tải ứng dụng YouMed để đặt lịch trước, qua đó hạn chế thời gian chờ đợi và giúp phòng khám phục vụ tốt hơn. Tải ứng dụng YouMed tại đây để đặt khám và nhận nhiều tiện ích sau:\n" +
            "\n" +
            "Đăng ký ngày, giờ khám và lấy số thứ tự sớm.\n" +
            "Nhận và lưu trữ hồ sơ y tế.\n" +
            "Nhắc lịch khám và lịch tái khám.\n" +
            "Nhắn tin và gọi video với bác sĩ.\n" +
            "Đọc tin y tế chính thống.\n" +
            "Người bác sĩ đến với bệnh nhân không chỉ bằng chuyên môn, mà còn bằng cả tấm lòng.\n" +
            "\n" +
            "Với gần 33 năm là bác sĩ tại các bệnh viện nhi lớn của TP.HCM, BSCKII. Nguyễn Thị Thu Hà có nhiều kinh nghiệm trong chẩn đoán và điều trị bệnh lý nhi khoa, đặc biệt có trên 20 năm làm việc trong lĩnh vực Tiêu hóa nhi."
    };
    return (
        <div style={containerStyle}>
            <div style={leftColumnStyle}>
                <DoctorDetail doctor={doctor}/>
            </div>
            <div style={rightColumnStyle}>
                <DoctorDetail doctor={doctor}/>
            </div>
        </div>
    );
};

export default Detail;