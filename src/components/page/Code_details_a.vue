<template>
    <div>
        <!--顶部-->
        <div style='display: block'>
            <!--标题路径-->
            <div style='display: flex;position: relative'>
                <div style='display: flex;margin-top: 15px;margin-left: 10px'>
                    <el-tag type="danger" style='margin-top: 5px'>不可信</el-tag>
                    <el-breadcrumb separator="/" style='margin-top:5px;margin-left: 10px;font-size: 23px'>
                        <el-breadcrumb-item :to="{ path: '/' }">{{username}}</el-breadcrumb-item>
                        <el-breadcrumb-item><a href="/">test</a></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <el-button type="success" style='width: auto;height: 40px;margin-top: 10px;margin-left: 10px' @click="confirmApply">确认可信</el-button>
                <el-button type="danger" style='width: auto;height: 40px;margin-top: 10px;margin-left: 10px' @click="deny">确认不可信</el-button>
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
        <div style='display: flex;background-color: white;margin-top: 10px;margin-left: 2px'>
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
                                <el-button type="plain" style='margin-left: 10px'>上传文件<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>新建文件</el-dropdown-item>
                                    <el-dropdown-item>新建Diagram文件</el-dropdown-item>
                                    <el-dropdown-item>新建文件夹</el-dropdown-item>
                                    <el-dropdown-item>新建子模块</el-dropdown-item>
                                    <el-dropdown-item>
                                        <router-link to="/code">上传文件</router-link>
                                    </el-dropdown-item>
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
                    <!--表格信息暂时去掉，直接用 文件上传预览的文件列表-->
                    <!--文件信息预览部分,暂时删除，如果后续有时间，尝试一下md文件的树形图结构-->
                    <!----文件预览功能测试 2--->

                    <div>
                        <el-upload
                            class="upload-demo"
                            action="/codedetails"
                            :on-preview="handlePreview"
                            :before-upload="handleBeforeUpload"
                            multiple
                            :limit="10"
                            :on-exceed="handleExceed"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            accept="accept"
                            :file-list="fileList"
                        >
                            <!---
                            <el-button size="small" type="primary" style='margin-top: 20px'>点击上传</el-button>
                            -->
                            <div slot="tip" class="el-upload__tip">请上传文件</div>
                        </el-upload>
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
                </div>
            </div>
            <!--右侧主体部分-->
            <div style='text-align: left;margin-left: 40px;margin-right: 30px;width: 30%'>
                <!--简介-->
                <h4 style='margin-top: 10px'>简介</h4>
                <div style='margin-top: 15px;font-size: 15px;color: #72767b' >平台的设计目标是基于异步拜占庭共识协议、零知识证明等方法改进源代码平台。</div>
                <div style='margin-top: 15px;font-size: 15px;color: #72767b' >区块链</div>

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

            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: "FilePreview",
    created() {
        axios.get('http://localhost:8080/codedetails').then(function(resp){
            this.fileList = resp.data;
        })
    },
    props: {
        // 父组件传入文件格式类型例如 [1,2]
        accept: {
            type: Array,
            default: () => {
                return [".rar",".zip",".doc",".docx",".xls",".txt",".pdf",".jpg",".png",".jpeg",".vue",".c",".cpp",".xml",".yml"];
            },
        },
    },
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
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            //上传文件
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
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
        //不颁发可信依赖库证明
        deny() {
            this.$confirm('我承诺该依赖库确保不安全，安全验证未通过，不颁发可信依赖库证明！', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    this.$message({
                        type: 'info',
                        message: '确认不颁发可信依赖库证明'
                    });
                })
                .catch(action => {
                    this.$message({
                        type: 'info',
                        message: action === 'cancel'
                            ? '取消承诺'
                            : '停留在当前页面'
                    })
                });
        },
        //申请可信依赖库证明
        confirmApply() {
            this.$confirm('我承诺该依赖库确保安全，安全验证通过，颁发可信依赖库证明！', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    this.$message({
                        type: 'info',
                        message: '确认颁发可信依赖库证明'
                    });
                })
                .catch(action => {
                    this.$message({
                        type: 'info',
                        message: action === 'cancel'
                            ? '取消承诺'
                            : '停留在当前页面'
                    })
                });
        },
        //文件上传测试
        handlePreview(file){//文件预览
            //file.response是后端服务端返回的json, url未=为json里的url
            window.open(file.response.url);
            console.log(file);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        //测试上传文件(注意web的上下文)
        handleBeforeUpload(file){
            this.uploadUrl = 'http://localhost:8080/codedetails'
            console.log("开始上传，上传的文件为："+file.name)
            let formData = new FormData();
            formData.append("multipartFiles", file);
            this.fileList.value.push({
                name:file.name,
                url:file.url,
            })
            axios({
                method: 'post',
                url: 'http://localhost:8080/codedetails',
                data: formData,
                headers: {'Content-Type': 'multipart/form-data' }
            }).then((res) => {
                console.log("文件上传返回："+res)
            }).catch(error => {
                console.log("文件上传异常:"+error)
            })
            this.uploadUrl ='http://localhost:8080/codedetails'
        },
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },

    //created()：在创造之前就执行的东西，拿到跨域json数据格式
    // created() {
    //     let that=this;
    //     axios.get('地址').then(function (resp) {
    //         that.XXX变量=resp.data;
    //     })
    // }

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