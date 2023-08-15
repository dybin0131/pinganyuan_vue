import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        CredibleValue: 0,
        praisePR:0,
        sharedData:1,
        tableData_all_store: [
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
            isXieTong:true,
            isCeShi:false,
            isLinShi:false,
         }, {
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
            },  {
            name: '李华/地图导航课设',
            tags: '课设',
            info:  '这是我的地图导航课设',
            language:  'C++/C',
            date: '2023-07-24',
            collectnum: '4.4k',
            branchnum: '822',
            viewnum: '462',
            owner:'李华',
            warehouseName:'地图导航课设',
            isOwner:true,
            isMember:true,
            isManager:true,
            isCertificator:false,
        }],
        tableData_lihua_all_store:[
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
                isXieTong:true,
                isCeShi:false,
                isLinShi:false,
            }, {
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
            }, {
                name: '李华/地图导航课设',
                tags: '课设',
                info:  '这是我的地图导航课设',
                language:  'C++/C',
                date: '2023-07-24',
                collectnum: '4.4k',
                branchnum: '822',
                viewnum: '462',
                owner:'李华',
                warehouseName:'地图导航课设',
                isOwner:true,
                isMember:true,
                isManager:true,
                isCertificator:false,
            }
        ],
        tableData_lihua_own_store:[
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
            }, {
                name: '李华/地图导航课设',
                tags: '课设',
                info:  '这是我的地图导航课设',
                language:  'C++/C',
                date: '2023-07-24',
                collectnum: '4.4k',
                branchnum: '822',
                viewnum: '462',
                owner:'李华',
                warehouseName:'地图导航课设',
                isOwner:true,
                isMember:true,
                isManager:true,
                isCertificator:false,
            }

        ],
        tableData_lihua_involved_store:[
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
                isXieTong:true,
                isCeShi:false,
                isLinShi:false,
            },
        ],
        unread_store: [
            {
            date: '',
            title: '【系统通知】欢迎加入仓库',
            url: '',
            isExamine: 0,
        }, {
            date: '',
            title: '【审核结果通知】',
            //url: 'http://localhost:8080/codedetails?username=user1&warehouseName=11&introduce=11&warehouseKeywords=11',
            isExamine: 0,
            isApplication:1,
            username: '李华',
            warehouseName: '李华的测试仓库',
            introduce: '我的测试仓库',
            warehouseKeywords: 'C++/C',
            isCertificator:false,
            isOwner:true,
            isMember:true,
            isManager:true,
            isCredible:60,
            owner:'李华',
        }],
    },
    mutations: {
        updateCredibleValue(state, value) {
            state.CredibleValue = value;
        },
//PR的赞和踩
        PraisePRIncrement(state) {
            state.praisePR++;
        },
        PraisePRDecrement(state) {
            state.praisePR--;
        },
        //找回仓库
        updateSharedData(state, newData){
            if(newData===0){
                state.sharedData = 3;
                state.tableData_lihua_all_store.push(
                    {
                        name: '李华/地图导航课设',
                        tags: '课设',
                        info:  '这是我的地图导航课设',
                        language:  'C++/C',
                        date: '2023-07-24',
                        collectnum: '4.4k',
                        branchnum: '822',
                        viewnum: '462',
                        owner:'李华',
                        warehouseName:'地图导航课设',
                        isOwner:true,
                        isMember:true,
                        isManager:true,
                        isCertificator:false,
                    }
                );
            }
            else if (newData===1){
                state.tableData_lihua_all_store.splice(3, 1);
                state.tableData_lihua_own_store.splice(2, 1);
                state.sharedData = 9;
            }
        },
        //发审核通知
        updateMessage(state, newData) {
            if(newData===0){
               // state.sharedData = 3;
                state.unread_store.push(
                    {
                        date: '',
                        title: '【审核结果通知】',
                        isExamine: 0,
                        isApplication:2,
                        username: '小好',
                        warehouseName: '小好的临时仓库',
                        introduce: '我的临时仓库',
                        warehouseKeywords: 'C++',
                        isCertificator:false,
                        isOwner:true,
                        isMember:true,
                        isManager:true,
                        isCredible:0,
                        owner:'小好',
                    }
                );
            }
            else if (newData===1){
                state.unread_store.splice(1, 1);
               // state.sharedData = 9;
            }
        },
        updateNR(state, newData){
            if(newData===0){
               // state.sharedData = 3;
                state.tableData_all_store.push(
                    {
                        name: '李华/SHA256',
                        tags: 'SHA256',
                        info:  'SHA256算法',
                        language:  'c',
                        date: '2023-07-24',
                        collectnum: '4.4k',
                        branchnum: '822',
                        viewnum: '462',
                        owner:'李华',
                        warehouseName:'SHA256',
                        isOwner:true,
                        isMember:true,
                        isManager:true,
                        isCertificator:false,
                    },
                );
            }
            else if (newData===1){
                state.tableData_all_store.splice(1, 1);
                //state.sharedData = 9;
            }
        },
    },
    actions: {
        setCredibleValue({ commit }, value) {
            commit('updateCredibleValue', value);
        },
        //
        PraisePRIncrement({ commit }) {
            console.log('调用了 increment 方法');
            commit('PraisePRIncrement');
        },
        PraisePRDecrement({ commit }) {
            commit('PraisePRDecrement');
        },
    },
});