<template >
  <div>
    <div style='font-size: 24px;margin-top: 30px;margin-left: 1.25%;margin-right: 1.25%'>
      <div class="topNav">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }" style='font-size: 18px'>工作台</el-breadcrumb-item>
          <el-breadcrumb-item style='font-size: 15px;margin-top:1px'><a href="/">仓库</a></el-breadcrumb-item>
        </el-breadcrumb>
        <div>
          <el-button type="primary" @click="()=>{$router.push('./newdepot');}">新建仓库</el-button>
        </div>
      </div>
      <div style='background: rgba(255,255,255,0.8);border: 1px solid;border-image: linear-gradient(0deg, #FFFFFF, #FFFFFF) 1 1;
        box-shadow: 0 5px 20px 0 rgba(183,183,195,0.07);border-radius: 10px;margin-top: 26px'>
        <el-tabs v-model="activeName" @tab-click="handleClick" style='margin-top: 10px;margin-left: 18px' type="card">
          <el-tab-pane label="我拥有的" name="owner">
            <el-table :data="tableData_Own" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
              style="width: 100%;font-size:13px;margin-top: 10px">
              <el-table-column label="项目名称" prop="rName">
              </el-table-column>
              <el-table-column label="项目标签" prop="repo_label">
              </el-table-column>
              <el-table-column label="项目语言" prop="repo_language">
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" @click="viewDetail(scope.row.rId)">查看</el-button>
                  <el-button type="success" @click="mangerMember(scope.row.rId)">成员</el-button>
                </template>
              </el-table-column>

            </el-table>
          </el-tab-pane>
          <el-tab-pane label="我参与的" name="member">
            <el-table :data="tableData_Member" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
              style="width: 100%;font-size:13px;margin-top: 10px">
              <el-table-column label="项目名称" prop="rName">
              </el-table-column>
              <el-table-column label="项目标签" prop="repo_label">
              </el-table-column>
              <el-table-column label="项目语言" prop="repo_language">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                 <el-button type="primary" @click="viewDetail(scope.row.rId)">查看</el-button>
                 <el-button type="danger" @click="quitDepot(scope.row.rId)">退出</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { findMyDepot, findMemberDepot } from '../../../api/depot';
export default {
  data() {
    return {
      tableData_Own: [],
      tableData_Member: [],
      activeName: 'owner',      //owner我拥有的，member我参与的
      nowUser: ''
    }
  },
  mounted() {
    this.nowUser = localStorage.getItem('ms_username');
    this.selectDepots();
  },
  methods: {
    selectDepots() {
      findMyDepot({
        user_name: this.nowUser
      }).then((res) => {
        this.tableData_Own = res.data;
        this.total = res.count
      });
      findMemberDepot({
        member_name: this.nowUser
      }).then((res) => {
        this.tableData_Member = res.data;
        this.total = res.count
      });
    },
    viewDetail(rId) {
      this.$router.push({
        path: "./codedetails",
        query: { 
            rId: rId,
            activeName:this.activeName
        },
      });
    },
    mangerMember(rId) { //管理成员
      this.$router.push({
        path: "./manage",
        query: { rId: rId },
      });
    },
    quitDepot(rId){    //退出仓库，暂无实现
        var message = "删除后您将无法继续参与项目编辑，确认删除？";
        var title = "确认";
        this.$confirm(message, title, {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(() => {
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
        }).catch(() => {
            
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleView(url) {
      window.location.href = 'url';
      console.log(url);
    },
  }
}
</script>

<style>
.multiline span {
    white-space: pre-wrap; /* 或者可以使用 pre-wrap / normal*/
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
.el-tabs__item:hover {
    color: black;
    background-color: white;
}
.el-tabs__item.is-active {
    color: #559eef;
    background-color: #e9f1fd;
}
.topNav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
