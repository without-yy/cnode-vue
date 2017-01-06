import AssToken from './setAssToken'
import axios from 'axios'

//验证assToken是否有效
export default function (assToken) {//accesstoken https://cnodejs.org/api/v1/accesstoken
    let token = AssToken.getAssToken();
    if (assToken) {
        token = assToken;
    }

    return new Promise((resolve, reject) => {
        if(token!=''||token){
            axios({
                url: 'https://cnodejs.org/api/v1/accesstoken',
                data: {accesstoken: token},
                method: 'POST'
            }).then(function (req) {
                resolve(req);
            }).catch(function (err) {
                reject(err);
            })
        }else {
            reject(new Error('token为空'));
        }

    });
}

