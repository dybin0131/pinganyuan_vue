<template>
    <div class="houmePage">
        <!--上侧导航部分-->
        <div class="topNavBox">
            <div v-for="(item,index) in data" :key="index"
                 :class="indexTop==index?'topNavSelect':'topNavText'"
                 @click="handleNodeClick(item.label,index)">
                {{item.label}}
                <div class="topNavXian"></div>
            </div>
        </div>
        <!-- 列表内容 -->
        <!-- <div class="contentBox">
            <div class="conBox" v-for="(val,i) in contentList" :key="i">
                <el-button class="conTitle" type='text' @click="viewDetail(val.rId)"> {{ val.rUser }}/{{val.rName}} </el-button>
                <div class="conText">{{val.desc}}</div>
            </div>
        </div> -->
        <div class="contentBox">
            <div class="conBox" v-for="(val,i) in contentList" :key="i">
                <template slot-scope="scope">
                    <el-link :href="val.url" rel="external nofollow"  type="primary" target="_blank" class="conTitle">{{val.title}}</el-link>
                </template>
                <el-button class="conTitle" type='text'>
                    <router-link :to="{path:'/codedetails',query:{username:val.owner,warehouseName: val.warehouseName,introduce:val.text,
                        warehouseKeywords:'C++',isOwner:true,isMember:false,owner:val.owner,
                        isManager:false,isCertificator:false},}"> {{ val.owner }}/{{val.warehouseName}} </router-link>
                </el-button>
                <div class="conText">{{val.text}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { searchRepo } from '../../api/depot';
export default {
    name: 'HomePage',
    data() {
        return {
            data: [
                { label: '全部推荐项目',},
                { label: '前沿技术', },
                { label: '程序开发', },
                { label: '人工智能', },
                { label: '区块链', },
                { label: '微信开发', },
                { label: '企业应用', },
                { label: '建站系统', },
                { label: '应用工具', },
                { label: 'WEB应用开发', },
                { label: '开发工具', },
                { label: '数据库相关', },
            ],
            // contentList: [{
            //     rName: '韩梅梅/协同课设',
            //     desc: '这是关于我们的课设',
            //     rUser:'韩梅梅'
            // }],
            contentList: [{
                title: '韩梅梅/协同课设',
                text: '这是关于我们的课设',
                url:'http://localhost:8080/codedetails?username=admin&warehouseName=%E5%8D%8F%E5%90%8C%E8%AF%BE%E8%AE%BE&introduce=%E8%BF%99%E6%98%AF%E5%85%B3%E4%BA%8E%E6%88%91%E4%BB%AC%E7%9A%84%E8%AF%BE%E8%AE%BE&warehouseKeywords=C%2B%2B&isOwner=true&isMember=true&isManager=true&isCertificator=false',
                owner:'韩梅梅',
                warehouseName:'协同课设',
                key:'C++'
            },{
                title: '合作小组/高亮代码',
                text: '欢迎大家通过 参与【有奖参与活动进行中】，诚挚邀请大家一同协作开发',
                url:'',
                owner:'合作小组',
                warehouseName:'高亮代码',
                key:'C++'
            },{
                title: '智路/智能设备',
                text: '安全系统，提供通讯、数据存储安全安全保障；',
                url:'',
                owner:'智路',
                warehouseName:'智能设备',
                key:'C++'
            },{
                title: '比特AI/语音助手王',
                text: '是一款功能强大的智能AI语音助手。它能听懂你的口令，执行各种指令，为你提供全方位的生活服务。',
                url:'',
                owner:'比特AI',
                warehouseName:'语音助手王',
                key:'C++'
            },{
                title: '维尔/基于以太坊发行的ERC20智能合约代币源码合集',
                text: '收集了431个基于以太坊发行的ERC20代币源码',
                url:'',
                owner:'维尔',
                warehouseName:'基于以太坊发行的ERC20智能合约代币源码合集',
                key:'C++'
            },{
                title: '公理/java课设',
                text: '基于java语言的课程设计，综合多方面功能',
                url:'',
                owner:'公理',
                warehouseName:'java课设',
                key:'C++'
            },{
                title: '南小东/开发平台',
                text: '基于可逆计算理论实现的低代码开发平台，采用java',
                url:'',
                owner:'南小东',
                warehouseName:'开发平台',
                key:'C++'
            },],
            indexTop: 0,
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            keyword:''
        };
    },
    mounted() {
        //this.search();
    },
    methods: {
        search(){
            searchRepo({
                keyword: this.keyword
            }).then((res) => {
                this.contentList = res.data;
            });
        },
        viewDetail(rId) {
            this.$router.push({
                path: "./codedetails",
                query: { 
                    repoId: rId,
                    activeName:this.activeName,
                    branchId:0,
                },
            });
        },
        handleNodeClick(data,index) {
            this.indexTop = index
        }
    }

};
</script>

<style lang="less" scoped>
.houmePage{
    margin-left: 2px;
    .topNavBox{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .topNavText{
            width: 100%;
            height: 60px;
            color: #353D61;
            text-align: center;
            line-height: 60px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
        }
        .topNavSelect{
            width: 100%;
            height: 60px;
            color: #4092ED;
            cursor: pointer;
            text-align: center;
            line-height: 60px;
            font-weight: bold;
            font-size: 14px;
            .topNavXian{
                width: 30px;
                margin: auto;
                margin-top: -10px;
                border-radius: 6px;
                border-bottom: 6px solid #4092ED;
            }
        }
    }
    .contentBox{
        width: 100%;
        .conBox{
            width: 96%;
            padding: 20px;
            border-radius: 20px;
            margin-bottom: 20px;
            background-color: #fff;
            .conTitle{
                color: rgb(0, 0, 238);
                font-size: 16px;
                font-weight: 700;
            }
            .conTitle:hover{
                color: red;
            }
            .conText{
                color: #353D61;
                font-size: 12px;
                margin-top: 10px;
            }
        }
    }
}
</style>