<template>
    <div >
        <div class="container" style='width: 84%;margin-left: 6%;'>
            <!--
            <div style='font-size: 22px;font-family: "KaiTi";font-weight: bold'>文件hash</div>
            <el-input v-model="input" placeholder="请在本地计算待上传文件的hash，输入在此处后，可点击“上传文件hash”进行上传" style='width: 88%'></el-input>
            <el-button type="primary" style='margin-left: 22px'>上传文件hash</el-button>
            -->
            <form actionb='/upload' method='post' enctype='multipart/form-data'>
            <div style='font-size: 22px;font-family: "KaiTi";font-weight: bold;padding-top: 20px'>上传文件</div>

                <el-upload
                    class="upload-demo"
                    drag
                    style='text-align: center'
                    action=""
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :on-exceed="handleExceed"
                    :http-request="upload"
                    :file-list="fileList"
                >


                <i class="el-icon-upload"></i>
                <div class="el-upload__text" >将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
            <div style='font-size: 22px;font-family: "KaiTi";font-weight: bold;margin-top: 40px'>扩展信息</div>
            <el-input
                type="textarea"
                :rows="3"
                style='min-height: 120px'
                placeholder="此处可填写为什么修改，做了什么修改，以及开发的思路等更加详细的提交信息，（相当于Git Commit message的body）"
                v-model="ExtendInfo">
            </el-input>
            <!---增加署名，这个暂时先删除吧--->

            <div style='display: flex;margin-top: 20px'>
                <el-button type="warning"  @click='submit'>提交审核</el-button>
            </div>
            </form>

            <div style='display: flex;margin-top: 20px'>
                <div style='padding-top:6px;font-weight: lighter;font-size: 13px;'>点击提交审核后，你将创建一个轻量级PR（</div>
                <el-button type="text" style='font-size: 13px'>详情</el-button>
                <div style='padding-top:6px;font-weight: lighter;font-size: 13px'>），作者审核通过后合入仓库</div>
            </div>
            <el-button :plain="true" @click="success"></el-button>
            <el-button :plain="true" @click="fail"></el-button>
        </div>
    </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import axios from 'axios';

let _fileObj;
export default {
    name: 'upload',
    data: function(){
        return {
            repoId:0,
            repoFileId:0,
            name: localStorage.getItem('ms_username'),
            fileList: [],
            input:'',
            imgSrc: '',
            cropImg: '',
            dialogVisible: false,
            ExtendInfo: '',
            isSign:true
        }
    },
    components: {
        VueCropper
    },
    methods:{
        upload(param) {
            let config = {
                //添加请求头
                headers: { "Content-Type": "multipart/form-data" },
                //添加上传进度监听事件
            };
            const formData = new FormData();
            formData.append("uploadFile", param.file);
            formData.append("fName", param.file.name);
            formData.append("fSize", param.file.size);
            formData.append("repoId", param.file.size);
            formData.append("relativePath", "/");
            const url = process.env.VUE_APP_BASE_API + "/file/uploadRepoFile";
            axios.post(url, formData, config).then((res) => {
                this.repoFileId=res.data.data;
                console.log(this.repoFileId);
            });
        },
        changeFile(file, fileList){
            _fileObj = file;
         },
        uploadFileRequest(file){
            this._fileObj = file;
            //console.log("test:"+this._fileObj.name);
        },
        handleBeforeUpload(e){
            
        },
        //1.二进制blob———— formdata传输； 2.转换为 base64 传输
        //此处用formdata把文件传给后端。
        submit(){
            let config = {
                headers: { "Content-Type": "multipart/form-data" },
            };

                 let _formData = new FormData();
                 let user = this.username;
                 let time = new Date().toDateString();
                 let extendInfo = this.ExtendInfo;

                // _formData.append("fileName",_fileObj);  //file 是给文件起的名字
                 _formData.append("uploadFile",this._fileObj.file);  //file 是给文件起的名字
                 _formData.append("uploader",user);
                 _formData.append("uploadTime",time);
                 _formData.append("extendInfo",extendInfo);
                 console.log("test:"+this._fileObj.file.name);
                 axios.post("http://localhost:8080/upload",_formData,config);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
           console.log(file);
            console.log(file.response.url);
           window.open(file.response.url);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        setImage(e){
            const file = e.target.files[0];
            if (!file.type.includes('image/')) {
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                this.dialogVisible = true;
                this.imgSrc = event.target.result;
                this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
            };
            reader.readAsDataURL(file);
        },
        cropImage () {
            this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
        },
        cancelCrop(){
            this.dialogVisible = false;
            this.cropImg = this.defaultSrc;
        },
        imageuploaded(res) {
            console.log(res)
        },
        handleError(){
            this.$notify.error({
                title: '上传失败',
                message: '图片上传接口上传失败，可更改为自己的服务器接口'
            });
        },
        success() {
            this.$message({
                message: '上传成功！！！',
                type: 'success'
            });
        },
        fail() {
            this.$message.error('区块链已存在该代码 :( ');
        }

    },
    created(){
        this.cropImg = this.defaultSrc;
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
}
</script>

<style scoped>
.content-tip{
    font-weight: 40;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
.content-title{
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
.pre-img{
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 5px;
}
.crop-demo{
    display: flex;
    align-items: flex-end;
}
.crop-demo-btn{
    position: relative;
    width: 100px;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    margin-left: 30px;
    background-color: #409eff;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    box-sizing: border-box;
}
.crop-input{
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}



.item {
    flex: 1;
}
</style>