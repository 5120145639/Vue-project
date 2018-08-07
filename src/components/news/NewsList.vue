<template>
    <div>
        <h3>新闻列表页面</h3>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media">
                <!-- <router-link :to="'/home/newsinfo/'+ item.id"> -->
                <router-link to="/home/newsinfo">
                    <img class="mui-media-object mui-pull-left" src="../../../mui/examples/hello-mui/images/shuijiao.jpg">
                    <div class="mui-media-body">                       
                        <h1>幸福</h1>
                        <p class='mui-ellipsis'>
                            <span>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</span>
                            <!-- <span>发表时间：{{item.add_time|dateFormat("YYYY-MM-DD")}</span>
                            <span>点击：{{item.click}}次</span> -->
                        </p>
                    </div>
                </router-link>
                <!-- </router-link> -->
            </li>
        </ul>
    </div>    
</template>
<script>
</script>
<style lang="scss" scoped>
.mui-table-view{
    li{
        h1{
            font-size:14px;
        }
        .mui-ellipsis{
            font-size: 12px;
        }
    }
}
</style>
