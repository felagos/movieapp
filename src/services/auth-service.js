import Storage from './storage-service';

class AuthService {

    async isLogged() {
        return await Storage.exists("user");
    }

}

export default new AuthService();