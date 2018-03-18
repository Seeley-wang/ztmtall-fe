import "./index.css";
import { _mm } from "util/mm.js";

const header = {
    init: function() {
        this.bindEvent();
    },
    onLoad: function() {
        const keyword = _mm.getUrlParam("keyword");
        if (keyword) {
            $("#search-input").val(keyword);
        }
    },
    bindEvent: function() {
        $("#search-btn").click(e => {
            e.preventDefault();
            this.searchSubmit();
        });
        $("#search-input").keyup(e => {
            if (e.keyCode === 13) {
                this.searchSubmit();
            }
        });
    },
    searchSubmit: function() {
        const keyword = $.trim($("#search-input").val());
        if (keyword) {
            window.location.href = "./list.html?keyword=" + keyword;
        } else {
            _mm.goHome();
        }
    }
};

header.init();
