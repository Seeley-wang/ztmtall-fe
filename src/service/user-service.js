import {_mm} from "util/mm";

const _user = {
    // 用户登录
    login: function (userInfo,resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/login.do'),
            data:userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    }
};


export {_user}