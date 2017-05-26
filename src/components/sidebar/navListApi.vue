<template>
  <div class="leftNav">
    <!--<el-menu default-active="1" class="el-menu-vertical-demo leftNav" v-bind:style="{ height: screenHeight +'px'}"  :default-openeds="openeds">-->
      <!--<el-menu-item index="1">-->
        <!--<router-link to="apiProperty">接口性能大盘</router-link>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="2" >-->
        <!--<router-link to="pageProperty">页面性能大盘</router-link>-->
      <!--</el-menu-item>-->
      <!--<el-submenu index="3">-->
        <!--<template slot="title">-->
          <!--<router-link to="">玩乐日报</router-link></template>-->
          <!--<el-menu-item index="3-1">-->
            <!--<router-link to="qualifyDailyReport">质量日报</router-link>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="3-2">-->
            <!--<router-link to="locationDailyReport">定位日报</router-link>-->
          <!--</el-menu-item>-->
      <!--</el-submenu>-->
    <!--</el-menu>-->
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router v-bind:style="{ height: screenHeight +'px'}">
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index">
            <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index">
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'navList',
    data: function () {
      return {
        screenHeight:$(window).height()-150,
//        openeds:['3']
        items: [
          {
            icon: 'el-icon-setting',
            index: 'apiProperty',
            title: '接口性能大盘'
          },
          {
            icon: 'el-icon-star-on',
            index: 'pageProperty',
            title: '页面性能大盘'
          },
          {
            icon: 'el-icon-menu',
            index: '3',
            title: '玩乐日报',
            subs: [
              {
                index: 'qualifyDailyReport',
                title: '质量日报'
              },
              {
                index: 'locationDailyReport',
                title: '定位日报'
              }
            ]
          },
        ]

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
