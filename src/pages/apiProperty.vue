<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="apiProperty">
    <div class="main">
      <!--<v-navListApi></v-navListApi>-->
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
              <div class="btn btn-default dis level2 " type="button" value="95line">95line</div>
              <div class="btn btn-default dis level2" type="button" value="Failure%">Failure%</div>
            </div>
          </div>
          <div class="form-group">
            <label class="level">三级类目:</label>
            <div class="tag thirdContainer">
              <div v-if="tag2=='AVG'">
                <div class="btn btn-default dis level3 blue" type="button" value="allCategory" >不限</div>
                <div class="btn btn-default dis level3 " v-for="(item,index) in avgDevGroupList" type="button"
                     :value="item" v-bind:class="item==tag3?'blue':''">{{item}}
                </div>
              </div>
              <div v-if="tag2=='95line'">
                <div class="btn btn-default dis level3 blue" type="button" value="allCategory">不限</div>
                <div class="btn btn-default dis level3 " v-for="(item,index) in nineFiveDevGroupList" type="button"
                     :value="item" v-bind:class="item==tag3?'blue':''">{{item}}
                </div>
              </div>
              <div v-if="tag2=='Failure%'">
                <div class="btn btn-default dis level3 blue" type="button" value="allCategory">不限</div>
                <div class="btn btn-default dis level3 " v-for="(item,index) in failureDevGroupList" type="button"
                     :value="item" v-bind:class="item==tag3?'blue':''">{{item}}
                </div>
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
                  <th class="col-md-1">
                    <select v-model="selectedNumber" @change="sort">
                      <option value=10>top10</option>
                      <option value=20>top20</option>
                      <option value="all">全部</option>
                    </select>
                  </th>
                  <th class="col-md-3">业务名称</th>
                  <th class="col-md-4">接口名</th>
                  <th class="col-md-1" v-if="tag2=='AVG'">AVG</th>
                  <th class="col-md-1" v-if="tag2=='95line'">95line</th>
                  <th class="col-md-1" v-if="tag2=='Failure%'">Failure%</th>
                  <th class="col-md-2">开发组</th>
                  <th class="col-md-1">是否核心接口</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in pageList" v-if="tag2=='AVG'">
                  <th>{{index+1}}</th>
                  <td>{{item.bussinessName}}</td>
                  <td>{{item.interfaceName}}</td>
                  <td>{{item.avg}}</td>
                  <td>{{item.devGroup}}</td>
                  <td v-if="item.critical==true">是</td>
                  <td v-if="item.critical==false">否</td>

                </tr>
                <tr v-for="(item,index) in pageList" v-if="tag2=='95line'">
                  <th>{{index+1}}</th>
                  <td>{{item.bussinessName}}</td>
                  <td>{{item.interfaceName}}</td>
                  <td>{{item.ninetyfiveLine}}</td>
                  <td>{{item.devGroup}}</td>
                  <td v-if="item.critical==true">是</td>
                  <td v-if="item.critical==false">否</td>
                </tr>
                <tr v-for="(item,index) in pageList" v-if="tag2=='Failure%'">
                  <th>{{index+1}}</th>
                  <td>{{item.bussinessName}}</td>
                  <td>{{item.interfaceName}}</td>
                  <td>{{item.failPercent}}</td>
                  <td>{{item.devGroup}}</td>
                  <td v-if="item.critical==true">是</td>
                  <td v-if="item.critical==false">否</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!--同比环比-->
      <div style="position: absolute;bottom: 110px;left: 300px;">
        <router-link to="loopRatioApi">查看环比</router-link>&nbsp;&nbsp;
        <router-link to="sameRatioApi">查看同比</router-link>
      </div>
      <!--分页-->
      <div style="position: absolute;bottom: 110px;right: 110px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="13"
          layout="total, prev, pager, next"
          :total="(dataList||[]).length"><!--total是总的数据条数-->
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import navListApi from '../components/sidebar/navListApi.vue'
  window.apiProperty = {
    tag1: "OpenAPI",
    tag2: "AVG",
    tag3: "不限",//设默认值
    selectedNumber:10
  }
  export default {
    name: 'apiProperty',
    components: {
      'v-navListApi': navListApi
    },
    data: function () {
      return {
        currentPage: 1,//当前页
        selectedNumber: 10,//显示的条数
        pageList: [],//每页存放的列表数据,14条
        interfaceType: 1,
        tag1: "OpenAPI",//一级类目选中的值
        tag2: "AVG",//二级类目选中的值
        tag3: "不限",//三级类目选中的值
        //表格内容
        avgList: [],
        ninetyFiveLineList: [],
        failurePercentList: [],
        //三级目录
        avgDevGroupList: [],
        nineFiveDevGroupList: [],
        failureDevGroupList: [],

        dataList: [],

      }
    },
    created: function () {
      var me = this
      me.searchList()

    },
    mounted: function () {
      var me = this
      /**在mounted触发，因为created还没有渲染DOM*/
      me.buttonToggle()

    },
    methods: {
      buttonToggle: function () {
        var me = this;
        /**点击一级类目*/
        $("div.level1").click(function (e) {
          $("div .level1 ").removeClass('blue')
          $(e.target).addClass('blue')
          me.tag1 = e.target.innerHTML
          me.tag1 == "OpenAPI" ? me.interfaceType = 1 : me.interfaceType = 2
          window.apiProperty.tag1 = me.tag1
          me.searchList()
          me.searchList()

        })
        me.searchList()// 写上这句三级类目才能切换？

        /**点击二级类目*/
        $("div.level2").click(function (e) {
          $("div .level2 ").removeClass('blue')
          $(e.target).addClass('blue')
          me.tag2 = e.target.innerHTML
          me.dealData()
          window.apiProperty.tag2 = me.tag2
          me.search()
        })
      },
      clickThirdLevel: function () {
        var me = this
        $("div.level3").click(function (e) {
          $("div .level3 ").removeClass('blue')
          me.tag3 = e.target.innerHTML.replace(/[\r\n]/g, "").trim()
          window.apiProperty.tag3 = me.tag3
          //根据tag3筛选开发组，匹配三级目录
          me.search()
        })
        me.search()//页面进来的时候默认显示10条

      },
      /**页面一进来搜索所有数据*/
      searchList: function () {
        var me = this;
        $.ajax({
          type: "get",
          url: "http://10.8.85.36:8086/tds-web/reportApi/getInterfacePerformanceV2",
//          url: " http://10.32.212.27:12345/reportApi/getInterfacePerformanceV2",
          data: {
            interfaceType: me.interfaceType,
          },
          success: function (data) {
            window.apiProperty.data = data.interfacePerformanceList
            me.avgList = data.interfacePerformanceList.avgList;
            me.ninetyFiveLineList = data.interfacePerformanceList.ninetyfiveLineList
            me.failurePercentList = data.interfacePerformanceList.failurePercentList
            me.avgDevGroupList = data.interfacePerformanceList.avgDevGroupList
            me.failureDevGroupList = data.interfacePerformanceList.failureDevGroupList
            me.nineFiveDevGroupList = data.interfacePerformanceList.ninefiveDevGroupList
            me.dealData()
            me.clickThirdLevel()
          }
        });
      },
      /** 处理表格数据，给dataList重新赋值*/
      dealData: function () {
        var me = this
        if (me.tag2 == 'AVG') {
          me.dataList = me.avgList
        } else if (me.tag2 == '95line') {
          me.dataList = me.ninetyFiveLineList
        } else {
          me.dataList = me.failurePercentList
        }
        me.pageList = (me.dataList || []).slice((me.currentPage - 1) * 13, me.currentPage * 13)
      },
      /**主要用于筛选三级类目*/
      search: function () {
        var me = this
        var temp = []
        me.dealData()
        me.dataList.forEach(function (item) {
          if ((item.devGroup) == (me.tag3)) {
            temp.push(item)
          }
          if (me.tag3 == '不限') {
            temp = me.dataList
          }
        })

        if(me.selectedNumber==10){
          temp=temp.slice(0, 10)
        }
        else if(me.selectedNumber==20){
          temp=temp.slice(0, 20)
        }else{
        }
        me.dataList = temp
        me.pageList = (me.dataList || []).slice((me.currentPage - 1) * 13, me.currentPage * 13)
      },

      /**排序查找前10条，前20条,调用dealData将dataList赋值*/
      sort: function () {
        var me = this
        window.apiProperty.selectedNumber=me.selectedNumber
        debugger
        if (me.selectedNumber == 10) {
          me.dataList = me.dataList.slice(0, 10)
          me.pageList = me.dataList
        } else if (me.selectedNumber == 20) {
          me.dealData()
          me.dataList = (me.dataList || []).slice(0, 20)
          me.pageList = (me.dataList || []).slice((me.currentPage - 1) * 13, me.currentPage * 13)
        } else {
          me.dealData()
          me.pageList = (me.dataList || []).slice((me.currentPage - 1) * 13, me.currentPage * 13)
        }
      },
      /**分页*/
      handleCurrentChange: function (currentPage) {
        //当前页面变换
        this.currentPage = currentPage
        this.pageList = (this.dataList || []).slice((this.currentPage - 1) * 13, this.currentPage * 13 - 1)
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
