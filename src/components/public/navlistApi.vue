<template>
    <div class="leftNav" v-bind:style="{height:screenHeight+'px'}">
        <ul class="nav nav-pills nav-stacked">
            <router-link to="apiProperty" class="eleClass">
                <span>接口性能大盘</span>
            </router-link>
            <router-link to="pageProperty" class="eleClass">
                <span>页面性能大盘</span>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'navlistApi',
        data: function () {
            return {
                screenHeight: $(window).height() - 105
            }
        },
        methods: {}
    }
</script>

<style>
    .eleClass {
        padding: 10px 0px;
        width: 100%;
        text-align: center;
    }
    .eleClass:first-child{
        margin-top:20px;
    }
</style>