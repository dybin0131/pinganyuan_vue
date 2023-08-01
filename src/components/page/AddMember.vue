<template>
<div style='margin-top: 60px;margin-left:20%; width:60%;position: center'>
    <h2>直接邀请用户</h2>
    <div style='display: grid;margin-top: 30px' >
        权限
        <el-select v-model="userRight" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </div>

    <div style='margin-top: 30px'>  平安源用户</div>
    <el-input v-model="input" placeholder="请输入完整的邮箱地址" style='margin-top: 10px'></el-input>
    <el-button type='warning' style='margin-top: 20px'  @click="invite">邀请</el-button>
</div>
</template>

<script>
export default {
    name: 'AddMember',
    data() {
        return {
            input: '',
            userRight:'开发者',
            options: [{
                value: '开发者',
                label: '开发者'
            }, {
                value: '管理员',
                label: '管理员'
            }],
        }
    },
   methods: {
       invite() {
           this.$confirm('确认添加该用户吗？', '确认邀请成员', {
               distinguishCancelAndClose: true,
               confirmButtonText: '邀请',
               cancelButtonText: '取消'
           })
               .then(() => {
                   this.$message({
                       type: 'info',
                       message: '已发送邀请'
                   });
               })
               .catch(action => {
                   this.$message({
                       type: 'info',
                       message: action === 'cancel'
                           ? '放弃邀请'
                           : '停留在当前页面'
                   })
               });
       }
   }
};
</script>


<style scoped>

</style>