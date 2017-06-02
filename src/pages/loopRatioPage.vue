<template>
  <div id="loopRatioPage">
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
                <th>渠道名称</th>
                <th>页面名称</th>
                <th v-if="tag2=='DOMready'">上上周DOMready均值</th>
                <th v-if="tag2=='DOMready'">上周DOMready均值</th>
                <th v-if="tag2=='JSError'">上上周JSError/PV均值</th>
                <th v-if="tag2=='JSError'">上周JSError/PV均值</th>
                <th v-if="tag2=='RestfulFailed'">上上周Restful Failed均值</th>
                <th v-if="tag2=='RestfulFailed'">上周Restful Failed均值</th>
                <th>环比率</th>
                <th>开发组</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in pageList" v-if="tag2=='DOMready'">
                <td>{{item.channelName}}</td>
                <td>{{item.pageName}}</td>
                <td>{{item.beforeAvg}}</td>
                <td>{{item.avg}}</td>
                <td>{{item.hb}}</td>
                <td>{{item.devGroup}}</td>
              </tr>
              <tr v-for="(item,index) in pageList" v-if="tag2=='JSError'">
                <td>{{item.channelName}}</td>
                <td>{{item.pageName}}</td>
                <td>{{item.beforePv}}</td>
                <td>{{item.pv}}</td>
                <td>{{item.hb}}</td>
                <td>{{item.devGroup}}</td>
              </tr>
              <tr v-for="(item,index) in pageList" v-if="tag2=='RestfulFailed'">
                <td>{{item.channelName}}</td>
                <td>{{item.pageName}}</td>
                <td>{{item.beforeTotal}}</td>
                <td>{{item.total}}</td>
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
  export default {
    name: 'loopRatioPage',
    components: {
      'v-navListApi': navListApi
    },
    data: function () {
      return {
        tag1: "",
        tag2: "",
        tag3: "",
        currentPage: 1,//当前页
        selectedNumber: "",
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
      me.selectedNumber = window.pageProperty.selectedNumber
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
        me.dataList.forEach(function (item) {
          if ((item.devGroup.trim()) == (me.tag3)) {
            temp.push(item)
          }
          if (me.tag3 == '不限') {
            if (item.devGroup.trim() !== '海外玩乐(施程组)' && item.devGroup.trim() !== '海外通讯(施程组)' && item.devGroup.trim() !== '营销活动组(陈浩组)') {
              temp.push(item)
            }
          }
        })

        if (me.selectedNumber == 10) {
          temp = temp.slice(0, 10)
        }
        else if (me.selectedNumber == 20) {
          if (temp.length > 20) {
            temp = temp.slice(0, 20)
          } else {
            temp = temp
          }
        } else {
          temp = temp
        }
        me.dataList = temp
        me.pageList = (me.dataList || []).slice((me.currentPage - 1) * 16, me.currentPage * 16)
      },
      /**分页*/
      handleCurrentChange: function (currentPage) {
        //当前页面变换
        this.currentPage = currentPage
        this.pageList = this.dataList.slice((this.currentPage - 1) * 16, this.currentPage * 16)
      }
    }


  }
</script>


<style>
  #loopRatioPage {
    overflow: hidden;
  }
</style>
