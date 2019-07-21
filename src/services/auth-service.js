import Storage from './storage-service';
import { config } from '../config/config';
import { STATUS_HTTP } from '../util/constants';

class AuthService {

    async isLogged() {
        return await Storage.exists("user");
    }

    async doLogin(email, password) {
        const url = `${config.API_REST}/api/auth/doLogin`;

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        const { status } = response;
        const { data, message } = await response.json();

        if (status === STATUS_HTTP.BAD_REQUEST || status === STATUS_HTTP.ERROR) throw new Error(message);

        return data;

    }

    async doRegister(user) {
        delete user.repeatPassword;

        const url = `${config.API_REST}/api/auth/doRegister`;

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        });

        const { status } = response;
        const { data, message } = await response.json();

        if (status === STATUS_HTTP.BAD_REQUEST || status === STATUS_HTTP.ERROR) throw new Error(message);

        return data;
    }

}

export default new AuthService();