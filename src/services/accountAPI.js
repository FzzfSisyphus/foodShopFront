import API from "./API";

class accountAPI {
    static login(userName, password) {
        return API().post('/login', {
            userName: userName,
            password: password
        })
    }

    static signup(userName, password) {
        return API().post('/signup', {
            userName: userName,
            password: password
        })
    }
}