
import {GET_ACCOUNT_LIST, GET_ACCOUNT_PATIENT_LIST, GET_ACCOUNT_DOCTOR_LIST, GET_ACCOUNT_DETAIL,GET_DOCTOR_DEPARTMENT_DETAIL,GET_DEPARTMENT_FOR_DOCTOR_FROM_ADMIN, GET_DOCTOR_WITHOUT_DEPARTMENT} from "../constants";
import { history } from "../../../../App";
import { userService } from "../../services/UserService";
import { notification } from "antd";

export const getListAccountAction = () => {
    return async (dispatch) => {
        try {
            const result = await userService.getListAccount();
            if (result.status === 200) {
                dispatch({
                    type: GET_ACCOUNT_LIST,
                    arrAccount: result.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getListAccountDoctorAction = () => {
    return async (dispatch) => {
        try {
            const result = await userService.getListAccountDoctor();
            console.log("Kết quả từ API getListAccountDoctor:", result);

            if (result.status === 200) {
                const doctors = result.data.map((doctor) => ({
                    ...doctor,
                    user: {
                        ...doctor.user,
                        // Đảm bảo dateOfBirth là chuỗi ISO (tránh lỗi redux toolkit)
                        dateOfBirth: doctor.user?.dateOfBirth
                            ? new Date(doctor.user.dateOfBirth).toISOString()
                            : null,
                    },
                }));
                console.log("Danh sách doctor đã xử lý:", doctors);

                dispatch({
                    type: GET_ACCOUNT_DOCTOR_LIST,
                    arrAccountDoctor: doctors,
                });
            }
        } catch (error) {
            console.error('Lỗi lấy danh sách bác sĩ:', error);
        }
    };
};





export const getListAccountPatientAction = () => {
    return async (dispatch) => {
        try {
            const result = await userService.getListAccountPatient();
            console.log("Kết quả từ API getListAccountPatient:", result);
            if (result.status === 200) {
                const patients = (result.data.data || result.data).map((patient) => ({
                    ...patient,
                    dateOfBirth: patient.dateOfBirth ? String(patient.dateOfBirth) : null,
                }));
                dispatch({
                    type: GET_ACCOUNT_PATIENT_LIST,
                    arrAccountPatient: patients,
                });
            }
        } catch (error) {
            console.error('Lỗi lấy danh sách bệnh nhân:', error);
            notification.error({
                message: 'Error',
                description: 'Không thể lấy danh sách bệnh nhân.',
            });
        }
    };
};

export const deleteAccountAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await userService.deleteAccount(id);
            notification.success({
                closeIcon: true,
                message: "Success",
                description: <>Delete Account successfully</>,
            });
            dispatch(getListAccountDoctorAction());
        } catch (error) {
            console.error("Lỗi xóa bác sĩ:", error);
            notification.error({
                message: 'Error',
                description: 'Không thể xóa bác sĩ.',
            });
        }
    };
};


export const getAccountByIdAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await userService.getAccountById(id);
            if (result.status === 200) {
                dispatch({
                    type: GET_ACCOUNT_DETAIL,
                    accountDetail: result.data.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};


export const getDoctorOfDepartmentByIAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await userService.getDoctorOfDepartmentById(id);
            if (result.status === 200) {
                dispatch({
                    type: GET_DOCTOR_DEPARTMENT_DETAIL,
                    doctorDepartment: result.data.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getDepartmentForDoctorFromAdminById = (id) => {
    return async (dispatch) => {
        try {
            const result = await userService.getDepartmentForDoctorFromAdminById(id);
            if (result.status === 200) {
                dispatch({
                    type: GET_DEPARTMENT_FOR_DOCTOR_FROM_ADMIN,
                    dataDepartmentForDoctorFromAdmin: result.data.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};


export const getListDoctorWithoutDepartmentAction = () => {
    return async (dispatch) => {
        try {
            const result = await userService.getListDoctorWithoutDepartment();
            if (result.status === 200) {
                dispatch({
                    type: GET_DOCTOR_WITHOUT_DEPARTMENT,
                    arrDoctorWithoutDepartment: result.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const updateAccountByIdAction = (id, formData) => {
    return async (dispatch) => {
        try {
            const result = await userService.updateAccount(id, formData);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Update Account successfully</>
                ),
            });
            history.goBack();
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const createAccountAction = (newAc) => {
    return async (dispatch) => {
        try {
            const result = await userService.createAccount(newAc);
            notification.success({
                closeIcon: true,
                message: "Success",
                description: <>Create New Account Successfully.</>,
            });
            history.goBack();
        } catch (error) {
            if (error?.response?.data?.statusCode === 409) {
                notification.error({
                    closeIcon: true,
                    message: "Error",
                    description: <>Create New Account Fail! . Email Already In Use</>,
                });
            } else {
                notification.error({
                    closeIcon: true,
                    message: "Error",
                    description: <>Create New Account Fail!</>,
                });
            }
        }
    };
};
