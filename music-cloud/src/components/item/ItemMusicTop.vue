<template>
    <div class="listViewTop">
        <img class="bg" :src="playList.coverImgUrl">
        <div class="listViewTopNav">
            <div class="back" @click="$router.go(-1)">
                <svg class="icon" aria-hidden="true">
                   <use xlink:href="#icon-zuojiantou"></use>
                </svg>
                <div class="title">
                    歌单
                </div>
            </div>
            <div class="right">
                <svg class="icon search" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                     <use xlink:href="#icon-31liebiao"></use>
                </svg>
            </div>
        </div>
        <div class="content">
            <div class="contentLeft">
                <img :src="playList.coverImgUrl">
                <div class="count"> 
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bofang1"></use>
                    </svg>
                    <span>{{changeValue(playList.playCount) }}</span>
                </div>
            </div>
            <div class="contentRight">
                <h3>{{playList.name}}</h3>
                <div class="author">
                    <img :src="playList.creator.avatarUrl"  class="header">
                    <span>{{playList.creator.nickname}}</span>
                </div>
                <div class="description">
                    {{playList.description}}
                </div>
            </div>
        </div>
        <div class="iconList">
            <div class="iconItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun"></use>
                </svg>
                <span>{{playList.commentCount }}</span> 
            </div>
            <div class="iconItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
                <span>{{playList.shareCount }}</span> 
            </div>
            <div class="iconItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai"></use>
                </svg>
                <span>下载</span> 
            </div>
            <div class="iconItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-duoxuan"></use>
                </svg>
                <span>多选</span> 
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['playList'],
    setup(props) {    //参数props是代理对象
        console.log('@props',props) 
         if(props.playList.creator=''){
             props.creator=JSON.parse(localStorage.getItem('itemDetail'))
        
         }
      function changeValue(num){
          let res = num
          if(num>100000000){
            res = num/100000000
            res = res.toFixed(2)+'亿'
          }
          else if(num>10000){
              res = num/10000
              res = res.toFixed(2)+'万'
          }
          return res
      }
     return {changeValue}
    },
  
}
</script>


<style lang="less" scoped>
.listViewTop{
    width: 7.5rem;
    padding: 0 0.4rem;
    .bg{
        position: fixed;
        left: 0;
        top: 0;
        width: 7.5rem;
        height: auto;
        z-index: -1;
        filter:blur(40px)
    }
    .listViewTopNav{
        display: flex;
        justify-content: space-between;
        align-items:center;
        height: 1.2rem;
        font-size: 0.35rem;
        .icon{
            width: 0.5rem;
            height: 0.5rem;
            fill: #fff;
        }
        .title{
            margin-left: 0.4rem;
        }
        .search{
            margin-right: 0.5rem;
        }
    }
    .back,.right{
        display: flex;
        color: #fff;
    }
    .content{
        display: flex;
        justify-content: space-between;
        padding: 0.6rem 0;
        .contentLeft{
            position: relative;
            img{
                width: 2.8rem;
                height: 2.8rem;
                border-radius: 0.1rem;
            }
           span{
               color:#fff;
               text-shadow: 1px 0 0 rgba(0,0,0,.15);
               background-size: 11px 10px;
               font-size: 0.24rem;
               z-index:3;
            
           }
            
            .count{
                position:absolute;
                right: 0.1rem;
                top: 0.1rem;
                font-size: 0.24rem;
                color: #aaa;
                display: flex;
                align-items: center;
                font-weight: 900;
                .icon{
                        fill: #ccc;
                }
            }
        }
        .contentRight{
            width: 3.5rem;
            h3{
                color: #fff;
            }
            .author{
                display: flex;
                align-items: center;
                margin: 0.2rem 0;
                img.header{
                    width: 0.6rem;
                    height: 0.6rem;
                    border-radius: 0.3rem;
                    margin-right: 0.2rem;
                }
                span{
                    color: #ccc;
                    font-size: .4rem;
                }
            }
            .description{
                font-size: 0.24rem;
                color: #ccc;
                overflow: hidden;
                text-overflow:ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
    .iconList{
        display: flex;
        justify-content: space-around;
        .iconItem{
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon{
                width: 0.6rem;
                height: 0.6rem;
                fill:#fff;
            }
            span{
                font-size: 0.28rem;
                padding-top: 0.3rem;
                color: #fff;
            }
        }
    }

}
</style>