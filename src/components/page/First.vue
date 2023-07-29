<template>

    <div style='background-color: #cccccc;height: 800px'>
        <router-view></router-view>
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#303133"
            text-color="#fff"
            active-text-color="#ffd04b"
            style='font-size: 0;width:1600px;text-align: center;'
            router
        >
            <div class="line"></div>
             <div style='width: 800px;display: inline-block;text-align:left'>
                <el-menu-item index="1">产品</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">用户案例</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-menu-item index="2-4">选项4</el-menu-item>
                </el-submenu>
                <el-menu-item index="3" >开源</el-menu-item>
                <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">服务</a></el-menu-item>
             </div>

            <div style='text-align: right;width: 450px;display: inline-block'>
                <el-input
                    placeholder="Search here!"
                    suffix-icon="el-icon-search"
                    v-model="input2"
                    style='width: 220px'>
                </el-input>
                <el-menu-item index="5" >注册</el-menu-item>
                <router-link to="login" type="text"  style="color: #cf9236;background-color: transparent;text-size-adjust: auto">
                    <el-button type="text" style="font-size:14px;color: #cf9236">登录</el-button>
                </router-link>
                <!--<el-menu-item index="6" style='color: #cf9236'  >Sign up</el-menu-item>-->
            </div>
        </el-menu>
        <div>
            <h1 style='text-align: center;font-size: 88px;padding-top: 30px;font-family: KaiTi'>{{ msg }}</h1>
        </div>
    </div>
</template>

<script>

export default {
    name: "test",
    data(){
        return{
            search_content: "",
            msg:"开源代码托管平台"
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
}
</script>


<style scoped>
body{
    background-color: #1f2f3d;
}
h1, h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}

</style>