<template>
  <div id="listPage">
    <div class="main">
      <v-navList></v-navList>

      <!--列表-->
      <div class="content">
        <div class="row">
          <div class="col-md-11">
            <table class="table table-bordered table-hover table-responsive "
                   style="position: relative;left: 40px;top: 20px;">
              <caption style="text-align: left;font-size: 30px">任务列表页</caption>
              <thead>
              <tr role="row" class="row-header">
                <th>任务名称</th>
                <th>数据来源</th>
                <th>创建时间</th>
                <th>是否启用</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in pageList">
                <td>{{item.taskname}}</td>
                <td>{{item.sourcedata}}</td>
                <td>{{item.createdtime}}</td>
                <td>
                  <div type="button" class="btn btn-primary btn-xs " style="background-color: #5cb85c;border: none"
                       v-if="item.isplay==1">OK
                  </div>
                  <div type="button" class="btn btn-primary btn-xs " style="background-color: #d9534f;border: none"
                       v-if="item.isplay==0">NO
                  </div>
                </td>
                <td>
                  <a><span class="glyphicon" :class="{'glyphicon-play':item.isplay==0,'glyphicon-pause':item.isplay==1}"
                           @click="playOrPauseJob(item)"></span></a>
                  <a><span class="glyphicon glyphicon-eye-open" style="margin-left: 10px;"
                           @click="showDetail(item)"></span></a>
                  <a><span class="glyphicon glyphicon-remove" style="margin-left: 10px;"
                           @click="delJob(item)"></span></a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!--分页处理-->
      <div style="position: absolute;bottom: 110px;right: 110px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="15"
          layout="total, prev, pager, next"
          :total="dataList.length"><!--total是总的数据条数-->
        </el-pagination>
      </div>

      <!--Dashboard详情页面-->
      <el-dialog title="Dashboard详情" :visible.sync="dialogDashboardVisible">
        <form class="form" style="position:relative;top: 20px; left: 40px;">
          <div class="row form-inline distance">
            <div class="form-group col-md-3">
              <label for="taskName">任务名称</label>
              <input type="text" class="form-control input-sm" id="taskName" placeholder="简单的说明一下"
                     v-model="info.taskName">
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
            </div>
          </div>
          <label for="tag">Tag</label>
          <div class="row form-inline">
            <div class="form-group col-md-9">
              <input type="text" class="form-control input-sm col-md-6" style="width: 500px" id="tag"
                     placeholder="appid=1000000444" v-model.trim="info.tag">
            </div>
          </div>
          <label for="groupBy">Group By：</label>
          <div class="row form-inline">
            <div class="form-group col-md-9">
              <input type="text" class="form-control input-sm" id="groupBy" placeholder="appid;name"
                     v-model.trim="info.groupBy" style="width: 500px;">
            </div>
          </div>
        </form>
      </el-dialog>
      <!--CAT详情页面-->
      <el-dialog title="CAT详情" :visible.sync="dialogCatVisible">
      </el-dialog>
    </div>
  </div>
</template>
<style>
  #listPage {
    overflow: hidden;
  }

  table tr th {
    text-align: center;
  }

  table tr td {
    text-align: center;
  }
</style>
<script>
  import navList from '../components/sidebar/navList.vue'
  export default{
    name: 'listPage',
    components: {
      'v-navList': navList,
    },
    data: function () {
      return {
        isPlay: "",
        dialogDashboardVisible:false,
        dialogCatVisible:false,
        info: {
          taskName: "",
          timeInterval: "1",
          environment: "PROD",
          gatherMethod: "SUM",
          metricName: "",
          tag: "",//输入的tag
          groupBy: "",//输入的group by
        },
        currentPage: 1,//当前页
        pageList: [],//每页存放的列表数据,15条
        dataList: [],
      }
    },
    created: function () {
      this.searchList();
      this.pageList = this.dataList.slice((this.currentPage - 1) * 15, this.currentPage * 15 - 1)
    },
    methods: {
      searchList: function () {
        var me = this;
        $.ajax({
          type: "get",
          url: "http://10.8.85.36:8086/CatAPI/GetJobList",
          data: {},
          traditional: true,
          dataType: "jsonp",
          success: function (data) {
            me.dataList = data;
            me.pageList = me.dataList.slice((me.currentPage - 1) * 15, me.currentPage * 15 - 1)
          }
        })
      },
      /**
       * 列表的查看详情操作
       * @param item
       */
      showDetail: function (item) {
        var me = this
        me.dialogDashboardVisible=true
//        me.dialogCatVisible=true
        me.info.taskName=item.taskname
      },
      /**
       * 列表的开启暂停操作
       * @param item
       */
      playOrPauseJob: function (item) {
        var me = this;
        this.$confirm(item.isplay == 1 ? '此操作将暂停该job' : '此操作将启动该job', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          if (item.sourcedata == "Cat") {
            $.ajax({
              type: "post",
              url: "http://10.8.85.36:8086/CatAPI/OperateCatJob",
              data: {
                id: item.id,
                option: item.isplay == 1 ? 'pause' : 'start'
              },
              dataType: "jsonp",
              success: function (data) {
                if (data[0].code == 0) {
                  if (item.isplay == 1) {
                    me.$message({
                      type: 'success',
                      message: '暂停成功!'
                    });
                    item.isplay = 0
                  } else if (item.isplay == 0) {
                    me.$message({
                      type: 'success',
                      message: '启动成功!'
                    });
                    item.isplay = 1
                  }
                } else {
                  me.$message({
                    type: 'info',
                    message: '操作失败!'
                  })
                }
              },
            })
          } else if (item.sourcedata == "dashboard") {
            $.ajax({
              type: "post",
              url: "http://10.8.85.36:8086/DashboardAPI/servlet/PauseDashboard",
              data: {
                id: item.id,
                isPlay: item.isplay == 1 ? 0 : 1
              },
              dataType: "jsonp",
              success: function (data) {
                if (data.code == 0) {
                  if (item.isplay == 1) {
                    me.$message({
                      type: 'success',
                      message: '暂停成功!'
                    });
                    item.isplay = 0
                  } else if (item.isplay == 0) {
                    me.$message({
                      type: 'success',
                      message: '启动成功!'
                    });
                    item.isplay = 1
                  }
                } else {
                  me.$message({
                    type: 'info',
                    message: 'job不存在!'
                  })
                }
              },
            })
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },

      /**
       * 删除操作
       * @param item
       */
      delJob: function (item) {
        var me = this;
        me.$confirm('此操作将删除该job, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (item.sourcedata == 'Cat') {
            $.ajax({
              type: "post",
              url: "http://10.8.85.36:8086/CatAPI/OperateCatJob",
              data: {
                id: item.id,
                option: 'delete'
              },
              dataType: "jsonp",
              success: function (data) {
                if (data[0].code == 0) {
                  me.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  me.searchList()
                } else {
                  me.$message({
                    type: 'info',
                    message: 'job不存在!'
                  })
                }
              }
            })
          } else if (item.sourcedata == 'dashboard') {
            $.ajax({
              type: "post",
              url: "http://10.8.85.36:8086/DashboardAPI/servlet/RemoveDashboard",
              data: {jobId: item.id},
              dataType: "jsonp",
              success: function (data) {
                if (data.message.code == 0) {
                  me.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                  me.searchList()
                } else {
                  me.$message({
                    type: 'info',
                    message: 'job不存在!'
                  })
                }
              }
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      /**
       * 分页处理
       * @param item
       */
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
        this.pageList = this.dataList.slice((this.currentPage - 1) * 15, this.currentPage * 15 - 1)
      }
    }
  }
</script>
