<template>
<div class="playList">
    <div class="playList-top">
        <div class="left">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-playCircle"></use>
            </svg>
            <div class="text">
                <div class="title">播放全部</div>
                <div class="num">（共{{itemList.length}}首）</div>
            </div>
        </div>
        <div class="btn">
            + 收藏（{{changeValue(playList.subscribedCount)}}）
        </div>

    </div>
    <div class="list">
        <div class="playItem" v-for="(item,i) in itemList" :key="i">
            <div class="left" @click="playMusic(i)">
                <div class="index">{{i+1}}</div>
                <div class="content">
                    <div class="title">{{item.name}}</div>
                    <div class="anthor">
                          <span class="name" v-for="(item1,index) in item.ar" :key="index">
                           <span v-if="index!=0&&index!=item.length-1">/</span>  {{item1.name}}   
                        </span>

                    </div>
                </div>
            </div>
            <div class="right">
                <svg class="icon" aria-hidden="true"  v-show="item.mv!=0">
                    <use xlink:href="#icon-shipin1"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-31liebiao"></use>
                </svg>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    props:['itemList','playList'],
    methods:{
         ...mapMutations(['updatePlayList','updatePlayCurrentIndex']),
         changeValue(num){ 
            let res = num;
            if(num > 100000000){
                res = num /100000000
                res = res.toFixed(2)+'亿'
            }
            else if(num >10000){
                res = num / 10000
                res = res.toFixed(2)+'万'
            }
            return res
        },
        playMusic(i){
            this.updatePlayList(this.itemList)
            this.updatePlayCurrentIndex(i)
        }
    }
    
}
</script>

<style lang="less" scoped>
.playList {
    width: 7.5rem;
    padding: 0 0.4rem;
    background-color: #fff;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    margin-top: 0.3rem;

    .playList-top {
        display: flex;
        justify-content: space-between;
        height: 1rem;
        align-items: center;

        .left {
            display: flex;
            align-items: center;

            .icon {
                width: 0.6rem;
                height: 0.6rem;
            }

            .title {
                font-size: 0.34rem;
                font-weight: 900;
            }

            .num {
                font-size: 0.24rem;
                color: #666;
            }

            .text {
                display: flex;
                align-items: center;
                margin-left: 0.2rem;
            }

        }

        .btn {
            font-size: 0.24rem;
            color: #fff;
            background-color: orangered;
            line-height: 0.6rem;
            padding: 0.1rem;
            border-radius: 0.4rem;

        }
    }

    .list {
        .playItem{
            width:auto;
            display:flex;
            justify-content:space-between;
            align-items: center;
            height:1rem;
            margin-top:0.2rem;
            .left{
                display:flex;
                align-items: center;
                color:#666;
                .content{
                     margin-left:0.4rem;
                }
                .title{
                    font-size:0.3rem;
                    font-weight: 100;
                    color:#000;
                    margin-bottom:0.1rem;
                }
                .anthor{
                    color:#666;
                    font-size:0.25rem;
                }
            }
            .right{
                .icon{
                    margin:0 0.2rem;
                    height:0.5rem;
                }
            }
        }
    }
}
</style>
