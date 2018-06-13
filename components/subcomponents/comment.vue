<template>
    <div class="cmt-con">
        <h3>发表评论</h3>
        <hr />
        <textarea placeholder="请输入评论内容（最多不超过120字）" v-model="msg" name="" id="" maxlength="120"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,index) in commentlist" :key="index">
                <div class="cmt-title">
                    第{{index+1}}楼&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dataFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content=='undefined'?'此用户太懒了':item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" @click.native="getMorecomment" plain>加载更多</mt-button>
    </div>
</template>
<script type="text/javascript">
import { Toast } from 'mint-ui'
     export default{
        name:'comment',
        data(){
            return{
                pageIndex:1,//默认展示第一页
                commentlist:[],
                msg:''
            }
        },
        created(){
            this.getcomment();
        },
        methods:{
            getcomment(){
                this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then((res)=>{
                    console.log(res);
                    if(res.body.status==0){
                        //this.commentlist=res.body.message;
                        this.commentlist=this.commentlist.concat(res.body.message);
                    }else{
                        Toast("获取评论失败！")
                    }
                })
            },
            getMorecomment(){
                this.pageIndex++;
                this.getcomment();
            },
            postComment() {
              // 校验是否为空内容
              if (this.msg.trim().length === 0) {
                return Toast("评论内容不能为空！");
              }

              // 发表评论
              // 参数1： 请求的URL地址
              // 参数2： 提交给服务器的数据对象 { content: this.msg }
              // 参数3： 定义提交时候，表单中数据的格式  { emulateJSON:true }
              this.$http.post("api/postcomment/" + this.id, {
                  content: this.msg.trim()
                })
                .then(function(result) {
                  if (result.body.status === 0) {
                    // 1. 拼接出一个评论对象
                    var cmt = {
                      user_name: "匿名用户",
                      add_time: Date.now(),
                      content: this.msg.trim()
                    };
                    this.commentlist.unshift(cmt);
                    this.msg = "";
                  }
                });
            }
        },
        props:['id']

     }
</script>
<style lang="less" scoped>
    @r:50rem;
    .cmt-con{
        h3{font-size: 16/@r;}
        textarea{
            font-size: 14/@r;
            height:85/@r;
            margin:10/@r 0;
        }
        .cmt-list{
            margin:6/@r 0;
            .cmt-item{
                font-size: 13/@r;
                .cmt-title{
                    line-height: 30/@r;
                    background-color: #ddd;

                }
                .cmt-body{
                    line-height: 35/@r;
                    text-indent: 2em;
                }
            }
        }
    }
</style>