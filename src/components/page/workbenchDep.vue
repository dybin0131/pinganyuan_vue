<template >
    <div>
    <div style='font-size: 24px;margin-top: 30px;margin-left: 1.25%;margin-right: 1.25%'>
        <el-breadcrumb separator="/" >
            <el-breadcrumb-item :to="{ path: '/' }" style='font-size: 18px'>工作台</el-breadcrumb-item>
            <el-breadcrumb-item style='font-size: 15px;margin-top:1px'><a href="/">仓库</a></el-breadcrumb-item>
        </el-breadcrumb>
        <div style='background: rgba(255,255,255,0.8);border: 1px solid;border-image: linear-gradient(0deg, #FFFFFF, #FFFFFF) 1 1;
        box-shadow: 0 5px 20px 0 rgba(183,183,195,0.07);border-radius: 10px;margin-top: 26px'>
        <el-tabs v-model="activeName"  @tab-click="handleClick"  style='margin-top: 10px;margin-left: 18px' type="card">
                    <el-tab-pane label="全部" name="first" >
                        <el-table
                            :data="tableData_All"
                            :header-cell-style="{'text-align':'center'}"
                            :cell-style="{'text-align':'center'}"
                            style="width: 100%;font-size:13px;margin-top: 10px">
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
                    </el-tab-pane>
                    <el-tab-pane label="我拥有的" name="second">
                        <el-table
                            :data="tableData_Own"
                            :header-cell-style="{'text-align':'center'}"
                            :cell-style="{'text-align':'center'}"
                            style="width: 100%;font-size:13px;margin-top: 10px">
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
                    </el-tab-pane>
                    <el-tab-pane label="我参与的" name="third">
                        <el-table
                            :data="tableData_Involved"
                            :header-cell-style="{'text-align':'center'}"
                            :cell-style="{'text-align':'center'}"
                            style="width: 100%;font-size:13px;margin-top: 10px">
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
                    </el-tab-pane>
            </el-tabs>
      </div>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData_All: [{
                name: 'admin/test',
                tags: '数据库管理',
                info:  'CHINER元数建模，一款丰富数据库生态，独立于具体数据库之外的，数据库关系模型设计平台，PDManer-v4已完全承接CHINER所有功能，并增加更多更多实用功能',
                language:  'JavaScript',
                date: '2023-07-24',
                collectnum: '4.4k',
                branchnum: '822',
                viewnum: '462',
                owener:'admin',
                url:'http://localhost:8080/codedetails?warehouseName=test&introduce=11&warehouseKeywords=11',
            },
                {
                name: 'robegroup/chiner',
                tags: '数据库管理',
                info:  'CHINER元数建模，一款丰富数据库生态，独立于具体数据库之外的，数据库关系模型设计平台，PDManer-v4已完全承接CHINER所有功能，并增加更多更多实用功能',
                language:  'JavaScript',
                date: '2023-05-25',
                collectnum: '4.4k',
                branchnum: '822',
                viewnum: '462',
                owener:'admin',
                url:'http://localhost:8080/codedetails?warehouseName=test&introduce=11&warehouseKeywords=11',
            }, {
                name: 'AnyLine/anyline',
                tags: '数据库开发包',
                info: '基于spring-jdbc生态的(No-ORM)DBUtil,兼容各种数据库。动态注册切换数据源，快速执行DDL DML。读写表结构、索引等元数据。常用于动态结构的场景,如:可视化动态多数据源、低代码后台、异构数据库迁移同步、物联网车联网数据处理、数据清洗、运行时自定义',
                language:  'Java',
                date: '2023-05-27',
                collectnum: '3.1k',
                branchnum: '575',
                viewnum: '888',
                owener:'user1',
                url:'http://localhost:8080/codedetails?warehouseName=test&introduce=11&warehouseKeywords=11',
            }, {
                name: 'wangzhonnew/SequoiaDB',
                tags: '数据库服务',
                info: 'SequoiaDB 巨杉数据库是一款金融级分布式关系型数据库。 自研的原生分布式存储引擎支持完整 ACID，具备弹性扩展、高并发和高可用特性，支持 MySQL、PostgreSQL 和 SparkSQL 等多种 SQL 访问形式，适用于核心交易、数据中台、内容管理等应用场景。',
                language:  'C++',
                date: '2023-05-18',
                collectnum: '934',
                branchnum: '622',
                viewnum: '597',
                owener:'user2',
                url:'http://localhost:8080/codedetails?warehouseName=test&introduce=11&warehouseKeywords=11',
                }, {
                    name: 'EdurtIO/datacap',
                    tags: '数据库管理、监控',
                    info:  'DataCap是数据转换、集成和可视化的集成软件。支持多种数据源，文件类型，大数据相关数据库，关系型数据库，NoSQL数据库等。通过软件可以实现管理多种数据源，对该源下的数据进行各种操作转换，制作数据图表，监控数据源等各种功能。',
                    language:  'Java',
                    date: '2023-05-26',
                    collectnum: '328',
                    branchnum: '89',
                    viewnum: '43',
                    owener:'user3',
                    url:'http://localhost:8080/codedetails?warehouseName=test&introduce=11&warehouseKeywords=11',
                }],
            tableData_Own: [{
                name: 'admin/test',
                tags: '数据库管理',
                info:  'CHINER元数建模，一款丰富数据库生态，独立于具体数据库之外的，数据库关系模型设计平台，PDManer-v4已完全承接CHINER所有功能，并增加更多更多实用功能',
                language:  'JavaScript',
                date: '2023-07-24',
                collectnum: '4.4k',
                branchnum: '822',
                viewnum: '462',
                owener:'admin',
                url:'http://localhost:8080/codedetails?warehouseName=test&introduce=11&warehouseKeywords=11',
                },
                {
                    name: 'robegroup/chiner',
                    tags: '数据库管理',
                    info:  'CHINER元数建模，一款丰富数据库生态，独立于具体数据库之外的，数据库关系模型设计平台，PDManer-v4已完全承接CHINER所有功能，并增加更多更多实用功能',
                    language:  'JavaScript',
                    date: '2023-05-25',
                    collectnum: '4.4k',
                    branchnum: '822',
                    viewnum: '462',
                    owener:'admin',
                    url:'http://localhost:8080/codedetails?warehouseName=test&introduce=11&warehouseKeywords=11',
                }],
            tableData_Involved: [{
                    name: 'AnyLine/anyline',
                    tags: '数据库开发包',
                    info: '基于spring-jdbc生态的(No-ORM)DBUtil,兼容各种数据库。动态注册切换数据源，快速执行DDL DML。读写表结构、索引等元数据。常用于动态结构的场景,如:可视化动态多数据源、低代码后台、异构数据库迁移同步、物联网车联网数据处理、数据清洗、运行时自定义',
                    language:  'Java',
                    date: '2023-05-27',
                    collectnum: '3.1k',
                    branchnum: '575',
                    viewnum: '888',
                    owener:'user1',
                    url:'http://localhost:8080/codedetails?warehouseName=test&introduce=11&warehouseKeywords=11',
                }, {
                    name: 'wangzhonnew/SequoiaDB',
                    tags: '数据库服务',
                    info: 'SequoiaDB 巨杉数据库是一款金融级分布式关系型数据库。 自研的原生分布式存储引擎支持完整 ACID，具备弹性扩展、高并发和高可用特性，支持 MySQL、PostgreSQL 和 SparkSQL 等多种 SQL 访问形式，适用于核心交易、数据中台、内容管理等应用场景。',
                    language:  'C++',
                    date: '2023-05-18',
                    collectnum: '934',
                    branchnum: '622',
                    viewnum: '597',
                    owener:'user2',
                    url:'http://localhost:8080/codedetails?warehouseName=test&introduce=11&warehouseKeywords=11',
                }, {
                name: 'EdurtIO/datacap',
                tags: '数据库管理、监控',
                info:  'DataCap是数据转换、集成和可视化的集成软件。支持多种数据源，文件类型，大数据相关数据库，关系型数据库，NoSQL数据库等。通过软件可以实现管理多种数据源，对该源下的数据进行各种操作转换，制作数据图表，监控数据源等各种功能。',
                language:  'Java',
                date: '2023-05-26',
                collectnum: '328',
                branchnum: '89',
                viewnum: '43',
                owener:'user3',
                url:'http://localhost:8080/codedetails?warehouseName=test&introduce=11&warehouseKeywords=11',
            }],
            activeName: 'first',
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
}
</script>

<style>
.multiline span {
    white-space:pre-wrap ; /* 或者可以使用 pre-wrap / normal*/
}
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
.el-tabs__item:hover {
    color: black;
    background-color: white ;
}
.el-tabs__item.is-active {
    color: #559EEF;
    background-color: #E9F1FD;
}

</style>
