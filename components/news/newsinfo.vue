<template>
    <div class="newsboxs">
        <!-- 标题 -->
        <h3 class="title">{{newsinfo.title}}</h3>
        <!-- 时间，点击率子标题 -->
        <p class="subtitle">
            <span>发表时间：{{newsinfo.add_time | dataFormat}}</span>
            <span>点击：{{newsinfo.click}}次</span>
        </p>
        <hr />
        <!-- 内容 -->
        <div class="content" v-html="newsinfo.content"></div>
        <!-- 评论 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script type="text/javascript">
import comment from '../subcomponents/comment'
import { Toast } from 'mint-ui';
     export default{
        name:'newsinfo',
        data(){
            return{
                id:this.$route.params.id,
                newsinfo:{},
            }
        },
        created(){
            this.getnewsinfo();
        },
        methods:{
            getnewsinfo(){//获取新闻详情
                let that=this;
                that.$http.get('api/getnew/'+that.id).then(function(res){
                    console.log(res);
                    if(res.body.status==0){
                        that.newsinfo=res.body.message[0];
                    }else{
                        Toast({
                          message: '加载数据失败',
                          position: 'middle',
                          duration: 5000
                        });
                    }
                })

            }
        },
        components:{
            "comment-box":comment
        }
     }
</script>
<style lang="less">
@r:50rem;
    .newsboxs{
        padding:0 4/@r;
        .title{
            text-align: center;
            padding:10/@r 0;
            color:red;
            font-size: 16/@r;
        }
        .subtitle{
            font-size: 13/@r;
            color:#0ae;
            display:flex;
            justify-content:space-between;
        }
        .content{
            img{width:100%;}
        }
    }
</style>
