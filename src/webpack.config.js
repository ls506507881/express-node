var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: path.join(__dirname,"js/app/index.js"),
    output:{
        path: path.join(__dirname,"../public/js"),
        filename: "index.js"
    },
    module:{
        rules: [
            {  //当require一个东西的时候，会进行检测
                test: /\.less$/,  //正则表达式，以less为后缀
                use: ["style-loader","css-loader","less-loader"]
                //使用这些loader，向前解析 less解析成css，放到页面上
            }
        ]
    },


    resolve:{
        alias:{
            jquery: path.join(__dirname,"js/lib/jquery.min.js"), //当require引入模块的时候，简化路径
            mod: path.join(__dirname,"js/mod"),
            less: path.join(__dirname,"less")
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
    ]
}