/**
 * Created by Karo on 16.10.2017.
 */

import axios from 'axios'


module.exports.register = function register(payload) {
    return  axios.post('http://localhost:8888/user/register',{email:payload.email,
        password:payload.password,
        username:payload.username})
}

module.exports.authenticate = function authenticate(payload) {
    const data = {
        email:payload.email,
        password:payload.password
    };
    return axios.post('http://localhost:8888/user/authenticate', data);
}
module.exports.dashboard = function dashboard(token) {
    console.log('dashboard');
    console.log(token);
    return axios.get('http://localhost:8888/user/dashboard',{headers:{Authorization:token}})
}