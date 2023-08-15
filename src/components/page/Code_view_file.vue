<template>
    <div >
        <!--主体部分-->
        <div style='position: relative;'>
            <!--tips,已经有可信依赖证明申请按钮，删掉这条内容-->
            <!--标签行-->
            <div style='display: flex;margin-top: 20px'>
                <!--标签行 左侧栏目内容-->
                <el-dropdown>
                    <div style='background-color: #CFE0FA;opacity: 0.8;border-radius: 5px;margin-right:3px;width: 100px;height: 30px;'>
                        <el-button type='text' style='margin-left: 18px;font-size: 15px'>
                            master<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>master</el-dropdown-item>
                            <el-dropdown-item>branch</el-dropdown-item>
                        </el-dropdown-menu>
                    </div>
                </el-dropdown>

                <!--面包屑 -->
                <div style='margin-left: 15px;display: flex'>
                    <div style='font-size: 24px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;'> {{this.$route.query.warehouseName}} </div>

                    <div style='margin-right: 10px;margin-left: 10px;margin-top: 4px;font-size: 24px'>/</div>
                    <div style='font-size: 18px;font-family: Source Han Sans CN;font-weight: 400;color: #353D61;opacity: 0.8;margin-top: 4px'>  RSA.c </div>
                </div>
                <el-icon class='el-icon-copy-document' style='width: 22px;height: 22px;color: #4092ED;margin-top: 9px;margin-left: 10px'></el-icon>
                <!--标签行 右侧栏目内容-->
                <div style='position: absolute;right: 0'>
                    <el-dropdown>
                        <div style='background-color: #faecd8;opacity: 0.8;border-radius: 5px;margin-left: 10px;margin-right:3px;width: 120px;height: 35px;'>
                            <el-button type='text' style='font-family: Source Han Sans CN;font-weight: 400;color: #F6833B;margin-left: 16px;font-size: 14px'>
                                克隆/下载<i class="el-icon-arrow-down el-icon--right" style='color: #F6833B'></i></el-button>
                        </div>
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
        <div style='background: rgba(255,255,255,0.8);border: 1px solid;border-image: linear-gradient(0deg, #FFFFFF, #FFFFFF) 1 1;
                    box-shadow: 0 5px 20px 0 rgba(183,183,195,0.07);border-radius: 20px;margin-top: 10px'>
            <div style='border: 1px solid #E5E5E5;border-radius: 5px;margin: 15px 15px 15px 15px;'>
                <!--文件详细内容-->
                <div>
                    <div style='width: 100%;height: 75px;background-color: #F4F6FB;margin-top: 0;display: flex'>
                        <!--文件名称   及  按钮操作-->
                        <div style='padding-top: 15px;padding-left: 30px'>
                            <div style='display: flex;'>
                                <i class='el-icon-document' style='color: #4595ED;margin-top: 5px'></i>
                                <span style='font-size: 20px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;margin-left: 6px'>  {{this.file.name}}</span>
                                <span style='margin-top: 8px;margin-left: 10px;font-size: 10px;color: #72767b' >  {{this.file.length }}</span>
                            </div>
                            <!--提交信息-->
                            <div style='display: flex'>
                                <div style='margin-top: 9px;font-size: 15px;color: #72767b'>
                                    {{this.file.user }}  提交于 {{this.file.time}} .
                                </div>
                            </div>
                        </div>
                        <!--按钮-->
                        <div style='display: flex;padding-top:0;margin-left: 690px'>
                            <el-button type='text'  style='margin-left: 30px;color: #4092ED'>
                                <i class='el-icon-copy-document' style='margin-top: 7px;margin-left: 4px;color: #4092ED'></i>
                                一键复制</el-button>
                            <el-button  type='text' style='margin-left: 30px;color: #4092ED'  @click="editInfo">
                                <i class='el-icon-edit-outline' style='margin-top: 7px;margin-left: 4px;color: #4092ED'></i>
                                编辑
                            </el-button>
                            <el-button type='text'  style='margin-left: 30px;color: #00ABA4'>
                                <i class='el-icon-time' style='margin-top: 7px;margin-left: 4px;color: #00ABA4'></i>
                                历史</el-button>
                            <el-button type='text' style='margin-left: 30px;color: #E13131'>
                                <i class='el-icon-delete' style='margin-top:7px;margin-left: 4px;color: #E13131'></i>
                                删除
                            </el-button>
                        </div>
                    </div>
                    <!---上传查看文本--->
                    <div style='display: grid;margin-left: 20px'>
                        <!--                            <input type='file' name='file' @change='fileChange' />-->
                        <!--&lt;!&ndash;                            <div style='color: #dd6161'>此按钮用于测试文本框显示效果，后期完成后删掉————————现在为【只读模式】可关掉</div>&ndash;&gt;-->
                        <!--                            <div>-->
                        <div>
                            <b-code-editor v-model="fileContent" :auto-format="true" :smart-indent="true" theme="idea" :indent-unit="4"
                                           :line-wrap="false" :lint="false" ref="editor"  :readonly='false' ></b-code-editor>
                        </div>
                    </div>
                    <!--                            <el-input type='textarea'  :rows='20'  v-model="fileContent"  style='width: 800px;height: 200px' ></el-input>-->
                </div>
            </div>

            <!--文件具体内容-->
            <!---
            <el-table :data="tableData" style="width: 100%" class='my-table'>
                <el-table-column prop="codeLine" width="30"></el-table-column>
                <el-table-column prop="codeContent" label="code content"></el-table-column>
            </el-table>
            --->
        </div>
    </div>

</template>


<script>
export default {
    data() {
        return {
            fileContent: '//rsa.h\n' +
                '#include <stdio.h>\n' +
                '#define MAX_NUM 63001\n' +
                '#define MAX_PRIME 251\n' +
                ' \n' +
                '//! 返回代码\n' +
                '#define OK 100\n' +
                '#define ERROR_NOEACHPRIME 101\n' +
                '#define ERROR_NOPUBLICKEY 102\n' +
                '#define ERROR_GENERROR 103\n' +
                ' \n' +
                'unsigned int MakePrivatedKeyd( unsigned int uiP, unsigned int uiQ );\n' +
                'unsigned int GetPrivateKeyd( unsigned int iWhich );\n' +
                'unsigned int MakePairkey( unsigned int uiP, unsigned int uiQ, unsigned int uiD );\n' +
                'unsigned int GetPairKey( unsigned int &d, unsigned int &e );\n' +
                'void rsa_encrypt( int n, int e, char *mw, int iLength, int *&cw );\n' +
                'void rsa_decrypt( int n, int d, int *&cw, int cLength, char *mw );\n' +
                'void outputkey();\n' +
                ' \n' +
                '//rsa.c\n' +
                '#include "rsa.h"\n' +
                '//!　保存私钥d集合\n' +
                'struct pKeyset\n' +
                '{\n' +
                'unsigned int set[ MAX_NUM ];\n' +
                'unsigned int size;\n' +
                '}pset;\n' +
                ' \n' +
                '//! 保存公、私钥对\n' +
                'struct pPairkey\n' +
                '{\n' +
                'unsigned int d;\n' +
                'unsigned int e;\n' +
                'unsigned int n;\n' +
                '}pairkey;\n' +
                ' \n' +
                '// 名称：isPrime\n' +
                '// 功能：判断两个数是否互质\n' +
                '//  参数：m: 数a; n: 数b\n' +
                '// 返回：m、n互质返回true; 否则返回false\n' +
                ' \n' +
                'bool isPrime( unsigned int m, unsigned int n )\n' +
                '{\n' +
                'unsigned int i=0;\n' +
                'bool Flag = true;\n' +
                ' \n' +
                'if( m<2 || n<2 )\n' +
                'return false;\n' +
                ' \n' +
                'unsigned int tem = ( m > n ) ? n : m;\n' +
                'for( i=2; i<=tem && Flag; i++ )\n' +
                '{\n' +
                'bool mFlag = true;\n' +
                'bool nFlag = true;\n' +
                'if( m % i == 0 )\n' +
                'mFlag = false;\n' +
                'if( n % i == 0 )\n' +
                'nFlag = false;\n' +
                'if( !mFlag && !nFlag )\n' +
                'Flag = false;\n' +
                '}\n' +
                'if( Flag )\n' +
                'return true;\n' +
                'else\n' +
                'return false;\n' +
                '}\n' +
                ' \n' +
                '// 名称：MakePrivatedKeyd\n' +
                '// 功能：由素数Q、Q生成私钥d\n' +
                '//  参数：uiP: 素数P; uiQ: 素数Q\n' +
                '// 返回：私钥d\n' +
                ' \n' +
                'unsigned int MakePrivatedKeyd( unsigned int uiP, unsigned int uiQ )\n' +
                '{\n' +
                'unsigned int i=0;\n' +
                ' \n' +
                '//! 得到所有与z互质的数( 私钥d的集合 )\n' +
                'unsigned int z = ( uiP -1 ) * ( uiQ -1 );\n' +
                'pset.size = 0;\n' +
                'for( i=0; i<z; i++ )\n' +
                '{\n' +
                'if( isPrime( i, z ) )\n' +
                '{\n' +
                'pset.set[ pset.size++ ] = i;\n' +
                '}\n' +
                '}\n' +
                ' \n' +
                'return pset.size;\n' +
                '}\n' +
                ' \n' +
                '// 名称：MakePairKey\n' +
                '// 功能：生成RSA公、私钥对\n' +
                '//  参数：uiP: 素数P; uiQ: 素数Q; uiD: 私钥d\n' +
                '// 返回：错误代码\n' +
                ' \n' +
                'unsigned int MakePairkey( unsigned int uiP, unsigned int uiQ, unsigned int uiD )\n' +
                '{\n' +
                'bool bFlag = true;\n' +
                'unsigned int i = 0, e;\n' +
                'unsigned int z = ( uiP-1 ) * ( uiQ-1 );\n' +
                'unsigned int d = pset.set[uiD];\n' +
                '//d=uiD;\n' +
                ' \n' +
                'if( !isPrime( z, d ) )\n' +
                'return E',
            http_text: 'https://element.eleme.cn/#/zh-CN/component/input',
            file: {
                name: 'RSA.c',
                user: '李华',
                length: '1304bytes',
                time: '5天前',
            },
            prodDesc: 'SQL.url=jdbc:sqlserver://127.0.0.1; DatabaseName=BaseFrame\n' +
                'SQL.userName=sa\n' +
                'SQL.passWord=-+',
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

            this.$message('挑战应答失败');

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
    }
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