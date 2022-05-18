<template>
  <div class="playController">
      <div class="left">
          <img :src="playList[playCurrentIndex].al.picUrl" @click="updateDetailShow">
          <div class="content">
              <div class="title">{{playList[playCurrentIndex].name}}</div>
              <div class="tips">横滑可以切换上下首歌</div>
          </div>
      </div>
      <div class="right">
          <svg class="icon" aria-hidden="true"  @click="play" v-if="isbtnShow">
                    <use xlink:href="#icon-24gl-playCircle"></use>
          </svg>
           <svg class="icon" aria-hidden="true" @click="play" v-else>
                    <use xlink:href="#icon-zanting" ></use>
          </svg>
           <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liebiao"></use>
          </svg>
      </div>
   <audio ref="audio"  :src="`https://music.163.com/song/media/outer/url?id=${playList[playCurrentIndex].id}.mp3`"></audio>
  <van-popup v-model:show="detailShow" position="right" :style="{ height: '100%' ,width:'100%'}">
  <MusicDetail :musicList="playList[playCurrentIndex]" :play="play" :isbtnShow="isbtnShow" :addDuration="addDuration" />
  </van-popup>

  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import MusicDetail from './MusicDetail.vue'
export default {
    data(){
        return{
            interVal:0
        }
    },
    components:{
        MusicDetail
    },
    computed:{
        ...mapState(['playList','playCurrentIndex','isbtnShow','detailShow'])
    },
    mounted() {
        console.log(this.$refs)
        this.$store.dispatch("getLyric",this.playList[this.playCurrentIndex].id)
       
        
    },
   
  
    methods:{
        play(){
            if(this.$refs.audio.paused){
                this.$refs.audio.play()
                this.updateIsbtnShow(false)
                this.updateTime()
            }
            else{
                this.$refs.audio.pause()
                this.updateIsbtnShow(true)
                clearInterval(this.interVal)
            }
             
        },
        updateTime(){
            this.interVal=setInterval(()=>{
                this.updateCurrentTime(this.$refs.audio.currentTime)
            },1000)

        },
        addDuration(){   //添加总时长
            this.updateDuration(this.$refs.audio.duration)
        },

      ...mapMutations(['updateIsbtnShow','updateDetailShow','updateCurrentTime','updateDuration'])
    
    },
    watch:{
        //监听下标，改变后自动播放
         playCurrentIndex(){
             this.$refs.audio.autoplay=true
            if(this.$refs.audio.paused){
                this.updateIsbtnShow(false)
            }
         },
         //监听播放列表
         playList(){
             if(this.isbtnShow){
                 this.$refs.audio.autoplay=true;
                this.updateIsbtnShow(false)
             }
         }
    },
    
    updated(){
        this.$store.dispatch("getLyric",this.playList[this.playCurrentIndex].id)
        this.addDuration()

    }
   
}
</script>

<style lang="less" scoped>
.playController {
    background: #fff;
    width: 7.5rem;
    height: 1.2rem;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ccc;
    z-index: 100;

    .left {
        display: flex;
        padding: 0 0.2rem;

        img {
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 0.4rem;
        }

        .content {
            padding: 0 0.2rem;

            .tips {
                font-size: 0.2rem;
                color: #999;
            }
        }
    }

    .right {
        .icon {
            width: 0.8rem;
            height: 1.5rem;
            margin: 0 0.2rem;
        }
    }
}

</style>