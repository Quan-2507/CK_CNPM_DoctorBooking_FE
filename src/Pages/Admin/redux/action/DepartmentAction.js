import { history } from "../../../../App";
import { departmentService } from "../../services/DepartmentService";
import {message, notification} from "antd";
import {GET_ACCOUNT_LIST, GET_DEPARTMENT} from "../constants";
import axios from "axios";
import {getListSymptom} from "./SymptomAction";

export const getListDepartmentAction = () => {
    return async (dispatch) => {
        try {
            const result = await departmentService.getListDepartment();
            console.log("Kết quả từ API getListDepartmentAction:", result);

            if (result.status === 200) {
                dispatch({
                    type: GET_DEPARTMENT,
                    arrDepartment: result.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};
export const deleteDepartment = (id) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/api/admin/departments/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            message.success("Xóa khoa thành công!");

            // Sau khi xoá xong, load lại danh sách bác sĩ
            dispatch(getListDepartmentAction());
        } catch (error) {
            console.error("Lỗi xoá khoa:", error);
            message.error("Xóa khoa thất bại!");
        }
    };
};