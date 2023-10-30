import axios from 'axios'

export default (url = 'http://a1b1466ffad924a51ae8494b0aa69fa0-1653010733.ap-southeast-1.elb.amazonaws.com') => {
    return axios.create({
        baseURL: url,
    })
}
