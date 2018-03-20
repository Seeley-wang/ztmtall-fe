import Hogan from "hogan";

const conf = {
    serverHost: ""
};
const _mm = {
    request: function (param) {
        $.ajax({
            type: param.method || "get",
            url: param.url || "",
            data: param.data || "",
            dataType: param.data || "json",
            success: response => {
                // 请求成功
                if (0 === response.status) {
                    typeof param.success === "function" &&
                    param.success(response.data, response.msg);
                    //没有登录,需要登录
                } else if (10 === response.status) {
                    this.doLogin();
                    // 请求数据错误
                } else if (1 === response.status) {
                    typeof param.success === "function" &&
                    param.err(response.msg);
                }
            },
            error: err => {
                typeof param.error === "function" &&
                param.error(err.statusText);
            }
        });
    },
    // 获取服务器地址
    getServerUrl: path => {
        return conf.serverHost + path;
    },
    // 获取url参数
    getUrlParam: name => {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        const result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染html
    renderHtml: (htmlTemplate, data) => {
        return Hogan.compile(htmlTemplate).render(data);
    },

    // 统一登录处理
    doLogin: () => {
        window.location.href =
            "./user-login.html?redirect=" + encodeURIComponent(window.location.href);
    },
    goHome: () => {
        window.location.href = "./index.html";
    },
    // 成功提示
    successTips: (msg = "成功") => {
        alert(msg);
    },
    // 错误提示
    errorTips: (err = "失败") => {
        alert(err);
    },
    // 字段验证,支持非空,手机,邮箱
    validate: (value, type) => {
        let v = $.trim(value);
        if ("require" === type) {
            return !!v;
        }
        if ("phone" === type) {
            return /^1[3,4,5,7,8]\d{9}$/.test(v);
        }
        if ("email" === type) {
            return /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/.test(
                v
            );
        }
    }
};
export {_mm};
