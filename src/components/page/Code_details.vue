<template>
    <div>
        <!--顶部-->
        <div style='display: block'>
            <!--标题路径-->
            <div style='display: flex;position: relative'>
                <div style='display: flex;margin-top: 60px;margin-left: 10px'>
                    <i class='el-icon-c-scale-to-original' style='font-size: 35px'></i>
                    <el-breadcrumb separator="/" style='margin-top:5px;margin-left: 10px;font-size: 23px'>
                        <el-breadcrumb-item :to="{ path: '/' }">{{username}}</el-breadcrumb-item>
                        <el-breadcrumb-item><a href="/">test</a></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <!--右侧辅助工具栏-->
                <div style='position: absolute;right: 0;display: flex;margin-top: 60px'>
                    <el-dropdown size="small" split-button type="plain">
                        <i class='el-icon-view'></i>
                        Watching   {{watching_count}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>不关注</el-dropdown-item>
                            <el-dropdown-item>关注所有动态</el-dropdown-item>
                            <el-dropdown-item>仅关注版本发行动态</el-dropdown-item>
                            <el-dropdown-item>关注但不提醒动态</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button type="plain" icon="el-icon-star-on" style='margin-left: 12px'>Star  {{star_count}}</el-button>
                    <el-button type="plain" icon="el-icon-share">Fork  {{fork_count}}</el-button>
                </div>
            </div>
        </div>
        <!--主体-->
        <div style='display: flex;background-color: white;margin-top: 20px;margin-left: 2px'>
        <!--左侧主体部分-->
        <div style='width: 70%;position: relative'>
            <!--标签行-->
            <div style='display: flex;'>
                <!--标签行 左侧栏目内容-->
                <el-dropdown>
                    <el-button type="plain">
                        master<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>master</el-dropdown-item>
                        <el-dropdown-item>branch</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <i class="el-icon-share" style='margin-top: 7px;margin-left: 15px'></i>
                <div style='font-size: 14px;margin-top: 5px;margin-left: 6px'>分支 2</div>
                <i class="el-icon-price-tag" style='margin-top: 7px;margin-left: 15px'></i>
                <div style='font-size: 14px;margin-top: 5px;margin-left: 6px'>标签 1</div>
                <!--标签行 右侧栏目内容-->
                <div style='position: absolute;right:0'>
                     <div >
                    <el-button><i class="el-icon-plus" style='font-weight: bolder'></i>Pull Request</el-button>
                    <el-button><i class="el-icon-plus" style='font-weight: bolder'></i>Issue</el-button>
                    <el-dropdown>
                        <el-button type="plain" style='margin-left: 10px'>文件<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>新建文件</el-dropdown-item>
                            <el-dropdown-item>新建Diagram文件</el-dropdown-item>
                            <el-dropdown-item>新建文件夹</el-dropdown-item>
                            <el-dropdown-item>新建子模块</el-dropdown-item>
                            <el-dropdown-item>上传文件</el-dropdown-item>
                            <el-dropdown-item>搜索文件</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown>
                        <el-button type="warning" style='margin-left: 10px'>克隆/下载<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item style='display: block'>HTTP
                                <div style='display: flex'>
                                    <el-input type="text" readonly :value="http_text" ref="textInput"></el-input>
                                    <el-button @click="handleCopyClick">复制</el-button>
                                </div>
                            </el-dropdown-item>
                            <el-dropdown-item>SSH</el-dropdown-item>
                            <el-dropdown-item>SVN</el-dropdown-item>
                            <el-dropdown-item>SSH+SVN</el-dropdown-item>
                            <el-dropdown-item> <i class='el-icon-download'></i> 下载ZIP</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                </div>
            </div>
            <!--左侧标签行下面内容-->
            <div>
                    <!--表头信息-->
                    <div style='display: flex;margin-top:18px;position: relative'>
                        <div style='display: flex'>
                            <img src='../../assets/img/lxy.png' style='width: 20px;height: 20px'>
                            <div style='margin-top: 1px;margin-left:5px;font-size: 15px;color: #72767b' > user1   !312   1ecc563   17小时前</div>
                        </div>
                        <div style='display: flex;position: absolute;right: 0'>
                            <i class='el-icon-document-checked' style='margin-top:3px'></i>
                            <div style='margin-top: 1px;margin-left:5px;font-size: 15px;color: #72767b' > 15次提交</div>
                        </div>
                    </div>
                    <!--表格信息-->
                    <el-table :data="tableData"  style="width: 100%;margin-top:8px">
                        <el-table-column width='25px'>
                            <template slot-scope="scope"> <i class='el-icon-document'></i> </template>
                        </el-table-column>
                        <el-table-column prop="file" width="200px "  label='File name'></el-table-column>
                        <el-table-column prop="prop" label="Submit information"></el-table-column>
                        <el-table-column prop="time" align='right' width='100px' label="Creation time"></el-table-column>
                    </el-table>
                    <!--文件信息预览部分-->
                    <div style='margin-top: 20px'>
                        <el-card class="box-card" style='width: 100%'>
                            <!--文件名称-->
                            <div slot="header" class="clearfix">
                                <i class='el-icon-document'></i>
                                <span>README.md</span>
                            </div>
                            <!--文件内容-->
                            <div style='display: flex'>
                                <!--文件索引部分，用 树形控件 代替了-->
                                <div style='width: 23%'>
                                    <el-tree :data="data" :props="defaultProps"
                                             node-key="id"
                                             :default-expanded-keys="[1]"
                                             @node-click="handleNodeClick">
                                    </el-tree>
                                </div>
                                <!--文件主要内容部分-->
                                <div  style='margin-left: 55px'>
                                    <h2>test</h2>
                                    <h3 style='margin-top: 17px;'>介绍</h3>
                                    <div style='font-size: 15px;margin-top: 5px'>平安源专为开发者提供稳定、高效、安全的云端软件开发协作平台 无论是个人、团队、或是企业，都能够用此平台实现代码托管、项目管理、协作开发。</div>
                                    <h3 style='margin-top: 17px;'>软件架构</h3>
                                    <div style='font-size: 15px;margin-top: 5px'>平安源专为开发者提供稳定、高效、安全的云端软件开发协作平台 无论是个人、团队、或是企业，都能够用此平台实现代码托管、项目管理、协作开发。</div>
                                </div>
                            </div>
                        </el-card>
                    </div>
                <!--点赞打赏区域-->
                    <div style='display: flex;width: 50%;margin-left: 25%;margin-top: 18px'>
                        <!--star数量-->
                        <div style='display: flex;flex-grow: 1'>
                            <el-button round  icon="el-icon-star-on" style='background-color:transparent;font-size: 30px;color: #cf9236'></el-button>
                            <div style='display: block;margin-top: 7px;margin-left: 10px;'>
                                <div style='font-size: 14px;text-align: center'>Star</div>
                                <div style='font-size: 14px;text-align: center'>{{star_count}}</div>
                            </div>
                        </div>
                        <!--fork数量-->
                        <div style='display: flex;flex-grow: 1'>
                            <el-button round  icon="el-icon-share" style='background-color:transparent;font-size: 30px;color:cadetblue'></el-button>
                            <div style='display: block;margin-top: 7px;margin-left: 10px;'>
                                <div style='font-size: 14px;text-align: center'>Fork</div>
                                <div style='font-size: 14px;text-align: center'>{{fork_count}}</div>
                            </div>
                        </div>
                        <!--捐赠数量-->
                        <div style='display: flex;flex-grow: 1'>
                            <el-button round  icon="el-icon-lollipop" style='background-color:transparent;font-size: 30px;color: #dd6161'></el-button>
                            <div style='display: block;margin-top: 7px;margin-left: 10px;'>
                                <div style='font-size: 14px;text-align: center'>捐赠</div>
                                <div style='font-size: 14px;text-align: center'>{{donate_count}}</div>
                            </div>
                        </div>
                    </div>
                <!----测试文件上传预览--->
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </div>
        </div>
        <!--右侧主体部分-->
        <div style='text-align: left;margin-left: 40px;margin-right: 30px;width: 30%'>
            <!--简介-->
            <h4 style='margin-top: 10px'>简介</h4>
            <div style='margin-top: 15px;font-size: 15px;color: #72767b' >平台的设计目标是基于异步拜占庭共识协议、零知识证明等方法改进源代码平台。</div>
            <div style='margin-top: 15px;font-size: 15px;color: #72767b' >区块链</div>
            <!--发行版-->
            <h4 style='margin-top: 40px'>发行版</h4>
            <div style='display: flex'>
                <div style='margin-top: 10px;font-size: 15px;color: #72767b' >暂无发行版，  </div><el-button type="text" style='font-size: 15px;padding-top: 12px'>创建</el-button>
            </div>
            <!--贡献者-->
            <div style='display: block;position: relative;'>
                <div style='display: flex'>
                    <h4 style='margin-top: 40px'>管理者</h4>
                    <el-button type="text" style='margin-top: 34px;font-size: 15px;color: #72767b'>({{manager}})</el-button>
                    <el-button type="text" style='margin-top: 30px;font-size: 15px;color: #72767b;position:absolute;right: 0'>全部</el-button>
                </div>
                <div style='display: flex;margin-top: 20px'>
                    <img src='../../assets/img/lxy.png' style='width: 38px;height: 38px'>
                    <img src='../../assets/img/dyb.png' style='width: 38px;height: 38px;margin-left: 10px'>
                    <img src='../../assets/img/wzy.png' style='width: 38px;height: 38px;margin-left: 10px'>
                </div>
                <div style='display: flex'>
                    <h4 style='margin-top: 40px'>贡献者</h4>
                    <el-button type="text" style='margin-top: 34px;font-size: 15px;color: #72767b'>({{contributors}})</el-button>
                    <el-button type="text" style='margin-top: 30px;font-size: 15px;color: #72767b;position:absolute;right: 0'>全部</el-button>
                </div>
                <div style='display: flex;margin-top: 20px'>
                    <img src='../../assets/img/lxy.png' style='width: 38px;height: 38px'>
                    <img src='../../assets/img/dyb.png' style='width: 38px;height: 38px;margin-left: 10px'>
                    <img src='../../assets/img/wzy.png' style='width: 38px;height: 38px;margin-left: 10px'>
                </div>
            </div>
            <!--近期动态-->
            <h4 style='margin-top: 40px'>近期动态</h4>
            <div style='display: block'>
                <div style='display: flex;margin-top:25px'>
                    <img src='../../assets/img/wzy.png' style='width: 30px;height: 30px'>
                    <div style='margin-top: 1px;margin-left:5px;font-size: 15px;color: #72767b' >3分钟前创建了新的 Pull Request</div>
                </div>
                <div style='display: flex;margin-top:25px'>
                    <img src='../../assets/img/lxy.png' style='width: 30px;height: 30px'>
                    <div style='margin-top: 1px;margin-left:5px;font-size: 15px;color: #72767b' >16小时前推送了新的提交到 master 分支，032a495...1ecc563</div>
                </div>
                <div style='display: flex;margin-top:25px'>
                    <img src='../../assets/img/lxy.png' style='width: 30px;height: 30px'>
                    <div style='margin-top: 1px;margin-left:5px;font-size: 15px;color: #72767b' >16小时前合并了 PR !3 12</div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            http_text:'https://element.eleme.cn/#/zh-CN/component/input',
            isShowHeader:false,
            contributors:3,
            manager:3,
            star_count:2,
            fork_count:1,
            watching_count:3,
            donate_count:11,
            tableData: [{
                file: 'test_user1',
                prop: 'add test_user1',
                time: '10小时前'
            },{
                file: 'test_user2',
                prop: 'add test_user2',
                time: '1个月前'
            }, {
                file: 'README.md',
                prop: 'Initial commit',
                time: '2个月前'
            }],
            data: [{
                id:1,
                label: 'test',
                children: [{ label: '·介绍' },{ label: '·软件架构' },{ label: '·安装教程' },{ label: '·使用说明' },{ label: '·激励机制' },{ label: '·零知识证明' },{ label: '·拜占庭共识' }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        }
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },
        handleCopyClick() {
            // 复制文本到剪切板
            this.$refs.textInput.select();
            document.execCommand('copy');
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        }
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
.box {
    width: 100%;
    height: 22px;
    display: flex;
    flex-direction: row;
}
.box > div {
    height: 50px;
    flex: 1;
}

</style>