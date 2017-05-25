<template>
  <div id="sameRatioPage">
    <v-navListApi></v-navListApi>
    <div>
      <div class="content">
        <div class="row">
          <div class="col-md-11">
            <table class="table table-bordered table-hover table-responsive "
                   style="position: relative;left: 40px;top: 20px;">
              <caption style="text-align: left;font-size: 30px">{{tag1}}-同比率</caption>
              <thead>
              <tr role="row" class="row-header">
                <th>渠道名称</th>
                <th>页面名称</th>
                <th>基准值</th>
                <th v-if="tag2=='DOMready'">上周DOMready均值</th>
                <th v-if="tag2=='JSError'">上周JSError均值</th>
                <th v-if="tag2=='RestfulFailed'">上周RestfulFailed均值</th>
                <th>同比率</th>
                <th>开发组</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in pageList" v-if="tag2=='DOMready'">
                <td>{{item.channelName}}</td>
                <td>{{item.pageName}}</td>
                <td>{{item.baseAvg}}</td>
                <td>{{item.avg}}</td>
                <td>{{item.tb}}</td>
                <td>{{item.devGroup}}</td>
              </tr>
              <tr v-for="(item,index) in pageList" v-if="tag2=='JSError'">
                <td>{{item.channelName}}</td>
                <td>{{item.pageName}}</td>
                <td>{{item.basePv}}</td>
                <td>{{item.jsError}}</td>
                <td>{{item.tb}}</td>
                <td>{{item.devGroup}}</td>
              </tr>
              <tr v-for="(item,index) in pageList" v-if="tag2=='RestfulFailed'">
                <td>{{item.channelName}}</td>
                <td>{{item.pageName}}</td>
                <td>{{item.baseTotal}}</td>
                <td>{{item.total}}</td>
                <td>{{item.tb}}</td>
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
    export default {
        name: 'sameRatioApi',
        components:{
            'v-navListApi':navListApi
        },
      data: function () {
        return {
          tag1: "",
          tag2: "",
          tag3: "",
          currentPage: 1,//当前页
          pageList: [],//每页存放的列表数据,14条
          //表格内容
          DomReadyList: [],
          jsErrorAndPVList: [],
          restfulFailedList: [],
          dataList: []
        }
      },
      created: function () {
        var me = this
        me.tag1 = window.pageProperty.tag1
        me.tag2 = window.pageProperty.tag2
        me.tag3 = window.pageProperty.tag3
        me.DomReadyList = window.pageProperty.data.avgList
        me.jsErrorAndPVList = window.pageProperty.data.jsErrorAndPvDtoList
        me.restfulFailedList = window.pageProperty.data.restfulDtoList
        me.dealData()
      },
      methods: {
        /** 处理表格数据，给dataList重新赋值*/
        dealData: function () {
          var me = this
          if (me.tag2 == 'DOMready') {
            me.dataList = me.DomReadyList
          } else if (me.tag2 == 'JSError') {
            me.dataList = me.jsErrorAndPVList
          } else {
            me.dataList = me.restfulFailedList
          }
          me.pageList = me.dataList.slice((me.currentPage - 1) * 16, me.currentPage * 16)
          me.search()

        },
        /**主要用于筛选三级类目*/
        search: function () {
          var me = this
          var temp = []
          if (me.tag3 == '不限') {
            temp = me.dataList
          }else{
            me.dataList.forEach(function (item) {
              if ((item.devGroup.trim()) == (me.tag3)) {
                temp.push(item)
              }
            })
          }
          me.dataList = temp
          me.pageList = me.dataList.slice((me.currentPage - 1) * 13, me.currentPage * 13)
        },
        /**分页*/
        handleCurrentChange: function (currentPage) {
          //当前页面变换
          this.currentPage = currentPage
          this.pageList = this.dataList.slice((this.currentPage - 1) * 16, this.currentPage * 16 )
        }
      }
    }
</script>


<style>
  #sameRatioPage{
    overflow: hidden;
  }
</style>
