import axios from "axios";
import { GET_APPOINTMENTS } from "../constants";

export const getListAppointmentAction = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get("http://localhost:8080/api/admin/appointments", {
                headers: { Authorization: `Bearer ${token}` },
            });

            dispatch({
                type: GET_APPOINTMENTS,
                payload: res.data,
            });
        } catch (err) {
            console.error("Lỗi lấy danh sách lịch hẹn:", err);
        }
    };
};
