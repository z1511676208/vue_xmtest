<template>
    <div class="photosboxs">
        <h3 class="title">{{photoinfo.title}}{{$route.params.id}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoinfo.add_time | dataFormat}}</span>
            <span>点击：{{photoinfo.click}}次</span>
        </p>

        <hr />
        <!-- 缩小图片区域 -->
        <div class="photosthum">
            <vue-preview :slides="list" @close="handleClose"></vue-preview>
            <!-- <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)"> -->   
        </div>
        <!-- 内容区域 -->
        <div class="content" v-html="photoinfo.content">
        </div>
        <!-- 评论 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script type="text/javascript">
import comment from '../subcomponents/comment'
import { Toast } from 'mint-ui';
     export default{
        name:'photoinfo',
        data(){
            return{
                id:this.$route.params.id,
                photoinfo:{},
                list:[]
            }
        },
        created(){
            this.getPhotoInfo();
            this.getthumimages();
        },
        mounted(){

        },
        methods:{
            // 获取图片内容
            getPhotoInfo(){
                this.$http.get('api/getimageInfo/'+this.id).then((res)=>{
                    console.log(res);
                    if(res.body.status==0){
                        this.photoinfo=res.body.message[0];
                    }else{
                        Toast({
                          message: '加载数据失败',
                          position: 'middle',
                          duration: 3000
                        });
                    }
                })
            },
            handleClose () {
                console.log('close event')
              },
            //获取缩略图
            getthumimages(){
                this.$http.get('api/getthumimages/'+this.id).then((res)=>{
                    if(res.body.status==0){
                        res.body.message.forEach((item,index)=>{
                            item.w=600;
                            item.h=400;
                            item.msrc=item.src;
                            item.alt="picture"+(index+1);
                            item.title="picture"+(index+1);
                        })
                        console.log(res.body.message);
                        this.list=res.body.message;
                    }
                })
            }
        },
        components:{
            "comment-box":comment
        }   
        
     }
</script>
<style lang="less" scoped>
    @r:50rem;
    .photosboxs{
        padding:3/@r;
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
            line-height: 30/@r;
            font-size: 13/@r;
            text-indent: 2em;
            img{width:100%;}
        }
    }
    figure{margin:0;}
    .photosthum{
        img{
            width:100/@r;
            height:100/@r;       
            vertical-align: middle;
        }
        
    }
</style>