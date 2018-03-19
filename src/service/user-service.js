import {_mm} from "util/mm";

const _user = {
    // 用户登录
    login: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/login'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 检查用户名
    checkUsername: function (username, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/check_valid'),
            data: {
                type: 'username',
                str: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 用户注册
    register: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/register'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 获取用户密码提示问题
    getQuestion: function (username, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_get_question'),
            data: username,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 检查密码提示问题答案
    checkAnswer: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_check_answer'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 修改密码
    restPassword: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_rest_password'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },

    //

};


export {_user}