<template>
    <div style='font-size: 24px;margin-top: 30px;margin-left: 1.25%;margin-right: 1.25%'>
        <div class="topNav">
            <el-breadcrumb separator="/" >
                <el-breadcrumb-item :to="{ path: '/' }" style='font-size: 18px'>工作台</el-breadcrumb-item>
                <el-breadcrumb-item style='font-size: 15px;margin-top:1px'><a href="/">Pull Request</a></el-breadcrumb-item>
            </el-breadcrumb>
            <div>
                 <el-button type="primary" @click="()=>{$router.push('./pullProcess');}">合并pull Requests</el-button>
                <el-button type="primary" @click="()=>{$router.push('./pullMerge');}">审核pull Requests</el-button>
            </div>
        </div>
        <div style='background: rgba(255,255,255,0.8);border: 1px solid;border-image: linear-gradient(0deg, #FFFFFF, #FFFFFF) 1 1;
        box-shadow: 0 5px 20px 0 rgba(183,183,195,0.07);border-radius: 10px;margin-top: 26px'>
        <el-tabs v-model="activeName"  @tab-click="handleClick"  style='margin-top: 10px;margin-left: 18px' type="card">
            <el-tab-pane label="我负责的" name="second">
                <el-table
                    :data="prData_CHARGE"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    style="width: 100%;font-size:13px;margin-top: 10px">
                    <el-table-column
                        prop="userName"
                        label="姓名"
                        width="300">
                    </el-table-column>
                    <el-table-column
                        prop="prName"
                        label="Pull Requests"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="depName"
                        label="仓库名称"
                        width="500">
                    </el-table-column>

                </el-table>
            </el-tab-pane>
            <el-tab-pane label="我提出的" name="third">
                <el-table
                    :data="prData_SUBMIT"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    style="width: 100%;font-size:13px;">
                    <el-table-column
                        prop="userName"
                        label="姓名"
                        width="300">
                    </el-table-column>
                    <el-table-column
                        prop="prName"
                        label="Pull Requests"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="depName"
                        label="仓库名称"
                        width="500">
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
            prData_CHARGE: [{
                date: '2023-05-04',
                userName:"用户1",
                prName:'用户1的拉取请求',
                depName:'韩梅梅/测试项目',
                source:'test',
                aim:'master',
            }, {
                date: '2023-05-01',
                userName:"用户2",
                prName:'用户2的拉取请求',
                depName:'韩梅梅/测试项目',
                source:'test',
                aim:'master',
            }, {
                date: '2023-05-03',
                userName:"用户3",
                prName:'用户3的拉取请求',
                depName:'韩梅梅/测试项目',
                source:'test',
                aim:'master',
            }],
            prData_SUBMIT: [{
                date: '2023-05-02',
                userName: "韩梅梅",
                prName: '韩梅梅的拉取请求',
                depName: '韩梅梅/测试项目',
                source: 'test',
                aim: 'master',
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
.topNav{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>