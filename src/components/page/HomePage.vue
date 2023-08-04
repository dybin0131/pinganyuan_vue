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
            contentList: [{
                title: 'admin/协同课设',
                text: '这是关于我们的课设',
                url:'http://localhost:8080/codedetails?username=admin&warehouseName=%E5%8D%8F%E5%90%8C%E8%AF%BE%E8%AE%BE&introduce=%E8%BF%99%E6%98%AF%E5%85%B3%E4%BA%8E%E6%88%91%E4%BB%AC%E7%9A%84%E8%AF%BE%E8%AE%BE&warehouseKeywords=C%2B%2B&isOwner=true&isMember=true&isManager=true&isCertificator=false',
                owner:'admin',
                warehouseName:'协同课设',
                key:'C++'
            },{
                title: 'Gitee Community/bullshit-codes',
                text: '欢迎大家通过 Fork+Pull Request 参与【有奖参与活动进行中】',
                url:'',
                owner:'Gitee Community',
                warehouseName:'bullshit-codes',
                key:'C++'
            },{
                title: '智路理事会/airos-vehicle',
                text: 'airos-vehicle是面向车端提供的c-v2x车路协同应用框架，支持C-V2X相关标准，开发者可基于应用框架方便简单的开发车端v2x应用',
                url:'',
                owner:'智路理事会',
                warehouseName:'airos-vehicle',
                key:'C++'
            },{
                title: 'Bytedance Inc./xgplayer',
                text: 'A HTML5 video player with a parser that saves traffic',
                url:'',
                owner:'Bytedance Inc.',
                warehouseName:'xgplayer',
                key:'C++'
            },{
                title: 'Vanishi/BXC_SipServer',
                text: '基于C++开发的国标GB28181流媒体信令服务器。 采用BXC_SipServer+ZLMediaKit。完整搭建一个可以接收,摄像头通过国标协议推流到国标GB28181流媒体服务器，然后进行RTSP/RTMP/HTTP-',
                url:'',
                owner:'Vanishi',
                warehouseName:'BXC_SipServer',
                key:'C++'
            },{
                title: 'devlive-community/openai-java-sdk',
                text: 'Provides Java developers with a convenient, easy-to-use SDK to interact with OpenAI’s apis.',
                url:'',
                owner:'devlive-community',
                warehouseName:'openai-java-sdk',
                key:'C++'
            },{
                title: 'canonical-entropy/nop-entropy',
                text: ' Nop Platform 2.0是基于可逆计算理论实现的低代码开发平台，包含GraphQL引擎、ORM引擎、工作流引擎、报表引擎、规则引擎、批处理引引擎等完整设计。nop-entropy是它的后端部分，采用java',
                url:'',
                owner:'canonical-entropy',
                warehouseName:'nop-entropy',
                key:'C++'
            },],
            indexTop: 0,
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },
    methods: {
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
                color: #353D61;
                font-size: 16px;
                font-weight: bold;
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