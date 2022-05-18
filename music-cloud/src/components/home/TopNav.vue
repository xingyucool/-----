<template>
  <div class = "topNav">
      <div class="topLeft">
         <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
         </svg>
      </div>
     
      <div class="topContent">  
        <span @click="$router.push('/me')">我的</span>
        <span class="active">发现</span>
        <span>云村</span>
        <span>视频</span>
      </div>
      <div class="topRight">
        <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
          <use xlink:href="#icon-sousuo"></use>
         </svg>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .topNav{
    width:100%;
    height:100%;
    padding:0.2rem;
    display:flex;
    justify-content: space-between;
    align-items: center;
    .topContent{
        width:100%;
        display:flex;
        height:100%;
        justify-content: space-around;
        align-items: center;
        font-size: 0.5rem;
        .active{
          font-weight:900
        }
    }
  }
  
</style>