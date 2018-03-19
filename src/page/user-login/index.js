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
            password: $.trim($('#password').val())
        };
        let validateResult = this.formValidate(formData);
        if (validateResult.status) {
            _user.login(formData, function (res) {
                window.location.href = _mm.getUrlParam(('redirct')) || './index.html'
            },function (errMsg) {
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
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function () {
    page.init()
});


