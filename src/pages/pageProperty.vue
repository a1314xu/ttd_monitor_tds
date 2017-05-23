<template>
  <div id="pageProperty">
    <div class="main">
      <v-navListApi></v-navListApi>
      <div class="content">
        <div class="content-top">
          <div class="form-group">
            <label class="level">一级类目:</label>
            <div class="tag">
              <div class="btn btn-default dis  level1 blue" type="button" value="1">Hybird</div>
              <div class="btn btn-default dis  level1" type="button" value="2">H5</div>
              <div class="btn btn-default dis level1" type="button" value="3">Online</div>
            </div>
          </div>
          <div class="form-group ">
            <label class="level">二级类目:</label>
            <div class="tag secondContainer">
              <div class="btn btn-default dis level2 blue" type="button" value="DOMready">DOMready</div>
              <div class="btn btn-default dis level2" type="button" value="JSError/PV">JSError/PV</div>
              <div class="btn btn-default dis level2" type="button" v-if="tag1!=='Online'" value="Restful Failed">Restful Failed</div>
            </div>
          </div>
          <div class="form-group">
            <label class="level">三级类目:</label>
            <div class="tag thirdContainer">
              <div v-if="tag2 =='DOMready'">
                <div class="btn btn-default dis level3 blue" type="button" value="allCategory">不限</div>
                <div class="btn btn-default dis level3" v-for="(item,index) in domreadyDevGroupList"
                     type="button" :value="item">{{item}}
                </div>
              </div>
              <div v-if="tag2=='JSError/PV'">
                <div class="btn btn-default dis level3 blue" type="button" value="allCategory">不限</div>
                <div class="btn btn-default dis level3" v-for="(item,index) in jserrorDevGroupList"
                     type="button" :value="item">{{item}}
                </div>
              </div>
              <div v-if="tag2=='Restful Failed'">
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
                  <th>
                    <select v-model="selectedNumber" @change="sort">
                      <option value=10>top10</option>
                      <option value=20>top20</option>
                      <option value="all">全部</option>
                    </select>
                  </th>
                  <th>渠道名称</th>
                  <th>页面名称</th>
                  <th>Page ID</th>
                  <th v-if="tag2=='DOMready'">AVG</th>
                  <th v-if="tag2=='JSError/PV'">PV</th>
                  <th v-if="tag2=='JSError/PV'">JSError</th>
                  <th v-if="tag2=='JSError/PV'">JSError/PV</th>
                  <th v-if="tag2=='Restful Failed'">Restful Failed</th>
                  <th>开发组</th>
                  <th>是否核心页面</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in pageList" v-if="tag2='DOMready'">
                  <td>{{index+1}}</td>
                  <td>{{item.channelName}}</td>
                  <td>{{item.pageName}}</td>
                  <td>{{item.pageId}}</td>
                  <td>{{item.avg}}</td>
                  <td>{{item.devGroup}}</td>
                  <td>{{item.critical}}</td>
                </tr>
                <tr v-for="(item,index) in pageList" v-if="tag2=='JSError/PV'">
                  <td>{{index+1}}</td>
                  <td>{{item.channelName}}</td>
                  <td>{{item.pageName}}</td>
                  <td>{{item.pageId}}</td>
                  <td>{{item.pv}}</td>
                  <td>{{item.jsError}}</td>
                  <td>{{item.errorPercent}}</td>
                  <td>{{item.devGroup}}</td>
                  <td>{{item.critical}}</td>
                </tr>
                <tr v-for="(item,index) in pageList" v-if="tag2=='Restful Failed'">
                  <td>{{index+1}}</td>
                  <td>{{item.channelName}}</td>
                  <td>{{item.pageName}}</td>
                  <td>{{item.pageId}}</td>
                  <td>{{item. failPercent}}</td>
                  <td>{{item.devGroup}}</td>
                  <td>{{item.critical}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!--同比环比-->
        <div style="position: absolute;bottom: 110px;left: 300px;">
          <router-link to="loopRatio">查看环比</router-link>&nbsp;&nbsp;
          <router-link to="sameRatio">查看同比</router-link>
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
//  window.pagePropertyDatas={}
  export default {
    name: 'pageProperty',
    components: {
      'v-navListApi': navListApi
    },
    data: function () {
      return {
        currentPage: 1,//当前页
        selectedNumber: "all",//显示的条数
        pageList: [],//每页存放的列表数据,14条
        pageType: 1,
        tag1: "Hybrid",//一级类目选中的值
        tag2: "DOMready",//二级类目选中的值
        tag3: "",//三级类目选中的值
        //开发组
//        DomReadyList: [{"channelName":"df","pageName":"sdf","pageId":"df","avg":"ds","devGroup":"xxx","critical":"是"},
//          {"channelName":"df","pageName":"sdf","pageId":"df","avg":"ds","devGroup":"sd","critical":"是"},
//          {"channelName":"df","pageName":"sdf","pageId":"df","avg":"ds","devGroup":"x","critical":"是"},
//          {"channelName":"df","pageName":"sdf","pageId":"df","avg":"ds","devGroup":"sd","critical":"是"},
//          {"channelName":"df","pageName":"sdf","pageId":"df","avg":"ds","devGroup":"sd","critical":"是"},
//          {"channelName":"df","pageName":"sdf","pageId":"df","avg":"ds","devGroup":"sd","critical":"否"},
//          {"channelName":"df","pageName":"sdf","pageId":"df","avg":"ds","devGroup":"sd","critical":"是"},
//          {"channelName":"df","pageName":"sdf","pageId":"df","avg":"ds","devGroup":"sd","critical":"是"},
//          {"channelName":"df","pageName":"sdf","pageId":"df","avg":"ds","devGroup":"sd","critical":"是"},
//          {"channelName":"df","pageName":"sdf","pageId":"df","avg":"ds","devGroup":"sd","critical":"是"},
//          {"channelName":"df","pageName":"sdf","pageId":"df","avg":"ds","devGroup":"sd","critical":"是"},
//          {"channelName":"df","pageName":"sdf","pageId":"df","avg":"ds","devGroup":"sd","critical":"是"},
//          {"channelName":"df","pageName":"sdf","pageId":"df","avg":"ds","devGroup":"sd","critical":"是"},
//          {"channelName":"df","pageName":"sdf","pageId":"df","avg":"ds","devGroup":"sd","critical":"是"},
//        ],
//        jsErrorAndPVList: [{"channelName":"df","pageName":"sdf","pageId":"df","pv":"ds","jsError":"dds","errorPercent":"sd","devGroup":"sd","critical":"是"},
//          {"channelName":"df","pageName":"sdf","pageId":"df","pv":"ds","jsError":"dds","errorPercent":"sd","devGroup":"sd","critical":"是"},
//          {"channelName":"df","pageName":"sdf","pageId":"df","pv":"ds","jsError":"dds","errorPercent":"sd","devGroup":"sd","critical":"是"},],
//         restfulFailedList: [{"channelName":"df","pageName":"sdf","pageId":"df","failPercent":"ds","devGroup":"sd","critical":"是"},],
        DomReadyList:[],
        jsErrorAndPVList:[],
        restfulFailedList:[],
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
          if (me.tag1 == 'Hybird') {
            me.pageType = 1
          } else if (me.tag1 == 'H5') {
            me.pageType = 2
          } else {
            me.pageType = 3
          }
        })
        me.searchList()
        /**点击二级类目*/
        $("div.level2").click(function (e) {
          $("div .level2 ").removeClass('blue')
          $(e.target).addClass('blue')
          me.tag2 = e.target.innerHTML
          me.dealData()
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
        })
      },
      /**页面一进来搜索所有数据*/
      searchList: function () {
        var me = this;
        $.ajax({
          type: "get",
          url: "http://10.32.212.27:12345/reportApi/getPagePerformanceV2",
          data: {
            pageType: me.pageType,
          },
          success: function (data) {
//            window.pagePropertyDatas.data=data
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
        } else if (me.tag2 == 'JSError/PV') {
          me.dataList = me.jsErrorAndPVList
        } else {
          me.dataList = me.restfulFailedList
        }
        console.log(me.dataList)
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
          if(me.tag3=='不限'){
            temp=me.dataList
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

  /*.red {*/
  /*background: red !important;*/
  /*}*/
</style>
