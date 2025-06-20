/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class UserService extends baseService {
    constructor() {
        super();
    }
    getListAccountPatient = () => {
        return this.get(`/admin/patients`);
    };
    getListAccountDoctor = () => {
        return this.get(`/admin/doctors`);
    };
    getListDoctorWithoutDepartment = () => {
        return this.get(`/api/admin/account/non_company_account`);
    };
    getAccountById = (id) => {
        return this.get(`/api/admin/account/${id}`);
    }
    getDoctorOfDepartmentById = (id) => {
        return this.get(`/api/employer/company/${id}`);
    }
    getDepartmentForDoctorFromAdminById = (id) => {
        return this.get(`/api/admin/employer_account/${id}`);
    }
    createAccount = (ac) => {
        return this.post(`/api/admin/account`, ac);
    };
    deleteAccount = (id) => {
        return this.delete(`/api/admin/account/${id}`);
    };
    updateAccount = (id, ac) => {
        return this.put(`/api/admin/account/${id}`, ac);
    };

}

export const userService = new UserService();


