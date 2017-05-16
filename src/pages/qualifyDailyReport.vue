<template>
  <div id="playDailyReport">
    <div class="main">
      <v-navListApi></v-navListApi>
      <div class="content">
        <div class="content-top">
          <div class="form-group">
            <div style="float:left;margin-right: 10px">
              <label class="level">日期</label>
              <el-date-picker
                v-model="date"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions0">
              </el-date-picker>
            </div>
          </div>
        </div>
        <!--tab分页区域-->
        <div style="position: relative;left: 40px;top: 80px;">
          <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="接口性能" name="first">
              <el-table :data="firstData" style="width: 100%;">
                <el-table-column type="index" width="100" align="center"></el-table-column>
                <el-table-column prop="bussinessName" label="业务名称" width="280" align="center"></el-table-column>
                <el-table-column prop="interfaceName" label="接口名" width="280" align="center"></el-table-column>
                <el-table-column prop="avg" label="AVG" width="180" align="center"></el-table-column>
                <el-table-column prop="devGroup" label="开发组" width="280" align="center"></el-table-column>
                <el-table-column prop="critical" label="是否核心页面" width="180" align="center"></el-table-column>
              </el-table>
              <!--底部标识-->
              <div style="margin-top: 20px">
                <!--基准值-->
                <div style="float:left;">
                  基准值：OpenAPI ≥ 200ms,Restful ≥ 400ms
                </div>
                <!--分页-->
                <div style="float: right;margin-right: 40px">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="13"
                    layout="total, prev, pager, next"
                    :total="firstDataList.length"><!--total是总的数据条数-->
                  </el-pagination>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="页面DOMready" name="second">
              <el-table :data="secondDataList" style="width: 100%">
                <el-table-column type="index" width="100" align="center"></el-table-column>
                <el-table-column prop="channelName" label="渠道名称" width="180" align="center"></el-table-column>
                <el-table-column prop="pageName" label="页面名称" width="180" align="center"></el-table-column>
                <el-table-column prop="pageId" label="Page ID" width="180" align="center"></el-table-column>
                <el-table-column prop="avg" label="DOMready" width="180" align="center"></el-table-column>
                <el-table-column prop="devGroup" label="开发组" width="180" align="center"></el-table-column>
                <el-table-column prop="critical" label="是否核心页面" width="180" align="center"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="页面JS错误率" name="third">
              <el-table :data="thirdDataList" style="width: 100%">
                <el-table-column type="index" width="100" align="center"></el-table-column>
                <el-table-column prop="channelName" label="渠道名称" width="180" align="center"></el-table-column>
                <el-table-column prop="pageName" label="页面名称" width="180" align="center"></el-table-column>
                <el-table-column prop="pageId" label="Page ID" width="180" align="center"></el-table-column>
                <el-table-column prop="pv" label="PV" width="180" align="center"></el-table-column>
                <el-table-column prop="jsError" label="JSError" width="180" align="center"></el-table-column>
                <el-table-column prop="errorPercent" label="JSError/PV" width="180" align="center"></el-table-column>
                <el-table-column prop="devGroup" label="开发组" width="180" align="center"></el-table-column>
                <el-table-column prop="critical" label="是否核心页面" width="180" align="center"></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import navListApi from '../components/sidebar/navListApi.vue'
  export default {
    name: 'qualifyDailyReport',
    components: {
      'v-navListApi': navListApi
    },
    data: function () {
      return {
        activeName: "first",
        currentPage: 1,//当前页
        pageList: [],//每页存放的列表数据,14条
        date: new Date().getTime() - 24 * 60 * 60 * 1000,
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - (8.64e7 + 7 * 24 * 60 * 60 * 1000);
          }
        },
        firstDataList: [{
          bussinessName: "玩乐-下单接口(.NET)",
          interfaceName: "creategfhgforder",
          avg: "250",
          devGroup: "商品组",
          critical: "是"
        },
          {
            bussinessName: "玩乐-下单接口(.NET)",
            interfaceName: "createorder",
            avg: "250",
            devGroup: "商品组",
            critical: "是"
          },
          {
            bussinessName: "玩乐-下单接口(.NET)",
            interfaceName: "createorder",
            avg: "250",
            devGroup: "商品组",
            critical: "是"
          },
          {
            bussinessName: "玩乐-下单接口(.NET)",
            interfaceName: "createorder",
            avg: "250",
            devGroup: "商品组",
            critical: "是"
          },
          {
            bussinessName: "玩乐-下单接口(.NET)",
            interfaceName: "createorder",
            avg: "250",
            devGroup: "商品组",
            critical: "是"
          },
          {
            bussinessName: "玩乐-下单接口(.NET)",
            interfaceName: "createorder",
            avg: "250",
            devGroup: "商品组",
            critical: "是"
          },
          {
            bussinessName: "玩乐-下单接口(.NET)",
            interfaceName: "createorder",
            avg: "250",
            devGroup: "商品组",
            critical: "是"
          },
          {
            bussinessName: "玩乐-下单接口(.NET)",
            interfaceName: "createorder",
            avg: "250",
            devGroup: "商品组",
            critical: "是"
          },
          {
            bussinessName: "玩乐-下单接口(.NET)",
            interfaceName: "createorder",
            avg: "250",
            devGroup: "商品组",
            critical: "是"
          },
          {
            bussinessName: "玩乐-下单接口(.NET)",
            interfaceName: "createorder",
            avg: "250",
            devGroup: "商品组",
            critical: "是"
          },
          {
            bussinessName: "玩乐-下单接口(.NET)",
            interfaceName: "createorder",
            avg: "250",
            devGroup: "商品组",
            critical: "是"
          },
          {
            bussinessName: "玩乐-下单接口(.NET)",
            interfaceName: "createorder",
            avg: "250",
            devGroup: "商品组",
            critical: "是"
          },
          {
            bussinessName: "玩乐-下单接口(.NET)",
            interfaceName: "createorder",
            avg: "250",
            devGroup: "商品组",
            critical: "是"
          },
          {
            bussinessName: "玩乐-下单接口(.NET)",
            interfaceName: "createorder",
            avg: "250",
            devGroup: "商品组",
            critical: "是"
          },
          {
            bussinessName: "玩乐-下单接口(.NET)",
            interfaceName: "createorder",
            avg: "250",
            devGroup: "商品组",
            critical: "是"
          },
          {
            bussinessName: "玩乐-下单接口(.NET)",
            interfaceName: "createorder",
            avg: "250",
            devGroup: "商品组",
            critical: "是"
          },
          {
            bussinessName: "玩乐-下单接口(.NET)",
            interfaceName: "createorder",
            avg: "250",
            devGroup: "商品组",
            critical: "是"
          },
          {
            bussinessName: "玩乐-下单接口(.NET)",
            interfaceName: "createorder",
            avg: "250",
            devGroup: "商品组",
            critical: "是"
          },
          {
            bussinessName: "玩乐-下单接口(.NET)",
            interfaceName: "createorder",
            avg: "250",
            devGroup: "商品组",
            critical: "是"
          },
          {
            bussinessName: "玩乐-下单接口(.NET)",
            interfaceName: "createorder",
            avg: "250",
            devGroup: "商品组",
            critical: "是"
          },
        ],
        firstData: [],
        secondDataList: [],
        thirdDataList: [],
        dataList: [
          {
            "id": "3",
            "businessName": "玩乐-下单接口(JAVA)",
            "interfaceName": "CreateOrde",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "4",
            "businessName": "门票-下单接口",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "订单组"
          },
          {
            "id": "5",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "6",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "7",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "8",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "9",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "10",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "11",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "12",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "13",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          }, {
            "id": "14",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "15",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          }, {
            "id": "16",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "17",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "18",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "19",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "20",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "21",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "22",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "23",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "24",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "25",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "26",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "27",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "28",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "29",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "30",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "31",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "32",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "33",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "34",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "35",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "36",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "37",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },
          {
            "id": "38",
            "businessName": "玩乐-下单接口(.NET)",
            "interfaceName": "createorder",
            "AVG": 186,
            "developGroup": "商品组"
          },],

      }
    },
    created: function () {
      this.searchList()
      this.pageList = this.dataList.slice((this.currentPage - 1) * 13, this.currentPage * 13 - 1)
      this.firstData = this.firstDataList.slice((this.currentPage - 1) * 13, this.currentPage * 13 - 1)
    },
    methods: {
      searchList: function () {
        this.$http.get(
          '',
          {}
        ).then(response => {

        }, response => {
        });
      },
      /**
       * tab切换事件
       * @param tab
       * @param event
       */
      handleClick(tab, event) {
        console.log(tab, event);
      },
      /**
       * 分页事件
       * @param currentPage
       */
      handleCurrentChange: function (currentPage) {
        //当前页面变换
        this.currentPage = currentPage
        this.firstData = this.firstDataList.slice((this.currentPage - 1) * 13, this.currentPage * 13 - 1)
      }
    }

  }

</script>


<style>
  #playDailyReport {
    overflow: hidden;
  }
</style>
