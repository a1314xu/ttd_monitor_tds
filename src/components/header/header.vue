<template>
  <div class="top">
    <ul>
      <li><!--vlh凌桦--><span class="glyphicon glyphicon-cog" style="margin-left: 5px;font-size: 16px"></span></li>
      <li >
        <el-dropdown trigger="click" menu-align="start">
        <span class="el-dropdown-link" style="color: #fff;font-size: 20px">平台<i
          class="el-icon-caret-bottom el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toolPlatform">工具平台</el-dropdown-item>
            <el-dropdown-item @click.native="reportPlatform">报表平台</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>


      <li>
        <router-link to="home">主页</router-link>
      </li>
    </ul>
    <span style="font-family:'Meiryo Negreta cursiva', 'Meiryo Normal', 'Meiryo';
      font-weight:700;font-style:italic;font-size: 26px">TDS</span>
    &nbsp;
    <span style="font-family:'Arial Normal', 'Arial';
      font-weight:400;font-style:normal;font-size:20px;">平台</span>
  </div>

</template>

<script>
  export default {
    name: 'header',
    methods: {
      toolPlatform:function () {
        app.$router.push("CAT")
      },
      reportPlatform:function () {
        app.$router.push("apiProperty")

      }
    }
  }
</script>


<style>
  .top {
    position: relative;
    top: 0px;
    height: 70px;
    width: 100%;
    text-align: left;
    background-color: #336699;
    line-height: 80px;
    color: white;
    padding-left: 20px;
    overflow: hidden;
  }

  .top ul li {
    text-decoration: none;
    list-style: none;
    float: right;
    margin-left: 20px;
    margin-right: 15px;
    font-size: 20px;
  }

  .top ul li a {
    color: white;
  }

  .top ul li a:link, hover, visited, active {
    text-decoration: none;
  }
</style>
