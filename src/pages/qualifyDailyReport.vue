<template>
  <div id="playDailyReport">
    <div class="main">
      <!--<v-navListApi></v-navListApi>-->
      <div class="content">
        <div class="content-top">
          <div class="form-group">
            <div style="float:left">
              <label class="level">日期</label>
              <el-date-picker
                v-model="queryDate"
                type="date"
                :picker-options="pickerOptions0">
              </el-date-picker>
            </div>
          </div>
        </div>
        <!--tab区域-->
        <div id="myTab" class="col-md-11" style="position: relative;left: 20px;top: 40px;">
          <!-- Nav tabs -->
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#apiProperty" aria-controls="home" role="tab"
                                                      data-toggle="tab">接口性能</a></li>
            <li role="presentation"><a href="#domReady" aria-controls="profile" role="tab"
                                       data-toggle="tab">页面DOMready</a>
            </li>
            <li role="presentation"><a href="#jsError" aria-controls="messages" role="tab"
                                       data-toggle="tab">页面JS错误率</a></li>
          </ul>

          <!-- Tab panes -->
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="apiProperty">
              <table class="table table-bordered table-hover table-responsive">
                <thead>
                <tr>
                  <th>#</th>
                  <th>业务名称</th>
                  <th>接口名</th>
                  <th>AVG</th>
                  <th>开发组</th>
                  <th>是否核心页面</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in pageList">
                  <td>{{index+1}}</td>
                  <td>{{item.bussinessName}}</td>
                  <td>{{item.interfaceName}}</td>
                  <td>{{item.avg}}</td>
                  <td>{{item.devGroup}}</td>
                  <td v-if="item.critical==true">是</td>
                  <td v-if="item.critical==false">否</td>
                </tr>
                </tbody>
              </table>
              <!--底部标识和分页-->
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
                    :total="dataList.length"><!--total是总的数据条数-->
                  </el-pagination>
                </div>
              </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="domReady">
              <table class="table table-bordered table-hover table-responsive">
                <thead>
                <tr>
                  <th>#</th>
                  <th>渠道名称</th>
                  <th>页面名称</th>
                  <th>Page ID</th>
                  <th>DOMready</th>
                  <th>开发组</th>
                  <th>是否核心页面</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in  pageList ">
                  <td>{{index+1}}</td>
                  <td>{{item.channelName}}</td>
                  <td>{{item.pageName}}</td>
                  <td>{{item.pageId}}</td>
                  <td>{{item.avg}}</td>
                  <td>{{item.devGroup}}</td>
                  <td v-if="item.critical==true">是</td>
                  <td v-if="item.critical==false">否</td>
                </tr>
                </tbody>
              </table>
              <!--底部标识和分页-->
              <div style="margin-top: 20px">
                <!--基准值-->
                <div style="float:left;">
                  H5 ≥ 1600ms,营销H5 ≥ 1800ms
                  Hybrid ≥ 400ms,营销Hybrid ≥ 1600ms,海外玩乐Hybrid ≥ 1600m
                  Online ≥ 1800ms                </div>
                <!--分页-->
                <div style="float: right;margin-right: 40px">
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
            <div role="tabpanel" class="tab-pane" id="jsError">
              <table class="table table-bordered table-hover table-responsive">
                <thead>
                <tr>
                  <th>#</th>
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
                  <td>{{index+1}}</td>
                  <td>{{item.channelName}}</td>
                  <td>{{item.pageName}}</td>
                  <td>{{item.pageId}}</td>
                  <td>{{item.pv}}</td>
                  <td>{{item.jsError}}</td>
                  <td>{{item.errorPercent}}</td>
                  <td>{{item.devGroup}}</td>
                  <td v-if="item.critical==true">是</td>
                  <td v-if="item.critical==false">否</td>
                </tr>
                </tbody>
              </table>
              <!--底部标识和分页-->
              <div style="margin-top: 20px">
                <!--基准值-->
                <div style="float:left;">
                  H5 ≥ 3%,营销H5 ≥ 4%
                  Hybrid ≥ 1%,营销Hybrid ≥ 2%
                  Online ≥ 10%,营销Online ≥ 4%
                </div>
                <!--分页-->
                <div style="float: right;margin-right: 40px;z-index: 100;">
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
        tabValue: "接口性能",
        currentPage: 1,//当前页
        pageList: [],//每页存放的列表数据,14条
        queryDate: new Date().getTime() - 24 * 60 * 60 * 1000,//默认值
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime()>Date.now() ||time.getTime() < Date.now() - (8.64e7 + 7 * 24 * 60 * 60 * 1000) ;
          }
        },
        dataList: [],
        jeList:[],
        domreadyList:[],
        avgList:[]

      }
    },
    created: function () {
    },
    mounted: function () {
      this.searchList()
    },
    methods: {
      searchList: function () {
        var me = this;
        var newDate = new Date()
        newDate.setTime(me.queryDate)
        me.queryDate = newDate.toISOString()
        $.ajax({
          type: "get",
          url: "http://10.8.85.36:8086/tds-web/reportApi/getQualityDailyReport",
//        url: "http://10.32.212.27:12345/reportApi/getQualityDailyReport",
          data: {
            queryDate: me.queryDate.substr(0, 10),
          },
          success: function (data) {
            me.avgList = data.avgList;
            me.domreadyList = data.domreadyList
            me.jeList = data.jeList
            me.dealData()

          }
        });
      },
      /**判断处于哪个tab，展示对应表格数据*/
      dealData: function () {
        var me = this
        $("#myTab a").click(function (e) {
          me.tabValue = e.target.innerHTML
          if (me.tabValue == '接口性能') {
            me.dataList = me.avgList
          } else if (me.tabValue == '页面DOMready') {
            me.dataList = me.domreadyList
          } else {
            me.dataList = me.jeList
          }
          me.pageList = me.dataList.slice((me.currentPage - 1) * 13, me.currentPage * 13)
        })
        if (me.tabValue == '接口性能') {
          me.dataList = me.avgList
          me.pageList = me.dataList.slice((me.currentPage - 1) * 13, me.currentPage * 13)

        }

      },
      /**
       /*
       * 分页事件
       * @param currentPage
       */
      handleCurrentChange: function (currentPage) {
        var me = this
        me.currentPage = currentPage
        me.pageList = (this.dataList || []).slice((this.currentPage - 1) * 13, this.currentPage * 13 - 1)
      }
    }

  }

</script>


<style>
  #playDailyReport {
    overflow: hidden;
  }
</style>
