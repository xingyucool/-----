import { createStore } from 'vuex'
import {getMusicLyric} from '@/request/api/item.js'
import {getAccount} from '@/request/api/home.js'
export default createStore({
  state: {
    playList:[{
      name:"雨爱",
      al:{
        picUrl: "https://p1.music.126.net/i252qk_tjnKFPIUYVJKHwA==/109951165186964694.jpg",
      },
      id:1467090928,
      ar:[{name:'周星宇'}]
    }],
    playCurrentIndex:0,
    isbtnShow:true, //按钮显示
    detailShow:false,//歌曲详情页
    lyricList:{},//歌词对象
    currentTime:0,//当前时间
    duration:0,//获取完整时间
    isLogin:false, //判断登录
    isFooterMusic:true,//是否显示底部组件
    token:'',//保存登录信息
    user:{},//用户信息

  },
  getters: {
  },
  mutations: {
    setPlayList:function(state,value){
      state.playList = value
    },
   updateIsbtnShow(state,value){
    state.isbtnShow=value
   },
   updatePlayList(state,value){
    state.playList=value
    console.log('index歌单列表',state.playList)
   },
   updatePlayCurrentIndex(state,value){
     state.playCurrentIndex=value
    } ,
    updateDetailShow(state){
      state.detailShow=!state.detailShow
    },
    updateLyricList(state,value){
      state.lyricList = value
    },
    updateCurrentTime(state,value){
      console.log('更新当前时间中的当前时间',state.currentTime)
      state.currentTime = value
    },
    updateDuration(state,value){
      state.duration = value
    },
    pushPlaylist(state,value){
      state.playList.push(value)
    },
    updateIsLogin(state,value){
      state.isLogin = true
    },
    updateToken(state,value){
      state.token=value
      localStorage.setItem('token',state.token)
    },
    updateUser(state,value){
      state.user = value
    }




  },
  actions: {
     getLyric:async function(context,value){
      let res = await getMusicLyric(value)
      console.log('歌词对象',res)
      context.commit('updateLyricList',res.data.lrc)
    },
    async getLogin(context,value){
      let res = await getAccount(value)
      //console.log('登录信息',res)
      return  res
    }
  },
  modules: {
  }
})
