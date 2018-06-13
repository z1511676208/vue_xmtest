<template>
    <div class="newsbox">
        <h3 class="newstitle">新闻列表</h3>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="(item,index) in newslist" :key="index">
                <router-link :to="'/home/newsinfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class="mui-ellipsis">
                            <span>发表时间：{{item.add_time | dataFormat()}}</span>
                            <span>点击：{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
            <!-- <li class="mui-table-view-cell mui-media">
                <a href="javascript:;">
                    <img class="mui-media-object mui-pull-left" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAABP0lEQVRoQ+2XPQoCQQyFs+exsRDv4CU8hq2NWAgWFgrbCAt2gmChYCPYWNlYeQcRrBRhBS3Exj+yMwnEmbd18kje92aYTSq1+o0i+hIsHDhtEA4cMIEwCAfmACIdGNC3dUAYhANzAJEODCguLUQakQ7MAbVI99sNqpZLTnbtD0dqdlPabHdO/b+asLCUpdESzvMrZeMZpaOJlJdeOuqRxsJefPybQdjfw4fC89JCpKUcddRRj3TRuU7nC3UGGc2X66KtrHoszLKJUeT68Ph7wri0GOnQLFE/wyCsiY+hDcIMk1gleGnF8nvIisOHouliRa3e0LX9a5/6GXadGAu7OvfSp0ZYaD5xGSwsbqkxQRA2BkR8HBAWt9SYIAgbAyI+DgiLW2pMEISNAREfB4TFLTUmCMLGgIiPA8LilhoTvAMR+SxkCqfiyQAAAABJRU5ErkJggg==">
                    <div class="mui-media-body">
                        木屋
                        <p class="mui-ellipsis">
                            <span>发表时间：2012-10-21</span>
                            <span>点击：0次</span>
                        </p>
                    </div>
                </a>
            </li> -->
            
        </ul>
    </div>
</template>
<script type="text/javascript">
import { Toast } from 'mint-ui';
     export default{
        name:'newslist',
        data(){
            return{
                newslist:[]
            }
        },
        created(){
            this.getnewslist();
        },
        methods:{
            getnewslist(){//获取新闻资讯
                let that=this;
                that.$http.get('api/getnewslist').then(res=>{
                    console.log(res)
                    if(res.body.status==0){
                        that.newslist=res.body.message;
                    }else{
                        Toast({
                          message: '加载数据失败',
                          position: 'middle',
                          duration: 5000
                        });
                    }
                })
            }
        }
     }
</script>
<style lang="less" scoped>
    @r:50rem;
    .newstitle{text-align: center;font-size: 14/@r;}
    .mui-table-view{
        li{
            .mui-media-body{font-size: 14/@r;}
            .mui-ellipsis{
                font-size: 12/@r;
                color:#0ae;
                display:flex;
                justify-content:space-between;
            }
        }
    }
</style>