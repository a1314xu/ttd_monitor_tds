<template>
  <div id="leftNav">
    <el-menu default-active="apiProperty" class="el-menu-vertical-demo leftNav" v-bind:style="{ height: screenHeight +'px'}" >
      <el-menu-item index="apiProperty">接口性能大盘
      </el-menu-item>
      <el-menu-item index="pageProperty" >页面性能大盘
      </el-menu-item>
      <el-menu-item index="playDailyReport">玩乐日报
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'navList',
    data: function () {
      return {
        screenHeight:$(window).height()-150
      }
    },
    method:{

    }
  }
</script>


<style>
  .leftNav {
    background: #e4e4e4;
    width: 13%;
    float: left;
  }

  .leftNav a {
    display: block;
    text-decoration: none;
    color: rgba(51, 102, 153, 1);
    font-size: 20px;
    margin: 0 auto;
  }



</style>
