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
                <th v-if="tag2=='AVG'">上上周AVG均值</th>
                <th v-if="tag2=='AVG'">上周AVG均值</th>
                <th v-if="tag2=='95line'">上上周95line均值</th>
                <th v-if="tag2=='95line'">上周95line均值</th>
                <th v-if="tag2=='Failure%'">上上周Failure%均值</th>
                <th v-if="tag2=='Failure%'">上周Failure%均值</th>
                <th>环比率</th>
                <th>开发组</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in pageList" v-if="tag2=='AVG'">
                <td>{{item.bussinessName}}</td>
                <td>{{item.interfaceName}}</td>
                <td>{{item.beforeAvg}}</td>
                <td>{{item.avg}}</td>
                <td>{{item.hb}}</td>
                <td>{{item.devGroup}}</td>
              </tr>
              <tr v-for="(item,index) in pageList" v-if="tag2=='95line'">
                <td>{{item.bussinessName}}</td>
                <td>{{item.interfaceName}}</td>
                <td>{{item.beforeNinetyfiveLine}}</td>
                <td>{{item.ninetyfiveLine}}</td>
                <td>{{item.hb}}</td>
                <td>{{item.devGroup}}</td>
              </tr>
              <tr v-for="(item,index) in pageList" v-if="tag2=='Failure%'">
                <td>{{item.bussinessName}}</td>
                <td>{{item.interfaceName}}</td>
                <td>{{item.beforeFailPercent}}</td>
                <td>{{item.failPercent}}</td>
                <td>{{item.hb}}</td>
                <td>{{item.devGroup}}</td>
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
  import apiMix from './apiProperty.vue'
  export default {
    mixins: [apiMix],
    name: 'loopRatio',
    components: {
      'v-navListApi': navListApi
    },
    data: function () {
      return {}
    },
    created: function () {
//        debugger;
//        console.log(this.pageList)
//        console.log(this.tag2)
    },
    methods: {
    },
    mounted:function(){
//      debugger;
//      console.log(this.pageList)
//      console.log(this.tag2)
    }


  }
</script>


<style>
  #loopRatio {
    overflow: hidden;
  }
</style>
