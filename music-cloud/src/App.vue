<template>
  <router-view/>
  <PlayController v-show="$store.state.isFooterMusic"/>
</template>

<script>
import PlayController from './components/item/PlayController.vue'
export default{
  components:{
    PlayController,
  }
}
</script>

<style lang="less">
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}
.icon{
  width:.7rem;
  height:.7rem;
}
a{
  color:black;
}

</style>
