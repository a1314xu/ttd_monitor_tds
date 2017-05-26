<template>
  <div id="reportPlatform">
  <v-navListApi></v-navListApi>
  <div class="" >
    <router-view></router-view>
  </div>
  </div>
</template>

<script>
  import header from '../components/header/header.vue'
  import footer from '../components/footer/footer.vue'
    import navListApi from '../components/sidebar/navListApi.vue'
    export default {
        name: 'reportPlatform',
      components:{
        'v-header':header,
        'v-footer':footer,
      'v-navListApi': navListApi
      }
    }
</script>


<style>
</style>
