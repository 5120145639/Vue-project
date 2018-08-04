const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    entry:path.join(__dirname,"./src/main.js"),
    output:{
        path:path.join(__dirname,"./dist"),
        filename:"bundle.js"
    },
    devServer:{
        open:true,
        port:3000,
        contentBase:"src",
        hot:true
    },
    plugins:[//配置插件的节点
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template:path.join(__dirname,"./src/index.html"),
            filename:"index.html"
        }),
        new VueLoaderPlugin()
    ],
    module:{//配置所有第三方加载器
        rules:[
            {test:/\.css$/,use:['style-loader',"css-loader"]},//loader是从右往左执行
            {test:/\.less$/,use:['style-loader',"css-loader","less-loader"]},
            {test:/\.scss$/,use:['style-loader',"css-loader","sass-loader"]},
            {test:/\.(jpg|gif|png|bmp|jpeg)$/,use:'url-loader?limit=400476&name=[path][name].[ext]'},
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
            {test:/\.vue$/,use:'vue-loader'},
            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},
        ]
    },
    resolve:{
        alias:{
            "vue$":"vue/dist/vue.js"
        }
    }
}