import { history } from "../../../../App";
import {message, notification} from "antd";
import {GET_ACCOUNT_LIST, GET_DEPARTMENT, GET_SYMPTOM} from "../constants";
import {symptomService} from "../../services/SymptomService";
import axios from "axios";
import {getListAccountDoctorAction} from "./UserAction";

export const getListSymptom = () => {
    return async (dispatch) => {
        try {
            const result = await symptomService.getListSymptom();
            console.log("Kết quả từ API getListSymptom:", result);
            if (result.status === 200) {
                dispatch({
                    type: GET_SYMPTOM,
                    arrSymptom: result.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};
export const deleteSymptom = (id) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/api/admin/symptoms/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            message.success("Xóa triệu chứng thành công!");

            // Sau khi xoá xong, load lại danh sách bác sĩ
            dispatch(getListSymptom());
        } catch (error) {
            console.error("Lỗi xoá triệu chứng:", error);
            message.error("Xóa triệu chứng thất bại!");
        }
    };
};