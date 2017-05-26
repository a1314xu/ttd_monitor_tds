<template>
  <div id="loopRatioApi">
    <v-navListApi></v-navListApi>
    <div>
      <div class="content">
        <div class="row">
          <div class="col-md-11">
            <table class="table table-bordered table-hover table-responsive "
                   style="position: relative;left: 40px;top: 20px;">
              <caption style="text-align: left;font-size: 30px">{{tag1}}-环比率</caption>
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
          :total="(dataList||[]).length"><!--total是总的数据条数-->
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  import navListApi from '../components/sidebar/navListApi.vue'
  export default {
    name: 'loopRatioApi',
    components: {
      'v-navListApi': navListApi
    },
    data: function () {
      return {
        tag2: "",
        tag3: "",
        currentPage: 1,//当前页
        pageList: [],//每页存放的列表数据,14条
        selectedNumber:"",
        //表格内容
        avgList: [],
        ninetyFiveLineList: [],
        failurePercentList: [],
        dataList: []
      }
    },
    created: function () {
      var me = this
      me.tag1 = window.apiProperty.tag1
      me.tag2 = window.apiProperty.tag2
      me.tag3 = window.apiProperty.tag3
      me.selectedNumber=window.apiProperty.selectedNumber
      me.avgList = window.apiProperty.data.avgList
      me.ninetyFiveLineList = window.apiProperty.data.ninetyfiveLineList
      me.failurePercentList = window.apiProperty.data.failurePercentList
      me.dealData()
    },
    methods: {
      /** 处理表格数据，给dataList重新赋值*/
      dealData: function () {
        var me = this
        if (me.tag2 == 'AVG') {
          me.dataList = me.avgList
        } else if (me.tag2 == '95line') {
          me.dataList = me.ninetyFiveLineList
        } else {
          me.dataList = me.failurePercentList
        }
        me.pageList = (me.dataList||[]).slice((me.currentPage - 1) * 16, me.currentPage * 16)
        me.search()

      },
      search: function () {
        var me = this
        var temp = []
        me.dealData()
        me.dataList.forEach(function (item) {
          if ((item.devGroup) == (me.tag3)) {
            temp.push(item)
          }
          if (me.tag3 == '不限') {
            temp = me.dataList
          }
        })

        if(me.selectedNumber==10){
          temp=temp.slice(0, 10)
        }
        else if(me.selectedNumber==20){
          temp=temp.slice(0, 20)
        }else{
        }
        me.dataList = temp
        me.pageList = (me.dataList || []).slice((me.currentPage - 1) * 13, me.currentPage * 13)
      },
      /**分页*/
      handleCurrentChange: function (currentPage) {
        //当前页面变换
        this.currentPage = currentPage
        this.pageList = (this.dataList||[]).slice((this.currentPage - 1) * 16, this.currentPage * 16 )
      }
    }


  }
</script>


<style>
  #loopRatioApi {
    overflow: hidden;
  }
</style>
