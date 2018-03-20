import '../common/header/index'
import '../common/nav-side/index'
import './index.css'
import {navSide} from "page/common/nav-side"
import {_user} from "service/user-service";
import {_mm} from "util/mm";

const page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        navSide.init({
            name: 'pass-update'
        });
    },
    bindEvent: function () {
        $(document).on('click', '.btn-submit', ()=>  {
            let formData = {
                password: $.trim($('#password').val()),
                passwordNew: $.trim($('#password-new').val()),
                passwordConfirm: $.trim($('#password-confirm').val()),

            };
            let validateResult = this.validateForm(formData);
            if (validateResult.status) {
                _user.updatePassword({
                    password:formData.password,
                    passwordNew:formData.passwordNew
                }, function (res) {
                    _mm.successTips(validateResult.msg);
                }, function (errMsg) {
                    _mm.errorTips(errMsg)

                });
            } else {
                _mm.errorTips(validateResult.msg)
            }
        })
    },
    validateForm:function (formData) {
        let result = {
            status: false,
            msg: ''
        };
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '旧密码不能为空';
            return result;
        }
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = '密码长度不能小于6位';
            return result;
        }
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次密码输入不一致';
            return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    }

};

$(function () {
    page.init()
});
