import API from "./API";

class accountAPI {
    static login(userName, password) {
        return API('http://ec2-54-254-59-196.ap-southeast-1.compute.amazonaws.com:8001/consumers/user/basic-auth').post('/login', {
            userName: userName,
            password: password
        })
    }

    static signup(formData) {
        return API('http://ec2-54-254-59-196.ap-southeast-1.compute.amazonaws.com:8001/consumers/user').post('/basic-auth',formData)
    }
}

export default accountAPI;