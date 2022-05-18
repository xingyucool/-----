<template>
    <ItemMusicTop :playList="state.playList"/>
    <ItemMusicList :itemList="state.itemList" :playList="state.playList"/>
</template>
<script>
import { useRoute } from 'vue-router'
import { onMounted,reactive } from 'vue'
import {getMusicItemList,getItemList} from '@/request/api/item.js'
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
import ItemMusicList from '@/components/item/ItemMusicList.vue'
export default {
    setup() {
        let state = reactive({
            playList:{},//歌单详情
            itemList:[],//歌单歌曲 
        })
        onMounted(async ()=>{
            let id = useRoute().query.id //接收歌单id
            console.log('@id',useRoute())
            let res = await getMusicItemList(id)
            console.log('@歌单列表请求对象',res)
            state.playList=res.data.playlist
            //把数据存储到本地存储中

            let result = await getItemList(id)
            console.log('@歌单歌曲',result)
            state.itemList=result.data.songs
            
            localStorage.setItem('itemDetail',JSON.stringify(state))
    
        })
        return {state}
    },
    components:{
        ItemMusicTop,
        ItemMusicList,
    }
}
</script>
