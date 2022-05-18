<template>
  <div class="musicList">
      <div class="musicTop">
          <div class="title">发现好歌单</div>
          <div class="more">发现更多</div>
      </div>
      <div class="musicContent">
          <van-swipe :loop="false" :width="150" class="my-swipe" :show-indicators="false">
        <van-swipe-item v-for="(item,index) of state.musicList" :key="index">
            <router-link :to="{path:'/itemMusic',query:{id:item.id}}">
                <img :src="item.picUrl" alt=""/>
                <span class="playCount">
                     <svg class="icon" aria-hidden="true">
                         <use xlink:href="#icon-bofang1"></use>
                    </svg>
                    {{changeValue(item.playCount)}}
                </span>
                <span class="name">{{item.name}}</span>
            </router-link>
        </van-swipe-item>
          
          </van-swipe>

      </div>
  </div>
</template>

<script>
import { reactive,onMounted } from 'vue'
import { getMusicList } from '@/request/api/home'
export default {
    setup(){
        let state = reactive(
            {
                musicList:[]
            }
        )
        function changeValue(num){
            let res = 0;
            if(num > 100000000){
                res = num /100000000
                res = res.toFixed(2)+'亿'
            }
            else if(num >10000){
                res = num / 10000
                res = res.toFixed(2)+'万'
            }
            return res
        }
        onMounted(async()=>{
            let res = await getMusicList()
            state.musicList = res.data.result
            console.log(res)
        })
        
        return {state,changeValue} 
    }
   
}
</script>

<style lang="less" scoped>
.musicList{
    width: 7.5rem;
    padding: 0 0.4rem;
    .musicTop{
        display: flex;
        justify-content: space-between;
        height: 1rem;
        align-items: center;
        .title{
            font-size: 0.4rem;
            font-weight: 900;
        }
        .more{
            border: 1px solid #ccc;
            border-radius: 0.2rem;
            font-size: 0.24rem;
            height: 0.5rem;
            width: 1.2rem;
            text-align: center;
            line-height: 0.5rem;
        }
    }
    .musicContent{
    width:100%;
    height:4rem;
    .my-swipe{
        display: flex;
        height:100%;
        img{
            width:100%;
            height: auto;
            border-radius: 0.1rem;
        }
    }
    .playCount{
          position:absolute;
          right: 0.1rem;
          top: .02rem;
          font-size: 0.3rem;
          color:white;
          display: flex;
          align-items: center;
          .icon{
           fill:white;
         }
    }
      .name{
                    height: 0.6rem;
                    width: 100%;
                    font-size: .3rem;
                    line-height: 0.5rem;
                }
}


}
</style>