<template>
  <div id="loopRatio">
    <v-navListApi></v-navListApi>
    <div>
      <div class="content">
        <div class="row">
          <div class="col-md-11">
            <table class="table table-bordered table-hover table-responsive "
                   style="position: relative;left: 40px;top: 20px;">
              <caption style="text-align: left;font-size: 30px">OpenAPI耗时-环比率</caption>
              <thead>
              <tr role="row" class="row-header">
                <th>业务名称</th>
                <th>接口名</th>
                <th>上上周均值</th>
                <th>上周均值</th>
                <th>环比率</th>
                <th>开发组</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in pageList">
                <td>{{item.businessName}}</td>
                <td>{{item.interfaceName}}</td>
                <td>{{item.priorprioravg}}</td>
                <td>{{item.prioravg}}</td>
                <td>{{item.loopRatio}}</td>
                <td>{{item.developGroup}}</td>
              </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
      <!--分页-->
      <div style="position: absolute;bottom: 110px;right: 110px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="16"
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
        name: 'loopRatio',
        components:{
        'v-navListApi':navListApi
      },
      data: function () {
        return {
          currentPage: 1,//当前页
          pageList: [],//每页存放的列表数据,14条
          dataList: [
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
             "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
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
            },  {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },
            {
              "id": "1",
              "businessName": "门票-产品图片查询",
              "interfaceName": "scenicspotimagelist",
              "priorprioravg":"14",
              "prioravg":"16",
              "loopRatio": "12.65%",
              "developGroup": "商品组"
            },],

        }
      },
      created: function () {
        this.searchList()
        this.pageList = this.dataList.slice((this.currentPage - 1) * 16, this.currentPage * 16- 1)

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
          this.pageList = this.dataList.slice((this.currentPage - 1) * 16, this.currentPage * 16 - 1)
        }
      }

    }
</script>


<style>
  #loopRatio{
    overflow: hidden;
  }
</style>
