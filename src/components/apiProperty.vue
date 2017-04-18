<template>
  <div class="main">
    <navlist-api></navlist-api>
    <div class="content">
      <div class="form-group">
        <label style="float:left;margin-top: 5px">一级类目:</label>
        <div class="tag">
          <button class="btn btn-primary dis" type="submit">OpenAPI</button>
          <button class="btn btn-default dis" type="submit">Restful</button>
        </div>
      </div>
      <div class="form-group ">
        <label style="float:left;margin-top: 5px">二级类目:</label>
        <div class="tag">
          <button class="btn btn-primary dis" type="submit">AVG</button>
          <button class="btn btn-default dis" type="submit">95line</button>
          <button class="btn btn-default dis" type="submit">Failure%</button>
        </div>
      </div>
      <div class="form-group">
        <label style="float:left;margin-top: 5px">三级类目:</label>
        <div class="tag">
          <button class="btn btn-primary dis" type="submit">不限</button>
          <button class="btn btn-default dis" type="submit">无线服务组</button>
          <button class="btn btn-default dis" type="submit">商品组</button>
          <button class="btn btn-default dis" type="submit">订单组</button>
          <button class="btn btn-default dis" type="submit">结算组</button>
          <button class="btn btn-default dis" type="submit">对接组</button>
          <button class="btn btn-default dis" type="submit">搜索组</button>
          <button class="btn btn-default dis" type="submit">供应商系统组</button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import navlistApi from '../components/public/navlistApi.vue'
  export default {
    name: 'hello',
    components:{
      'navlist-api':navlistApi
    },
  }
</script>


<style>
  .dis {
    margin-right: 10px;
    width:107px;
  }

</style>
