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
              <el-option label="不限" value="all"></el-option>
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
              <el-option label="不限" value="all"></el-option>
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
          channelName: "",
          group: ""
        },

        pageIdList: [],//pageId所有数据
        pageIdData: [],//pageId每页数据
        currentPage: 1,//当前页
        dialogPageIdVisible: false,
        dialogVisible: false,

        taskNameTip: false,
        metricNameTip: false,
        groupByTip: false,
        testCode: "",//验证失败成功的代码
        multipleSelection: []//pageid列表选中哪几列
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
      showPageIdDialog: function () {
        var me = this
        me.dialogPageIdVisible = true
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
      showAppIdDialog: function () {
        var me = this

      },
      handleSelectionChange: function (val) {
        var me = this
        me.multipleSelection = val;
      },
      /**
       * pageId弹框搜索功能
       */
      search: function () {
        var me = this
        var temp = []//存放匹配到的每行
        var searchText = me.form.channelName + me.form.group//输入框的文字
        if (searchText == 'allall') {
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
       * 处理弹框里分页
       * @param currentPage
       */
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
        this.pageIdData = this.pageIdList.slice((this.currentPage - 1) * 11, this.currentPage * 11 - 1)
      },
      submitPageId: function () {
        var me = this
        me.dialogPageIdVisible = false
        me.multipleSelection.forEach(function (item) {
          me.info.tag += "pid=" + item.pageId + ";"
        })
      },
      // 以上弹框里的方法

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
