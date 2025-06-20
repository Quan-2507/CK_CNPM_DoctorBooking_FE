/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class SymptomService extends baseService {
    constructor() {
        super();
    }
    getListSymptom = () => {
        return this.get(`/admin/symptoms`);
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

export const symptomService = new SymptomService();


