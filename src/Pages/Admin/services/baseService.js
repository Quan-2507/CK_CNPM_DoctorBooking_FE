import Axios from "axios";
import API_BASE_URL, { TOKEN } from '../../../config/api';

export class baseService {
    getToken = () => {
        const token = localStorage.getItem(TOKEN);
        console.log(">>> Token gửi lên API:", token); // Log token tại đây
        return token || ""; // tránh null
    }

    put = (url, model) => {
        return Axios({
            url: `${API_BASE_URL}${url}`,
            method: 'PUT',
            data: model,
            headers: { 'Authorization': 'Bearer ' + this.getToken() }
        });
    }

    post = (url, model) => {
        return Axios({
            url: `${API_BASE_URL}${url}`,
            method: 'POST',
            data: model,
            headers: { 'Authorization': 'Bearer ' + this.getToken() }
        });
    }

    get = (url) => {
        return Axios({
            url: `${API_BASE_URL}${url}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.getToken() }
        });
    }

    delete = (url) => {
        return Axios({
            url: `${API_BASE_URL}${url}`,
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + this.getToken() }
        });
    }

    postNotBearer = (url, model) => {
        return Axios({
            url: `${API_BASE_URL}${url}`,
            method: 'POST',
            data: model
        });
    }

    getNotBearer = (url) => {
        return Axios({
            url: `${API_BASE_URL}${url}`,
            method: 'GET'
        });
    }
}
