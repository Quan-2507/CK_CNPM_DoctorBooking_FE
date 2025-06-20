import { history } from "../../../../App";
import { departmentService } from "../../services/DepartmentService";
import { notification } from "antd";
import {GET_ACCOUNT_LIST, GET_DEPARTMENT} from "../constants";

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