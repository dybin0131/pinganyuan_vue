<template >
    <div>
    <div style='font-size: 24px;margin-top: 30px;margin-left: 1.25%;margin-right: 1.25%'>
        <el-breadcrumb separator="/" >
            <el-breadcrumb-item :to="{ path: '/' }" style='font-size: 18px'>工作台</el-breadcrumb-item>
            <el-breadcrumb-item style='font-size: 15px;margin-top:1px'><a href="/">仓库</a></el-breadcrumb-item>
        </el-breadcrumb>
        <div style='background: rgba(255,255,255,0.8);border: 1px solid;border-image: linear-gradient(0deg, #FFFFFF, #FFFFFF) 1 1;
        box-shadow: 0 5px 20px 0 rgba(183,183,195,0.07);border-radius: 10px;margin-top: 26px'>
        <el-tabs v-model="activeName"  @tab-click="handleClick"  style='margin-top: 10px;margin-left: 18px' type="card"
                 v-if='this.username==="韩梅梅"'>
                    <el-tab-pane label="全部" name="first" >
                        <el-table
                            :data="tableData_all_store"
                            :header-cell-style="{'text-align':'center'}"
                            :cell-style="{'text-align':'center'}"
                            style="width: 100%;font-size:13px;margin-top: 10px"
                       >
                            <el-table-column
                                label="项目名称"
                                prop="name">
                                <template slot-scope="scope">
                                    <div v-if='scope.$index===0'>
                                        <router-link :to="{path:'/codedetails',query:{username:scope.row.owner,warehouseName: scope.row.warehouseName,introduce:scope.row.info,
                        warehouseKeywords:scope.row.language,isOwner:scope.row.isOwner,isMember:scope.row.isMember,owner:scope.row.owner,
                        isManager:scope.row.isManager,isCertificator:scope.row.isCertificator},}"> {{ scope.row.owner }}/{{scope.row.warehouseName}} </router-link>
                                    </div>
                                    <div v-else>
                                  <router-link :to="{path:'/codedetails8',query:{username:scope.row.owner,warehouseName: scope.row.warehouseName,introduce:scope.row.info,
                        warehouseKeywords:scope.row.language,isOwner:scope.row.isOwner,isMember:scope.row.isMember,owner:scope.row.owner,
                        isManager:scope.row.isManager,isCertificator:scope.row.isCertificator},}"> {{ scope.row.owner }}/{{scope.row.warehouseName}} </router-link>
                                    </div>
<!--                                    <el-button-->
<!--                                        type="text"-->
<!--                                        @click="viewRep(scope.$index, scope.row)"-->
<!--                                        style='color: black;font-size: 14px'-->
<!--                                    >{{ scope.row.name}} </el-button>-->
                                </template>
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
<!--                        <div> {{this.$store.state.sharedData}} </div>-->
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
                                <template slot-scope="scope">
                                    <router-link :to="{path:'/codedetails7',query:{username:scope.row.owner,warehouseName: scope.row.warehouseName,introduce:scope.row.info,
                        warehouseKeywords:scope.row.key,isOwner:scope.row.isOwner,isMember:scope.row.isMember,owner:scope.row.owner,
                        isManager:scope.row.isManager,isCertificator:scope.row.isCertificator},}"> {{ scope.row.owner }}/{{scope.row.warehouseName}} </router-link>
                                </template>
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
                                <template slot-scope="scope">
                                    <router-link :to="{path:'/codedetails',query:{username:scope.row.owner,warehouseName: scope.row.warehouseName,introduce:scope.row.info,
                        warehouseKeywords:scope.row.key,isOwner:scope.row.isOwner,isMember:scope.row.isMember,owner:scope.row.owner,
                        isManager:scope.row.isManager,isCertificator:scope.row.isCertificator},}"> {{ scope.row.owner }}/{{scope.row.warehouseName}} </router-link>
                                </template>
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
        <el-tabs v-model="activeName"  @tab-click="handleClick"  style='margin-top: 10px;margin-left: 18px' type="card"
                     v-if='this.username==="李华"'>
                <el-tab-pane label="全部" name="first" >
                    <el-table
                        :data="tableData_lihua_all_store"
                        :header-cell-style="{'text-align':'center'}"
                        :cell-style="{'text-align':'center'}"
                        style="width: 100%;font-size:13px;margin-top: 10px"
                    >
                        <el-table-column
                            label="项目名称"
                            prop="name">
                            <template slot-scope="scope">
                                <div v-if='scope.$index===0'>
                                    <router-link :to="{path:'/codedetails',query:{username:scope.row.owner,warehouseName: scope.row.warehouseName,introduce:scope.row.info,
                        warehouseKeywords:scope.row.language,isOwner:scope.row.isOwner,isMember:scope.row.isMember,owner:scope.row.owner,
                        isManager:scope.row.isManager,isCertificator:scope.row.isCertificator},}"> {{ scope.row.owner }}/{{scope.row.warehouseName}} </router-link>
                                </div>
                                <div v-else>
                                    <router-link :to="{path:'/codedetails8',query:{username:scope.row.owner,warehouseName: scope.row.warehouseName,introduce:scope.row.info,
                        warehouseKeywords:scope.row.language,isOwner:scope.row.isOwner,isMember:scope.row.isMember,owner:scope.row.owner,
                        isManager:scope.row.isManager,isCertificator:scope.row.isCertificator},}"> {{ scope.row.owner }}/{{scope.row.warehouseName}} </router-link>
                                </div>
                                <!--                                    <el-button-->
                                <!--                                        type="text"-->
                                <!--                                        @click="viewRep(scope.$index, scope.row)"-->
                                <!--                                        style='color: black;font-size: 14px'-->
                                <!--                                    >{{ scope.row.name}} </el-button>-->
                            </template>
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
                    <!--                        <div> {{this.$store.state.sharedData}} </div>-->
                </el-tab-pane>
                <el-tab-pane label="我拥有的" name="second">
                    <el-table
                        :data="tableData_lihua_own_store"
                        :header-cell-style="{'text-align':'center'}"
                        :cell-style="{'text-align':'center'}"
                        style="width: 100%;font-size:13px;margin-top: 10px">
                        <el-table-column
                            label="项目名称"
                            prop="name">
                            <template slot-scope="scope">
                                <router-link :to="{path:'/codedetails8',query:{username:scope.row.owner,warehouseName: scope.row.warehouseName,introduce:scope.row.info,
                        warehouseKeywords:scope.row.key,isOwner:scope.row.isOwner,isMember:scope.row.isMember,owner:scope.row.owner,
                        isManager:scope.row.isManager,isCertificator:scope.row.isCertificator},}"> {{ scope.row.owner }}/{{scope.row.warehouseName}} </router-link>
                            </template>
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
                        :data="tableData_lihua_involved_store"
                        :header-cell-style="{'text-align':'center'}"
                        :cell-style="{'text-align':'center'}"
                        style="width: 100%;font-size:13px;margin-top: 10px">
                        <el-table-column
                            label="项目名称"
                            prop="name">
                            <template slot-scope="scope">
                                <router-link :to="{path:'/codedetails',query:{username:scope.row.owner,warehouseName: scope.row.warehouseName,introduce:scope.row.info,
                        warehouseKeywords:scope.row.key,isOwner:scope.row.isOwner,isMember:scope.row.isMember,owner:scope.row.owner,
                        isManager:scope.row.isManager,isCertificator:scope.row.isCertificator},}"> {{ scope.row.owner }}/{{scope.row.warehouseName}} </router-link>
                            </template>
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
        <el-tabs v-model="activeName"  @tab-click="handleClick"  style='margin-top: 10px;margin-left: 18px' type="card"
                     v-if='this.username==="李雷"'>
                <el-tab-pane label="全部" name="first" >
                    <el-table
                        :data="tableData_lilei_All"
                        :header-cell-style="{'text-align':'center'}"
                        :cell-style="{'text-align':'center'}"
                        style="width: 100%;font-size:13px;margin-top: 10px"
                    >
                        <el-table-column
                            label="项目名称"
                            prop="name">
                            <template slot-scope="scope">
                                <div v-if='scope.$index===0'>
                                    <router-link :to="{path:'/codedetails',query:{username:scope.row.owner,warehouseName: scope.row.warehouseName,introduce:scope.row.info,
                        warehouseKeywords:scope.row.language,isOwner:scope.row.isOwner,isMember:scope.row.isMember,owner:scope.row.owner,
                        isManager:scope.row.isManager,isCertificator:scope.row.isCertificator},}"> {{ scope.row.owner }}/{{scope.row.warehouseName}} </router-link>
                                </div>
                                <div v-else>
                                    <router-link :to="{path:'/codedetails8',query:{username:scope.row.owner,warehouseName: scope.row.warehouseName,introduce:scope.row.info,
                        warehouseKeywords:scope.row.language,isOwner:scope.row.isOwner,isMember:scope.row.isMember,owner:scope.row.owner,
                        isManager:scope.row.isManager,isCertificator:scope.row.isCertificator},}"> {{ scope.row.owner }}/{{scope.row.warehouseName}} </router-link>
                                </div>
                                <!--                                    <el-button-->
                                <!--                                        type="text"-->
                                <!--                                        @click="viewRep(scope.$index, scope.row)"-->
                                <!--                                        style='color: black;font-size: 14px'-->
                                <!--                                    >{{ scope.row.name}} </el-button>-->
                            </template>
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
                    <!--                        <div> {{this.$store.state.sharedData}} </div>-->
                </el-tab-pane>
                <el-tab-pane label="我拥有的" name="second">
                    <el-table
                        :data="tableData_lilei_own"
                        :header-cell-style="{'text-align':'center'}"
                        :cell-style="{'text-align':'center'}"
                        style="width: 100%;font-size:13px;margin-top: 10px">
                        <el-table-column
                            label="项目名称"
                            prop="name">
                            <template slot-scope="scope">
                                <router-link :to="{path:'/codedetails8',query:{username:scope.row.owner,warehouseName: scope.row.warehouseName,introduce:scope.row.info,
                        warehouseKeywords:scope.row.key,isOwner:scope.row.isOwner,isMember:scope.row.isMember,owner:scope.row.owner,
                        isManager:scope.row.isManager,isCertificator:scope.row.isCertificator},}"> {{ scope.row.owner }}/{{scope.row.warehouseName}} </router-link>
                            </template>
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
                        :data="tableData_lilei_involved"
                        :header-cell-style="{'text-align':'center'}"
                        :cell-style="{'text-align':'center'}"
                        style="width: 100%;font-size:13px;margin-top: 10px">
                        <el-table-column
                            label="项目名称"
                            prop="name">
                            <template slot-scope="scope">
                                <router-link :to="{path:'/codedetails',query:{username:scope.row.owner,warehouseName: scope.row.warehouseName,introduce:scope.row.info,
                        warehouseKeywords:scope.row.key,isOwner:scope.row.isOwner,isMember:scope.row.isMember,owner:scope.row.owner,
                        isManager:scope.row.isManager,isCertificator:scope.row.isCertificator},}"> {{ scope.row.owner }}/{{scope.row.warehouseName}} </router-link>
                            </template>
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
import retrieveDepot from '@/components/page/retrieveDepot.vue';

export default {
    data() {
        return {
            tableData_all_store:this.$store.state.tableData_all_store,
            tableData_lihua_all_store:this.$store.state.tableData_lihua_all_store,
            tableData_lihua_involved_store:this.$store.state.tableData_lihua_involved_store,
            tableData_lihua_own_store:this.$store.state.tableData_lihua_own_store,

            tableData_All: [
                {
                name: 'admin/协同课设',
                tags: '课设',
                info:  '这是关于我们的课设',
                language:  'C++',
                date: '2023-08-03',
                collectnum: '4.4k',
                branchnum: '822',
                viewnum: '462',
                owner:'admin',
                warehouseName:'协同课设',
                isOwner:true,
                isMember:true,
                isManager:true,
                isCertificator:false,
                key:'C++',
            },
                {
                name: '小好/小好的测试仓库',
                tags: '课设',
                info:  '这是我的测试仓库',
                language:  'C++/C',
                date: '2023-07-24',
                collectnum: '4.4k',
                branchnum: '822',
                viewnum: '462',
                owner:'小好',
                warehouseName:'小好的测试仓库',
                isOwner:true,
                isMember:true,
                isManager:true,
                isCertificator:false,
            },  {
                    name: '小好/小好的临时仓库',
                    tags: '课设',
                    info:  '这是我的临时仓库',
                    language:  'C++',
                    date: '2023-07-01',
                    collectnum: '4.4k',
                    branchnum: '822',
                    viewnum: '462',
                    owner:'小好',
                    warehouseName:'小好的临时仓库',
                    isOwner:true,
                    isMember:true,
                    isManager:true,
                    isCertificator:false,
                }, {
                name: 'AnyLine/anyline',
                tags: '数据库',
                info: '基于spring-jdbc生态的(No-ORM)DBUtil,兼容各种数据库。动态注册切换数据源，快速执行DDL DML。读写表结构、索引等元数据。常用于动态结构的场景,如:可视化动态多数据源、低代码后台、异构数据库迁移同步、物联网车联网数据处理、数据清洗、运行时自定义',
                language:  'Java',
                date: '2023-05-27',
                collectnum: '3.1k',
                branchnum: '575',
                viewnum: '888',
                owner:'AnyLine',
                warehouseName:'anyline',
                isOwner:true,
                isMember:true,
                isManager:true,
                isCertificator:false,
            }, {
                name: 'wangzhonnew/SequoiaDB',
                tags: '数据库服务',
                info: 'SequoiaDB 巨杉数据库是一款金融级分布式关系型数据库。 自研的原生分布式存储引擎支持完整 ACID，具备弹性扩展、高并发和高可用特性，支持 MySQL、PostgreSQL 和 SparkSQL 等多种 SQL 访问形式，适用于核心交易、数据中台、内容管理等应用场景。',
                language:  'C++',
                date: '2023-05-18',
                collectnum: '934',
                branchnum: '622',
                viewnum: '597',
                owner:'wangzhonnew',
                warehouseName:'SequoiaDB',
                isOwner:true,
                isMember:true,
                isManager:true,
                isCertificator:false,
            }, {
                    name: 'EdurtIO/datacap',
                    tags: '数据库管理、监控',
                    info:  'DataCap是数据转换、集成和可视化的集成软件。支持多种数据源，文件类型，大数据相关数据库，关系型数据库，NoSQL数据库等。通过软件可以实现管理多种数据源，对该源下的数据进行各种操作转换，制作数据图表，监控数据源等各种功能。',
                    language:  'Java',
                    date: '2023-05-26',
                    collectnum: '328',
                    branchnum: '89',
                    viewnum: '43',
                    owner:'EdurtIO',
                    warehouseName:'datacap',
                    isOwner:true,
                    isMember:true,
                    isManager:true,
                    isCertificator:false,
            }],
            tableData_Own: [
                {
                name: '韩梅梅/协同课设',
                tags: '课设',
                info:  '这是关于我们的课设',
                language:  'C++',
                date: '2023-08-03',
                collectnum: '4.4k',
                branchnum: '822',
                viewnum: '462',
                owner:'韩梅梅',
                warehouseName:'协同课设',
                isOwner:true,
                isMember:true,
                isManager:true,
                isCertificator:false,
            },
                {
                    name: '韩梅梅/SHA256',
                    tags: 'c',
                    info:  'SHA256 算法',
                    language:  'C++',
                    date: '2023-08-03',
                    collectnum: '4.4k',
                    branchnum: '822',
                    viewnum: '462',
                    owner:'韩梅梅',
                    warehouseName:'SHA256',
                    isOwner:true,
                    isMember:true,
                    isManager:true,
                    isCertificator:false,
                },
        ],
            tableData_Involved: [
                {
                name: '李华/李华的测试仓库',
                tags: '课设',
                info:  '这是我的测试仓库',
                language:  'C++/C',
                date: '2023-07-24',
                collectnum: '4.4k',
                branchnum: '822',
                viewnum: '462',
                owner:'李华',
                warehouseName:'李华的测试仓库',
                isOwner:true,
                isMember:true,
                isManager:true,
                isCertificator:false,
                isXieTong:false,
                isCeShi:true,
                isLinShi:false,
            },  {
                name: '李华/李华的临时仓库',
                tags: '课设',
                info:  '这是我的临时仓库',
                language:  'C++',
                date: '2023-07-01',
                collectnum: '4.4k',
                branchnum: '822',
                viewnum: '462',
                owner:'李华',
                warehouseName:'李华的临时仓库',
                isOwner:true,
                isMember:true,
                isManager:true,
                isCertificator:false,
                isXieTong:false,
                isCeShi:false,
                isLinShi:true,
            },{
                name: '张小凝/数据库仓库',
                tags: '数据库',
                info: '基于spring-jdbc生态的(No-ORM)DBUtil,兼容各种数据库。动态注册切换数据源，快速执行DDL DML。读写表结构、索引等元数据。常用于动态结构的场景,如:可视化动态多数据源、低代码后台、异构数据库迁移同步、物联网车联网数据处理、数据清洗、运行时自定义',
                language:  'Java',
                date: '2023-05-27',
                collectnum: '3.1k',
                branchnum: '575',
                viewnum: '888',
                owner:'张小凝',
                warehouseName:'数据库仓库',
                isOwner:true,
                isMember:true,
                isManager:true,
                isCertificator:false,
            }, {
                name: '王明/数据库服务仓库',
                tags: '数据库服务',
                info: 'SequoiaDB 巨杉数据库是一款金融级分布式关系型数据库。 自研的原生分布式存储引擎支持完整 ACID，具备弹性扩展、高并发和高可用特性，支持 MySQL、PostgreSQL 和 SparkSQL 等多种 SQL 访问形式，适用于核心交易、数据中台、内容管理等应用场景。',
                language:  'C++',
                date: '2023-05-18',
                collectnum: '934',
                branchnum: '622',
                viewnum: '597',
                owner:'王明',
                warehouseName:'数据库服务仓库',
                isOwner:true,
                isMember:true,
                isManager:true,
                isCertificator:false,
            }, {
                name: '孙亮/数据库管理仓库',
                tags: '数据库管理、监控',
                info:  'DataCap是数据转换、集成和可视化的集成软件。支持多种数据源，文件类型，大数据相关数据库，关系型数据库，NoSQL数据库等。通过软件可以实现管理多种数据源，对该源下的数据进行各种操作转换，制作数据图表，监控数据源等各种功能。',
                language:  'Java',
                date: '2023-05-26',
                collectnum: '328',
                branchnum: '89',
                viewnum: '43',
                owner:'孙亮',
                warehouseName:'数据库管理仓库',
                isOwner:true,
                isMember:true,
                isManager:true,
                isCertificator:true,
            }],

            tableData_lilei_All: [
                {
                    name: '韩梅梅/协同课设',
                    tags: '课设',
                    info:  '这是关于我们的课设',
                    language:  'C++',
                    date: '2023-08-03',
                    collectnum: '4.4k',
                    branchnum: '822',
                    viewnum: '462',
                    owner:'韩梅梅',
                    warehouseName:'协同课设',
                    isOwner:true,
                    isMember:true,
                    isManager:true,
                    isCertificator:false,
                    key:'C++',
                },
                {
                    name: '李雷/豆瓣评分系统',
                    tags: '课设',
                    info:  '这是我的豆瓣评分系统',
                    language:  'C++/C',
                    date: '2023-07-24',
                    collectnum: '4.4k',
                    branchnum: '822',
                    viewnum: '462',
                    owner:'李雷',
                    warehouseName:'这是我的豆瓣评分系统',
                    isOwner:true,
                    isMember:true,
                    isManager:true,
                    isCertificator:false,
                }
            ],
            tableData_lilei_own: [
                {
                    name: '李雷/豆瓣评分系统',
                    tags: '课设',
                    info:  '这是我的豆瓣评分系统',
                    language:  'C++/C',
                    date: '2023-07-24',
                    collectnum: '4.4k',
                    branchnum: '822',
                    viewnum: '462',
                    owner:'李雷',
                    warehouseName:'这是我的豆瓣评分系统',
                    isOwner:true,
                    isMember:true,
                    isManager:true,
                    isCertificator:false,
                }
            ],
            tableData_lilei_involved: [
                {
                    name: '韩梅梅/协同课设',
                    tags: '课设',
                    info:  '这是关于我们的课设',
                    language:  'C++',
                    date: '2023-08-03',
                    collectnum: '4.4k',
                    branchnum: '822',
                    viewnum: '462',
                    owner:'韩梅梅',
                    warehouseName:'协同课设',
                    isOwner:true,
                    isMember:true,
                    isManager:true,
                    isCertificator:false,
                    key:'C++',
                },
            ],
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
        viewRep(index,row){
            console.log(viewRep);
            //小好要删除得   小好的测试仓库，可信的——【场景三】
            if(scope.row.isCeShi===true) {
                this.$router.push({
                    path: '/codedetails7', query: {
                        username: row.owner,
                        warehouseName: row.warehouseName,
                        introduce: row.info,
                        warehouseKeywords: row.language,
                        isOwner: row.isOwner,
                        isMember: row.isMember,
                        owner: row.owner,
                        isManager: row.isManager,
                        isCertificator: row.isCertificator
                    },
                })
            }
            //admin  的 协同课设 ，可信的，【场景二】【场景零】
            else if(scope.row.isXieTong===true){
                this.$router.push({
                    path: '/codedetails', query: {
                        username: scope.row.owner,
                        warehouseName: scope.row.warehouseName,
                        introduce: scope.row.info,
                        warehouseKeywords: scope.row.language,
                        isOwner: scope.row.isOwner,
                        isMember: scope.row.isMember,
                        owner: scope.row.owner,
                        isManager: scope.row.isManager,
                        isCertificator: scope.row.isCertificator
                    },
                })
            }
            //小好的临时课设   不可信的 【未用到】or【场景一】
            else if(scope.row.isLinShi===true){
                this.$router.push({
                    path: '/codedetails5', query: {
                        username: scope.row.owner,
                        warehouseName: scope.row.warehouseName,
                        introduce: scope.row.info,
                        warehouseKeywords: scope.row.language,
                        isOwner: scope.row.isOwner,
                        isMember: scope.row.isMember,
                        owner: scope.row.owner,
                        isManager: scope.row.isManager,
                        isCertificator: scope.row.isCertificator
                    },
                })
            }
        },
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
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
