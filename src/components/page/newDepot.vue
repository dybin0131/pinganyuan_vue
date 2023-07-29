<template>
    <div style="display: flex;justify-content: center;align-items: center;height: 100%">
        <div style=' font-size: 36px;width: 60%'>新建仓库
        <el-form ref="form" :model="form" :rules='rules' label-width="80px" style='width: 60%'>
            <el-form-item label="仓库名称" prop="warehouseName">
                <el-input v-model="form.warehouseName"></el-input>
            </el-form-item>
            <el-form-item label="归属" prop="ownership">
                <el-input
                    placeholder="请输入内容"
                    v-model="username"
                    :disabled="true">
                </el-input>
            </el-form-item>
            <el-form-item label="路径" prop="warehouseAddress">
                <el-input v-model="form.warehouseName"></el-input>
            </el-form-item>
            <!--
            <div style='font-size: small'> 您的仓库路径： {{ warehouse_address }}  </div>
            -->
            <el-form-item label="仓库介绍" prop="introduce">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="用简短的语言来描述一下吧"
                    v-model="form.introduce"
                >
                </el-input>
            </el-form-item>
            <el-form-item label="关键词" prop="warehouseKeywords">
                <el-input v-model="form.warehouseKeywords" placeholder="请输入仓库关键词"></el-input>
            </el-form-item>
            <el-form-item label="特殊资源"  prop="source">
                <el-radio label="开源（所有人可见）" v-model='form.openSource' disabled></el-radio>
                <el-tooltip class="item" effect="dark" content="默认创建私有仓库，可通过「邀请成员」添加仓库成员。如需创建公开仓库，请在创建仓库后通过「仓库设置」修改为公开" placement="right">
                    <el-button style='background-color: transparent'><i class='el-icon-question'></i> </el-button>
                </el-tooltip>
            </el-form-item>
            <el-form-item>
                <el-radio label="私有（仅仓库成员可见）" v-model='form.privateSourse'></el-radio>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">
                    <!--
                    <router-link to="/codedetails">立即创建</router-link>
                   -->
                    <router-link :to="{
                        path:'/codedetails/:owner/:visitor',
                        query:{username:username,warehouseName: form.warehouseName,introduce:form.introduce,warehouseKeywords:form.warehouseKeywords},
                        params:{owner:username, visitor:username}
                    }">
                        <div style='color: #f0f0f0'>立即创建</div>
                    </router-link>
                </el-button>
            </el-form-item>
        </el-form></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value:'',
                form: {
                    warehouseName: '',
                    region: '',
                    introduce: '',
                    warehouseKeywords:'',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    openSource: '',
                    privateSourse: '',
                    desc: '',
                    address:'',
                    warehouse_addr:'',
                    wangzhitou: 'https://pinganyuan.com/',
                    xiegang:'/'
                },
                rules: {
                    warehouseName: [
                        { required: true, message:'请输入仓库名称'}
                    ],
                    ownership: [
                        { required: true, }
                    ],
                    source: [
                        { required: true,  trigger: 'blur' }
                    ],
                    warehouseAddress: [
                        { required: true,  trigger: 'blur' }
                    ]
                }
            };
        },
        computed:{
            /*
            warehouse_address() {
                return this.form.warehouse_addr === this.form.wangzhitou+this.value + this.form.xiegang + this.form.address
            },
            */
            username() {
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            },
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            chooseOwner(){
                console.log('choose owner');
                this.options.push({
                   value: this.username,
                   label: this.username,
                })
            }
        },
    }
</script>
