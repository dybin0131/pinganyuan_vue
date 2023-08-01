<!--&lt;!&ndash;<template>&ndash;&gt;-->
<!--&lt;!&ndash;    <div class="prd-item" @click="toPrdDetail">&ndash;&gt;-->
<!--&lt;!&ndash;        <img :src="require('@/assets/images/'+prd.imgPath)">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="prd-discription">&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="prd-title">{{ prd.name }}</div>&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="prd-sellInfo">&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="prd-price">{{ prd.price }}</div>&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="prd-saleLable" v-if="prd.sale.lenght!==0">&ndash;&gt;-->
<!--&lt;!&ndash;                    <label>12期免息</label>&ndash;&gt;-->
<!--&lt;!&ndash;                    <span>新品</span>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="prd-ranking">{{ prd.ranking }}</div>&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="prd-shop">{{ prd.prdShopName }}</div>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->
<!--&lt;!&ndash;<script>&ndash;&gt;-->
<!--&lt;!&ndash;export default {&ndash;&gt;-->
<!--&lt;!&ndash;    props: {&ndash;&gt;-->
<!--&lt;!&ndash;        // 传入产品对象，必传属性为imgPath,name,price,shop&ndash;&gt;-->
<!--&lt;!&ndash;        prd: {&ndash;&gt;-->
<!--&lt;!&ndash;            type: Object,&ndash;&gt;-->
<!--&lt;!&ndash;        }&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->
<!--&lt;!&ndash;    methods: {&ndash;&gt;-->
<!--&lt;!&ndash;        // 跳转产品详情页面&ndash;&gt;-->
<!--&lt;!&ndash;        toPrdDetail() {&ndash;&gt;-->
<!--&lt;!&ndash;            this.$emit("to-prd-detail",this.prd.Id);&ndash;&gt;-->
<!--&lt;!&ndash;        }&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->
<!--&lt;!&ndash;</script>&ndash;&gt;-->

<!--<template>-->
<!--    <div class="search-box">-->
<!--        <div class="search-input">-->
<!--            <img src="@/assets/images/search.png" />-->
<!--            <input-->
<!--                type="text"-->
<!--                :placeholder="plhText"-->
<!--                maxlength="10"-->
<!--                @change="inputChange"-->
<!--                v-model="inputValue"-->
<!--            />-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
<!--    name: "searchInput", // 搜索输入框-->
<!--    props: {-->
<!--        // input框占位文字-->
<!--        plhText: {-->
<!--            type: String,-->
<!--            default: "请输入搜索内容"-->
<!--        }-->
<!--    },-->
<!--    data() {-->
<!--        return {-->
<!--            inputValue: "" //输入框的值-->
<!--        };-->
<!--    },-->
<!--    methods: {-->
<!--        // 每次输入框变化刷新列表-->
<!--        inputChange() {-->
<!--            // 使用emit给父组件传值-->
<!--            this.$emit('input-changed', this.inputValue);-->
<!--        }-->
<!--    }-->
<!--};-->
<!--</script>-->

<template>
    <div class="search-page">
        <input type="text" v-model="searchText" placeholder="请输入关键字">
        <button @click="search">搜索</button>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="项目名称">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="项目标签">
                            <span>{{ props.row.tags }}</span>
                        </el-form-item>
                        <el-form-item label="项目语言">
                            <span>{{ props.row.language }}</span>
                        </el-form-item>
                        <el-form-item label="浏览数">
                            <span>{{ props.row.viewnum }}</span>
                        </el-form-item>
                        <el-form-item label="贡献量">
                            <span>{{ props.row.collectnum }}</span>
                        </el-form-item>
                        <el-form-item label="分支数">
                            <span>{{ props.row.branchnum }}</span>
                        </el-form-item>
                        <el-form-item label="更新时间">
                            <span>{{ props.row.date }}</span>
                        </el-form-item>
                        <el-form-item label="项目简介">
                            <span>{{ props.row.info }}</span>
                        </el-form-item>

                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                label="项目名称"
                prop="name">
            </el-table-column>
            <el-table-column
                label="项目标签"
                prop="tags">
            </el-table-column>
            <el-table-column
                label="项目语言"
                prop="language">
            </el-table-column>
        </el-table>
        <ul>
            <li v-for="(result, index) in searchResults" :key="index" class="search-result">{{ result }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            searchText: '',
            searchResults: []
        }
    },
    methods: {
        search() {
            this.tableData = [{
                name: 'robegroup/chiner',
                tags: '数据库管理',
                info:  'CHINER元数建模，一款丰富数据库生态，独立于具体数据库之外的，数据库关系模型设计平台，PDManer-v4已完全承接CHINER所有功能，并增加更多更多实用功能',
                language:  'JavaScript',
                date: '2023-05-25',
                collectnum: '4.4k',
                branchnum: '822',
                viewnum: '462'
            }, {
                name: 'AnyLine/anyline',
                tags: '数据库开发包',
                info: '基于spring-jdbc生态的(No-ORM)DBUtil,兼容各种数据库。动态注册切换数据源，快速执行DDL DML。读写表结构、索引等元数据。常用于动态结构的场景,如:可视化动态多数据源、低代码后台、异构数据库迁移同步、物联网车联网数据处理、数据清洗、运行时自定义',
                language:  'Java',
                date: '2023-05-27',
                collectnum: '3.1k',
                branchnum: '575',
                viewnum: '888'
            }, {
                name: 'wangzhonnew/SequoiaDB',
                tags: '数据库服务',
                info: 'SequoiaDB 巨杉数据库是一款金融级分布式关系型数据库。 自研的原生分布式存储引擎支持完整 ACID，具备弹性扩展、高并发和高可用特性，支持 MySQL、PostgreSQL 和 SparkSQL 等多种 SQL 访问形式，适用于核心交易、数据中台、内容管理等应用场景。',
                language:  'C++',
                date: '2023-05-18',
                collectnum: '934',
                branchnum: '622',
                viewnum: '597'
            }, {
                name: 'EdurtIO/datacap',
                tags: '数据库管理、监控',
                info:  'DataCap是数据转换、集成和可视化的集成软件。支持多种数据源，文件类型，大数据相关数据库，关系型数据库，NoSQL数据库等。通过软件可以实现管理多种数据源，对该源下的数据进行各种操作转换，制作数据图表，监控数据源等各种功能。',
                language:  'Java',
                date: '2023-05-26',
                collectnum: '328',
                branchnum: '89',
                viewnum: '43'
            }]
        }
    }
}
</script>


<style scoped>
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
.search-result {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #f8f8f8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}

.search-result:hover {
    background-color: #e8e8e8;
}
.search-page {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
}

h1 {
    text-align: center;
}

input[type="text"] {
    width: 80%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
}

button {
    display: inline-block;
    background-color: #3f51b5;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-left: 10px;
}

ul {
    margin-top: 20px;
    list-style: none;
    padding: 0;
}

li {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
}
</style>


