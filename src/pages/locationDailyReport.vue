<template>
  <div id="locationDailyReport">
    <!--<v-navListApi></v-navListApi>-->
    <div class="content">
      <div class="row">
        <div class="col-md-11">
          <table class="table table-bordered table-hover table-responsive "
                 style="position: relative;left: 40px;top: 20px;">
            <caption style="text-align: left;font-size: 30px">7天定位数据</caption>
            <thead>
            <tr>
              <th>国内</th>
              <th v-for="item in dataList">{{item}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in homeList">
              <td>{{item.date.substr(0,10)}}</td>
              <td>{{item.unOpenPositioningRate}}</td>

              <td>{{item.baseFailureRate}}</td>
              <td>{{item.abandonPositioningRate}}</td>
              <td>{{item.drlExceptionRate}}</td>

              <td>{{item.drNullRate}}</td>
              <td>{{item.totalFailRate}}</td>
              <td>{{item.totalSuccessRate}}</td>
            </tr>
            </tbody>
          </table>

          <table class="table table-bordered table-hover table-responsive "
                 style="position: relative;left: 40px;top: 20px;">
            <thead>
            <tr>
              <th>国外</th>
              <th v-for="item in dataList">{{item}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in abroadList">
              <td>{{item.date.substr(0,10)}}</td>
              <td>{{item.unOpenPositioningRate}}</td>
              <td>{{item.baseFailureRate}}</td>
              <td>{{item.abandonPositioningRate}}</td>
              <td>{{item.drlExceptionRate}}</td>
              <td>{{item.drNullRate}}</td>
              <td>{{item.totalFailRate}}</td>
              <td>{{item.totalSuccessRate}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import navListApi from '../components/sidebar/navListApi.vue'
  export default {
    name: 'locationDailyReport',
    components: {
      'v-navListApi': navListApi
    },
    data: function () {
      return {
        homeList: [],
        abroadList: [],
        dataList: ["用户未开启定位率", "基础定位失败率", "用户放弃定位率", "目的地反查异常率", "目的地反查无结果率", "总失败率", "总成功率"]
      }
    },
    created: function () {
      var me = this
      me.searchList()
      me.searchAbroadList()
    },
    methods: {
      searchList: function () {
        var me = this;
        $.ajax({
          type: "get",
          url: "http://10.8.85.36:8086/tds-web/reportApi/getPositionDailyReport",
          data: {
            area: 0,
          },
          success: function (data) {
            me.homeList = data.positionDataList
          }
        });
      },
      searchAbroadList: function () {
        var me = this;
        $.ajax({
          type: "get",
          url: "http://10.8.85.36:8086/tds-web/reportApi/getPositionDailyReport",
          data: {
            area: 1,
          },
          success: function (data) {
            me.abroadList=data.positionDataList
          }
        });
      }
    }
  }
</script>


<style>
</style>
