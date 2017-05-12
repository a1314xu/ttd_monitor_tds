<template>
  <div id="dashboard">
    <div class="main">
      <v-navList></v-navList>
      <div class="content">
        <form class="form" style="position:relative;top: 20px; left: 40px;">
          <div class="row form-inline distance">
            <div class="form-group col-md-3">
              <label for="taskName">任务名称</label>
              <input type="text" class="form-control input-sm" id="taskName" placeholder="简单的说明一下"
                     v-model="info.taskName">
              <label v-if='taskNameTip' class="validate" style="color: red;font-size: 8px">*不能为空</label>
            </div>
            <div class="form-group col-md-3">
              <label>间隔时间</label>
              <select class=" input-sm" v-model="info.timeInterval">
                <option value="1" selected>1分钟</option>
                <option value="10">10分钟</option>
                <option value="60">1小时</option>
                <option value="1440">1天</option>
                <option value="10080">1周</option>
              </select>
            </div>
          </div>
          <div class="row form-inline distance">
            <div class="form-group col-md-3 ">
              <label>环境</label>
              <select class=" input-sm" v-model="info.environment">
                <option value="PROD">PROD</option>
                <option value="FWS">FWS</option>
                <option value="UAT">UAT</option>
                <option value="LPT">LPT</option>
              </select>
            </div>
            <div class="form-group col-md-3 ">
              <label>聚合方式</label>
              <select class=" input-sm" v-model="info.gatherMethod">
                <option value="SUM">SUM</option>
                <option value="AVG">AVG</option>
                <option value="COUNT">COUNT</option>
                <option value="MAX">MAX</option>
                <option value="MIN">MIN</option>
              </select>
            </div>
          </div>
          <!--联想功能-->
          <label for="metricName">Metric Name：</label>
          <div class="row form-inline">
            <div class="form-group col-md-9">
              <input type="text" class="form-control input-sm" id="metricName" placeholder="" v-model="info.metricName"
                     list="metricNameList" style="width: 500px;">
              <datalist class=" input-sm" id="metricNameList">
                <option value="fx.ubt.pv.count"></option>
                <option value="fx.ubt.mobile.pv.count"></option>
                <option value="fx.ubt.jserror.count"></option>
                <option value="fx.ubt.perf.domready"></option>
                <option value="js.lizard.ajaxready"></option>
                <option value="thingstodo.framework.servicestack.latency">
                </option>
                <option value="thingstodo.framework.servicestack.count">
                </option>
              </datalist>
              <label v-if='metricNameTip' class="validate" style="color: red;font-size: 8px;">*不能为空</label>
            </div>
          </div>
          <label for="tag">Tag</label>
          <div class="row form-inline">
            <div class="form-group col-md-5">
              <input type="text" class="form-control input-sm col-md-6" style="width: 500px" id="tag"
                     placeholder="appid=1000000444(注意区分大小写)" v-model.trim="info.tag">
            </div>
            <div class="form-group col-md-1 ">
              <button type="button" class="btn btn-primary btn-sm " data-toggle="modal" @click="showPageIdDialog">
                批量PageID
              </button>
            </div>
            <div class="form-group col-md-1">
              <button type="button" class="btn btn-primary btn-sm " data-toggle="modal" @click="showAppIdDialog">批量AppID
              </button>
            </div>
          </div>
          <label for="groupBy">Group By：</label>
          <div class="row form-inline">
            <div class="form-group col-md-9">
              <input type="text" class="form-control input-sm" id="groupBy" placeholder="appid;name(注意区分大小写)"
                     v-model.trim="info.groupBy" style="width: 500px;">
            </div>
          </div>
          <div class="footDashboard" style=" margin-top:80px;">
            <button type="button" class="btn btn-primary btn-sm " data-toggle="modal" @click="submit">保存</button>
            <button type="button" class="btn btn-primary btn-sm " @click="todatasource">取消</button>
          </div>
        </form>
      </div>
      <!--保存成功后提示页面-->
      <el-dialog title="提示" v-model="dialogVisible" size="tiny" style="text-align: center;">
        <h3>保存成功，你可以继续：</h3>
        <div @click="goList"><h4><a>去列表页查看</a></h4></div>
        <div @click="continueAdd"><h4><a>继续添加数据源</a></h4></div>
      </el-dialog>
      <!--批量PageId 弹框-->
      <el-dialog title="批量PageID选择" :visible.sync="dialogPageIdVisible" size="small">
        <!--表单区-->
        <el-form :inline="true">
          <el-form-item label="渠道名称">
            <el-select v-model="form.channelName" placeholder="请选择">
              <el-option label="不限" value="0"></el-option>
              <el-option label="玩乐BU_当地玩乐_H5" value="玩乐BU_当地玩乐_H5"></el-option>
              <el-option label="玩乐BU_当地玩乐_Hybrid" value="玩乐BU_当地玩乐_Hybrid"></el-option>
              <el-option label="玩乐BU_当地玩乐_Online" value="玩乐BU_当地玩乐_Online"></el-option>
              <el-option label="玩乐BU_供应商_Online" value="玩乐BU_供应商_Online"></el-option>
              <el-option label="玩乐BU_海外玩乐_H5" value="玩乐BU_海外玩乐_H5"></el-option>
              <el-option label="玩乐BU_海外玩乐_Hybrid" value="玩乐BU_海外玩乐_Hybrid"></el-option>
              <el-option label="玩乐BU_门票_Hybrid" value="玩乐BU_门票_Hybrid"></el-option>
              <el-option label="玩乐BU_门票_Online" value="玩乐BU_门票_Online"></el-option>
              <el-option label="玩乐BU_门票_H5" value="玩乐BU_门票_H5"></el-option>
              <el-option label="玩乐BU_停车_Hybrid" value="玩乐BU_停车_Hybrid"></el-option>
              <el-option label="玩乐BU_停车_H5" value="玩乐BU_停车_H5"></el-option>
              <el-option label="地面BU_营销_H5" value="地面BU_营销_H5"></el-option>
              <el-option label="地面BU_营销_Hybrid" value="地面BU_营销_Hybrid"></el-option>
              <el-option label="地面BU_营销_Online" value="地面BU_营销_Online"></el-option>
              <el-option label="地面BU_门票_微信" value="地面BU_门票_微信"></el-option>
              <el-option label="地面BU_停车_Online" value="地面BU_停车_Online"></el-option>
              <el-option label="地面SBU_公共_APP" value="地面SBU_公共_APP"></el-option>
              <el-option label="地面SBU_公共_H5" value="地面SBU_公共_H5"></el-option>
              <el-option label="Hybrid_SBU_地面供应商" value="Hybrid_SBU_地面供应商"></el-option>
              <el-option label="Hybrid_SBU_地面内部用户" value="Hybrid_SBU_地面内部用户"></el-option>
              <el-option label="H5_SBU_地面供应商" value="H5_SBU_地面供应商"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="小组">
            <el-select v-model="form.group" placeholder="请选择">
              <el-option label="不限" value="0"></el-option>
              <el-option label="无线二组" value="无线二组"></el-option>
              <el-option label="无线三组" value="无线三组"></el-option>
              <el-option label="营销网站组" value="营销网站组"></el-option>
              <el-option label="营销活动组" value="营销活动组"></el-option>
              <el-option label="停车组" value="停车组"></el-option>
              <el-option label="商品组" value="商品组"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="search">查询</el-button>
          </el-form-item>
        </el-form>
        <!--表格区-->
        <el-table highlight-current-row ref="multipleTable" :data="pageIdData" border style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50">
          </el-table-column>
          <el-table-column prop="pageId" label="PageId" width="130" align="center" resizable>
          </el-table-column>
          <el-table-column prop="pageName" label="PageName" width="240" align="center" resizable>
          </el-table-column>
          <el-table-column prop="type" label="Type" width="235" align="center" resizable>
          </el-table-column>
          <el-table-column prop="team" label="Team" width="130" align="center" resizable>
          </el-table-column>
          <el-table-column prop="owner" label="Owner" width="130" align="center" resizable>
          </el-table-column>
        </el-table>
        <!--分页-->
        <div style="position: absolute;bottom: 20px;">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="11"
            layout="total, prev, pager, next"
            :total="pageIdList.length"><!--total是总的数据条数-->
          </el-pagination>
        </div>
        <!--按钮区-->
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitPageId">确 定</el-button>
          <el-button @click="dialogPageIdVisible = false">取 消</el-button>
        </div>
      </el-dialog>

      <!--批量AppId 弹框-->
      <el-dialog title="批量AppID选择" :visible.sync="dialogAppIdVisible" size="small">
        <!--表单区-->
        <el-form :inline="true">
          <el-form-item label="小组">
            <el-select v-model="form.group2" placeholder="请选择">
              <el-option label="不限" value="0"></el-option>
              <el-option label="玩乐_03_订单" value="玩乐_03_订单"></el-option>
              <el-option label="玩乐_04_公共" value="玩乐_04_公共"></el-option>
              <el-option label="玩乐_05_监控" value="玩乐_05_监控"></el-option>
              <el-option label="玩乐_06_BI" value="玩乐_06_BI"></el-option>
              <el-option label="玩乐_07_搜索" value="玩乐_07_搜索"></el-option>
              <el-option label="玩乐_08_营销" value="玩乐_08_营销"></el-option>
              <el-option label="玩乐_09_供应商" value="玩乐_09_供应商"></el-option>
              <el-option label="玩乐_10_对接" value="玩乐_10_对接"></el-option>
              <el-option label="玩乐_11_商品" value="玩乐_11_商品"></el-option>
              <el-option label="玩乐_12_预定" value="玩乐_12_预定"></el-option>
              <el-option label="玩乐_13_Online" value="玩乐_13_Online"></el-option>
              <el-option label="玩乐_14_无线" value="玩乐_14_无线"></el-option>
              <el-option label="玩乐_15_架构" value="玩乐_15_架构"></el-option>
              <el-option label="玩乐_16_结算" value="玩乐_16_结算"></el-option>
              <el-option label="玩乐_17_分销" value="玩乐_17_分销"></el-option>
              <el-option label="玩乐_18_UGC" value="玩乐_18_UGC"></el-option>
              <el-option label="玩乐_20_收益管理" value="玩乐_20_收益管理"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人">
            <el-select v-model="form.owner2" placeholder="请选择">
              <el-option label="不限" value="0"></el-option>
              <el-option label="cxhuang" value="cxhuang"></el-option>
              <el-option label="eeyang" value="eeyang"></el-option>
              <el-option label="huxj" value="huxj"></el-option>
              <el-option label="kcke" value="kcke"></el-option>
              <el-option label="liu.liang" value="liu.liang"></el-option>
              <el-option label="ll_xing" value="ll_xing"></el-option>
              <el-option label="maxq" value="maxq"></el-option>
              <el-option label="mfwei" value="mfwei"></el-option>
              <el-option label="prye" value="prye"></el-option>
              <el-option label="wbyang" value="wbyang"></el-option>
              <el-option label="weiqiwang" value="weiqiwang"></el-option>
              <el-option label="yan.zhou" value="yan.zhou"></el-option>
              <el-option label="yczheng" value="yczheng"></el-option>
              <el-option label="zwguo" value="zwguo"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="search2">查询</el-button>
          </el-form-item>
        </el-form>
        <!--表格区-->
        <el-table highlight-current-row ref="multipleTable" :data="appIdData" border style="width: 100%"
                  @selection-change="handleSelectionChange2">
          <el-table-column type="selection" width="50">
          </el-table-column>
          <el-table-column prop="appId" label="AppID" width="120" align="center" resizable>
          </el-table-column>
          <el-table-column prop="appEname" label="AppEname" width="320" align="center" resizable>
          </el-table-column>
          <el-table-column prop="appCname" label="AppCname" width="275" align="center" resizable>
          </el-table-column>
          <el-table-column prop="team" label="Team" width="140" align="center" resizable>
          </el-table-column>
          <el-table-column prop="owner" label="Owner" width="100" align="center" resizable>
          </el-table-column>
        </el-table>
        <!--分页-->
        <div style="position: absolute;bottom: 20px;">
          <el-pagination
            @current-change="handleCurrentChange2"
            :current-page="currentPage"
            :page-size="11"
            layout="total, prev, pager, next"
            :total="appIdList.length"><!--total是总的数据条数-->
          </el-pagination>
        </div>
        <!--按钮区-->
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitAppId">确 定</el-button>
          <el-button @click="dialogAppIdVisible = false">取 消</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>
<style>
  #dashboard {
    overflow: hidden;
  }

  .distance {
    margin-top: 10px;
  }

  .footDashboard {
    text-align: center;
  }

  .footDashboard button {
    margin-top: 80px;
    margin-right: 80px;
    margin-left: 40px;
  }

</style>
<script>
  import navList from '../components/sidebar/navList.vue';
  export default{
    name: 'dashboard',
    components: {
      'v-navList': navList,

    },
    data: function () {
      return {
        info: {
          taskName: "",
          timeInterval: "1",
          environment: "PROD",
          gatherMethod: "SUM",
          metricName: "",
          tag: "",//输入的tag
          groupBy: "",//输入的group by
        },
        form: {
          channelName: "0",
          group: "0",
          group2: "0",
          owner2: "0",
        },

        pageIdList: [],//pageId所有数据
        pageIdData: [],//pageId每页数据
        appIdData: [],//appId每页数据
        appIdList: [],//appId所有数据
        currentPage: 1,//当前页
        dialogPageIdVisible: false,
        dialogAppIdVisible: false,
        dialogVisible: false,

        taskNameTip: false,
        metricNameTip: false,
        groupByTip: false,
        testCode: "",//验证失败成功的代码
        multipleSelection: [],//pageid列表选中哪几列
        multipleSelection2: []
      }
    },
    watch: {
      taskName: function (val) {
        val.length == 0 ? this.taskNameTip = true : this.taskNameTip = false
      },
//      tag: function (val) {
//        val.length == 0 ? this.tagTip = true : this.tagTip = false
//      },
      metricName: function (val) {
        val.length == 0 ? this.metricNameTip = true : this.metricNameTip = false
      },
      groupBy: function (val) {
        val.length == 0 ? this.groupByTip = true : this.groupByTip = false
      },
    },
    created: function () {
      var me = this


    },
    methods: {
      todatasource: function () {
        app.$router.push("dataSource")
      },
      //      以下弹框里的方法

      /**
       * pageId弹框显示功能
       */
      showPageIdDialog: function () {
        var me = this
        me.dialogPageIdVisible = true
        me.form.channelName="0"
        me.form.group="0"
        $.ajax({
          type: "post",
          url: "http://10.8.85.36:8086/tds-web/info/getAllPageId",
          data: {},
          success: function (data) {
            me.pageIdList = data.pageIds
            me.pageIdData = me.pageIdList.slice((me.currentPage - 1) * 11, me.currentPage * 11 - 1)
          }
        });
      },
      /**
       * appId弹框显示功能
       */
      showAppIdDialog: function () {
        var me = this
        me.dialogAppIdVisible = true
        me.form.group2="0"
        me.form.owner2="0"
        $.ajax({
          type: "post",
          url: "http://10.8.85.36:8086/tds-web/info/getAllAppId",
          data: {},
          success: function (data) {
            me.appIdList = data.appIds
            me.appIdData = me.appIdList.slice((me.currentPage - 1) * 11, me.currentPage * 11 - 1)
          }
        });
      },
      /**
       * 表格复选框功能
       */
      handleSelectionChange: function (val) {
        var me = this
        me.multipleSelection = val;
      },
      /**
       * 表格复选框功能2
       */
      handleSelectionChange2: function (val) {
        var me = this
        me.multipleSelection2 = val;
      },
      /**
       * pageId弹框搜索功能
       */
      search: function () {
        var me = this
        var temp = []//存放匹配到的每行
        var searchText = me.form.channelName + me.form.group//输入框的文字
        if (searchText == '00') {
          me.pageIdData = me.pageIdList.slice((me.currentPage - 1) * 11, me.currentPage * 11 - 1)
        } else {
          me.pageIdList.forEach(function (item) {
            if ((item.type + item.team).indexOf(searchText) !== -1) {//匹配，则把此条数据放入待显示的数组内
              temp.push(item)
            }
          })
          me.pageIdList = temp
          me.pageIdData = me.pageIdList.slice((me.currentPage - 1) * 11, me.currentPage * 11 - 1)
        }
      },
      /**
       * appId弹框搜索功能
       */
      search2: function () {
        var me = this
        var temp = []//存放匹配到的每行
        var searchText = me.form.owner2 + me.form.group2//输入框的文字
        if (searchText == '00') {
          me.appIdData = me.appIdList.slice((me.currentPage - 1) * 11, me.currentPage * 11 - 1)
        } else {
          me.appIdList.forEach(function (item) {
            if (( item.owner + item.team ).indexOf(searchText) !== -1) {//匹配，则把此条数据放入待显示的数组内
              temp.push(item)
            }
          })
          me.appIdList = temp
          me.appIdData = me.appIdList.slice((me.currentPage - 1) * 11, me.currentPage * 11 - 1)
        }
      },
      /**
       * 处理弹框里分页
       * @param currentPage
       */
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
        this.pageIdData = this.pageIdList.slice((this.currentPage - 1) * 11, this.currentPage * 11 - 1)
      },
      /**
       * 处理弹框里分页
       * @param currentPage
       */
      handleCurrentChange2: function (currentPage) {
        this.currentPage = currentPage
        this.appIdData = this.appIdList.slice((this.currentPage - 1) * 11, this.currentPage * 11 - 1)
      },
      /**
       * 弹框里保存pageId
       */
      submitPageId: function () {
        var me = this
        me.dialogPageIdVisible = false
        me.multipleSelection.forEach(function (item) {
          me.info.tag += "pid=" + item.pageId + ";"
        })
      },
      submitAppId: function () {
        var me = this
        me.dialogAppIdVisible = false
        me.multipleSelection2.forEach(function (item) {
          me.info.tag += "appid=" + item.appId + ";"
        })
      },
      // 以上弹框里的方法
      /**
       * Dashboard页面保存功能
       */
      submit: function () {
        var me = this
        if (me.info.taskName.length === 0) {
          me.taskNameTip = true;
        }
        if (me.info.metricName.length === 0) {
          me.metricNameTip = true;
        }
        if (me.info.groupBy.length === 0) {
          me.groupByTip = true;
        }
        if (me.info.groupBy.length !== 0 && me.info.metricName.length !== 0 && me.info.taskName.length !== 0) {
          $.ajax({
            type: "post",
            url: "http://10.8.85.36:8086/DashboardAPI/servlet/SaveDashboard",
            data: me.info,
            dataType: "jsonp",
            success: function (data) {
              //              debugger;
              me.testCode = data.message.code
              if (me.testCode == 0) {
                me.dialogVisible = true
              } else {
                me.$alert('信息填写有误，保存失败', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    me.$message({
                      type: 'info',
                      //                      message: `action: ${ action }`
                    });
                  }
                });
              }
            },
          })
        }
      },
      goList: function () {
        $("#myModal").modal('hide')
        app.$router.push("listPage")
      },
      continueAdd: function () {
        $("#myModal").modal('hide')
        app.$router.push("dataSource")
      }

    }


  }
</script>
