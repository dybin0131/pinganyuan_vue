<template>
    <div class="pullMerge">
        <div class="topBox">
            <el-breadcrumb class="topBreadcrumb" separator="/" >
                <el-breadcrumb-item :to="{ path: '/' }" style='font-size: 18px'>动态</el-breadcrumb-item>
                <el-breadcrumb-item style='font-size: 15px;margin-top:1px'><a href="/">区块链</a></el-breadcrumb-item>
            </el-breadcrumb>
            <!--右侧辅助工具栏-->
            <div style='position: absolute;right: 0;display: flex;;margin-right: 30px'>
                <el-dropdown size="small" split-button type="plain">
                    <i class='el-icon-view'></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>不关注</el-dropdown-item>
                        <el-dropdown-item>关注所有动态</el-dropdown-item>
                        <el-dropdown-item>仅关注版本发行动态</el-dropdown-item>
                        <el-dropdown-item>关注但不提醒动态</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="newstInfo">
            <div class="table_title">最新信息</div>
            <div class="cooperateTable">
                <vue-seamless-scroll  :data="blockList"  :class-option="optionHover" class="block-seamless-warp">
                    <div class="blockInfoList" v-for="item in blockList" :key="item.id">
                        <div class="blockInfo-type">
                            <div class="blockInfo-type-img">
                                <span class="blockInfo-type-text">Bk</span>
                            </div>
                        </div>
                        <div class="blockInfo-block-height">
                            <div class="block-number">{{item.blockHeight}}</div>
                            <div class="block-time">{{item.blockTimeStamp}}</div>
                        </div>
                        <div class="blockInfo-tx">
                            <div class="block-txHash"><span style="color: #000000;">交易哈希：</span>{{item.txHash}}</div>
                            <div class="block-txHash"><span style="color: #000000;">合约地址：</span>{{item.to}}</div>
                        </div>
                    </div>
                </vue-seamless-scroll>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            blockList: [{
                id: 1,
                blockHeight: 'blockHeight1',
                blockTimeStamp: '2023-07-25 17:46:09',
                txHash: '0x12f024d21b6cdae2777aacfc6bf600cb02037bd6389a8fc1d1548962c5805db1',
                to: '0x5cc803a8a62f046414c928cdda7488ae81f7672f',
            },{
                id: 2,
                blockHeight: 'blockHeight2',
                blockTimeStamp: '2023-07-25 12:00:09',
                txHash: '0x63f054d21b96cdae2797aacfc6bf600cb08427bd6092a8fc1d1248962c0808dc8',
                to: '0x5cc803a8a62f046414c928cdda7488ae81f7672f',
            },{
                id: 3,
                blockHeight: 'blockHeight3',
                blockTimeStamp: '2023-07-25 11:07:42',
                txHash: '0x35f026d20b6cdae2231aacfc6bf600cb08357bd3427a8fc1d2158062c5805fb1',
                to: '0x5cc803a8a62f046414c928cdda7488ae81f7672f',
            },{
                id: 4,
                blockHeight: 'blockHeight4',
                blockTimeStamp: '2023-07-25 6:59:11',
                txHash: '0x26f024d52b6cdae2830aacfc6bf623cb02237bd6635a8fc1d2448968c5830db9',
                to: '0x5cc803a8a62f046414c928cdda7488ae81f7672f',
            },{
                id: 5,
                blockHeight: 'blockHeight5',
                blockTimeStamp: '2023-07-24 23:32:45',
                txHash: '0x36f012d21b6cdae2334aacfc6bf367cb02037bd6749a8fc1d1548232c4597db1',
                to: '0x5cc803a8a62f046414c928cdda7488ae81f7672f',
            },],
        };
    },
    methods: {},
    computed: {
        optionHover() {
            return {
                step: 0.5, // 数值越大速度滚动越快
                limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
                hoverStop: true, // 是否开启鼠标悬停stop
                direction: 1, // 0向下 1向上 2向左 3向右
                openWatch: true, // 开启数据实时监控刷新dom
                singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
                waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
            };
        },
    },
};
</script>

<style lang="less" scoped>
.pullMerge{
    .topBox{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .topBreadcrumb{
            margin-top: 10px;
        }
    }
    .newstInfo{
        width: 96%;
        height:326px;
        box-sizing: border-box;
        margin-left:20px;
        border-radius: 10px;
        background-color: #FFFFFF;
        .table_title{
            margin: 24px 0 30px 40px;
            width: 90%;
            height: 30px;
            overflow-wrap: break-word;
            color: #353D61;
            font-size: 26px;
            font-family: SourceHanSansCN-Heavy;
            font-weight: 900;
            text-align: left;
            white-space: nowrap;
            line-height: 48px;
        }
        .cooperateTable{
            width: 100%;
            margin-bottom: 10px;
            background-color: transparent;
            .block-seamless-warp{
                width: 100%;
                height: 250px;
                overflow: hidden;
                .blockInfoList{
                    width: 90%;
                    height: 80px;
                    background: #4091ed12;
                    border-radius: 8px;
                    margin-left:35px;
                    margin-top:10px;
                    display: flex;
                    padding-left:40px;
                    .blockInfo-type{
                        width:36px;
                        height:80px;
                        .blockInfo-type-img{
                            margin-top:22px;
                            width: 36px;
                            height: 36px;
                            background: #DCDCDC;
                            border-radius: 50%;
                            text-align: center;
                            .blockInfo-type-text{
                                width: 19px;
                                height: 14px;
                                font-size: 16px;
                                font-family: Source Han Sans CN;
                                font-weight: bold;
                                color: #333333;
                                line-height: 36px;
                            }
                        }
                    }
                    .blockInfo-block-height{
                        width:210px;
                        height:80px;
                        padding:18px 0 20px 10px;
                        .block-number{
                            width: 180px;
                            height: 20px;
                            font-size: 19px;
                            font-family: Source Han Sans CN;
                            font-weight: 400;
                            color: #4092ED;
                            line-height: 20px;
                        }
                        .block-time{
                            width: 180px;
                            height: 20px;
                            font-size: 12px;
                            font-family: San Francisco Display;
                            font-weight: 400;
                            color: #999999;
                            line-height: 20px;
                            margin-top:5px;
                        }
                    }
                    .blockInfo-tx{
                        width:340px;
                        height:80px;
                        padding:15px 0 20px 0;
                        .block-txHash{
                            width: 700px;
                            height: 20px;
                            font-size: 12px;
                            font-family: Source Han Sans CN;
                            font-weight: 400;
                            color: #4092ED;
                            line-height: 20px;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            margin-top: 3px;
                        }
                    }
                }
            }
        }
    }
}
</style>