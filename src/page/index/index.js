import './index.css'
import '../common/header/index'
import templateIndex from './banner.string'
import {_mm} from "../../util/mm";
import 'util/slider/index.js'

$(function () {
    let bannerHtml = _mm.renderHtml(templateIndex);
    $('.banner-con').html(bannerHtml);
    let $silder = $('.banner').unslider({
        dots: true,
    });

    $('.banner-con .banner-arrow').click(function () {
        let forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $silder.data('unslider')[forward]()
    });
});
