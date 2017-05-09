<template>
  <div id="listPage">
    <div class="main">
      <v-navList></v-navList>
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
      <!--分页-->
      <div style="position: absolute;bottom: 110px;right: 110px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="15"
          layout="total, prev, pager, next"
          :total="dataList.length"><!--total是总的数据条数-->
        </el-pagination>
      </div>
      <!--弹框-->
      <v-listPage_d :dialog-visible="isShow"></v-listPage_d>
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
  import listPage_d from './listPage_d.vue'
  export default{
    name: 'listPage',
    components: {
      'v-navList': navList,
      'v-listPage_d':listPage_d
    },
    data: function () {
      return {
        isPlay: "",
        isShow:false,
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
        this.isShow = true
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

      handleCurrentChange: function (currentPage) {
        //当前页面变换
        this.currentPage = currentPage
        this.pageList = this.dataList.slice((this.currentPage - 1) * 15, this.currentPage * 15 - 1)
      }
    }
  }
</script>
