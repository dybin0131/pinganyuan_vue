<template>
    <div  style='width: 70%;margin-left: 15%;align-items: center;margin-top: 10%'>
        <div style='font-weight: bolder;font-size: 30px'>问题反馈</div>
        <div style='margin-top: 20px'>
            <el-form ref="form" :model="feedbackForm"  :label-position="labelPosition"  label-width="80px">
                <el-form-item label="您遇到的问题是什么？">
                    <el-input v-model="feedbackForm.question"></el-input>
                </el-form-item>
                <el-form-item label="或者，您的平安源用户名是什么，以便我们在需要时与您联系?(例如@用户名)">
                    <el-input v-model="feedbackForm.feedbackUser"></el-input>
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
    name: 'feedback',
    data(){
        return {
            labelPosition:'top',
            feedbackForm:{
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