import axios from 'axios'

const baseurl = process.env.REACT_APP_BASEURL;

const registeruser = (data) => {
    return axios.post(`${baseurl}/user/register`, data)
}

const loginuser = (data) => {
    return axios.post(`${baseurl}/user/login`,data )
}

const AuthServices = {registeruser, loginuser}

export default AuthServices