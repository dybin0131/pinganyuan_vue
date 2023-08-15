<template>
    <div style='width: 80%;height: 100%;margin-left: 10%;margin-top: 20px'>
        <div style='display: flex'>
            <h2>个人资料</h2>
            <div style='color: #324157;font-size: 30px;margin-left: 40px'>——   lxy</div>
        </div>

        <div style='display: flex;margin-top: 40px'>
            <div style='width: 20%;display: block'>
                <img src='../../../assets/img/lxy.png'  style='width: 100px;height: 100px'>
                <div style='margin-top: 20px'><el-button type='info' style='width: 110px' >点击更换头像</el-button></div>
                <div style='margin-top: 20px'><el-button type='warning' style='width: 110px'> 注 销 账 户 </el-button></div>
            </div>

        <div style='width: 60%'>
            <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓   名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="特   长">
                <el-select v-model="form.region" placeholder="请选择您擅长的编程语言或特长" style='width: 100%'>
                    <el-option label="CSS" value="CSS"></el-option>
                    <el-option label="Python" value="Python"></el-option>
                    <el-option label="Ruby" value="Ruby"></el-option>
                    <el-option label="Java" value="Java"></el-option>
                    <el-option label="C" value="C"></el-option>
                    <el-option label="PHP" value="PHP"></el-option>
                </el-select>
            </el-form-item>
            <div style='display: flex;position: relative'>
                <el-form-item label="性   别">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <div style='position: absolute;right: 0'>
                    <el-checkbox v-model="form.isShow">在个人主页展示</el-checkbox>
                </div>
            </div>
            <div style='display: flex;position: relative'>
                <el-form-item label="公   司">
                    <el-input v-model="form.company" style='width: 450px'></el-input>
                </el-form-item>
                <div style='position: absolute;right: 0'>
                    <el-checkbox v-model="form.isShow">在个人主页展示</el-checkbox>
                </div>
            </div>
                <div style='display: flex;position: relative'>
                    <el-form-item label="职   务">
                        <el-input v-model="form.position" style='width: 450px'></el-input>
                    </el-form-item>
                    <div style='position: absolute;right: 0'>
                        <el-checkbox v-model="form.isShow">在个人主页展示</el-checkbox>
                    </div>
                </div>
                <div style='display: flex;position: relative'>
                    <el-form-item label="联系电话">
                        <el-input v-model="form.phone" style='width: 450px'></el-input>
                    </el-form-item>
                    <div style='position: absolute;right: 0'>
                        <el-checkbox v-model="form.isShow">在个人主页展示</el-checkbox>
                    </div>
                </div>
                <div style='display: flex;position: relative'>
                    <el-form-item label="微   信">
                        <el-input v-model="form.wechat" style='width: 450px'></el-input>
                    </el-form-item>
                    <div style='position: absolute;right: 0'>
                        <el-checkbox v-model="form.isShow">在个人主页展示</el-checkbox>
                    </div>
                </div>
                <div style='display: flex;position: relative'>
                    <el-form-item label="微   博">
                        <el-input v-model="form.wechat" style='width: 450px'></el-input>
                    </el-form-item>
                    <div style='position: absolute;right: 0'>
                        <el-checkbox v-model="form.isShow">在个人主页展示</el-checkbox>
                    </div>
                </div>
                <el-form-item label="自我介绍">
                    <el-input type="textarea" :rows="4" placeholder="请自我介绍" v-model="form.produce">
                    </el-input>
                </el-form-item>
        </el-form>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: '',
                region: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                isShow:false,
                wechat:'',
                produce:'',
                company:'',
                phone:''
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
}
</script>

<style>

</style>