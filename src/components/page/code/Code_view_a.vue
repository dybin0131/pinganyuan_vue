<template>
    <div >
        <!--主体部分-->
        <div style='position: relative;'>
            <!--tips,已经有可信依赖证明申请按钮，删掉这条内容-->
            <!--标签行-->
            <div style='display: flex;margin-top: 20px'>
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

                <!--面包屑 -->
                <el-breadcrumb separator="/" style='margin-top: 10px;margin-left: 15px'>
                    <el-breadcrumb-item :to="{ path: '/' }">{{this.$route.query.warehouseName}}</el-breadcrumb-item>
                    <el-breadcrumb-item><a href="/">p r</a></el-breadcrumb-item>
                </el-breadcrumb>
                <i class='el-icon-document-copy' style='margin-top: 10px;margin-left: 10px'></i>
                <!--标签行 右侧栏目内容-->
                <div style='position: absolute;right: 0'>
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
            <!--文件详细内容-->
                <el-card class="box-card" style='margin-top: 10px;height: 560px'>
                    <!--文件名称   及  按钮操作-->
                    <div slot="header" class="clearfix" >
                        <!--
                        <div style='display: flex'>
                            <i class='el-icon-document'></i>
                            <span>  p r </span>
                            <span style='margin-top: 4px;margin-left: 10px;font-size: 10px;color: #72767b' >    2 Bytes</span>
                        </div>
                        --->

                        <div style='display: flex;float: right;padding-top:0'>
                            <el-button >一键复制</el-button>
                            <el-button style='margin-left: 0'  @click="editInfo">编辑</el-button>
                            <el-button style='margin-left: 0'>
                                <router-link to='/statistics'>历史</router-link>
                            </el-button>
                            <i class='el-icon-delete' style='margin-top:7px;margin-left: 4px'></i>
                        </div>
                        <!--提交信息-->
                        <!---
                        <div style='display: flex'>
                            <div style='margin-top: 9px;font-size: 15px;color: #72767b'>
                                user1 提交于 2天前 .
                            </div>
                            <el-button type="text"  style='margin-top: 4px;margin-left: 5px;font-size: 15px'>add p r.</el-button>
                        </div>
                        --->
                    </div>
                    <!--文件具体内容-->
                    <!---
                    <el-table :data="tableData" style="width: 100%" class='my-table'>
                        <el-table-column prop="codeLine" width="30"></el-table-column>
                        <el-table-column prop="codeContent" label="code content"></el-table-column>
                    </el-table>
                    --->
                    <!---上传查看文本--->
                    <div style='display: grid;margin-left: 20px'>
                        <input type='file' name='file' @change='fileChange'  />
                        <el-input type='textarea'  :rows='20'  v-model="fileContent"  style='width: 800px;height: 200px' ></el-input>
                    </div>
                </el-card>
            <div>
            </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            fileContent:'',
            http_text:'https://element.eleme.cn/#/zh-CN/component/input',
            tableData: [{
                codeLine: 1,
                codeContent: 'import request from \'../utils/request\';',
            }, {
                codeLine: 2,
                codeContent: 'export const fetchData = query => {',
            },{
                codeLine: 3,
                codeContent: '    return request({',
            },{
                codeLine: 4,
                codeContent: '        url: \'./table.json\',',
            },{
                codeLine: 5,
                codeContent: '        params: query',
            },{
                codeLine: 6,
                codeContent: '    });',
            },{
                codeLine: 7,
                codeContent: '};',
            }]
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
        editInfo(){
            this.$message('挑战应答成功');
            this.$router.push({path: '/newFile'},{query:{warehouseName: this.$route.query.warehouseName,username:this.username}})
             console.log("挑战应答成功");
        },
        fileChange(e){
            //是一个数组，因为用户可能会上传多个文件，第0位只拿到了第一个文件
            console.log(e.target.files[0])
            let file = e.target.files[0]
            let fr = new FileReader();
            fr.readAsText(file);
            let self = this;
            fr.onload = function(){
                self.fileContent = fr.result
                console.log(self.fileContent)
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
.my-table {
    border-collapse: collapse;
}
</style>