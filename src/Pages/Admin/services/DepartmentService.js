/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class DepartmentService extends baseService {
    constructor() {
        super();
    }
    getListDepartment = () => {
        return this.get(`/admin/departments`);
    };
    createDepartment = (de) => {
        return this.post(`/admin/departments`, de);
    };
    deleteAccount = (id) => {
        return this.delete(`/admin/departments/${id}`);
    };
    updateAccount = (id, de) => {
        return this.put(`/admin/departments/${id}`, de);
    };

}

export const departmentService = new DepartmentService();


