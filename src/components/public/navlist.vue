<template>
    <!--左侧导航栏-->
    <div id="leftNav">
        <el-menu default-active="1" v-bind:default-openeds="openeds" class="el-menu-vertical-demo leftNav"
                   v-bind:style="{height:screenHeight+'px'}">
            <el-submenu index="1">
                <template slot="title">
                    <router-link to="dataSource">数据源</router-link>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">
                        <router-link to="cat">CAT</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                        <router-link to="dashboard">Dashboard</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                        <router-link to="listPage">任务列表</router-link>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2">
                <router-link to="graphy">图表</router-link>
            </el-menu-item>
            <el-menu-item index="3">
                <router-link to="board">看板</router-link>
            </el-menu-item>
            <el-menu-item index="4">
                <router-link to="warnRule">告警规则</router-link>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: 'navlist',
        data: function () {
            return {
                screenHeight:  $(window).height()-105,
                openeds:['1']
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
`
<style>
    .leftNav {
        background: #e4e4e4;
        width: 13%;
        height: 800px;
        float: left;
    }

    .leftNav a {
        display: block;
        text-decoration: none;
        color: rgba(51, 102, 153, 1);
        font-size: 20px;
        margin: 0 auto;
    }

    .leftNav a:link {
        text-decoration: none;
    }
</style>