<template>
    <div style='height: auto;background: rgba(255,255,255,0.6);border: 1px solid;border-image: linear-gradient(0deg, #FFFFFF, #FFFFFF) 1 1;
box-shadow: 0px 5px 20px 0px rgba(183,183,195,0.07);border-radius: 10px;margin-top: 20px'>
    <div style="display: flex;height: 100%">
        <div style=' font-size: 22px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;line-height: 40px;
        margin-left:30px;margin-top:30px;width: 60%'>新建仓库
        <el-form ref="form" :model="form" :rules='rules' label-width="80px" style='width: 60%;margin-top: 25px' label-position='top'>
            <el-form-item label="仓库名称" prop="warehouseName"
            style='font-size: 18px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;'>
                <el-input v-model="form.warehouseName" placeholder="请输入仓库名称"  style='width: 456px;height: 21px;'></el-input>
            </el-form-item>
            <el-form-item label="归属" prop="ownership" style='margin-top: 10px'>
                <el-input
                    placeholder="请输入内容"
                    v-model="username"
                    :disabled="true">
                </el-input>
            </el-form-item>
            <div style='display: flex'></div>
            <el-form-item label="路径" prop="warehouseAddress"  placeholder="请输入路径" style='margin-top: 10px'>
                    <el-input v-model="form.warehouseName" ></el-input>
            </el-form-item>
                <!--暂不现实路径-->
<!--            <el-form-item>-->
<!--                <div style='display: flex;margin-top: 13px;margin-left: 9px'>-->
<!--                    <div style='margin-top: 2px;margin-right: 5px'>-->
<!--                        <img src='../../assets/img/exclamation-green.png' />-->
<!--                    </div>-->
<!--                    <div style='font-size: 14px;font-family: Source Han Sans CN;font-weight: 500;color: #00ABA4;'> 您的仓库路径： {{ warehouse_address }}  </div>-->
<!--                </div>-->
<!--            </el-form-item>-->
            <el-form-item label="关键词" prop="warehouseKeywords" style='margin-top: 10px'>
                <el-input v-model="form.warehouseKeywords" placeholder="请输入仓库关键词"></el-input>
            </el-form-item>
            <el-form-item label="仓库介绍" prop="introduce" style='margin-top: 10px'>
                <el-input
                    style='width: 1200px'
                    type="textarea"
                    :rows="2"
                    placeholder="用简短的语言来描述一下吧"
                    v-model="form.introduce"
                >
                </el-input>
            </el-form-item>

            <el-form-item label="特殊资源"  prop="source" >
                <div style='display: flex;'>
                    <el-form-item>
                        <div >
                            <el-tooltip class="item" effect="dark" content="默认创建私有仓库，可通过「邀请成员」添加仓库成员。如需创建公开仓库，请在创建仓库后通过「仓库设置」修改为公开" placement="top">
                                <el-button style='background-color: transparent' type='text'>
                                    <img src='../../assets/img/question-orange.png' style='width: 15px;height: 15px'/>
                                </el-button>
                            </el-tooltip>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-radio label="开源（所有人可见）" v-model='form.openSource' disabled style='margin-left: 20px'></el-radio>
                    </el-form-item>
                    <el-form-item>
                        <el-radio label="私有（仅仓库成员可见）" v-model='form.privateSourse'  style='margin-left: 20px'></el-radio>
                    </el-form-item>
                </div>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">
                    <div style='color: #f0f0f0'>立即创建</div>
                </el-button>
            </el-form-item>
        </el-form></div>
    </div>
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
                this.$router.push(
                    { name :'codedetails',
                        query:{username:this.username,warehouseName: this.form.warehouseName,introduce:this.form.introduce,
                        warehouseKeywords:this.form.warehouseKeywords},
                params:{owner:this.username, visitor:this.username}})
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
