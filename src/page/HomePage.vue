<template>
    <div style='display: flex;background-color: white;margin-top: 0px;margin-left: 2px'>
        <!--左侧主体部分-->
        <div style='width: 15%;position: relative'>
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" style='margin-top: 20px'></el-tree>
        </div>


        <!--右侧主体部分-->
        <div style='text-align: left;margin-left: 40px;width: 85%'>
            <el-card class="box-card" style='width: 100%'>
                <div slot="header" class="clearfix">
                    <span style='font-size: larger;font-weight: bolder'>推荐项目</span>
                </div>
                <div>
                    <h3 > Yesterday/MindSPONGE </h3>
                    <div style='margin-top: 10px;color: #777777' >  MindSpore Simulation Package tOwards Next Generation molecular modelling</div>
                </div>
                <div style='margin-top: 25px'>
                    <h3 > Gitee Community/bullshit-codes
                    </h3>
                    <div style='margin-top: 10px;color: #777777'>  欢迎大家通过 Fork+Pull Request 参与【有奖参与活动进行中】</div>
                </div>
                <div style='margin-top: 25px'>
                    <h3 > 智路理事会/airos-vehicle </h3>
                    <div style='margin-top: 10px;color: #777777'> airos-vehicle是面向车端提供的c-v2x车路协同应用框架，支持C-V2X相关标准，开发者可基于应用框架方便简单的开发车端v2x应用</div>
                </div>
                <div style='margin-top: 25px'>
                    <h3 >Bytedance Inc./xgplayer </h3>
                    <div style='margin-top: 10px;color: #777777'> A HTML5 video player with a parser that saves traffic</div>
                </div>
                <div style='margin-top: 25px'>
                    <h3 >Vanishi/BXC_SipServer </h3>
                    <div style='margin-top: 10px;color: #777777'> 基于C++开发的国标GB28181流媒体信令服务器。 采用BXC_SipServer+ZLMediaKit。完整搭建一个可以接收,摄像头通过国标协议推流到国标GB28181流媒体服务器，然后进行RTSP/RTMP/HTTP-</div>
                </div>
                <div style='margin-top: 25px'>
                    <h3 >devlive-community/openai-java-sdk </h3>
                    <div style='margin-top: 10px;color: #777777'>Provides Java developers with a convenient, easy-to-use SDK to interact with OpenAI's apis.</div>
                </div>
                <div style='margin-top: 25px'>
                    <h3 >canonical-entropy/nop-entropy </h3>
                    <div style='margin-top: 10px;color: #777777'> Nop Platform 2.0是基于可逆计算理论实现的低代码开发平台，包含GraphQL引擎、ORM引擎、工作流引擎、报表引擎、规则引擎、批处理引引擎等完整设计。nop-entropy是它的后端部分，采用java</div>
                </div>
            </el-card>
        </div>

    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            data: [{ label: '全部推荐项目', },{ label: '前沿技术', },
                { label: '程序开发', },
                { label: '人工智能', },{ label: '区块链', },{ label: '微信开发', },
                { label: '企业应用', },{ label: '建站系统', },{ label: '应用工具', },
                { label: 'WEB应用开发', },{ label: '开发工具', },{ label: '数据库相关', },
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        }
    }

};
</script>

<style scoped>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

</style>