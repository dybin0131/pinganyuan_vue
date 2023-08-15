<template>
    <div  style='width: 70%;margin-left: 15%;align-items: center;margin-top: 10%'>
        <div style='font-weight: bolder;font-size: 30px'>找回仓库</div>
        <div style='margin-top: 20px'>
            <el-form ref="form" :model="retrieveDepForm"  :label-position="'top'"  label-width="80px">
                <el-form-item label="请输入您的用户名">
                    <el-input v-model="retrieveDepForm.question"></el-input>
                </el-form-item>
                <el-form-item label="请输入您的密码">
                    <el-input  v-model="retrieveDepForm.feedbackUser"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" @click="onSubmit">发送</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'retrieveDepot',
    data(){
        return{
            labelPosition:'top',
            retrieveDepForm:{
                question: '',
                feedbackUser:'',
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    },

};
</script>

<style scoped>

</style>