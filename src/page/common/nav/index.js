import './index.css'
import {_mm} from "util/mm";

const nav = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        $('.js-login').click(() => {
            _mm.doLogin()
        });
        $('.js-register').click(() => {
            window.location.href = './user-register.html'
        })
    }
};

export {nav}