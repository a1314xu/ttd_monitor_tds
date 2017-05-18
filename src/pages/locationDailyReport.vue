<template>
  <div id="locationDailyReport">
    <v-navListApi></v-navListApi>
  <div class="content">
    <div class="row">
      <div class="col-md-11">
        <table class="table table-bordered table-hover table-responsive "
               style="position: relative;left: 40px;top: 20px;">
          <caption style="text-align: left;font-size: 30px">7天定位数据</caption>
          <thead>
          <tr role="row" class="row-header">
            <th>国内</th>
            <th>1月30日</th>
            <th>1月31日</th>
            <th>2月1日</th>
            <th>2月2日</th>
            <th>2月3日</th>
            <th>2月4日</th>
            <th>2月5日</th>
            <th>平均</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in pageList">
            <td>{{item.taskname}}</td>
            <td>{{item.sourcedata}}</td>
            <td>{{item.createdtime}}</td>


          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
    import navListApi from '../components/sidebar/navListApi.vue'
    export default {
        name: 'locationDailyReport',
        components:{
          'v-navListApi': navListApi
        }
    }
</script>


<style>
</style>
