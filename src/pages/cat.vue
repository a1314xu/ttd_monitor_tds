<template>
  <div id="cat">
    <div class="main">
      <!--左侧导航栏-->
      <!--<v-navList index="1"></v-navList>-->
      <!--内容区域-->
      <div class="content">
        <form class="form" style="position:relative;top: 20px; left: 40px;">
          <div class="row form-inline distance">
            <div class="form-group col-md-3">
              <label for="taskName">任务名称</label>
              <input type="text" class="form-control input-sm" id="taskName" placeholder="简单的说明一下" v-model="taskName">
              <label v-if='tips.taskNameTip' class="validate" style="color: red;font-size: 8px">*不能为空</label>
            </div>
            <!--<div class="form-group col-md-3">-->
            <!--<label>开始时间</label>-->
            <!--<el-date-picker-->
            <!--v-model="startTime"-->
            <!--type="datetime"-->
            <!--placeholder="选择日期"-->
            <!--size="small"-->
            <!--:picker-options="pickerOptions0">-->
            <!--</el-date-picker>-->
            <!--</div>-->
            <div class="form-group col-md-3">
              <label>间隔时间</label>
              <select class=" input-sm" v-model="timeInterval">
                <option value="1" selected>1分钟</option>
                <option value="10">10分钟</option>
                <option value="60">1小时</option>
                <option value="1440 ">1天</option>
                <option value="10080">1周</option>
              </select>
            </div>
          </div>
          <div class="row form-inline distance">
            <div class="form-group col-md-12">
              <label for="search-input">APP &nbsp;&nbsp; ID</label>
              <input type="text" class="form-control input-sm" id="search-input" placeholder="100000445"
                     style="width: 460px;"
                     v-model="appId"
                     @keydown="searchAppId">
              <!--智能搜索区域-->
              <div class="suggest" id="search-suggest" style="display: none">
                <ul id="search-result">
                  <li v-for="(item,index) in searchData" v-if="(item.appId).indexOf(appId)!==-1"
                      @click="searchThis(item)">{{item.appId}}&nbsp;&nbsp;&nbsp;{{item.appCname}}
                  </li>
                </ul>
              </div>
              <label v-if='tips.appIdTip' class="validate" style="color: red;font-size: 8px">*不能为空</label>
            </div>
          </div>
          <!--TAG区域-->
          <div class="row form-inline distance col-md-12" style="float:left;">
            <label style="position:absolute;top: 20px;">TAG:</label>
            <div class="checkbox" style="margin-top: 20px;margin-left: 50px;float: left">
              <input type="checkbox" id="Total" value="Total" v-model="checkedTags">
              <label for="Total">Total</label>
              <input type="checkbox" id="Failure" value="Failure" v-model="checkedTags">
              <label for="Failure">Failure</label>
              <input type="checkbox" id="Failure%" value="Failure%" v-model="checkedTags">
              <label for="Failure%">Failure%</label>
              <input type="checkbox" id="Min(ms)" value="Min(ms)" v-model="checkedTags">
              <label for="Min(ms)">Min(ms) </label>
              <input type="checkbox" id="Max(ms)" value="Max(ms)" v-model="checkedTags">
              <label for="Max(ms)">Max(ms)</label><br>
              <input type="checkbox" id="Avg(ms)" value="Avg(ms)" v-model="checkedTags">
              <label for="Avg(ms)">Avg(ms)</label>
              <input type="checkbox" id="95Line(ms)" value="95Line(ms)" v-model="checkedTags"><label for="95Line(ms)">95Line(ms)</label>
              <input type="checkbox" id="99.9Line(ms)" value="99.9Line(ms)" v-model="checkedTags">
              <label for="99.9Line(ms)">99.9Line(ms)</label>
              <input type="checkbox" id="Std(ms)" value="Std(ms)" v-model="checkedTags">
              <label for="Std(ms)">Std(ms)</label>
              <input type="checkbox" id="QPS" value="QPS" v-model="checkedTags"><label for="QPS">QPS</label>
            </div>
            <label v-if='tips.checkedTagsTip' class="validate" style="color: red;font-size: 8px">*不能为空</label>
          </div>
          <!--Type区域-->
          <div class="row form-inline distance col-md-12" v-if="visible">
            <div style="border: 1px solid ;width: 85%;float: left;">
              <label style="position:absolute;top: 0px;">Type:</label>
              <div class="checkbox" style="margin-top: 0px;margin-left: 50px">
                <div v-for="(type,index) in typeList" v-if="type!='System'&&type!='all'" style="float: left">
                  <input type="checkbox" :id="type" :value="type" v-model="checkedTypes">
                  <label :for="type">{{type}}</label>
                </div>
              </div>
            </div>
            <label v-if='tips.checkedTypesTip' class="validate" style="color: red;font-size: 8px">*不能为空</label>
            <button type="button" class="btn btn-primary btn-sm " @click="showName"
                    style="margin-left: 20px;margin-top: 20px;">确定
            </button>
          </div>

          <!--tab表格区-->
          <div class="tab col-md-11" role="tabpanel" v-if="showTab" style="margin-top: 20px;left:-15px">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs " role="tablist" id="docTabs">
              <li role="presentation" v-for="(item,index) in tabsData" :class="index==0?'active':''">
                <a :href="'#'+index" :aria-controls="item.type" role="tab" data-toggle="tab">{{item.type}} </a>
              </li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content">
              <div role="tabpanel" v-for="(item,index) in tabsData" class="tab-pane fade in"
                   :class=" index==0?'active':'' " :id="index">
                <div class="content_list">
                  <div class="row">
                    <div class="col-sm-12">
                      <table class="table table-bordered table-hover">
                        <thead>
                        <tr role="row" class="row-header">
                          <th class="col-md-1"><input type="checkbox" id="check_all"
                                                      @click="checkAll()">
                          </th>
                          <th>Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(typeValueItem,row) in item.typeValue">
                          <td><input type="checkbox" :id="index+'_'+row" :value="item.type+'@@'+typeValueItem"
                                     name="chk_list"
                                     v-model="checkedNames"></td>
                          <td style="text-align: left;padding-left: 30px"><label :for="index+'_'+row">{{typeValueItem}}</label></td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <label v-if='tips.checkedNamesTip' class="validate" style="color: red;font-size: 8px">*不能为空</label>
          </div>
          <div class="foot">
            <button type="button" class="btn btn-primary btn-sm " data-toggle="modal" @click="submit">保存</button>
            <button type="button" class="btn btn-primary btn-sm " @click="gotodatasource">取消</button>
          </div>
        </form>
      </div>
      <!--保存成功后提示页面-->
      <el-dialog title="提示" v-model="dialogVisible" size="tiny" style="text-align: center;">
        <h3>保存成功，你可以继续：</h3>
        <div @click="goList"><h4><a>去列表页查看</a></h4></div>
        <div @click="continueAdd"><h4><a>继续添加数据源</a></h4></div>
      </el-dialog>
    </div>
  </div>
</template>
<style>
  #cat {
    overflow: hidden;
  }

  .suggest {
    width: 460px;
    background-color: white;
    border: solid 1px #999;
  }

  .suggest ul {
    list-style: none;
    margin: 0;
    padding: 3px;
    cursor: pointer;

  }

  .suggest ul li {
    font-size: 14px;
    line-height: 30px;
  }

  .suggest ul li:hover {
    color: red;
  }

  .checkbox label {
    display: inline-block;
    width: 200px;
    height: 25px;
    margin-right: 10px;
  }

  .content_list {
    height: 200px;
    width: 80%;
    overflow-x: hidden;

  }

  .foot {
    text-align: center;
  }

  .foot button {
    margin-top: 40px;
    margin-right: 80px;
    margin-left: 40px;
  }

</style>
<script>
  import navList from '../components/sidebar/navList.vue'
  export default{
    name: 'cat',
    components: {
      'v-navList': navList,
    },
    data: function () {
      return {
        taskName: "",
        searchData: [],
        timeInterval: "1",
        startTime: "",
        appId: "",
        jobId: "",//修改的时候需要加上
        checkedTags: [],//选中的tag
        checkedTypes: [],//选中的type
        checkedNames: [],//选中的name
        typeList: [],//接收返回的type
        tabsData: [],//接收返回的name,变量
        selectedList: [],//选中的type对应name
        obj: {},
        dialogVisible: false,
        tips: {
          taskNameTip: false,//验证用
          checkedTagsTip: false,
          appIdTip: false,
          checkedTypesTip: false,
          checkedNamesTip: false
        },
        visible: false,
        showTab: false,
        selectedData: [],//联想功能的数据
        currentView: "",
        nameData: []
      }
    },
    created: function () {
      var me = this
    },
    // 观察和响应 Vue 实例上的数据变动，用来判断字段否为空
    watch: {
      taskName: function (val) {
        val.length == 0 ? this.tips.taskNameTip = true : this.tips.taskNameTip = false
      },
      appId: function (val) {
        val.length == 0 ? this.tips.appIdTip = true : this.tips.appIdTip = false
      },
      checkedTags: function (val) {
        val.length == 0 ? this.tips.checkedTagsTip = true : this.tips.checkedTagsTip = false
      },
      checkedTypes: function (val) {
        val.length == 0 ? this.tips.checkedTypesTip = true : this.tips.checkedTypesTip = false
      },
      checkedNames: function (val) {
        val.length == 0 ? this.tips.checkedNamesTip = true : this.tips.checkedNamesTip = false
      },
    },
    methods: {
      gotodatasource: function () {
        app.$router.push("dataSource")
      },
      /*** 输入框输入字母 触发*/
      searchAppId: function () {
        var me = this;
        $.ajax({
          type: "post",
          url: "http://10.8.85.36:8086/tds-web/info/getAllAppId",
          data: {
            appid: me.appId
          },
          success: function (data) {
            me.searchData = data.appIds;
            $("#search-suggest").show().css({
              position: "absolute",
              top: 30,
              left: 120,
              zIndex: 100,
            })
          }
        });
      },
      /**根据appId搜索type */
      searchThis: function (item) {
        var me = this
        me.appId = item.appId
        $("#search-suggest").hide()
        $.ajax({
          type: "get",
          url: "http://10.8.85.36:8086/CatAPI/GetCatType",
          data: {
            appid: me.appId
          },
          dataType: "jsonp",
          success: function (data) {
            me.typeList = data[0].typeValue;
            me.visible = true
          }
        });
      },
      showName: function () {
        var me = this;
        $.ajax({
          type: "get",
          url: "http://10.8.85.36:8086/CatAPI/GetCatType",
          data: {
            appid: me.appId,
            checkedTypes: me.checkedTypes
          },
          traditional: true,
          dataType: "jsonp",
          success: function (data) {
            me.tabsData = data
            me.showTab = true
          }
        })
      },
      checkAll: function () {
        var me=this
        if ($("input[name='chk_list']").attr("checked")) {
          // 取消全选
          $("input[name='chk_list]:checked").attr("checked",false)
//          me.checkedNames=[]
          debugger
        } else {
            //全选
//          debugger
          $("input[name='chk_list']").attr("checked", true)
        }

      },
      submit: function () {
        var me = this;
        if (me.taskName.length === 0) {
          me.tips.taskNameTip = true;
        }
        if (me.appId.length === 0) {
          me.tips.appIdTip = true;
        }
        if (me.checkedTags.length === 0) {
          me.tips.checkedTagsTip = true;
        }
        if (me.checkedTypes.length === 0) {
          me.tips.checkedTypesTip = true;
        }
        if (me.checkedNames.length === 0) {
          me.tips.checkedNamesTip = true;
        }
        if (me.taskName.length !== 0 && me.appId.length !== 0 && me.checkedTags.length !== 0 && me.checkedTypes.length !== 0 && me.checkedNames.length !== 0) {
          //当判断元素不为空时，提交请求
          $.ajax({
            type: "get",
            url: "http://10.8.85.36:8086/CatAPI/AddCatJob",
            data: {
              taskName: me.taskName,
              timeInterval: me.timeInterval,
              appid: me.appId,
              checkedTags: me.checkedTags,
              checkedNames: me.checkedNames,
//            checkedTypes: me.checkedTypes,
            },
            traditional: true,
            dataType: "jsonp",
            success: function (data) {
              if (data[0].code == 0) {
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
            }
          })
        }
      },
      goList: function () {
        $("#myModal").modal('hide');
        app.$router.push("listPage")
      },
      continueAdd: function () {
        $("#myModal").modal('hide');
        app.$router.push("dataSource")
      }
    }

  }
</script>

