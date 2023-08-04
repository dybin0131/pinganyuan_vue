<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            unique-opened
            router
            text-color="#fff"
            active-text-color="#fff"
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-menu-item-group :key="subItem.index" class="itemBox">
                                <el-submenu
                                    v-if="subItem.subs"
                                    :index="subItem.index"
                                    :key="subItem.index"
                                >
                                    <template slot="title">{{ subItem.title }}</template>
                                    <el-menu-item
                                        v-for="(threeItem,i) in subItem.subs"
                                        :key="i"
                                        :index="threeItem.index"
                                    >{{ threeItem.title }}</el-menu-item>
                                </el-submenu>
                                <el-menu-item
                                    v-else
                                    :index="subItem.index"
                                    :key="subItem.index"
                                ><i :class="subItem.icon"></i>{{ subItem.title }}</el-menu-item>
                            </el-menu-item-group>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item class="menuBox" :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-s-home',
                    index: 'homePage',
                    title: '首页',
                },
                {
                    icon: 'el-icon-data-line',
                    index: 'depot',
                    title: '工作台',
                    subs: [
                        {
                            icon: 'el-icon-school',
                            index: 'workbenchDep',
                            title: '仓库',
                        },
                        {
                            icon: 'el-icon-thumb',
                            index: 'workbenchIssue',
                            title: 'Issue',
                        },
                        {
                            icon: 'el-icon-question',
                            index: 'workbenchPr',
                            title: 'Pull Requests',
                        },
                    ]
                },
                {
                    icon: 'el-icon-wallet',
                    index: 'code_view',
                    title: '我活跃的仓库',
                    subs: [
                        {
                            icon: 'el-icon-wallet',
                            index: 'codedetails1',
                            title: '我活跃的仓库1',
                        },
                        {
                            icon: 'el-icon-wallet',
                            index: 'codedetails2',
                            title: '我活跃的仓库2',
                        },
                    ]
                },
                {
                    icon: 'el-icon-office-building',
                    //index: 'tag',//未设置，待修改
                    index: 'pullMerge',//未设置，待修改
                    title: '动态',
                },
                {
                    icon: 'el-icon-edit-outline',
                    index: 'feedback',//未设置，待修改
                    title: '问题反馈',
                },
            ]
        };
    },
    methods:{
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar .sidebar-el-menu{
    color: #fff;
    background: url('../../assets/img/leftNav.png') no-repeat;
    background-size: 100% 100%;
}
.sidebar .sidebar-el-menu i{
    color: #fff;
}
.sidebar-el-menu >>> .el-menu{
    background-color: rgba(255, 255, 255, 0);
}
.sidebar >>> .el-submenu__title i{
    color: #fff;
}
.itemBox >>> .is-active{
    width: 90%;
    margin: auto;
    background: url('../../assets/img/leftButton.png') no-repeat;
    background-size: 100% 100%;
}
.menuBox.is-active{
    width: 96%;
    margin: auto;
    background: url('../../assets/img/leftButton.png') no-repeat;
    background-size: 100% 100%;

}
.sidebar::-webkit-scrollbar {
    width:0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>