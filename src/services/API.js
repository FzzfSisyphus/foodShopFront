import axios from 'axios'

export default (url = 'http://ec2-54-254-59-196.ap-southeast-1.compute.amazonaws.com:8000') => {
    return axios.create({
        baseURL: url,
    })
}
