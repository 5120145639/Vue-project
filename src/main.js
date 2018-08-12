
import Vue from "vue";
//导入路由
import VueRouter from "vue-router";
Vue.use(VueRouter);

import router from "./router.js"

//注册vuex
import Vuex from "vuex";
Vue.use(Vuex);
var car = JSON.parse(localStorage.getItem("car") || '[]');
var store = new Vuex.Store({
    state:{//this.$store.state.***
        // car:[]//将购物车中的商品数据存储起来
        car:car
    },
    mutations:{//this.$store.commit("方法名称","参数")
        addToCar(state,goodsinfo){//点击加入购物车，把商品信息保存到store中的car上
            var flag = false;
            state.car.some(item=>{
                if(item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            })
            if(!flag){
                state.car.push(goodsinfo);
            }

            localStorage.setItem("car",JSON.stringify(state.car));
        },
        updateCoodsInfo(state,goodsinfo){//修改购物车中商品的数量值
            state.car.some(item=>{
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count);
                    return true;
                }
            });
            //当修改完商品数量，把最新的购物车数据保存到本地存储中
            localStorage.setItem("car",JSON.stringify(state.car));
        },
        removeFromCar(state,id){//根据id删除store中的数据
            state.car.some((item,i)=>{
                if(item.id == id){
                  state.car.splice(i,1); 
                  return true; 
                }
            })
            localStorage.setItem("car",JSON.stringify(state.car));
        },
        updateGoodsSelected(state,info){
            state.car.some(item=>{
                if(item.id == info.id){
                    item.selected = info.selected;
                    return true;
                }
            });
            localStorage.setItem("car",JSON.stringify(state.car));
        }
    },
    getters:{//this.$store.getters.***
        getAllCount(state){
            var c = 0;
            state.car.forEach(item=>{
                c += item.count;
            })
            return c;
        },
        getGoodsCount(state){
            var o = {};
            state.car.forEach(item=>{
                o[item.id] = item.count;
            })
            return o;
        },
        getGoodsSelected(state){
            var o = {};
            state.car.forEach(item=>{
                o[item.id] = item.selected;
            });
            return o;
        },
        getGoodsCountAndAmount(state){
            var o = {
                count:0,//勾选的数量
                amount:0,//勾选的总价
            };
            state.car.forEach(item=>{
                if(item.selected){
                    o.count += item.count;
                    o.amount += item.price * item.count;
                }
            })
            return o;
        }
    }
})

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
    router,//挂载路由
    store//挂载store
});