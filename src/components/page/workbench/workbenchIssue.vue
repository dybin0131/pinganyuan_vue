<template>
    <div style='font-size: 24px;margin-top: 30px;margin-left: 1.25%;margin-right: 1.25%'>
        <el-breadcrumb separator="/" >
            <el-breadcrumb-item :to="{ path: '/' }" style='font-size: 18px'>工作台</el-breadcrumb-item>
            <el-breadcrumb-item style='font-size: 15px;margin-top:1px'><a href="/">Issue</a></el-breadcrumb-item>
        </el-breadcrumb>
        <div style='background: rgba(255,255,255,0.8);border: 1px solid;border-image: linear-gradient(0deg, #FFFFFF, #FFFFFF) 1 1;
        box-shadow: 0 5px 20px 0 rgba(183,183,195,0.07);border-radius: 10px;margin-top: 26px'>
        <el-tabs v-model="activeName"  @tab-click="handleClick"  style='margin-top: 10px;margin-left: 18px' type="card">
            <el-tab-pane label="我负责的" name="second">
                <el-table
                    :data="issueData_CHARGE"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    style="width: 100%;font-size:13px;margin-top: 10px">
                    <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="details"
                        label="详情">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="我提出的" name="third">
                <el-table
                    :data="issueData_SUBMIT"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    style="width: 100%;font-size: 13px;margin-top: 10px">
                    <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="details"
                        label="详情">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    name: 'workbenchPr',
    data() {
        return {
            issueData_CHARGE: [{
                date: '2023-05-04',
                name: 'user1',
                details: 'ios端 webview 引入本地html文件，白屏。安卓正常'
            }, {
                date: '2023-05-01',
                name: 'user2',
                details: '如何给image标签下的img标签绑定属性'
            }, {
                date: '2023-05-03',
                name: 'user3',
                details: '使用内置组件picker mode="date" 出现问题，无法正常选择时间，不论选择什么都会自动回滚第一条'
            }],
            issueData_SUBMIT: [{
                date: '2023-05-02',
                name: 'admin',
                details: '在ts版本中，如何定义globalData与如何使用getApp()'
            }],
            activeName: 'second',
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleView(url) {
            //window.open('url', '_blank');
            window.location.href = 'url';
            console.log(url);
        },
    }
};
</script>

<style scoped>

</style>