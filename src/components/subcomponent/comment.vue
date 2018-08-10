<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time|dateFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content==="undefined"?"此用户很懒":item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
    </div>
</template>
<script>
    import {Toast} from "mint-ui";
    export default{
        data(){
            return {
                pageindex:1,//默认展示第一页
                comments:[],
                msg:''//评论输入的内容
            };
        },
        created(){
            this.getComments();
        },
        methods:{
            getComments(){
                this.$http.get("api/getcomments/"+this.id+"?pageindex=1").then(result=>{
                    if(result.body.status === 0){
                        this.comments = this.comments.concat(result.body.message);
                    }else{
                        Toast("获取评论失败");
                    }
                });
            },
            getmore(){//加载更多
                this.pageindex++;
                this.getComments();
            },
            postComment(){
                if(this.msg.trim().length === 0){
                    Toast("评论内容不能为空");
                    return;
                }
                this.$http.post("api/postcomment/"+this.$route.params.id,{comment:this.msg.trim()}).then(function(result){
                    if(result.body.status === 0){
                        var cmt = {user_name:"匿名用户",add_time:Date.now(),content:this.msg.trim()}
                        this.comments.unshift(cmt);
                        this.msg = "";
                    }
                });
            }
        },
        props:["id"]
    }
</script>
<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size:14px;
        height: 85px;
        margin:0;
    }
    .cmt-list{
        margin:5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 35px;
                background-color: #ccc;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>
