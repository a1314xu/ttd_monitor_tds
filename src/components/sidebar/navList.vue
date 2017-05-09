<template>
  <div id="leftNav" >
    <el-menu default-active="cat" class="el-menu-vertical-demo leftNav " v-bind:style="{ height: screenHeight +'px'}" :default-openeds=openeds  router>
      <el-submenu index="dataSource">
        <template slot="title">数据源
        </template>
        <el-menu-item-group>
          <el-menu-item index="cat">CAT
          </el-menu-item>
          <el-menu-item index="dashboard">Dashboard
          </el-menu-item>
          <el-menu-item index="listPage">任务列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="2">图表
      </el-menu-item>
      <el-menu-item index="3">看板
      </el-menu-item>
      <el-menu-item index="4">告警规则
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'navList',
    data: function () {
        return {
          screenHeight:$(window).height()-150,
          openeds:['1']
        }
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

  .leftNav a:link {
    text-decoration: none;
  }
</style>
