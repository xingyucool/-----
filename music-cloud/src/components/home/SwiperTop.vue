<template>
    <div id="swiperTop">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import {getBanner} from '@/request/api/home.js'
import axios from 'axios'
import { onMounted, reactive } from 'vue';
export default {
    setup() {
    let state =reactive({
      images:[
      'https://cdn.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
      'https://cdn.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ]
    }) ;
     onMounted(async ()=>{
      let res = await getBanner() //等待promise对象
      console.log(res)
       state.images=res.data.banners;
    })
    return { state };
  },
}
</script>

<style lang="less">
#swiperTop{
    .van-swipe{
    width:100%;
    padding:10px; 
    .van-swipe-item{
        img{
            width:100%;
            height:4rem;
            border-radius: 0.3rem;
        }
    }
    .van-swipe__indicator--active{
        background-color:rgb(219, 130, 157)
    }
    }
}
</style>