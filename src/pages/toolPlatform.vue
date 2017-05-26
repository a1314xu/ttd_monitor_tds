<template>
  <div id="toolPlatform">
    <v-navList></v-navList>
    <div class="">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import header from '../components/header/header.vue'
  import footer from '../components/footer/footer.vue'
  import navList from '../components/sidebar/navList.vue'

  export default {
        name: 'toolPlatform',
      components:{
        'v-header':header,
        'v-footer':footer,
        'v-navList':navList,

      }
    }
</script>


<style>
</style>
