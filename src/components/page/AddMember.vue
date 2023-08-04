<template>
    <div class="addMember">
        <div class="title">直接邀请用户</div>
        <div class="formBox">
            <div class="formTitle">权限</div>
            <el-select v-model="userRight" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <div class="formTitle">  平安源用户</div>
            <div class="mailbox">
                <el-input v-model="input" placeholder="请输入完整的邮箱地址"></el-input>
                <div class="mailColor"><i class="el-icon-circle-check"></i> 已发送邀请</div>
            </div>
        </div>
        <div class="btnBox">
            <el-button type="primary" @click="invite">邀请</el-button>
        </div>
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


<style lang="less">
.addMember{
    width:96%;
    padding: 20px;
    margin-top: 10px;
    border-radius: 10px;
    background: #ffffffe2;
    .title{
        font-size: 18px;
        color: #353D61;
        font-weight: bold;
    }
    .formBox{
        margin-top: 30px;
        .formTitle{
            font-size: 14px;
            font-weight: bold;
            margin: 10px 0;
            color: #353D61;
        }
        .mailbox{
            display: flex;
            align-items: center;
            .mailColor{
                font-size: 14px;
                color: #00ABA4;
                margin-left: 20px;
            }
        }
    }
    .btnBox{
        margin-top: 20px;
    }
}
</style>
<style scoped>
.formBox >>> .el-color-picker__icon, .el-input, .el-textarea{
    width: 30%;
}
</style>