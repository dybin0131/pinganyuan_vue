<template>
    <div>
        <CounterCom  :warehouse="this.warehouse"></CounterCom>
        <!--顶部-->
        <div style='display: block'>
            <!--标题路径-->
            <div style='display: flex;position: relative'>
                <div style='display: flex;margin-top: 15px;margin-left: 10px'>

                    <el-tooltip class="item" effect="light" :content="scoreDesc" placement="right-start" v-if="isCredible>=60">
                        <el-tag type='success'
                            style='width: 55px;height: 24px;background: rgba(0,171,164,0.1);border: 1px solid #00ABA4;padding-left: 14px;
                            border-radius: 4px;font-weight:500;color:#00ABA4;'>
                        可信</el-tag>
                    </el-tooltip>

                    <el-tooltip class="item" effect="light" :content="scoreDesc" placement="right-start" v-else-if='isCredible<60'>
                        <el-tag type='danger'
                            style='width: 55px;height: 24px;background: rgba(237,64,64,0.1);border: 1px solid #ED4040;border-radius: 4px;'
                        >不可信</el-tag>
                    </el-tooltip>

                    <div style='margin-left: 20px;display: flex'>
                        <div style='height: 19px;font-size: 14px;font-family: Source Han Sans CN;
                        font-weight: bold;color: #353D61;line-height: 28px;margin-top: 0;'>{{this.repoData.rUser}}</div>
                        <div style='height: 14px;font-size: 14px;font-family: Source Han Sans CN;font-weight: 400;
                        color: #353D61;line-height: 28px;opacity: 0.8;margin-left: 12px'> / {{this.repoData.rName}} </div>
                    </div>
                    
                </div>

                <!--审核是否为可信依赖库-->
<!--                <el-button type="primary" style=' width: 130px;height: 30px;margin-top: 17px;background: #4092ED;border: 1px solid #4092ED;border-radius: 4px;margin-left: 20px'-->
<!--                           @click="acknowledge" v-if='this.visitor!==this.owner' :disabled='isAuditCompleted'>-->
<!--                    <div style='font-size: 14px;font-family: Source Han Sans CN;font-weight: 400;color: #FFFFFF;'>-->
<!--                        颁发可信依赖库证明-->
<!--                    </div>-->
<!--                </el-button>-->
<!--                <el-button type="primary" style=' width: 130px;height: 30px;margin-top: 17px;background: #4092ED;border: 1px solid #4092ED;border-radius: 4px;margin-left: 20px'-->
<!--                           @click="deny" v-if='this.visitor!==this.owner' :disabled='isAuditCompleted'>-->
<!--                    <div style='font-size: 14px;font-family: Source Han Sans CN;font-weight: 400;color: #FFFFFF;'>-->
<!--                        不颁发可信依赖库证明-->
<!--                    </div>-->
<!--                </el-button>-->

                <!--未申请时/申请失败-->
                <el-button  style=' width: 130px;height: 30px;margin-top: 14px;background: #4092ED;border: 1px solid #4092ED;border-radius: 4px;margin-left: 20px'@click="dialogVisible = true" :disabled='isDisabled' v-if='this.owner===this.visitor '>
                    <div style='font-size: 14px;line-height:11px;font-family: Source Han Sans CN;font-weight: 400;color: #FFFFFF;'>
                        {{ applicationStatus }}
                    </div>
                </el-button>

                <!--右侧辅助工具栏-->
                <div style='position: absolute;right: 12px;display: flex;margin-top: 15px'>
                    <el-dropdown size="small" split-button type="plain" style='font-family: San Francisco Display;font-weight: 400;color: #353D61;'>
                        <i class='el-icon-view'></i>
                        浏览量   {{watching_count}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>不关注</el-dropdown-item>
                            <el-dropdown-item>关注所有动态</el-dropdown-item>
                            <el-dropdown-item>仅关注版本发行动态</el-dropdown-item>
                            <el-dropdown-item>关注但不提醒动态</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button type="plain" icon="el-icon-star-off" style='margin-left: 12px;font-family: San Francisco Display;font-weight: 400;color: #353D61;'>
                       点赞  {{star_count}} </el-button>
                    <el-button type="plain" icon="el-icon-share" style='font-family: San Francisco Display;font-weight: 400;color: #353D61;'>
                        下载  {{fork_count}}</el-button>
                </div>
            </div>
        </div>
        <!--主体-->
        <div style='display: flex;margin-top: 10px;margin-left: 2px'>
            <!--左侧主体部分-->
            <div style='width: 68%;position: relative;background: rgba(255,255,255,0.8);border: 1px solid;border-image: linear-gradient(0deg, #FFFFFF, #FFFFFF) 1 1;
                box-shadow: 0 5px 20px 0 rgba(183,183,195,0.07);border-radius: 10px;'>
                <div style='margin-left: 2%;margin-right: 2%'>
                    <!--标签行-->
                    <div style='display: flex;'>
                        <!--标签行 左侧栏目内容-->
                        <!--
                        <el-dropdown>
                            <el-button type="plain">
                                master<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>master</el-dropdown-item>
                                <el-dropdown-item>branch</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        -->
                        <!-- 选择用户要进行操作的分支 -->
                        <div style='display: flex;margin-top:5px;margin-bottom: 15px'>
                            <div style='display: flex;margin-top: 14px'>
                                <div>
                                    <el-select v-model="selectBranchId" placeholder="选择分支"  @change='choiceBranch()'
                                               style='background-color: #4092ED;opacity: 0.8;border-radius: 4px;
                                   font-size: 18px;font-family: Source Han Sans CN;font-weight: 400;color: #4092ED;'>
                                        <el-option
                                            v-for="item in branchList"
                                            :key="item.id"
                                            :label="item.branchName"
                                            :value="item.id"
                                        >
                                        </el-option>
                                    </el-select>
                                </div>
                                <img src='../../../assets/img/branch.png' style='margin-top: 9px;width: 13px;height: 13px;margin-left: 16px'>
                                <div style='font-size: 14px;margin-top: 7px;margin-left: 6px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;'>
                                    共 {{this.branchList.length}} 个分支
                                </div>
                                <el-button type='text' @click="addBranch()">
                                    <i class="el-icon-plus" style='font-family: Source Han Sans CN;font-weight: bolder;color: #4092ED;margin-left: 10px;font-size: 14px'></i>
                                </el-button>
                                <!-- <div style='font-size: 12px;margin-top: 10px;margin-left: 16px;font-family: Source Han Sans CN;font-weight: 500;color: #353D61;'>
                                    标签 1</div> -->
                            </div>
                            <!--标签行 右侧栏目内容-->
                            <div style='display: flex;position: absolute;right: 18px;'>
                                <el-button type='text'><i class="el-icon-more-outline" style='font-family: Source Han Sans CN;font-weight: bolder;color: #4092ED;margin-left: 10px;font-size: 14px'></i>
                                    <router-link :to="{path:'/manage',query:{username:username,warehouseName:this.warehouse,starCount:this.star_count,watchCount:this.watching_count,forkCount:this.watching_count}}"
                                                 style='font-family: Source Han Sans CN;font-weight: 400;color: #4092ED;font-size: 14px'>
                                        管理</router-link>
                                </el-button>
                                <el-button type='text'><i class="el-icon-top" style='font-family: Source Han Sans CN;font-weight: bolder;color: #4092ED;margin-left: 10px;font-size: 14px'></i>
                                    <router-link :to="{path:'/statistics',query:{username:username,warehouseName:this.$route.query.warehouseName,isCredible:this.isCredible }}"
                                                 style='font-family: Source Han Sans CN;font-weight: 400;color: #4092ED;font-size: 14px'>
                                        统计</router-link>
                                </el-button>
                                <el-button type='text'><i class="el-icon-plus" style='font-family: Source Han Sans CN;font-weight: bolder;color: #4092ED;margin-left: 10px;font-size: 14px'></i>
                                    <router-link :to="{path:'/pullrequests',query:{username:username,warehouseName:this.$route.query.warehouseName,isCredible:this.isCredible }}"
                                                 style='font-family: Source Han Sans CN;font-weight: 400;color: #4092ED;font-size: 14px'>
                                        拉取请求</router-link>
                                </el-button>
                                <el-button type='text' style='font-size: 16px;font-family: Source Han Sans CN;font-weight: 400;color: #4092ED;margin-left: 10px;font-size: 14px;
                                line-height: 46px;'><i class="el-icon-plus" style='font-weight: bolder;color: #4092ED'></i>
                                    <router-link :to="{path:'/issue',query:{username:username,warehouseName:this.$route.query.warehouseName ,isCredible:this.isCredible}}"
                                                 style='font-family: Source Han Sans CN;font-weight: 400;color: #4092ED;font-size: 14px'>
                                        问题</router-link>
                                </el-button>
                                <div style='margin-left: 10px'>
                                    <el-dropdown @command="handleCommand">
                                        <el-button type="text" style='margin-left: 6px;font-size: 14px;font-family: Source Han Sans CN;font-weight: 400;
                                        color: #00ABA4;line-height: 46px;'>文件</el-button>
                                        <img src='../../../assets/img/arrow-down-green.png' style='width: 10px;height: 5px;margin-left: 5px' />
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item>
                                                <router-link :to="{path:'/newFile',query:{username:this.username,warehouseName:this.$route.query.warehouseName,isCredible:this.isCredible,owner:this.owner }}" >
                                                    新建文件   </router-link>
                                            </el-dropdown-item>
                                            <!-- <el-dropdown-item>新建Diagram文件</el-dropdown-item>
                                            <el-dropdown-item>新建文件夹</el-dropdown-item>
                                            <el-dropdown-item>新建子模块</el-dropdown-item> -->
                                            <el-dropdown-item command="uploadFile">
                                                上传文件
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>
                                <div style='margin-left: 10px' >
                                    <el-dropdown>
                                        <el-button type="text" style='margin-left: 6px;font-size: 14px;font-family: Source Han Sans CN;font-weight: 400;
                                        color: #F6833B;line-height: 46px;'>克隆/下载</el-button>
                                        <img src='../../../assets/img/arrow-down-orange.png' style='width: 10px;height: 5px;margin-left: 5px'>
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
                    </div>
                    <!--左侧标签行下面内容  表格数据-->
                    <div>
                        <!--表格信息_===表格数据根据用户从 选择器 里面的选择 来确定，一个分支对应一个表格-->
                        <el-table :data="displayData"  :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
                            style="width: 100%;font-size:13px;margin-top: 10px">
                            <el-table-column prop="fileName"  label='文件名' align="center"> </el-table-column>
                            <el-table-column prop="remark" label="扩展信息" align="center"></el-table-column>
                            <el-table-column prop="timeDesc" label="提交时间" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <!--右侧主体部分-->
            <div style='text-align: left;margin-left: 10px;width: 30%;background: rgba(255,255,255,0.8);border: 1px solid;
            border-image: linear-gradient(0deg, #FFFFFF, #FFFFFF) 1 1;box-shadow: 0 5px 20px 0 rgba(183,183,195,0.07);border-radius: 10px;'>
                <div style='margin-right: 10px;margin-left: 10px;'>
<!--                    &lt;!&ndash;简介&ndash;&gt;-->
<!--                    <h4 style='margin-top: 27px;margin-left: 10px'>简介</h4>-->
<!--                    <div style='margin-top: 15px;font-size: 15px;color: #72767b;margin-left: 10px' >{{this.$route.query.introduce}}</div>-->
<!--                    <div style='margin-top: 15px;font-size: 15px;color: #72767b;margin-left: 10px' >{{this.$route.query.warehouseKeywords}}</div>-->
<!--韩梅梅-协同课设-->
        <div v-if='this.repoData.rUser==="韩梅梅"'>
            <!--简介-->
            <h4 style='margin-top: 27px;margin-left: 10px'>简介</h4>
            <div style='margin-top: 15px;font-size: 15px;color: #72767b;margin-left: 10px' >{{this.introduce_hmm_xtks}}</div>
                    <!--近期动态-->
                    <h4 style='margin-top: 40px;margin-left: 10px'>近期动态</h4>
                    <div style='display: block'>
                        <div style='display: grid;margin-top:25px;margin-left: 10px'>

                            <div v-for="(item) in recentTrends_hmm_xtks"  style='display: flex;margin-bottom: 20px'>
                                <div >
                                    <img src='@/assets/img/user-woman.png' style='width: 50px;height: 50px' />
                                </div>
                                <div style='display: grid'>
                                    <div style='margin-left:20px;font-size: 16px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;'> {{item.name}} </div>
                                    <div style='display: flex'>
                                        <div style='margin-top: 1px;margin-left:20px;font-size: 14px;font-family: Source Han Sans CN;font-weight: 500;
                                    color: #353D61;'>{{item.trends}}</div>
                                    </div>
                                </div>
                            </div>

                    </div>
                   </div>
                    <!--贡献者-->
                    <div style='display: block;position: relative;'>
                        <div style='display: flex;margin-left: 10px'>
                            <div style='display: flex'>
                                <h4 style='margin-top: 40px;'>管理者</h4>
                                <div style='margin-top: 30px;width: 24px;height: 17px;background: #E13131;border-radius: 5px 5px 5px 0;'>
                                    <div style='margin-left: 8px;font-family: Source Han Sans CN;font-weight: bold;color: #FFFFFF;'>{{this.manager_hmm_xtks.length}} </div>
                                </div>
                            </div>
                            <!--el-button type="text" style='margin-top: 34px;margin-left:10px;font-size: 15px;color: #72767b'>({{this.manager.length}})</el-button>-->
                            <div style='position:absolute;right: 0;'>
                                <img src='../../../assets/img/all-icon.png'/>
                                <el-button type="text" style='margin-top: 30px;font-size: 15px;font-family: Source Han Sans CN;
                                font-weight: 400;color: #4192ED;'>全部</el-button>
                            </div>
                        </div>

                        <div style='display: flex;margin-top: 20px'>
                            <div v-for="(item) in manager_hmm_xtks"  style='display: grid'>
                                <!--
                                <img :src="item.src" style='width: 38px;height: 38px;margin-left: 10px'>
                                -->
                                <div style='margin-right: 10px;width: 50px;height: 50px'>
                                    <img src='@/assets/img/user-woman.png' style='width: 50px;height: 50px;margin-left: 10px'/>
                                    <!--  <el-avatar :style="`background:${extractColorByName(item.name)}`"> {{item.name}} </el-avatar>-->
                                </div>
                                <div style='font-size: 16px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;margin-left: 17px'>
                                    {{item.name}} </div>
                            </div>
                        </div>

                        <div style='display: flex'>
                            <h4 style='margin-top: 40px;margin-left: 10px'>贡献者</h4>
                            <div style='margin-top: 30px;width: 24px;height: 17px;background: #E13131;border-radius: 5px 5px 5px 0;'>
                                <div style='margin-left: 8px;font-family: Source Han Sans CN;font-weight: bold;color: #FFFFFF;'>{{this.contributor_hmm_xtks.length}} </div>
                            </div>

                            <div style='position:absolute;right: 0;margin-left: 10px'>
                                <img src='../../../assets/img/all-icon.png'/>
                                <el-button type="text" style='margin-top: 30px;font-size: 15px;font-family: Source Han Sans CN;
                            font-weight: 400;color: #4192ED;'>全部</el-button>
                            </div>
                        </div>

                        <div style='display: flex;margin-top: 20px'>
                            <div v-for="(item) in contributor_hmm_xtks"  style='display: grid'>
                                <div style='margin-right: 10px'>
                                    <img src="../../../assets/img/user-woman.png" style='height: 50px;width: 50px;margin-left: 10px'/>
                                    <!--                                <el-avatar :style="`background:${extractColorByName(item.name)}`"> {{item.name}} </el-avatar>-->
                                </div>
                                <div style='font-size: 16px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;margin-left: 17px'> {{item.name}} </div>
                            </div>
                        </div>
                    </div>
                </div>
<!--李华-李华的测试仓库-->
                    <div v-if='this.repoData.rUser==="李华"'>
                        <div v-if='this.repoData.rName==="李华的测试仓库"'>
                            <!--简介-->
                            <h4 style='margin-top: 27px;margin-left: 10px'>简介</h4>
                            <div style='margin-top: 15px;font-size: 15px;color: #72767b;margin-left: 10px' >{{this.introduce_lh_lhdcsck}}</div>
                        <!--近期动态-->
                        <h4 style='margin-top: 40px;margin-left: 10px'>近期动态</h4>
                        <div style='display: block'>
                            <div style='display: grid;margin-top:25px;margin-left: 10px'>

                                <div v-for="(item) in recentTrends_lh_lhdcsck"  style='display: flex;margin-bottom: 20px'>
                                    <div >
                                        <img src='@/assets/img/user-woman.png' style='width: 50px;height: 50px' />
                                    </div>
                                    <div style='display: grid'>
                                        <div style='margin-left:20px;font-size: 16px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;'> {{item.name}} </div>
                                        <div style='display: flex'>
                                            <div style='margin-top: 1px;margin-left:20px;font-size: 14px;font-family: Source Han Sans CN;font-weight: 500;
                                    color: #353D61;'>{{item.trends}}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <!--贡献者-->
                        <div style='display: block;position: relative;'>
                            <div style='display: flex;margin-left: 10px'>
                                <div style='display: flex'>
                                    <h4 style='margin-top: 40px;'>管理者</h4>
                                    <div style='margin-top: 30px;width: 24px;height: 17px;background: #E13131;border-radius: 5px 5px 5px 0;'>
                                        <div style='margin-left: 8px;font-family: Source Han Sans CN;font-weight: bold;color: #FFFFFF;'>{{this.manager_lh_lhdcsck.length}} </div>
                                    </div>
                                </div>
                                <!--el-button type="text" style='margin-top: 34px;margin-left:10px;font-size: 15px;color: #72767b'>({{this.manager.length}})</el-button>-->
                                <div style='position:absolute;right: 0;'>
                                    <img src='../../../assets/img/all-icon.png'/>
                                    <el-button type="text" style='margin-top: 30px;font-size: 15px;font-family: Source Han Sans CN;
                                font-weight: 400;color: #4192ED;'>全部</el-button>
                                </div>
                            </div>

                            <div style='display: flex;margin-top: 20px'>
                                <div v-for="(item) in manager_lh_lhdcsck"  style='display: grid'>
                                    <!--
                                    <img :src="item.src" style='width: 38px;height: 38px;margin-left: 10px'>
                                    -->
                                    <div style='margin-right: 10px;width: 50px;height: 50px'>
                                        <img src='@/assets/img/user-woman.png' style='width: 50px;height: 50px;margin-left: 10px'/>
                                        <!--  <el-avatar :style="`background:${extractColorByName(item.name)}`"> {{item.name}} </el-avatar>-->
                                    </div>
                                    <div style='font-size: 16px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;margin-left: 17px'>
                                        {{item.name}} </div>
                                </div>
                            </div>

                            <div style='display: flex'>
                                <h4 style='margin-top: 40px;margin-left: 10px'>贡献者</h4>
                                <div style='margin-top: 30px;width: 24px;height: 17px;background: #E13131;border-radius: 5px 5px 5px 0;'>
                                    <div style='margin-left: 8px;font-family: Source Han Sans CN;font-weight: bold;color: #FFFFFF;'>{{this.contributor_lh_lhdcsck.length}} </div>
                                </div>

                                <div style='position:absolute;right: 0;margin-left: 10px'>
                                    <img src='../../../assets/img/all-icon.png'/>
                                    <el-button type="text" style='margin-top: 30px;font-size: 15px;font-family: Source Han Sans CN;
                            font-weight: 400;color: #4192ED;'>全部</el-button>
                                </div>
                            </div>

                            <div style='display: flex;margin-top: 20px'>
                                <div v-for="(item) in contributor_lh_lhdcsck"  style='display: grid'>
                                    <div style='margin-right: 10px'>
                                        <img src="../../../assets/img/user-woman.png" style='height: 50px;width: 50px;margin-left: 10px'/>
                                        <!--                                <el-avatar :style="`background:${extractColorByName(item.name)}`"> {{item.name}} </el-avatar>-->
                                    </div>
                                    <div style='font-size: 16px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;margin-left: 17px'> {{item.name}} </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
  <!--李华-李华的临时仓库-->
                    <div v-if='this.repoData.rUser==="李华"'>
                        <div v-if='this.repoData.rName==="李华的临时仓库"'>
                            <!--简介-->
                            <h4 style='margin-top: 27px;margin-left: 10px'>简介</h4>
                            <div style='margin-top: 15px;font-size: 15px;color: #72767b;margin-left: 10px' >{{this.introduce_lh_lhdlsck}}</div>
                            <!--近期动态-->
                            <h4 style='margin-top: 40px;margin-left: 10px'>近期动态</h4>
                            <div style='display: block'>
                                <div style='display: grid;margin-top:25px;margin-left: 10px'>

                                    <div v-for="(item) in recentTrends_lh_lhdlsck"  style='display: flex;margin-bottom: 20px'>
                                        <div >
                                            <img src='@/assets/img/user-woman.png' style='width: 50px;height: 50px' />
                                        </div>
                                        <div style='display: grid'>
                                            <div style='margin-left:20px;font-size: 16px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;'> {{item.name}} </div>
                                            <div style='display: flex'>
                                                <div style='margin-top: 1px;margin-left:20px;font-size: 14px;font-family: Source Han Sans CN;font-weight: 500;
                                    color: #353D61;'>{{item.trends}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--贡献者-->
                            <div style='display: block;position: relative;'>
                                <div style='display: flex;margin-left: 10px'>
                                    <div style='display: flex'>
                                        <h4 style='margin-top: 40px;'>管理者</h4>
                                        <div style='margin-top: 30px;width: 24px;height: 17px;background: #E13131;border-radius: 5px 5px 5px 0;'>
                                            <div style='margin-left: 8px;font-family: Source Han Sans CN;font-weight: bold;color: #FFFFFF;'>{{this.manager_lh_lhdlsck.length}} </div>
                                        </div>
                                    </div>
                                    <!--el-button type="text" style='margin-top: 34px;margin-left:10px;font-size: 15px;color: #72767b'>({{this.manager.length}})</el-button>-->
                                    <div style='position:absolute;right: 0;'>
                                        <img src='../../../assets/img/all-icon.png'/>
                                        <el-button type="text" style='margin-top: 30px;font-size: 15px;font-family: Source Han Sans CN;
                                font-weight: 400;color: #4192ED;'>全部</el-button>
                                    </div>
                                </div>

                                <div style='display: flex;margin-top: 20px'>
                                    <div v-for="(item) in manager_lh_lhdlsck"  style='display: grid'>
                                        <!--
                                        <img :src="item.src" style='width: 38px;height: 38px;margin-left: 10px'>
                                        -->
                                        <div style='margin-right: 10px;width: 50px;height: 50px'>
                                            <img src='@/assets/img/user-woman.png' style='width: 50px;height: 50px;margin-left: 10px'/>
                                            <!--  <el-avatar :style="`background:${extractColorByName(item.name)}`"> {{item.name}} </el-avatar>-->
                                        </div>
                                        <div style='font-size: 16px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;margin-left: 17px'>
                                            {{item.name}} </div>
                                    </div>
                                </div>
                                <div style='display: flex'>
                                    <h4 style='margin-top: 40px;margin-left: 10px'>贡献者</h4>
                                    <div style='margin-top: 30px;width: 24px;height: 17px;background: #E13131;border-radius: 5px 5px 5px 0;'>
                                        <div style='margin-left: 8px;font-family: Source Han Sans CN;font-weight: bold;color: #FFFFFF;'>{{this.contributor_lh_lhdlsck.length}} </div>
                                    </div>
                                    <div style='position:absolute;right: 0;margin-left: 10px'>
                                        <img src='../../../assets/img/all-icon.png'/>
                                        <el-button type="text" style='margin-top: 30px;font-size: 15px;font-family: Source Han Sans CN;
                            font-weight: 400;color: #4192ED;'>全部</el-button>
                                    </div>
                                </div>

                                <div style='display: flex;margin-top: 20px'>
                                    <div v-for="(item) in contributor_lh_lhdlsck"  style='display: grid'>
                                        <div style='margin-right: 10px'>
                                            <img src="../../../assets/img/user-woman.png" style='height: 50px;width: 50px;margin-left: 10px'/>
                                            <!--                                <el-avatar :style="`background:${extractColorByName(item.name)}`"> {{item.name}} </el-avatar>-->
                                        </div>
                                        <div style='font-size: 16px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;margin-left: 17px'> {{item.name}} </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
<!--李华-地图导航课设-->
                    <div v-if='this.repoData.rUser==="李华"'>
                        <div v-if='this.repoData.rName==="地图导航课设"'>
                            <!--简介-->
                            <h4 style='margin-top: 27px;margin-left: 10px'>简介</h4>
                            <div style='margin-top: 15px;font-size: 15px;color: #72767b;margin-left: 10px' >{{this.introduce_lh_dtdhks}}</div>
                            <!--近期动态-->
                            <h4 style='margin-top: 40px;margin-left: 10px'>近期动态</h4>
                            <div style='display: block'>
                                <div style='display: grid;margin-top:25px;margin-left: 10px'>

                                    <div v-for="(item) in recentTrends_lh_dtdhks"  style='display: flex;margin-bottom: 20px'>
                                        <div >
                                            <img src='@/assets/img/user-woman.png' style='width: 50px;height: 50px' />
                                        </div>
                                        <div style='display: grid'>
                                            <div style='margin-left:20px;font-size: 16px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;'> {{item.name}} </div>
                                            <div style='display: flex'>
                                                <div style='margin-top: 1px;margin-left:20px;font-size: 14px;font-family: Source Han Sans CN;font-weight: 500;
                                    color: #353D61;'>{{item.trends}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--贡献者-->
                            <div style='display: block;position: relative;'>
                                <div style='display: flex;margin-left: 10px'>
                                    <div style='display: flex'>
                                        <h4 style='margin-top: 40px;'>管理者</h4>
                                        <div style='margin-top: 30px;width: 24px;height: 17px;background: #E13131;border-radius: 5px 5px 5px 0;'>
                                            <div style='margin-left: 8px;font-family: Source Han Sans CN;font-weight: bold;color: #FFFFFF;'>{{this.manager_lh_dtdhks.length}} </div>
                                        </div>
                                    </div>
                                    <!--el-button type="text" style='margin-top: 34px;margin-left:10px;font-size: 15px;color: #72767b'>({{this.manager.length}})</el-button>-->
                                    <div style='position:absolute;right: 0;'>
                                        <img src='../../../assets/img/all-icon.png'/>
                                        <el-button type="text" style='margin-top: 30px;font-size: 15px;font-family: Source Han Sans CN;
                                font-weight: 400;color: #4192ED;'>全部</el-button>
                                    </div>
                                </div>

                                <div style='display: flex;margin-top: 20px'>
                                    <div v-for="(item) in manager_lh_dtdhks"  style='display: grid'>
                                        <!--
                                        <img :src="item.src" style='width: 38px;height: 38px;margin-left: 10px'>
                                        -->
                                        <div style='margin-right: 10px;width: 50px;height: 50px'>
                                            <img src='@/assets/img/user-woman.png' style='width: 50px;height: 50px;margin-left: 10px'/>
                                            <!--  <el-avatar :style="`background:${extractColorByName(item.name)}`"> {{item.name}} </el-avatar>-->
                                        </div>
                                        <div style='font-size: 16px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;margin-left: 17px'>
                                            {{item.name}} </div>
                                    </div>
                                </div>
                                <div style='display: flex'>
                                    <h4 style='margin-top: 40px;margin-left: 10px'>贡献者</h4>
                                    <div style='margin-top: 30px;width: 24px;height: 17px;background: #E13131;border-radius: 5px 5px 5px 0;'>
                                        <div style='margin-left: 8px;font-family: Source Han Sans CN;font-weight: bold;color: #FFFFFF;'>{{this.contributor_lh_dtdhks.length}} </div>
                                    </div>
                                    <div style='position:absolute;right: 0;margin-left: 10px'>
                                        <img src='../../../assets/img/all-icon.png'/>
                                        <el-button type="text" style='margin-top: 30px;font-size: 15px;font-family: Source Han Sans CN;
                            font-weight: 400;color: #4192ED;'>全部</el-button>
                                    </div>
                                </div>

                                <div style='display: flex;margin-top: 20px'>
                                    <div v-for="(item) in contributor_lh_dtdhks"  style='display: grid'>
                                        <div style='margin-right: 10px'>
                                            <img src="../../../assets/img/user-woman.png" style='height: 50px;width: 50px;margin-left: 10px'/>
                                            <!--                                <el-avatar :style="`background:${extractColorByName(item.name)}`"> {{item.name}} </el-avatar>-->
                                        </div>
                                        <div style='font-size: 16px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;margin-left: 17px'> {{item.name}} </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title="申请可信依赖库"
            :visible.sync="dialogVisible"
            width="40%"
            center>
            <div class="textBtn">
                <div>1. 你的可信依赖库申请将由平安源nber审核。</div>
                <div>2. 凡是经过安全检验确保安全的依赖库，平台会为其颁发可信依赖库证明。</div>
                <div>3. 申请提交后，如一个工作日内未得到推荐，则默认表示被拒。</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button  @click="applicationNO">取 消</el-button>
                <el-button type="primary" @click="applicationYes">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>
import axios from 'axios';
import ManageComponent from '@/components/page/depot/Manage.vue';
import CounterCom from '@/components/page/CounterCom.vue'
import { messages } from '../../common/i18n';
import { selectBranchList,addBranch,searchDetail,getRepoAuditScore,applyForAudit } from '../../../api/depot';


export default {
    name: "FilePreview",
    components: { CounterCom },
    mounted() {
        this.repoId = this.$route.query.repoId;
        this.activeName = this.$route.query.activeName; //owner我拥有的，member我参与的
        this.selectBranchId = this.$route.query.branchId;
        this.selectRepoInfo();
        this.selectBranchList();
    },
    data() {
        return {
            user:this.username,
            repoId:0,
            repoData:[],
            activeName:'',
            isMember:this.$route.query.isMember,
            isCertificator:this.$route.query.isCertificator,//判断是不是要进行可信依赖库审核
            dialogVisible: false,
            visitor:this.$route.query.visitor,
            owner:this.$route.query.owner,
            warehouse: this.$route.query.warehouseName,
            value:'',
            isCredible: 60,     //低于60不可信;;; 可以用 this.$route.query.isCredible 传参  or  从数据库读取
            scoreDesc:'',       //分数的描述信息
            priKey:'',
            //isCredible:this.$store.state.CredibleValue,
            isDisabled: false,  //对于申请按钮的展现
            isAuditCompleted:false, //审核员是否审核完成，已完成则不显示按钮,
            applicationStatus: '申请可信依赖库',

            http_text: 'https://element.eleme.cn/#/zh-CN/component/input',
            isShowHeader: false,
            star_count: 0,
            fork_count: 0,
            watching_count: 3,
            donate_count: 0,

            //韩梅梅-协同课设
            //此仓库的【贡献者】——后端从数据库里传入数组
            introduce_hmm_xtks:"这是关于我们的课设",
            contributor_hmm_xtks: [
                { name: '韩梅梅'},{ name: '李华'},
               ],
            //因为图片在assets里面，所以src引入的时候需要require一下。（此次未采用此方法引入头像）
            //此仓库的【管理者】——后端从数据库里传入数组
            manager_hmm_xtks: [{ name: '韩梅梅' }, { name: '李华'}],
            //此仓库的【近期动态】——后端监测动态，传入前端？maybe，暂时写死数据
            recentTrends_hmm_xtks: [
                { name: '李华', trends: '提交了文件 :故事一越权更新用户仓库文件.docx',time:'5天前' },
                { name: '李华', trends: '提交了文件index.js',time:'7天前' },
                { name: '韩梅梅', trends: 'PPT改_09.png',time:'8天前' },
            ],

            //李华-李华的测试仓库
            introduce_lh_lhdcsck:"这是我的测试仓库",
            //此仓库的【贡献者】——后端从数据库里传入数组
            contributor_lh_lhdcsck: [
                { name: '韩梅梅'},
                { name: '李华'},
            ],
            //因为图片在assets里面，所以src引入的时候需要require一下。（此次未采用此方法引入头像）
            //此仓库的【管理者】——后端从数据库里传入数组
            manager_lh_lhdcsck: [ { name: '李华'}],
            //此仓库的【近期动态】——后端监测动态，传入前端？maybe，暂时写死数据
            recentTrends_lh_lhdcsck: [
                { name: '韩梅梅', trends: '提交了文件 info.txt',time:'5天前' },
                { name: '韩梅梅', trends: '提交了文件 test.c',time:'5天前' },
                { name: '李华', trends: '提交了文件 傍晚村落.jpg',time:'5天前' },
            ],

            //李华-李华的临时仓库
            introduce_lh_lhdlsck:"这是我的临时仓库",
            //此仓库的【贡献者】——后端从数据库里传入数组
            contributor_lh_lhdlsck: [
                { name: '韩梅梅', src: require('../../../assets/img/wzy.png') },
                { name: '李华', src: require('../../../assets/img/wzy.png') },],
            //因为图片在assets里面，所以src引入的时候需要require一下。（此次未采用此方法引入头像）
            //此仓库的【管理者】——后端从数据库里传入数组
            manager_lh_lhdlsck: [{ name: '李华', src: require('../../../assets/img/img.jpg') }],
            //此仓库的【近期动态】——后端监测动态，传入前端？maybe，暂时写死数据
            recentTrends_lh_lhdlsck: [
                { name: '韩梅梅', trends: '提交了文件QueryInfo.txt',time:'11天前' },
                { name: '李华', trends: '提交了文件QueryData.txt',time:'11天前' },
                { name: '韩梅梅', trends: '提交了文件info.txt',time:'11天前' },

            ],

            //李华-地图导航课设
            introduce_lh_dtdhks:"这是我的地图导航课设！",
            //此仓库的【贡献者】——后端从数据库里传入数组
            contributor_lh_dtdhks: [
                { name: '李华', src: require('../../../assets/img/wzy.png') },
            ],
            //因为图片在assets里面，所以src引入的时候需要require一下。（此次未采用此方法引入头像）
            //此仓库的【管理者】——后端从数据库里传入数组
            manager_lh_dtdhks: [
                { name: '李华', src: require('../../../assets/img/img.jpg') }],
            //此仓库的【近期动态】——后端监测动态，传入前端？maybe，暂时写死数据
            recentTrends_lh_dtdhks: [
                { name: '李华', trends: '提交了文件main.cpp',time:'7天前' },
                { name: '李华', trends: '提交了文件Map.txt',time:'9天前' },
                { name: '李华', trends: '提交了文件MapInfo.db',time:'9天前' },
                // { name: '李华', trends: '提交了文件Navigation.cpp',time:'10天前' },
                // { name: '李华', trends: '提交了文件Navigation.h',time:'10天前' },
                // { name: '李华', trends: '提交了文件QtSGS.cpp',time:'10天前' },
                // { name: '李华', trends: '提交了文件QtSGS.h',time:'10天前' },
                // { name: '李华', trends: '提交了文件QtSGS.qrc',time:'10天前' },
                // { name: '李华', trends: '提交了文件QtSGS.sln',time:'12天前' },
                // { name: '李华', trends: '提交了文件QtSGS.ui',time:'12天前' },
                // { name: '李华', trends: '提交了文件QtSGS.vcxproj',time:'12天前' },
                // { name: '李华', trends: '提交了文件QtSGS.vcxproj.filters',time:'12天前' },
                // { name: '李华', trends: '创建了仓库',time:'13天前' },
            ],


            //真实数据
            branchList:[],
            selectBranchId:0,
            branchName: "master",      //下拉框绑定的model
            displayData:[{
                fileName: '',
                remark: '该分支下还没有文件',
                uploadDate:'',
                timeDesc: '',
            }],
            newBranchName:''
        }
    },
    created() {
        // 在 created 钩子函数中将 CredibleValue 值设置为 0
        this.$store.dispatch('setCredibleValue', 0);
        // 在 created 钩子函数中监听 CredibleValue 的变化
        this.$store.watch(
            (state) => state.CredibleValue,
            (newCredibleValue) => {
                // 处理 CredibleValue 值变化的逻辑
                console.log('CredibleValue 变化为:', newCredibleValue);
            }
        );
    },
    methods: {
        selectRepoInfo(){
            searchDetail({
                rId: this.repoId
            }).then((res) => {
                this.repoData = res.data;
            });
        },
        selectBranchList(){
            selectBranchList({
                repoId: this.repoId
            }).then((res) => {
                this.branchList = res.data;
                if(this.selectBranchId==0){
                    this.selectBranchId = this.branchList[0].id;
                }
                this.choiceBranch();
            });
            getRepoAuditScore({
                repoId: this.repoId
            }).then((res) => {
                this.isCredible = res.data.score;
                this.scoreDesc = "该仓库共包含"+res.data.defaultNum+"个未申请可信的库文件,"+res.data.auditNum+"个可信库文件,"+res.data.failAuditNum+"个危险库文件,"+res.data.unAuditNum+"个待审核文件";
                //console.log(this.scoreDesc);
            });
        },
        addBranch(){
            this.$prompt("请输入分支名称", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                showClose: false,
                distinguishCancelAndClose: true,
            }).then(({ value }) => {
                for (var i=0;i<this.branchList.length;i++)
                { 
                    if(this.branchList[i].branchName===value){ //已有重复名字
                        this.$message({ type: 'error', message:'创建失败，已存在该分支！'})
                        return;
                    }
                }
                this.newBranchName = value;
                addBranch({
                    repoId: this.repoId,
                    branchName:this.newBranchName
                }).then((res) => {
                    this.$message({ type: 'success', message: res.msg })
                    this.selectBranchList();
                }).catch((res) => {
                    this.$message({ type: 'error', message: res.msg })
                    this.selectBranchList();
                });
            });
        },
        extractColorByName(name) {
            // 根据用户姓名随机生成用户头像颜色——————
            // 由于是按照名字第一个元素设定颜色，导致有不同用户颜色不一样，把用户名都换成中文可行，由于前面roles还是英文，暂时未改
            //  let temp = [];
            //  temp.push("#");
            //  for (let index = 0; index < name.length; index++) {
            //      temp.push(parseInt(name[index].charCodeAt(0), 10).toString(16));
            //  }
            // return temp.slice(0, 5).join('').slice(0, 4);
            let str = '';
            for (let i = 0; i < name.length; i++) {
                str += parseInt(name[i].charCodeAt(0), 10).toString(16)
            }
            return '#0c' + str.slice(1, 2)
        },
        handleNodeClick(data) {
            console.log(data);
        },
        handleCopyClick() {
            // 复制文本到剪切板
            this.$refs.textInput.select();
            document.execCommand('copy');
        },
        handleView(){ //点击文件名称跳转进入查看文件页面_   从后端获取一个什么参数，从数据库里面搜索显示在查看页面
            //
            console.log(this.warehouse);
            this.$router.push(
                {path: '/codeview',query:{warehouseName: this.warehouse,isCredible: this.isCredible} })
        },
        readFile(){
            this.$router.push(
                {path: '/codeview_file',query:{warehouseName: this.warehouse,isCredible: this.isCredible} })
        },
        handleEdit(){ //点击文件名称跳转进入查看文件页面
            this.$router.push({path: '/newFile'});
        },
        //申请可信依赖库证明
        applicationYes(){
            this.$prompt("请输入私钥", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            })
            .then(({ value }) => {
                if (value.length != 64) {
                    this.$alert("无效的私钥格式！", "提示", {
                        confirmButtonText: "确定",
                    });
                    return;
                }
                this.priKey = value;
                applyForAudit({     //申请可信依赖库，重新将未审核通过的可信库文件提交申请
                    repoId: this.repoId,
                    priKey:this.priKey
                }).then((res) => {
                    this.dialogVisible=false;
                    //this.isDisabled= !this.isDisabled;
                    //this.applicationStatus="已申请可信依赖库";
                setTimeout(this.myMessage, 3000); //3秒后開始运行 √
                }).catch((res)=>{
                    this.dialogVisible=false;
                    //this.isDisabled= !this.isDisabled;
                    //this.applicationStatus="申请失败！请稍后重试";
                });
            })
            .catch(() => {
                this.dialogVisible=false;
                this.priKey = "";
            }); 
        },
        myMessage(){
            this.$message({
                type: 'warning',
                iconClass:'../../assets/img/payAttention.png',
                message: '您收到一条新消息！'
            });
        },
        applicationNO(){
            this.dialogVisible=false
            this.$message({
                type: 'info',
                message: action === 'cancel'
                    ? '取消申请'
                    : '停留在当前页面'
            })
        },
        acknowledge() {
            console.log(this.owner);
            console.log(this.visitor);
            this.$confirm('我承诺该依赖库确保安全，安全验证通过，颁发可信依赖库证明！', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    this.$message({
                        type: 'info',
                        message: '已确认颁发可信依赖库证明'
                    });
                    this.isCredible = 80;
                    //this.$store.dispatch('setCredibleValue', 80);
                })
                .catch(action => {
                    this.$message({
                        type: 'info',
                        message: action === 'cancel'
                            ? '取消承诺'
                            : '停留在当前页面'
                    })
                });
            //审核完成，不显示按钮
            this.isAuditCompleted=!this.isAuditCompleted;
        },
        deny() {
            this.$confirm('我承诺该依赖库不安全，安全验证未通过，不颁发可信依赖库证明！', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    this.$message({
                        type: 'info',
                        message: '已确认不颁发可信依赖库证明！',
                    });
                    this.isDisabled=!this.isDisabled;
                })
                .catch(action => {
                    this.$message({
                        type: 'info',
                        message: action === 'cancel'
                            ? '取消承诺'
                            : '停留在当前页面'
                    })
                });
            //审核完成，不显示按钮
            this.isAuditCompleted=!this.isAuditCompleted;
        },
        //文件上传测试
        handlePreview(file){//文件预览
            //file.response是后端服务端返回的json, url未=为json里的url
            window.open(file.response.url);
            console.log(file);
        },
        // change事件匹配对应数据
        choiceBranch(){
            for (var i=0;i<this.branchList.length;i++)
            { 
                if(this.branchList[i].id==this.selectBranchId){
                    this.displayData = this.branchList[i].repoFileList;
                }
            }
        },
        handleCommand(command) {
            if(command==="uploadFile"){
                this.$router.push({
                    path: "./upload",
                    query: { 
                        repoId: this.repoId,
                        branchId:this.selectBranchId,
                        activeName:this.activeName
                    },
                });
            }
        }
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
    },
}
</script>


<style lang='less'>
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
#but {
    width: 100px;
    height: 40px;
    color: #fff;
    margin-top: 10px;
    margin-left: 10px
}
.textBtn{
    div{
        margin-top: 10px;
    }
}
.but01 {
    background-color: orange;
}

.but02 {
    background-color: gray;
}
::v-deep {
    .el-select {
        margin-left: 9px;
        .el-input.el-input--suffix {
            .el-input__inner {
                background: #4092ED;
                opacity: 0.1;
                border-radius: 4px;
                font-size: 18px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #4092ED;
                height: 25px;
                width: 65px;

            }
            .el-input__suffix-inner {
                position: absolute;
                left: -65px;
            }
        }
        .el-select__caret.el-input__icon.el-icon-arrow-up {
            line-height: 30px;
        }
    }
}
</style>
