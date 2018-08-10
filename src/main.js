
import Vue from "vue";

import VueRouter from "vue-router";
Vue.use(VueRouter);

import router from "./router.js"

import VueResource from "vue-resource";
Vue.use(VueResource);
Vue.http.options.root = "http://47.89.21.179:8080";
Vue.http.options.emulateJSON = true;

//按需导入mint-ui中的组件
// import { Header,Swipe,SwipeItem,Button,Lazyload} from 'mint-ui';
// Vue.component(Header.name,Header);
// Vue.component(Swipe.name,Swipe);
// Vue.component(SwipeItem.name,SwipeItem);
// Vue.component(Button.name,Button);
// Vue.use(Lazyload);
import MintUi from "mint-ui";//为了实现懒加载，不再使用按需导入组件，选择全部导入
Vue.use(MintUi);
import "mint-ui/lib/style.css"

//导入mui的样式
import "./lib/css/mui.min.css";
import "./lib/css/icons-extra.css";

import app from "./app.vue";

// 安装图片预览插件
import VuePreview from "vue-preview";
Vue.use(VuePreview);

// 导入格式化时间插件
import moment from "moment";
Vue.filter("dateFormat",function(dateStr,pattern="YYYY-MM-DD hh:mm:ss"){
    return moment(dateStr).format(pattern);
})
var vm = new Vue({
    el:"#app",
    data:{},
    methods:{},
    render: c=>c(app),
    router
});