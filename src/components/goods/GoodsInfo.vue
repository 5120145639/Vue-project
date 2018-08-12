<template>
    <div class="goodsinfo-container">
        <transition @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
    
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价:<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价:<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                    </p>
                    <p>购买数量:<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        <!-- 实现点击加入购物车，拿到选择数量 （子组件向父组件传值）-->
                    </p>
                </div>
            </div>				
        </div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{goodsinfo.goods_no}}</p>
                    <p>库存情况:{{goodsinfo.stock_quantity}}件</p>
                    <p>上架时间:{{goodsinfo.add_time}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    import swiper from "../subcomponent/swiper.vue";
    import numbox from "../subcomponent/goodsinfo_numbox.vue";
    export default {
        data(){
            return {
                id:this.$route.params.id,
                lunbotu:[],//轮播图数据
                goodsinfo:{},//获取到商品的信息
                ballFlag:false,
                selectedCount:1,//购买数量
            }
        },
        created(){
            this.getLunbotu();
            this.getGoodsInfo();
        },
        methods:{
            getLunbotu(){
                this.$http.get("api/getthumimages/"+this.id).then(result=>{
                    if(result.body.status === 0){
                        //后台获取到的是src值，与swiper组件的img传参不同
                        result.body.message.forEach(item => {
                            item.img = item.src;
                        });
                        this.lunbotu = result.body.message;
                    }
                })
            },
            getGoodsInfo(){
                this.$http.get("api/goods/getinfo/"+this.id).then(result=>{
                    if(result.body.status === 0){
                        this.goodsinfo = result.body.message[0];
                    }
                });
            },
            goDesc(id){
                //使用编程时导航跳转到图文介绍页面
                this.$router.push({name:"goodsdesc",params:{id}});
            },
            goComment(id){
                //使用编程时导航跳转到评论页面
                this.$router.push({name:"goodscomment",params:{id}});
            },
            addToShopCar(){
                this.ballFlag = !this.ballFlag;
                // {id:商品的id,count:购买数量,price:商品价格,selected:false}
                var goodsinfo = {
                    id:this.id,
                    count:this.selectedCount,
                    price:this.goodsinfo.sell_price,
                    selected:true
                };
                //调用store中的mutations来将商品加入购物车
                this.$store.commit("addToCar",goodsinfo);
            },
            beforeEnter(el){
                el.style.transform = "translate(0,0)";
            },
            enter(el,done){
                el.offsetWidth;
                //不能写死坐标，应该动态计算
                //小球在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                const badgePosition = document.querySelector("#badge")
                .getBoundingClientRect();
                const xDist =  badgePosition.left - ballPosition.left;
                const yDist =  badgePosition.top - ballPosition.top;
                el.style.transform = `translate(${xDist}px,${yDist}px)`;
                el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)";
                done();
            },
            afterEnter(el){
                this.ballFlag = !this.ballFlag;
            },
            getSelectedCount(count){
                this.selectedCount = count;
            }
        },
        components:{
            swiper,
            numbox
        }
    }
</script>
<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
    .now_price{
        font-size: 16px;
        color:red;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block;//将原来的flex布局更改，flex布局br不会生效
        button{
            margin:15px 0;
        }
    }
    
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #f00;
        position: absolute;
        z-index: 99;

        bottom:235px;
        left:138px;
    }
}
</style>

