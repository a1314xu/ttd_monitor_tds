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
            <div class="tag">
              <div class="btn btn-primary " type="button" value="OpenAPI">SQA</div>
            </div>
          </div>

          <div class="form-group">
            <label class="level">一级类目:</label>
            <div class="tag">
              <div class="btn btn-primary dis" type="button" value="OpenAPI">接口性能</div>
              <div class="btn btn-default dis" type="button" value="Restful">页面性能</div>
            </div>
          </div>
          <div class="form-group ">
            <label class="level">二级类目:</label>
            <div class="tag">
              <div class="btn btn-primary dis" type="button" value="OpenAPI">OpenAPI</div>
              <div class="btn btn-default dis" type="button" value="Restful">Restful</div>
            </div>
          </div>
          <div class="form-group">
            <label class="level">三级类目:</label>
            <div class="tag">
              <div class="btn btn-primary dis" type="button" value="AVG">AVG</div>
              <div class="btn btn-default dis" type="button" value="95line">95line</div>
              <div class="btn btn-default dis" type="button" value="Failure%">Failure%</div>
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
                  <th>业务名称</th>
                  <th>接口名</th>
                  <th>AVG</th>
                  <th>开发组</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in pageList">
                  <td>{{item.id}}</td>
                  <td>{{item.businessName}}</td>
                  <td>{{item.interfaceName}}</td>
                  <td>{{item.AVG}}</td>
                  <td>{{item.developGroup}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
</template>

<script>
    import navListApi from '../components/sidebar/navListApi.vue'
    export default {
        name: 'playDailyReport',
        components:{
            'v-navListApi':navListApi
        },
      data: function () {
        return {
          currentPage: 1,//当前页
          pageList: [],//每页存放的列表数据,14条
          date:new Date().getTime()-24*60*60*1000,
          pickerOptions0: {
            disabledDate(time) {
              return time.getTime() < Date.now() - (8.64e7+7*24*60*60*1000) ;
            }
          },
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
        handleCurrentChange: function (currentPage) {
          //当前页面变换
          this.currentPage = currentPage
          this.pageList = this.dataList.slice((this.currentPage - 1) * 13, this.currentPage * 13 - 1)
        }
      }

    }

</script>


<style>
  #playDailyReport{
    overflow: hidden;
  }
</style>
