<template>
  <div id="warnRule">
    <div>
      <div class="content">
        <form class="form" style="position:relative;top: 20px; left: 40px;">
          <div class="row form-inline distance">
            <div class="form-group col-md-12">
              <label style="width: 120px">数据源任务名称:</label>
              <el-select v-model="dataSourceTaskName" placeholder="请选择" style="width: 700px;" size="small">
                <el-option
                  v-for="(item,index) in dataList"
                  :key="index"
                  :label="item.taskname"
                  :value="item.taskname">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="row form-inline distance">
            <div class="form-group col-md-12">
              <label style="width: 120px">告警规则名称:</label>
              <el-input v-model="warnRuleName" placeholder="无线组-国内定位失败率大于15%" style="width: 700px"
                        size="small"></el-input>
              <span style="color:grey;">（告警邮件标题）</span>
            </div>
          </div>
          <div class="row form-inline distance">
            <div class="form-group col-md-12">
            <label style="width: 60px">阈值:</label>
              <el-select v-if="dataSourceTaskName.substr(0,3)=='Cat'" v-model="value1" placeholder="" size="small" style="width:100px;">
                <el-option
                  v-for="(item,index) in selectList1"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-if="dataSourceTaskName.substr(0,3)=='Cat'" v-model="value2" placeholder="" size="small" style="width:100px;">
                <el-option
                  v-for="(item,index) in selectList2"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input v-model="value3" placeholder="" style="width: 200px" size="small"></el-input>
              <label style="width: 60px">收件人:</label>
              <el-input vpx-model="warnRuleName" placeholder="请输入有效邮箱" style="width: 400px" size="small"></el-input>
              <span style="color:grey;">（多人邮箱用 ; 隔离）</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style>
  #warnRule {
    overflow: hidden;

  }
</style>
<script>

  export default{
    name: 'warnRule',
    data: function () {
      return {
        dataList: [],
        warnRuleName: "",
        dataSourceTaskName: "",
        value:"",
        value2:"",
        value3:"",
        selectList1:[
          {
            label:"AVG",
            value:"AVG",
          },
          {
            label:"95Line",
            value:"95Line",
          },
          {
            label:"Failure%",
            value:"Failure%",
          }
        ],
        selectList2:[
          {
            label:"大于",
            value:"大于",
          },
          {
            label:"小于",
            value:"小于",
          },
        ]
      }
    },
    created: function () {
      var me = this
      me.searchTaskName()
    },
    methods: {
      searchTaskName: function () {
        var me = this
        $.ajax({
          type: "get",
          url: "http://10.8.85.36:8086/CatAPI/GetJobList",
          data: {},
          traditional: true,
          dataType: "jsonp",
          success: function (data) {
            me.dataList = data
          }
        })
      }
    }
  }
</script>
