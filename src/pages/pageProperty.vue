<template>
  <div id="pageProperty">
    <div class="main">
      <v-navListApi></v-navListApi>
      <div class="content">
        <div class="content-top">
          <div class="form-group">
            <label class="level">一级类目:</label>
            <div class="tag">
              <div class="btn btn-default dis  level1 blue" type="button" value="1">Hybird</div>
              <div class="btn btn-default dis  level1" type="button" value="2">H5</div>
              <div class="btn btn-default dis level1" type="button" value="3">Online</div>
            </div>
          </div>
          <div class="form-group ">
            <label class="level">二级类目:</label>
            <div class="tag secondContainer">
              <div class="btn btn-default dis level2 blue" type="button">DOMready</div>
              <div class="btn btn-default dis level2" type="button">JSError / PV</div>
              <div class="btn btn-default dis level2" type="button" v-if="tag1!=='Online'">Restful Failed</div>
            </div>
          </div>
          <div class="form-group">
            <label class="level">三级类目:</label>
            <div class="tag thirdContainer">
              <div class="btn btn-default dis level3" v-for="(item,index) in jserrorDevGroupList"
                   :class="index==0?'blue':''"
                   type="button" v-if="tag2=='JSError / PV'">{{item}}
              </div>
              <div class="btn btn-default dis level3" v-for="(item,index) in restfulDevGroupList"
                   :class="index==0?'blue':''"
                   type="button" v-if="tag2=='Restful Failed'">{{item}}
              </div>
              <div class="btn btn-default dis level3" v-for="(item,index) in domreadyDevGroupList"
                   :class="index==0?'blue':''"
                   type="button" v-if="tag2=='DOMready'">{{item}}
              </div>
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
                  <th v-if="tag2=='DOMready'">AVG</th>
                  <th v-if="tag2=='JSError / PV'">PV</th>
                  <th v-if="tag2=='JSError / PV'">JSError</th>
                  <th v-if="tag2=='JSError / PV'">JSError/PV</th>
                  <th v-if="tag2=='Restful Failed'">Restful Failed</th>
                  <th>开发组</th>
                  <th>是否核心页面</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in pageList" v-if="tag2='DOMready'">
                  <td>{{item.id}}</td>
                  <td>{{item.channelName}}</td>
                  <td>{{item.pageName}}</td>
                  <td>{{item.pageId}}</td>
                  <td>{{item.avg}}</td>
                  <td>{{item.devGroup}}</td>
                  <td>{{item.critical}}</td>
                </tr>
                <tr v-for="(item,index) in pageList" v-if="tag2=='JSError / PV'">
                  <td>{{item.id}}</td>
                  <td>{{item.channelName}}</td>
                  <td>{{item.pageName}}</td>
                  <td>{{item.pageId}}</td>
                  <td>{{item.pv}}</td>
                  <td>{{item.jsError}}</td>
                  <td>{{item.errorPercent}}</td>
                  <td>{{item.devGroup}}</td>
                  <td>{{item.critical}}</td>
                </tr>
                <tr v-for="(item,index) in pageList" v-if="tag2=='Restful Failed'">
                  <td>{{item.id}}</td>
                  <td>{{item.channelName}}</td>
                  <td>{{item.pageName}}</td>
                  <td>{{item.pageId}}</td>
                  <td>{{item. failPercent}}</td>
                  <td>{{item.devGroup}}</td>
                  <td>{{item.critical}}</td>
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
        pageType: 1,
        tag1: "",
        tag2: "DOMready",
        tag3: "",
        //开发组
        DomReadyList: [],
        jsErrorAndPVList: [],
        restfulFailedList: [],
        //按钮组
        domreadyDevGroupList: ["xxx", "xx"],
        jserrorDevGroupList: [],
        restfulDevGroupList: [],

        dataList: [],
      }
    },

    created: function () {
      var me = this
      /**一进来调用，取得所有数据*/

    },
    mounted: function () {
      var me = this
      me.searchList()
      me.buttonToggle()


    },

    methods: {
      buttonToggle: function () {
        var me = this;
        //点击一级类目
        $("div.level1").click(function (e) {
          $("div .level1 ").removeClass('blue')
          $(e.target).addClass('blue')
          me.tag1 = e.target.innerHTML
          if (me.tag1 == 'Hybird') {
            me.pageType = 1
          } else if (me.tag1 == 'H5') {
            me.pageType = 2
          } else {
            me.pageType = 3
          }
          me.searchList()
        })
        //点击二级类目
        $("div.level2").click(function (e) {

          $("div .level2 ").removeClass('blue')
          $(e.target).addClass('blue')
          me.tag2 = e.target.innerHTML
        })
        //点击三级类目
        $("div.level3").click(function (e) {
          $("div .level3 ").removeClass('blue')
          $(e.target).addClass('blue')
          me.tag3 = e.target.innerHTML
        })


      },
      searchList: function () {
        var me = this;
        $.ajax({
          type: "get",
          url: "http://10.8.85.36:8086/tds-web/reportApi/getPagePerformanceV2",
          data: {
            pageType: me.pageType,
          },
          success: function (data) {
//            me.domreadyDevGroupList = data.pagePerformanceList.domreadyDevGroupList
            me.jserrorDevGroupList = data.pagePerformanceList.jserrorDevGroupList
            me.restfulDevGroupList = data.pagePerformanceList.restfulDevGroupList
            me.DomReadyList = data.pagePerformanceList.avgList
            me.jsErrorAndPVList = data.pagePerformanceList.jsErrorAndPvDtoList
            me.restfulFailedList = data.pagePerformanceList.restfulDtoList
            me.dealData()


          }
        });
      },
      dealData: function () {
        /**
         * 处理表格数据
         */
        debugger
        var me=this
        if (me.tag2 == 'DOMready') {
          me.dataList = me.DomReadyList
        } else if (me.tag2 == 'JSError / PV') {
          me.dataList = me.jsErrorAndPVList
        } else {
          me.dataList = me.restfulFailedList
        }
        me.pageList = me.dataList.slice((me.currentPage - 1) * 13, me.currentPage * 13)
      },
      handleCurrentChange: function (currentPage) {
        //当前页面变换
        var me = this
        me.currentPage = currentPage
        me.pageList = me.dataList.slice((me.currentPage - 1) * 13, me.currentPage * 13)

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
