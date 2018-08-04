
import Vue from "vue";

//按需导入mint-ui中的组件
import { Header } from 'mint-ui';
Vue.component(Header.name,Header)

//导入mui的样式
import "./lib/css/mui.min.css";

import app from "./app.vue";
var vm = new Vue({
    el:"#app",
    data:{},
    methods:{},
    render: c=>c(app),
});