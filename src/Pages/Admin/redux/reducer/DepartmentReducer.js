import {
 GET_DEPARTMENT,
} from "../constants";
const initialState = {
    arrDepartment: [],
};
export const DepartmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEPARTMENT:
            return { ...state, arrDepartment: action.arrDepartment };
        default:
            return state;
    }
};