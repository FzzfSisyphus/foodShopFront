import API from "./API";

class accountAPI {
    static login(userName, password) {
        return API('http://localhost:8001/consumers/user/basic-auth').post('/login', {
            userName: userName,
            password: password
        })
    }

    static signup(formData) {
        return API('http://localhost:8001/consumers/user').post('/basic-auth',formData)
    }
}

export default accountAPI;