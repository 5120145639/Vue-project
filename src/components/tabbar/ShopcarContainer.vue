<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!-- 商品列表项区 -->
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch 
                            v-model="$store.getters.getGoodsSelected[item.id]" 
                            @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])">
                        </mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 结算区 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计</p>
                        <p>已勾选商品<span class="red"> {{$store.getters.getGoodsCountAndAmount.count}} </span>件，总价<span class="red"> ￥{{$store.getters.getGoodsCountAndAmount.amount}} </span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import numbox from "../subcomponent/shopcar_numbox.vue";
    export default {
        data(){
            return {
                goodslist:[],//购物车中所有商品的数据
            };
        },
        created(){
            this.getGoodsList();
        },
        methods:{
            getGoodsList(){
                //获取到store中所有商品的id，然后拼接处一个用逗号分隔的字符串
                var idArr = [];
                this.$store.state.car.forEach(item=>{
                    idArr.push(item.id);
                });
                if(idArr.length <= 0){
                    return;
                }
                this.$http.get("api/goods/getshopcarlist/"+idArr.join(",")).then(result=>{
                    if(result.body.status === 0){
                        this.goodslist = result.body.message;
                    }
                });           
            },
            remove(id,index){//点击删除，把商品从store中根据传递的id删除，同时根据index删除goodslist中的商品
                this.goodslist.splice(index,1);
                this.$store.commit("removeFromCar",id);
            },
            selectedChanged(id,selected){//点击开关，同步到store中
                this.$store.commit("updateGoodsSelected",{id,selected})
            }
        },
        components:{
            numbox
        }
    }
</script>
<style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
    .goods-list{
        .mui-card-content-inner{
            display:flex;
            align-items: center;
        }
        img{
            width: 60px;
            height: 60px;
        }
        h1{
            font-size: 13px;
        }
        .info{
            display:flex;
            flex-direction: column;
            justify-content: space-between;
            .price{
                color:red;
                font-weight: bold;
            }
        }
    }
    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red{
            color:red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>
