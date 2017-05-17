<template>
  <div id="pageProperty">
    <div class="main">
      <v-navListApi></v-navListApi>
      <div class="content">
        <div class="content-top">
          <div class="form-group">
            <label class="level">一级类目:</label>
            <div class="tag">
              <div class="btn btn-primary dis  category" type="button" data-tag="Hybird">Hybird</div>
              <div class="btn btn-default dis  category" type="button" data-tag="H5">H5</div>
              <div class="btn btn-default dis category" type="button" data-tag="Online">Online</div>
            </div>
          </div>
          <div class="form-group ">
            <label class="level">二级类目:</label>
            <div class="tag secondContainer">
              <div class="btn btn-primary dis category" type="button">DOMready</div>
              <div class="btn btn-default dis category" type="button">JSError / PV</div>
              <div class="btn btn-default dis category" type="button">Restful Failed</div>
            </div>
          </div>
          <div class="form-group">
            <label class="level">三级类目:</label>
            <div class="tag">
              <template v-for="item in typeList">
                <div class="btn btn-primary dis" type="button">{{item}}</div>
              </template>
            </div>
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-md-11">
              <table class="table table-bordered table-hover table-responsive "
                     style="position: relative;left: 40px;top: 20px;">
                <thead>
                <tr role="row" class="row-header">
                  <th>top10</th>
                  <th>渠道名称</th>
                  <th>页面名称</th>
                  <th>Page ID</th>
                  <th>PV</th>
                  <th>JSError</th>
                  <th>JSError/PV</th>
                  <th>开发组</th>
                  <th>是否核心页面</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in pageList">
                  <td>{{item.id}}</td>
                  <td>{{item.channelName}}</td>
                  <td>{{item.pageName}}</td>
                  <td>{{item.pageId}}</td>
                  <td>{{item.pv}}</td>
                  <td>{{item.JSError}}</td>
                  <td>{{item.JSError/PV}}</td>
                  <td>{{item.developGroup}}</td>
                  <td>{{item.developGroup}}</td>

                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!--同比环比-->
        <div style="position: absolute;bottom: 110px;left: 300px;">
          <router-link to="loopRatio">查看环比</router-link>&nbsp;&nbsp;
          <router-link to="sameRatio">查看同比</router-link>
        </div>
        <div style="position: absolute;bottom: 110px;right: 110px;">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="13"
            layout="total, prev, pager, next"
            :total="dataList.length"><!--total是总的数据条数-->
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import navListApi from '../components/sidebar/navListApi.vue'
  export default {
    name: 'pageProperty',
    components: {
      'v-navListApi': navListApi
    },
    data: function () {
      return {
        currentPage: 1,//当前页
        pageList: [],//每页存放的列表数据,14条
        typeList: [],
        dataList: [
          {
            "id": "1",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "developGroup": "商品组"
          },
          {
            "id": "2",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"

          },
          {
            "id": "3",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "4",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"

          },
          {
            "id": "5",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "6",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "7",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "8",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "9",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "10",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "11",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "12",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "13",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "14",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "15",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "16",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "17",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "18",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "19",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "20",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "21",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "22",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "23",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "24",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "25",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "26",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "27",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "28",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "29",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },
          {
            "id": "30",
            "channelName": "门票_Hybrid",
            "pageName": "订单填写-现付",
            "pageId": 186,
            "pv": "24324",
            "JSError": "122",
            "JSError/PV": "0.22%",
            "开发组": "商品组",
            "developGroup": "商品组"
          },],
      }
    },

    created: function () {
      this.searchList()
      this.pageList = this.dataList.slice((this.currentPage - 1) * 13, this.currentPage * 13 - 1)
      this.searchList()

    },

//    mounted: function () {
//      $('.category').on('click', function (e) {
//          var dataset = e.currentTarget.dataset;
//          $('.category').removeClass('red')
//          $(e.currentTarget).addClass('red')
//          var tag = dataset.tag;
//
//          var html = '<div>555</div>'
//          if(tag==='H5'){
//            config.H5
//          }
//          if(tag==='Hybird')
//          // 根据你选的，然后读配置，挂上去
//
//          $('.secondContainer').html(html);
//        }
//      )
//      // 默认挂哪一个
//      var html = '<div>22222</div>'
//      $('.secondContainer').html(html);
//    },

    methods: {
      searchList: function () {
        var me = this;
        $.ajax({
          type: "get",
          url: "http://10.8.85.36:8086/tds-web/reportApi/getPagePerformanceV2",
          data: {
            pageType: 1,
            reportType: 0,
          },
          success: function (data) {
            me.typeList = data.pagePerformanceList.jserrorDevGroupList;
            debugger
          }
        });
      },
      handleCurrentChange: function (currentPage) {
        //当前页面变换
        this.currentPage = currentPage
        this.pageList = this.dataList.slice((this.currentPage - 1) * 13, this.currentPage * 13 - 1)
      }
    }
  }
</script>


<style>
  #pageProperty {
    overflow: hidden;
  }

  /*.red {*/
    /*background: red !important;*/
  /*}*/
</style>
