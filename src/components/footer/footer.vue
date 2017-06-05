<template>
  <div class="footer">
    <div><a href="mailto:WLJSYFQA_ZDH@Ctrip.com">技术支持</a></div>
  </div>
</template>

<script>
    export default {
        name: 'footer',
    }
</script>


<style>
  .footer {
    position: absolute;
    bottom: 0;
    height: 70px;
    width:100%;
    background-color: #336699;
    line-height: 70px;
    overflow: hidden;
    /*clear: both;*/

  }

  .footer div {
    /*display: block;*/
    text-align: center;

  }
  .footer a{
    color: white;
    font-size:20px;
  }
  .footer a:link,hover,active,visited{
    text-decoration: none;
    color: white;
  }
</style>
