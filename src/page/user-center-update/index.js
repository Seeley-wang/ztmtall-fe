import '../common/header/index'
import '../common/nav-side/index'
import {navSide} from "page/common/nav-side"
import './index.css'
import {_user} from "service/user-service";
import {_mm} from "util/mm";
import templateIndex from './index.string'

const page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function () {
        $(document).on('click', '.btn-submit', () => {
            let userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            };
            validateResult = this.validateForm(userInfo);
            if (validateResult.status) {
                _user.updateUserInfo(userInfo, function (res) {
                    _mm.successTips(validateResult.msg);
                    window.location.href = './user-center.html'
                }, function (errMsg) {
                    _mm.errorTips(errMsg)

                });
            } else {
                _mm.errorTips(validateResult.msg)
            }
        })
    },
    validateForm:function (userInfo) {
        let result = {
            status: false,
            msg: ''
        };
        if (!_mm.validate(userInfo.phone, 'phone')) {
            result.msg = '手机号不正确';
            return result;
        }
        if (!_mm.validate(userInfo.email, 'email')) {
            result.msg = '邮箱格式正确';
            return result;
        }
        if (!_mm.validate(userInfo.question, 'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if (!_mm.validate(userInfo.answer, 'require')) {
            result.msg = '密码提示答案不能为空';
            return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
    ,
    onLoad: function () {
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    loadUserInfo: function () {
        let userHtml = '';
        _user.getUserInfo(function (res) {
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml)
        }, function (errMsg) {
            _mm.errorTips(errMsg)
        })
    }
};

$(function () {
    page.init()
});
