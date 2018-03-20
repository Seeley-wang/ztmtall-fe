import '../common/header/index'
import '../common/nav-side/index'
import './index.css'
import {navSide} from "page/common/nav-side"
import {_user} from "service/user-service";
import {_mm} from "util/mm";
import templateIndex from './index.string'

const page = {
    init: function () {
        this.onLoad()
    },
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
