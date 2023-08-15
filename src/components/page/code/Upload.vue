<template>
    <div class="uploadBox">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 工作台</el-breadcrumb-item>
                <el-breadcrumb-item>仓库</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="upTitle">上传文件</div>
            <!-- <el-upload
                class="upload-demo"
                drag
                action="http://jsonplaceholder.typicode.com/api/posts/"
                multiple>
                <div class="uplodeFile">
                    <div class="fileLeft">
                        <div class="title">将文件拖到此处或 <span>点击上传</span></div>
                        <div class="text">支持png、jpg、svg、gif格式</div>
                    </div>
                    <div class="fileRight">
                        <img src="../../../assets/img/uplodeimg.png" alt="">
                    </div>
                </div>
            </el-upload> -->
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
                <div class="uplodeFile">
                    <div class="fileLeft">
                        <div class="title">将文件拖到此处或 <span>点击上传</span></div>
                        <div class="text">支持png、jpg、svg、gif格式</div>
                    </div>
                    <div class="fileRight">
                        <img src="../../../assets/img/uplodeimg.png" alt="">
                    </div>
                </div>
            </el-upload>

        <div class="upTitle">扩展信息</div>
        <el-input type="textarea" :rows="6" placeholder="此处可填写为什么修改，做了什么修改，以及开发的思路等更加详细的提交信息（相当于Git commit message的body）" v-model="textarea"></el-input>
        <div class="btnBox">
            <el-button type="primary">提交审核</el-button>
            <el-button type="primary" plain>取消</el-button>
        </div>
        <div class="btmText">点击提交审核后，你将创建一个轻量级PR（ <span>详情</span> ），作者审核通过后合入仓库</div>
    </div>
</template>

<script>
    import VueCropper  from 'vue-cropperjs';
    import axios from 'axios';
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
                isSign:true,
                defaultSrc: require('../../../assets/img/img.jpg'),
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
            }
        },
        created(){
            this.cropImg = this.defaultSrc;
        }
    }
</script>

<style lang="less" scoped>
    .uploadBox{
        padding: 20px;
        border-radius: 10px;
        background: #fff;
        .upTitle{
            font-weight: bold;
            font-size: 14px;
            margin: 20px 0;
            color: #032A55;
        }
        .uplodeFile{
            width: 100%;
            height: 130px;
            padding: 20px;
            border-radius: 10px;
            box-sizing: border-box;
            background: #4091ed17;
            display: flex;
            justify-content: center;
            align-items: center;
            .fileLeft{
                margin-right: 20px;
                .title{
                    font-weight: bold;
                    color: #032A55;
                    span{
                        color: #409eff;
                    }
                }
                .text{
                    color: #666;
                    font-size: 14px;
                    margin-top: 4px;
                }
            }
            .fileRight{
                width: 100px;
                height: 80px;
                text-align: center;
                border: 1px dashed #ccc;
                img{
                    width: 80px;
                    height: 70px;
                }
            }
        }
        .btnBox{
            margin-top: 20px;
        }
        .btmText{
            font-size: 14px;
            color: #B7B7C3;
            margin-top: 20px;
            span{
                color: #4092ED;
            }
        }
        ::v-deep{
            .el-upload-dragger{
                width: 100%;
                height: 130px;
                border: none;
            }
            .el-upload--text{
                width: 100%;
                height: 130px;
                border: none;
            }
        }
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
</style>