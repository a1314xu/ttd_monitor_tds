<template>
  <div id="apiProperty">
    <div class="main">
      <v-navListApi></v-navListApi>
      <div class="content">
        <div class="content-top">
          <div class="form-group">
            <label class="level">一级类目:</label>
            <div class="tag">
              <div class="btn btn-default dis level1 blue" type="button" value="1">OpenAPI</div>
              <div class="btn btn-default dis level1" type="button" value="2">Restful</div>
            </div>
          </div>
          <div class="form-group ">
            <label class="level">二级类目:</label>
            <div class="tag secondContainer">
              <div class="btn btn-default dis level2 blue" type="button" value="AVG">AVG</div>
              <div class="btn btn-default dis level2" type="button" value="95line">95line</div>
              <div class="btn btn-default dis level2" type="button" value="Failure%">Failure%</div>
            </div>
          </div>
          <div class="form-group">
            <label class="level">三级类目:</label>
            <div class="tag thirdContainer">
              <div class="btn btn-default dis level3 " v-for="(item,index) in avgDevGroupList" type="button"
                   :class="index==0?'blue':''" :value="item" v-if="tag2=='AVG'">{{item}}
              </div>
              <div class="btn btn-default dis level3 " v-for="(item,index) in nineFiveDevGroupList" type="button"
                   :class="index==0?'blue':''" :value="item" v-if="tag2=='95line'">{{item}}
              </div>
              <div class="btn btn-default dis level3 " v-for="(item,index) in failureDevGroupList" type="button"
                   :class="index==0?'blue':''" :value="item" v-if="tag2=='Failure%'">{{item}}
              </div>
            </div>
          </div>
        </div>
        <!--表格区域-->
        <div>
          <div class="row">
            <div class="col-md-11">
              <table class="table table-bordered table-hover table-responsive "
                     style="position: relative;left: 40px;top: 20px;">
                <thead>
                <tr role="row" class="row-header">
                  <th>
                    <select>
                      <option>top10</option>
                      <option>top20</option>
                      <option>全部</option>
                    </select>
                  </th>
                  <th>业务名称</th>
                  <th>接口名</th>
                  <th v-if="tag2=='AVG'">AVG</th>
                  <th v-if="tag2=='95line'">95line</th>
                  <th v-if="tag2=='Failure%'">Failure%</th>
                  <th>开发组</th>
                  <th>是否核心接口</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in pageList"  v-if="tag2=='AVG'">
                  <th>{{item.id}}</th>
                  <td>{{item.bussinessName}}</td>
                  <td>{{item.interfaceName}}</td>
                  <td>{{item.avg}}</td>
                  <td>{{item.devGroup}}</td>
                  <td>{{item.critical}}</td>
                </tr>
                <tr v-for="(item,index) in pageList"  v-if="tag2=='95line'">
                  <th>{{item.id}}</th>
                  <td>{{item.bussinessName}}</td>
                  <td>{{item.interfaceName}}</td>
                  <td>{{item.ninetyfiveLine}}</td>
                  <td>{{item.devGroup}}</td>
                  <td>{{item.critical}}</td>
                </tr>
                <tr v-for="(item,index) in pageList"  v-if="tag2=='Failure%'">
                  <th>{{item.id}}</th>
                  <td>{{item.bussinessName}}</td>
                  <td>{{item.interfaceName}}</td>
                  <td>{{item.failPercent}}</td>
                  <td>{{item.devGroup}}</td>
                  <td>{{item.critical}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!--同比环比-->
      <div style="position: absolute;bottom: 110px;left: 300px;">
        <router-link to="loopRatio">查看环比</router-link>&nbsp;&nbsp;
        <router-link to="sameRatio">查看同比</router-link>
      </div>
      <!--分页-->
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
</template>

<script>
  import navListApi from '../components/sidebar/navListApi.vue'
  export default {
    name: 'apiProperty',
    components: {
      'v-navListApi': navListApi
    },
    data: function () {
      return {
        currentPage: 1,//当前页
        pageList: [],//每页存放的列表数据,14条
        interfaceType: 1,
        tag1: "OpenAPI",//一级类目选中的值
        tag2: "AVG",//二级类目选中的值
        tag3: "",//三级类目选中的值
        dataList: [],
        //表格内容
        avgList: [],
        ninetyFiveLineList: [],
        failurePercentList: [],
        //三级目录
        avgDevGroupList: [],
        failureDevGroupList: [],
        nineFiveDevGroupList: []
      }
    },
    created: function () {
      var me = this

    },
    mounted: function () {
      var me = this
      me.searchList()
      me.buttonToggle()
    },
    methods: {
      /**
       * 按钮切换，样式控制
       *
       */
      buttonToggle: function () {
        var me = this;
        //点击一级类目
        $("div.level1").click(function (e) {
          $("div .level1 ").removeClass('blue')
          $(e.target).addClass('blue')
          me.tag1 = e.target.innerHTML
          me.tag1 == "OpenAPI" ? me.interfaceType = 1 : me.interfaceType = 2
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
          url: "http://10.8.85.36:8086/tds-web/reportApi/getInterfacePerformanceV2",
          data: {
            interfaceType: me.interfaceType,
          },
          success: function (data) {
            me.avgList = data.interfacePerformanceList.avgList;
            me.ninetyFiveLineList = data.interfacePerformanceList.ninetyfiveLineList
            me.failurePercentList = data.interfacePerformanceList.failurePercentList
            me.avgDevGroupList = data.interfacePerformanceList.avgDevGroupList
            me.failureDevGroupList = data.interfacePerformanceList.failureDevGroupList
            me.ninefiveDevGroupList = data.interfacePerformanceList.ninefiveDevGroupList
            me.dealData()


          }
        });
      },
      dealData: function () {
        /**
         * 处理表格数据
         */
        var me=this
        if (me.tag2 == 'AVG') {
          me.dataList = me.avgList
        } else if (me.tag2 == '95line') {
          me.dataList = me.ninetyFiveLineList
        } else {
          me.dataList = me.failurePercentList
        }
        me.pageList = me.dataList.slice((me.currentPage - 1) * 13, me.currentPage * 13)

      },
      handleCurrentChange: function (currentPage) {
        //当前页面变换
        this.currentPage = currentPage
        this.pageList = this.dataList.slice((this.currentPage - 1) * 13, this.currentPage * 13 - 1)
      }
    }
  }
</script>


<style>
  #apiProperty {
    overflow: hidden;
  }

  .tag div {
    border-radius: 20px;
    outline: none;
  }

  .dis {
    margin-right: 10px;
  }

  .level {
    float: left;
    margin-right: 10px;
    margin-top: 5px;

  }

  .content-top {
    position: relative;
    top: 20px;
    left: 40px;
  }

  .blue {
    background-color: dodgerblue !important;
  }
</style>
