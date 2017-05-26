<template>
  <div id="app">
    <v-header></v-header>
    <div class="main" >
        <router-view></router-view>
    </div>
    <v-footer></v-footer>

  </div>
</template>

<script>
  import header from './components/header/header.vue'
  import footer from './components/footer/footer.vue'
//  import navListApi from './components/sidebar/navListApi.vue'

  export default {
    name: 'app',
    components:{
        'v-header':header,
        'v-footer':footer,
//      'v-navListApi': navListApi
    }

  }


</script>

<style>



</style>
