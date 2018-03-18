import './index.css'
import '../common/nav-simple/index'
import {_mm} from "util/mm";


$(function () {
    let type = _mm.getUrlParam('type') || 'default';
    $(`.${type}-success`).show();
});


