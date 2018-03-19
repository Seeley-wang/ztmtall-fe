import '../common/nav-simple/index.css'
import './index.css'
import {_mm} from "util/mm";
import {_user} from "service/user-service";

const formError = {
    show: function (errMsg) {
        $('.err-item').show().find('.err-msg').text(errMsg);
    },
    hide: function () {
        $('.err-item').hide().find('.err-msg').text('');
    }
};

const page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        $('#username').blur(() => {
            let username = $.trim($(this).val());
            if (!username) return;
            _user.checkUsername(username, function (res) {
                formError.hide();
            }, function (errMsg) {
                formError.show(errMsg)
            })
        });
        $('#submit').click(() => {
            this.submit()
        });
        $('.user-content').keyup(e => {
            if (e.keyCode === 13) {
                this.submit();
            }
        })

    },
    submit: function () {
        let formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#passwordConfirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        };
        let validateResult = this.formValidate(formData);
        if (validateResult.status) {
            _user.register(formData, function (res) {
                window.location.href = './result.html?type=register';
            }, function (errMsg) {
                formError.show(errMsg)
            })
        } else {
            formError.show(validateResult.msg)
        }
    },
    formValidate: function (formData) {
        let result = {
            status: false,
            msg: ''
        };
        if (!_mm.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        if (formData.password.length < 6) {
            result.msg = '密码长度不能小于6位';
            return result;
        }
        if (formData.password !== formData.passwordConfirm) {
            result.msg = '两次密码输入不一致';
            return result;
        }
        if (!_mm.validate(formData.phone, 'phone')) {
            result.msg = '手机号不正确';
            return result;
        }
        if (!_mm.validate(formData.email, 'email')) {
            result.msg = '邮箱格式正确';
            return result;
        }
        if (!_mm.validate(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if (!_mm.validate(formData.answer, 'require')) {
            result.msg = '密码提示答案不能为空';
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


