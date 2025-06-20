// src/Redux/Reducer/AccountReducer.js
import {
    GET_ACCOUNT_LIST,
    GET_ACCOUNT_PATIENT_LIST,
    GET_ACCOUNT_DOCTOR_LIST,
    GET_ACCOUNT_DETAIL,
    GET_DOCTOR_DEPARTMENT_DETAIL,
    GET_DEPARTMENT_FOR_DOCTOR_FROM_ADMIN,
    GET_DOCTOR_WITHOUT_DEPARTMENT,
} from "../constants";

const initialState = {
    arrAccount: [],
    arrAccountPatient: [],
    arrAccountDoctor: [], // Sửa thành mảng rỗng
    arrDoctorWithoutDepartment: [],
    accountDetail: {},
    doctorDepartment: {},
    dataDepartmentForDoctorFromAdmin: {},
    dataCompanyByAccountId: {},
};

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ACCOUNT_LIST:
            return { ...state, arrAccount: action.arrAccount };

        case GET_ACCOUNT_PATIENT_LIST:
            return { ...state, arrAccountPatient: action.arrAccountPatient };

        case GET_ACCOUNT_DOCTOR_LIST:
            return { ...state, arrAccountDoctor: action.arrAccountDoctor };

        case GET_DOCTOR_WITHOUT_DEPARTMENT:
            return { ...state, arrDoctorWithoutDepartment: action.arrAccountWithoutCompany };

        case GET_ACCOUNT_DETAIL:
            return { ...state, accountDetail: action.accountDetail };

        case GET_DOCTOR_DEPARTMENT_DETAIL:
            return { ...state, doctorDepartment: action.doctorDepartment };

        case GET_DEPARTMENT_FOR_DOCTOR_FROM_ADMIN:
            return { ...state, dataDepartmentForDoctorFromAdmin: action.dataDepartmentForDoctorFromAdmin };

        default:
            return state;
    }
};