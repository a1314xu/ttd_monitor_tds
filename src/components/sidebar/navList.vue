<template>
  <div class="leftNav" >
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
          screenHeight:$(window).height()-100,
          items: [
            {
              icon: '',
              index: 'dataSource',
              title: '数据源',
              subs: [
                {
                  index: 'CAT',
                  title: 'CAT'
                },
                {
                  index: 'Dashboard',
                  title: 'Dashboard'
                },
                {
                  index: 'listPage',
                  title: '任务列表'
                }
              ]
            },
            {
              icon: '',
              index: 'graphy',
              title: '图表',
            },
            {
              icon: '',
              index: 'board',
              title: '看板',
            },
            {
              icon: '',
              index: 'warnRule',
              title: '告警规则',
            }

          ]
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
