import AssToken from './setAssToken'
import Cookie from './setCookie'
import axios from 'axios'

//验证assToken是否有效
export default function (assToken) {//accesstoken https://cnodejs.org/api/v1/accesstoken
    let token = AssToken.getAssToken();
    if (assToken) {
        token = assToken;
    }
    return new Promise((resolve, reject) => {
        axios({
            url: 'https://cnodejs.org/api/v1/accesstoken',
            data: {accesstoken: token},
            method: 'POST'
        }).then(function (req) {
            if (!assToken) {
                Cookie.set('l', '2');
            }
            resolve(req);
        }).catch(function (err) {
            Cookie.set('l', '0');
            reject(err);
        })
    });
}

