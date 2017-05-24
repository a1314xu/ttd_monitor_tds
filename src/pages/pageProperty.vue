<template>
  <div id="pageProperty">
    <div class="main">
      <v-navListApi></v-navListApi>
      <div class="content">
        <div class="content-top">
          <div class="form-group">
            <label class="level">一级类目:</label>
            <div class="tag">
              <div class="btn btn-default dis level1 blue" type="button" value="1">Hybird</div>
              <div class="btn btn-default dis level1" type="button" value="2">H5</div>
              <div class="btn btn-default dis level1" type="button" value="3">Online</div>
            </div>
          </div>
          <div class="form-group ">
            <label class="level">二级类目:</label>
            <div class="tag secondContainer">
              <div class="btn btn-default dis level2 blue" type="button" value="DOMready" data-tag="DOMready">DOMready
              </div>
              <div class="btn btn-default dis level2" type="button" value="JSError/PV" data-tag="JSError">JSError/PV
              </div>
              <div class="btn btn-default dis level2" type="button" v-if="tag1!=='Online'" value="Restful Failed"
                   data-tag="RestfulFailed">Restful Failed
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="level">三级类目:</label>
            <div class="tag thirdContainer">
              <div v-show="tag2 =='DOMready'" class="1111">
                <div class="btn btn-default dis level3 blue" type="button" value="allCategory">不限</div>
                <div class="btn btn-default dis level3" v-for="(item,index) in domreadyDevGroupList"
                     type="button" :value="item" >{{item}}
                </div>
              </div>
              <div v-show="tag2=='JSError'" class="2222">
                <div class="btn btn-default dis level3 blue" type="button" value="allCategory">不限</div>
                <div class="btn btn-default dis level3" v-for="(item,index) in jserrorDevGroupList"
                     type="button" :value="item">{{item}}
                </div>
              </div>
              <div v-show="tag2=='RestfulFailed'" class="333">
                <div class="btn btn-default dis level3 blue" type="button" value="allCategory">不限</div>
                <div class="btn btn-default dis level3" v-for="(item,index) in restfulDevGroupList"
                     type="button" :value="item">{{item}}
                </div>
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
                  <th class="col-md-1">
                    <select v-model="selectedNumber" @change="sort">
                      <option value=10>top10</option>
                      <option value=20>top20</option>
                      <option value="all">全部</option>
                    </select>
                  </th>
                  <th class="col-md-2">渠道名称</th>
                  <th class="col-md-2">页面名称</th>
                  <th class="col-md-1">Page ID</th>
                  <th class="col-md-1" v-if="tag2=='DOMready'">AVG</th>
                  <th class="col-md-1" v-if="tag2=='JSError'">PV</th>
                  <th class="col-md-1" v-if="tag2=='JSError'">JSError</th>
                  <th class="col-md-1" v-if="tag2=='JSError'">JSError/PV</th>
                  <th class="col-md-1" v-if="tag2=='RestfulFailed'">Restful Failed</th>
                  <th class="col-md-2">开发组</th>
                  <th class="col-md-1">是否核心页面</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in pageList" v-if="tag2=='DOMready'">
                  <td>{{index+1}}</td>
                  <td>{{item.channelName}}</td>
                  <td>{{item.pageName}}</td>
                  <td>{{item.pageId}}</td>
                  <td>{{item.avg}}</td>
                  <td>{{item.devGroup}}</td>
                  <td v-if="item.critical==true">是</td>
                  <td v-if="item.critical==false">否</td>
                </tr>
                <tr v-for="(item,index) in pageList" v-if="tag2=='JSError'">
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
                <tr v-for="(item,index) in pageList" v-if="tag2=='RestfulFailed'">
                  <td>{{index+1}}</td>
                  <td>{{item.channelName}}</td>
                  <td>{{item.pageName}}</td>
                  <td>{{item.pageId}}</td>
                  <td>{{item. failPercent}}</td>
                  <td>{{item.devGroup}}</td>
                  <td v-if="item.critical==true">是</td>
                  <td v-if="item.critical==false">否</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!--同比环比-->
        <div style="position: absolute;bottom: 110px;left: 300px;">
          <router-link to="loopRatioPage">查看环比</router-link>&nbsp;&nbsp;
          <router-link to="sameRatioPage">查看同比</router-link>
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
  window.pageProperty = {
    tag1:"Hybrid",
    tag2: "DOMready",
    tag3:"不限",//设默认值
  }
  export default {
    name: 'pageProperty',
    components: {
      'v-navListApi': navListApi
    },
    data: function () {
      return {
        currentPage: 1,//当前页
        selectedNumber: 10,//显示的条数
        pageList: [],//每页存放的列表数据,14条
        pageType: 1,
        tag1: "Hybrid",//一级类目选中的值
        tag2: "DOMready",//二级类目选中的值
        tag3: "",//三级类目选中的值
        //开发组
        DomReadyList: [],
        jsErrorAndPVList: [],
        restfulFailedList: [],
        //按钮组
        domreadyDevGroupList: [],
        jserrorDevGroupList: [],
        restfulDevGroupList: [],

        dataList: [],
      }
    },

    created: function () {
      var me = this
      me.searchList()

    },
    mounted: function () {
      var me = this
      /**在mounted触发，待渲染DOM后方可取到dom值*/
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
          if (me.tag1 == 'Hybird') {
            me.pageType = 1
          } else if (me.tag1 == 'H5') {
            me.pageType = 2
          } else {
            me.pageType = 3
          }
          window.pageProperty.tag1 = me.tag1
        })
        me.searchList()

        /**点击二级类目*/
        $("div.level2").click(function (e) {
          $("div .level2 ").removeClass('blue')
          $(e.target).addClass('blue')
          me.tag2 = e.currentTarget.dataset.tag
          me.dealData()
          window.pageProperty.tag2 = me.tag2

        })
      },
      /**点击三级类目,点击不渲染样式是因为searchList方法没有执行完，没有取到元素的值
       * 把点击三级事件放到这个方法，表格和三级目录可同时出现*/
      clickThirdLevel: function () {
        var me = this
        $("div.level3").click(function (e) {
          $("div .level3 ").removeClass('blue')
          $(e.target).addClass('blue')
          me.tag3 = e.target.innerHTML.replace(/[\r\n]/g, "").trim()
          //根据tag3筛选开发组，匹配三级目录
          me.search()
          window.pageProperty.tag3 = me.tag3

        })
      },
      /**页面一进来搜索所有数据*/
      searchList: function () {
        var me = this;
        $.ajax({
          type: "get",
//          url: "http://10.32.212.27:12345/reportApi/getPagePerformanceV2",
          url: "http://10.8.85.36:8086/tds-web/reportApi/getPagePerformanceV2",

          data: {
            pageType: me.pageType,
          },
          success: function (data) {
            window.pageProperty.data = data.pagePerformanceList
            me.domreadyDevGroupList = data.pagePerformanceList.domreadyDevGroupList
            me.jserrorDevGroupList = data.pagePerformanceList.jserrorDevGroupList
            me.restfulDevGroupList = data.pagePerformanceList.restfulDevGroupList
            me.DomReadyList = data.pagePerformanceList.avgList
            me.jsErrorAndPVList = data.pagePerformanceList.jsErrorAndPvDtoList
            me.restfulFailedList = data.pagePerformanceList.restfulDtoList
            me.dealData()
            me.clickThirdLevel()
          }
        });
      },
      /** 处理表格数据，给dataList重新赋值*/
      dealData: function () {
        var me = this
        if (me.tag2 == 'DOMready') {
          me.dataList = me.DomReadyList
        } else if (me.tag2 == 'JSError') {
          me.dataList = me.jsErrorAndPVList
        } else {
          me.dataList = me.restfulFailedList
        }
        me.pageList = me.dataList.slice((me.currentPage - 1) * 13, me.currentPage * 13)
      },
      /**主要用于筛选三级类目*/
      search: function () {
        var me = this
        var temp = []
        me.dealData()
        me.dataList.forEach(function (item) {
          //devGroup多了一个空格
          if ((item.devGroup.trim()) == (me.tag3)) {
            temp.push(item)
          }
          if (me.tag3 == '不限') {
            temp = me.dataList
          }
        })
        me.dataList = temp
        me.pageList = me.dataList.slice((me.currentPage - 1) * 13, me.currentPage * 13)
      },

      /**排序查找前10条，前20条,调用dealData将dataList赋值*/
      sort: function () {
        var me = this
        if (me.selectedNumber == 10) {
          me.dataList = me.dataList.slice(0, 10)
          me.pageList = me.dataList
        } else if (me.selectedNumber == 20) {
          me.dealData()
          me.dataList = me.dataList.slice(0, 20)
          me.pageList = me.dataList.slice((me.currentPage - 1) * 13, me.currentPage * 13)
        } else {
          me.dealData()
          me.pageList = me.dataList.slice((me.currentPage - 1) * 13, me.currentPage * 13)
        }
      },
      /**分页*/
      handleCurrentChange: function (currentPage) {
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


</style>
