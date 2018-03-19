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
    data: {
        username: '',
        question: '',
        answer: '',
        token: '',
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    loadStepUsername: function () {
        // 加载用户名步骤
        $('.step-username').show()
    },
    loadStepPassword: function () {
        // 加载密码步骤
        formError.hide();

        $('.step-question').hide().sibling('.step-password').show()
    },
    loadStepQuestion: function () {
        // 加载用户名步骤
        formError.hide();
        $('.step-username').hide().sibling('.step-question').show().find('.question').text(this.data.question);
    },
    onLoad: function () {
        this.loadStepUsername()
    },
    bindEvent: function () {
        $('#submit-username').click(() => {
            let username = $('#username').val();
            if (username) {
                _user.getQuestion(username, res => {
                    this.data.username = username;
                    this.data.question = res;
                    this.loadStepQuestion()
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            } else {
                formError.show('请输入用户名')
            }
        });
        $('#submit-question').click(() => {
            let answer = $('#answer').val();
            if (answer) {
                _user.checkAnswer({
                    username: this.data.username,
                    question: this.data.question,
                    answer: answer
                }, res => {
                    this.data.answer = answer;
                    this.data.token = res;
                    this.loadStepPassword()
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            } else {
                formError.show('请输入提示问题答案')
            }
        });
        $('#submit-password').click(() => {
            let password = $('#password').val();
            if (password && password.length >= 6) {
                _user.restPassword({
                    username: this.data.username,
                    newPassword: password,
                    forgetToken: this.data.token
                }, res => {
                    _mm.doLogin()
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            } else {
                formError.show('请输入不少于六位的新密码')
            }
        });

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
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function () {
    page.init()
});


