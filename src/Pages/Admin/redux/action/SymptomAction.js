import { history } from "../../../../App";
import { notification } from "antd";
import {GET_ACCOUNT_LIST, GET_DEPARTMENT, GET_SYMPTOM} from "../constants";
import {symptomService} from "../../services/SymptomService";

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