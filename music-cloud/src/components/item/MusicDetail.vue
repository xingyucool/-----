<template>
    <img :src="musicList.al.picUrl" class="bgImg">
   <div class="playMusic">
        <div class="bg" :style="{backgroundImage:`url(${musicList.al.picUrl})`}"></div>
   <div class="playTop">
            <div class="back">
                <svg class="icon" aria-hidden="true" @click="back">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
            </div>
            <div class="center">
                <div class="title">
                   <Vue3Marquee class="marquee" behavior="scroll" direction="left">{{musicList.name}}</Vue3Marquee>
                </div>
                <div class="author">
                    <span class="name" v-for="(item,i) in musicList.ar" :key="i">{{item.name}}</span>
                     <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xiangyoujiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="share">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
            </div>
   </div>
    <div class="playContent" v-show="!isLyricShow">
            <img class="needle"  src="@/assets/needle.png" alt="">
            <img class="disc" src="@/assets/cd.png" alt="">
            <img class="playImg" :src="musicList.al.picUrl" alt=""  @click="isLyricShow=true">
    </div>

    <div class="playLyric" ref="playLyric" v-show="isLyricShow">
       <p v-for="(item,i) in lyric" :key="i" :class="{active:(currentTime*1000)>=item.time&&(currentTime*1000)<item.pre}">{{item.lrc}}</p>
    </div>
    <div class="playFooter">
        <div class="footerTop">
              <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-aixin"></use>
            </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
            </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yinlechangpian"></use>
          </svg>
         <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-pinglun1"></use>
         </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao1"></use>
        </svg>
        </div>
          <div class="footerContent">
              <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
          </div>
          <div class="footer">
                     <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xunhuan1"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
                <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            <svg v-if="isbtnShow" class="icon play" aria-hidden="true" @click="play">
                <use xlink:href="#icon-bofang2"></use>
            </svg>
            <svg v-else class="icon play" aria-hidden="true" @click="play">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goPlay(1)">
                <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gf-playlistMusic4"></use>
            </svg>
          </div>
    </div>
   </div>
   
   
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations,mapState } from 'vuex'
export default {
    data(){
        return {
            isLyricShow:false}
    },
    props:['musicList','play','isbtnShow','addDuration'],
    
    computed:{
        ...mapState(['lyricList','currentTime','playCurrentIndex','playList','duration']),
        lyric(){
            let arr
            if(this.lyricList.lyric){
                arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{
                    let min = item.slice(1,3)
                    let sec=item.slice(4,6)
                    let mill = item.slice(7,10)
                    let lrc = item.slice(11,-1)
                    let time = parseInt(min)*60*1000+parseInt(sec)*1000
                    //console.log(min,sec,Number(mill),lrc)
                    if(isNaN(Number(mill))){
                        mill = item.slice(7,9)
                        lrc = item.slice(10,item.length)
                    }
                    time = time + parseInt(mill)
                    return{min,sec,mill,lrc,time}
                }) 
                arr.forEach((item,i) => {
                    if(i===arr.length-1||isNaN(arr[i+1].time)){
                        item.pre=1000000;
                    }
                    else{
                        item.pre = arr[i+1].time
                    }
                });
            }
            console.log('修改过得歌词数组对象',arr)
            return arr
        }

    },
    mounted(){
        console.log(this.musicList)
        this.addDuration()
    },
    methods: {
        goPlay(val){
            let index = this.playCurrentIndex+val
            if(index<0) index = this.playList.length-1
            else if(index === this.playList.length){
                index = 0;
            }
            
            this.updatePlayCurrentIndex(index)
        },
          back(){
            this.updateDetailShow()
            this.isLyricShow=false
        },
      ...mapMutations(['updateDetailShow','updatePlayCurrentIndex','updateDuration'])
    },
    watch:{
        currentTime(newValue){
            let p = document.querySelector('p.active')
            console.log([p])
           if(p){
                 if(p.offsetTop>150){
                console.log( this.$refs.playLyric.scrollTop)
                this.$refs.playLyric.scrollTop=p.offsetTop-150
                }
           }
           if(newValue===this.duration){
                if(this.playCurrentIndex===this.playList.length-1)
                {
                    this.updatePlayCurrentIndex(0)
                    this.play()
                }
                else{
                    this.updatePlayCurrentIndex(this.playCurrentIndex+1)
                }
           }
         
        }
    },
    components: {
        Vue3Marquee,
  },
}
</script>
<style lang="less" scoped>
.playMusic{
    position:fixed;
    left:0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    .bg{
        position: absolute;
        left:0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-size: auto 100%;
        background-position: center;
        filter: blur(60px);
        
    }
    .playTop{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 7.5rem;
        height: 1.2rem;
        position: absolute;
        left: 0;
        top: 0;
        color: #fff;
        padding: 0 0.4rem;
       .back{
            .icon{
                fill: #fff;
                width: 0.4rem;
                height: 0.4rem;
            }
        }
        .center{
            .title{
                .marquee{
                    width: 4rem;
                    flex: 2;}
                }  
            }
            .author{
                .name{
                    font-size:.2rem;
                }
                .icon{
                    width:.27rem;
                    height:.27rem;
                   
                    justify-content: space-between;
                    align-items: center;
                    
                }
            }
        
        
        
    }
    .playContent{
        position: absolute;
        width:7.5rem;
        height: 7.5rem;
        left: 0;
        top: 1.5rem;
        .needle{
            width:2.5rem;
            height: auto;
            position: absolute; 
            left: 3.5rem;
            transform-origin: 0.3rem 0;
            transform: rotate(-10deg);
            transition: all 1s;
            z-index: 10;
        }
        .needle.active{
            width:2.5rem;
            height: auto;
            position: absolute; 
            left: 3.5rem;
            transform-origin: 0.3rem 0;
            transform: rotate(15deg);
            transition: all 1s;
            z-index: 10;
        }
        .disc{
            width: 5.5rem;
            height: auto;
            position: absolute;
            left: calc(50% - 2.75rem) ;
            top: 2.5rem;

        }
        .playImg{
            width: 3.4rem;
            height: 3.4rem;
            border-radius: 1.7rem;
            position: absolute;
            left: calc(50% - 1.7rem);
            top: 3.55rem;
        }
    }
    .playFooter{
      .footer{
        width: 7.5rem;
        height: 1.5rem;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.4rem;
         .icon{
            fill: #fff;
            width: 0.5rem;
            height: 0.5rem;
        }
        .play.icon{
            width: 1rem;
            height: 1rem;
        }
      }

    .footerTop{
        width: 7.5rem;
        height: 1.5rem;
        position: absolute;
        left: 0;
        bottom:2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.8rem;
         .icon{
            fill: #fff;
            width: 0.7rem;
            height: 0.8rem;
        }
    }
    .footerContent{
        width: 7.5rem;
        height: 1.5rem;
        position: absolute;
        left: 0;
        bottom:1.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.8rem;
        .range{
            width:100%;
            height:0.06rem;
        }
    }
       
    }
     .playLyric{
         p{
             margin-bottom:0.5rem;
         }
        position: absolute;
        width:7.5rem;
        height: 7rem;
        left: 0;
        top: calc(50% - 4rem);
        overflow: scroll;
        text-align: center;
        color: #fff;
        padding: 0.2rem 0;
        .active{
            color: red;
            font-size:.6rem;
        }
        
        
    
    }

}
</style>
