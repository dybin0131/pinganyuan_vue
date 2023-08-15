<template>
    <!---------------------------------------------这个组件引入失败了T_T------------------------------------------->
    <div>
        <div style='display: flex;'>
            <!--标签行 左侧栏目内容-->
                <!--仓库  分支-->
                <el-dropdown>
                    <el-button type="plain">
                        master<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>master</el-dropdown-item>
                        <el-dropdown-item>branch</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!--选择贡献者-->
                <el-select v-model="value" placeholder="全部贡献者">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <!--选择日期-->

            <!--标签行 右侧栏目内容-->
            <div style='position: absolute;right:0'>
                <div >

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: [{
                value: '选项1',
                label: '全部贡献者'
            }, {
                value: '选项2',
                label: 'lxy'
            }, {
                value: '选项3',
                label: 'dyb'
            }, {
                value: '选项4',
                label: 'wzy'
            }],
            value: ''
        }
    }
}

</script>

<style>


</style>