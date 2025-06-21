import {
    faBuilding, faCalendarCheck, faCalendarDay, faDisease,
    faGripHorizontal,
    faHome,
    faSignOutAlt,
    faUser,
    faUserDoctor,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import Spinner from 'react-bootstrap/Spinner';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../../Redux/Slice/UserSlice'; // Điều chỉnh đường dẫn theo cấu trúc dự án
import { jwtDecode } from 'jwt-decode';

const Sidebar = () => {
    // Lấy user từ Redux store
    const user = useSelector((state) => state.user.user);
    const reduxDispatch = useDispatch();

    // Lấy user từ sessionStorage nếu Redux không có
    const storedUser = JSON.parse(sessionStorage.getItem('user')) || null;

    // Lấy token từ localStorage và giải mã để lấy role nếu cần
    const token = localStorage.getItem('token');
    let roleFromToken = null;
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            roleFromToken = decodedToken.role;
        } catch (error) {
            console.error('Lỗi giải mã token:', error);
        }
    }

    // Ưu tiên user từ Redux, nếu không có thì dùng storedUser
    const effectiveUser = user || storedUser;

    // Xác định role: ưu tiên role từ effectiveUser, nếu không có thì dùng roleFromToken
    const role = effectiveUser?.role || roleFromToken || 'Guest';

    // Xác định isAdmin dựa trên role
    const isAdmin = role === 'ROLE_ADMIN';

    const handleSignOut = () => {
        // Xóa dữ liệu khỏi sessionStorage và localStorage
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('userId');
        localStorage.removeItem('token');

        // Xóa user khỏi Redux store
        reduxDispatch(clearUser());

        // Thông báo đăng xuất
        swal({
            icon: 'success',
            text: 'Đăng xuất thành công',
            timer: 2000,
        });
    };

    return (
        <div className="sidebar d-flex flex-column justify-content-between col-md-2 py-5">
            <ul className="list-unstyled">
                {/*<li>*/}
                {/*    <Link className="text-nowrap text-white text-decoration-none">*/}
                {/*        <FontAwesomeIcon icon={faUser} />*/}
                {/*        <span className="text-capitalize">{role === 'ROLE_DOCTOR' ? 'Bác sĩ' : role === 'ROLE_ADMIN' ? 'Quản trị' : ''}</span>*/}

                {/*    </Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <Link to="/" className="text-nowrap text-white text-decoration-none">*/}
                {/*        <FontAwesomeIcon icon={faHome} />*/}
                {/*        <span>Trang chủ</span>*/}
                {/*    </Link>*/}
                {/*</li>*/}
                {isAdmin && (
                    <>
                        <li>
                            <Link to="/patientManagement" className="text-nowrap text-white text-decoration-none">
                                <FontAwesomeIcon icon={faUser}/>
                                <span>Quản lý bệnh nhân</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/doctorManagement" className="text-nowrap text-white text-decoration-none">
                                <FontAwesomeIcon icon={faUserDoctor}/>
                                <span>Quản lý bác sĩ</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/departmentManagement" className="text-nowrap text-white text-decoration-none">
                                <FontAwesomeIcon icon={faBuilding}/>
                                <span>Quản lý khoa</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/symptomManagement" className="text-nowrap text-white text-decoration-none">
                                <FontAwesomeIcon icon={faDisease}/>
                                <span>Quản lý triệu chứng</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/scheduleManagement" className="text-nowrap text-white text-decoration-none">
                                <FontAwesomeIcon icon={faCalendarDay}/>
                                <span>Thêm lịch khám</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/appointmentManagement" className="text-nowrap text-white text-decoration-none">
                                <FontAwesomeIcon icon={faCalendarCheck}/>
                                <span>Quản lý lịch đặt khám</span>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
            {/*<div className="desh-logout">*/}
            {/*    <Link to="/" className="text-nowrap text-white text-decoration-none" onClick={handleSignOut}>*/}
            {/*        <FontAwesomeIcon icon={faSignOutAlt} className="me-2"/>*/}
            {/*        <span>Đăng xuất</span>*/}
            {/*    </Link>*/}
            {/*</div>*/}
        </div>
    );
};

export default Sidebar;