<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <div class="info-title">{{item.title}}</div>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>   
</template>
<script>
import mui from "../../lib/js/mui.min.js"

//初始化滑动控件(报错原因：mui里面使用了严格模式) 这几句代码放在这里页面会出错 
// mui(".mui-scroll-wrapper").scroll({
//     deceleration:0.0005 //减速系数 越大滑动速度越慢，滚动距离越小，默认0.0006
// });

export default {
    data(){
        return {
            cates:[],//所有分类的列表
            list:[],//图片列表的数组
        }
    },
    created(){
        this.getAllCategory();
        this.getPhotoListByCateId(0);
    },
    methods:{
        getAllCategory(){//获取所有图片分类
            this.$http.get("api/getimgcategory").then(result=>{
                if(result.body.status === 0){
                    result.body.message.unshift({title:"全部",id:0});
                    this.cates = result.body.message;
                }
            });
        },
        getPhotoListByCateId(cateId){
            //根据分类id，获取图片列表
            this.$http.get("api/getimages/"+cateId).then(result=>{
                if(result.body.status === 0){
                    this.list = result.body.message;
                }
            });
        }
    },
    mounted(){//当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
        //初始化滑动控件(报错原因：mui里面使用了严格模式)
        mui(".mui-scroll-wrapper").scroll({
            deceleration:0.0005 //减速系数 越大滑动速度越慢，滚动距离越小，默认0.0006
        });
    }
}
</script>
<style lang="scss" scoped>
*{
    touch-action: pan-y;
}
.photo-list{
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    li{
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative;
        img{
            width: 100%;
            vertical-align: middle;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }

        .info{
            color:#fff;
            position: absolute;
            bottom:0;
            background-color: rgba(0,0,0,0.4);
            max-height: 84px;
        }
        .info-title{
            font-size: 14px;
        }
        .info-body{
            font-size: 13px;
        }
    }
}

</style>

