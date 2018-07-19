import axios from 'axios';
import Config from '../config';

const instance = axios.create({
    baseURL: Config.ip
});

// instance.defaults.headers.common["Authorization"] = token[1];

instance.interceptors.request.use(config => {
    if(config.method != 'get'){
        if(!config.data){
            config.data = {};
        }
        //config.data = Object.assign(config.data, {'token': auth.getToken()});
    }

    // inst.defaults.headers.common["clientip"] = clientip
    // console.log(config);
    return config;
}, error => {
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    if(response.data && response.data.code !== 0){
        //订单不存在
        if(response.data.code === Config.ErrorCode.OrderNotFound){
            return Promise.reject(response.data);
        }else if(response.data.code === Config.ErrorCode.InternalError){
            // console.error(`❌ 内部错误 ${response.request.path || response.data.message}`);
            return Promise.reject(`内部错误`);
        }else{
            // console.error(response.data);
        }

        return Promise.reject(response.data);
    }

    response.data.res = response;

    return response.data;
}, error => {
    return Promise.reject(`请求失败`);
});

export default instance;
