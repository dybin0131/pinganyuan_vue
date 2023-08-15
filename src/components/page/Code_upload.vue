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
<!--            <el-upload-->
<!--                class="upload-demo"-->
<!--                drag-->
<!--                style='text-align: center'-->
<!--                action=""-->
<!--                multiple-->
<!--                :show-file-list='true'-->
<!--                :on-preview="handlePreview"-->
<!--                :on-change='changeFile'-->
<!--                :on-remove="handleRemove"-->
<!--                :before-remove="beforeRemove"-->
<!--                :file-list="fileList"-->
<!--            >-->
                <el-upload
                    class="upload-demo"
                    drag
                    style='text-align: center'
                    action=""
                    multiple
                    :show-file-list='true'
                    :on-preview="handlePreview"
                    :http-request='uploadFileRequest'
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :file-list="fileList"
                >


                <i class="el-icon-upload"></i>
                <div class="el-upload__text" >将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
                <!--
                              :before-upload="handleBeforeUpload"
                -->
                <!--
            <p style='margin-top: 5px;font-size: 13px'>文件名称：test.c</p>
                -->

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
        changeFile(file, fileList){
            _fileObj = file;
         },
        uploadFileRequest(file){
            this._fileObj = file;
            //console.log("test:"+this._fileObj.name);
        },
        handleBeforeUpload(e){
            // _fileObj = e.target.files[0];
            // console.log("handleBeforeUpload");
            // console.log(_fileObj.name);
            // console.log(_fileObj.url);
            // this.fileList.value.push({
            //     name:e.target.files[0].name,
            //     url:e.target.files[0].url,
            // })

            //console.log( "file: ",this._fileObj);
            // if(e.target.files.length > 1){  //多个文件
            //     this.fileList.concat(e.target.files);
            // } else {  //单个文件
            //    // this.fileList.push(e.target.files[0]);
            //     this.fileList.value.push({
            //         name:e.target.files[0].name,
            //         url:e.target.files[0].url,
            //     })
            // }
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
            //多文件上传失败了
            // this.fileList.forEach((item) => {
            //     let _formData = new FormData();
            //     let user = this.username;
            //     let time = new Date().toDateString();
            //
            //     _formData.append(item.name+"file",item);  //file 是给文件起的名字
            //     _formData.append(item.name+"uploader",user);
            //     _formData.append(item.name+"uploadTime",time);
            //     axios.post("/upload",_formData);
            // })
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