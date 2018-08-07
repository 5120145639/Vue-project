
import Vue from "vue";

import VueRouter from "vue-router";
Vue.use(VueRouter);
import router from "./router.js"

import VueResource from "vue-resource";
Vue.use(VueResource);

//按需导入mint-ui中的组件
import { Header,Swipe,SwipeItem,Button } from 'mint-ui';
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Button.name,Button);

//导入mui的样式
import "./lib/css/mui.min.css";
import "./lib/css/icons-extra.css";

import app from "./app.vue";

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