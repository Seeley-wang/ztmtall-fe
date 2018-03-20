const path = require("path");
const webpack = require("webpack");
const extractTextPlugin = require("extract-text-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const getHtmlConfig = (name, title) => ({
    inject: true,
    hash: true,
    template: `./src/view/${name}.html`,
    filename: `view/${name}.html`,
    title: title,
    chunks: ["common", name]
});
const config = {
    entry: {
        'common': "./src/page/common/index.js",
        'index': "./src/page/index/index.js",
        'user-login': "./src/page/user-login/index.js",
        'user-register': "./src/page/user-register/index.js",
        'user-pass-reset': "./src/page/user-pass-reset/index.js",
        'result': "./src/page/result/index.js",
        'user-center': "./src/page/user-center/index.js",
        'user-center-update': "./src/page/user-center-update/index.js",
        'pass-update': "./src/page/pass-update/index.js",

    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist",
        filename: "js/[name].js"
    },
    mode: "development",
    module: {
        rules: [{
            test: /\.css$/,
            use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        },
        {
            test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
            loader: "url-loader?limit=2014&name=resource/[name].[ext]"
        },
        {
            test: /\.string$/,
            loader: "html-loader"
        }
        ]
    },
    resolve: {
        alias: {
            util: __dirname + "/src/util",
            page: __dirname + "/src/page",
            service: __dirname + "/src/service",
            image: __dirname + "/src/image",
            node_modules: __dirname + "/node_modules"
        }
    },
    plugins: [
        new extractTextPlugin("css/[name].css"),
        new htmlWebpackPlugin(getHtmlConfig("index", 'ZTMall电商购物平台')),
        new htmlWebpackPlugin(getHtmlConfig("result", '操作结果')),
        new htmlWebpackPlugin(getHtmlConfig("user-login", '用户登录')),
        new htmlWebpackPlugin(getHtmlConfig("user-register", '用户注册')),
        new htmlWebpackPlugin(getHtmlConfig("user-pass-reset", '找回密码')),
        new htmlWebpackPlugin(getHtmlConfig("user-center", '个人中心')),
        new htmlWebpackPlugin(getHtmlConfig("user-center-update", '修改个人信息')),
        new htmlWebpackPlugin(getHtmlConfig("pass-update", '修改密码'))
    ],
    optimization: {
        splitChunks: {
            chunks: "initial", // 必须三选一： "initial" | "all"(默认就是all) | "async"
            minSize: 0, // 最小尺寸，默认0
            minChunks: 1, // 最小 chunk ，默认1
            maxAsyncRequests: 1, // 最大异步请求数， 默认1
            maxInitialRequests: 1, // 最大初始化请求书，默认1
            name: () => { }, // 名称，此选项课接收 function
            cacheGroups: {
                // 这里开始设置缓存的 chunks
                priority: "0", // 缓存组优先级 false | object |
                vendor: {
                    // key 为entry中定义的 入口名称
                    chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    // test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk
                    name: "common", // 要缓存的 分隔出来的 chunk 名称
                    minSize: 0,
                    minChunks: 1,
                    enforce: true,
                    maxAsyncRequests: 1, // 最大异步请求数， 默认1
                    maxInitialRequests: 1, // 最大初始化请求书，默认1
                    reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
                }
            }
        }
    }
};

module.exports = config;