<template>
    <div class="container">
        <img class="my-image" style='text-align: center' src="../../../screenshots/MetaMaskPicture.png" alt=''>
        <div style=" display: flex;justify-content: center;align-items: center">
            <p>{{msg}}</p>
            <el-button type="info" @click="get">连接钱包</el-button>
            <el-button type="info" @click="getETH">获取账户信息</el-button>
            <el-button type="info" @click="getTransfer">ETH转帐</el-button>
            <el-button type="info" @click="getTokenBalance">代币余额</el-button>
            <el-button type="info" @click="getTokenTransfer">转账代币</el-button>
            <el-button type="info" @click="getAllowance">查询授权金额</el-button>
            <el-button type="info" @click="getApprove">授权</el-button>
        </div>
        <div class="plugins-tips" >{{fromAddress}}</div>

    </div>
</template>

<script>
import Web3 from 'web3'
import abi from '../../../src/api/ERC20.json'
import { blockQuoteDoubleEnter } from 'mavon-editor/src/lib/core/onecolumn-event';
// 根据地址获取获取代币金额

export default {
    name: 'Connect',
    props: {
        msg: String,
        fromAddress: {
            type: Array,
            //default: () => []
        }
    },
    data() {},
    mounted() {},
    methods: {
        getData() {
            console.log('first')
        },

        //按钮1：【连接钱包】，打开METAMASK，调用get函数
        get() {  // 唤起钱包
            if (window.ethereum) {
                window.ethereum.enable().then((res) => {
                    alert("当前钱包地址:" + res[0]);
                });
            } else {
                alert("请安装MetaMask钱包");
            }
        },

        //按钮2：【获取账户信息】,调用【返回链上指定地址的账户余额  getBalance】函数
        async getETH() {
            let web3 = new Web3(window.web3.currentProvider)
            console.log(web3)
            // console.log(web3.eth.getAccounts())
            this.fromAddress = await web3.eth.getAccounts()
            console.log(web3.eth.getBalance(fromAddress[0]))
            console.log(fromAddress)
            await web3.eth.getBalance(fromAddress[0], (err, res) => {  //返回链上指定地址的账户余额
                if (!err) {
                    alert("ETH余额==" + res / Math.pow(10, 18));
                    //console.log(res)
                    //this.balance =res / Math.pow(10, 18);////////////////////////
                }
            })
        },

        //按钮3：【ETH转账】，调用》》》》》》
        async getTransfer() {
            let web3 = new Web3(window.web3.currentProvider)
            let fromAddress = await web3.eth.getAccounts()
            let amount = 0.01 * Math.pow(10, 18);
            //let toAddress = "0x17D98A1c1D4814B03d71a08a07AF4C8CCABb7E2E";
            let toAddress = "0x666591AA2b39147936CCB38E56738317f3D53351";
            web3.eth.sendTransaction({
                gas: 21000, // 可选，默认值：待定，用于交易的gas总量，未用完的gas会退还
                gasPrice: 5000000000, //可选，该交易的gas价格，单位为wei，默认值为web3.eth.gasPrice属性值
                from: fromAddress[0], //交易发送方账户地址，不设置该字段的话，则使用web3.eth.defaultAccount属性值。可设置为一个地址或本地钱包web3.eth.accounts.wallet中的索引序号
                to: toAddress,  //可选，消息的目标地址，对于合约创建交易该字段为null
                value: amount //以 wei 为单位的交易转移的价值，如果是合同创建交易，也是捐赠
            }, (err, result) => {
                console.log("转账Hash=", result)
            })
        },
        //web3.eth.Contract类简化了与以太坊区块链上智能合约的交互。创建合约对象时,只需指定相应智能合约的json接口，web3就可以自动地将所有的调用转换为底层,基于RPC的ABI调用。
        //按钮4：【查询代币余额】
        async getTokenBalance() {
            if (window.web3) {
                console.log("查询代币余额  window.web3！！！！！！！！此输出用于检查T_T！！！")
                var web3 = web3 = new Web3(window.web3.currentProvider);
                let fromAddress = "0x394A64e586FC05bD28783351F14dfcc426EFD230";//查询用户地址
                let ethContract = new web3.eth.Contract(abi.abi, "0x3d2dd604866d0ec1ddd5e8ef27848a6fc0962018") //所有代币的abi可以通用（abi,合约地址）
                let balance = await ethContract.methods.balanceOf(fromAddress, ethContract).call()
                alert(balance)
            }
        },

        //按钮5：【直接转账充币地址】
        async getTokenTransfer() {
            if (window.web3) {
                let web3 = new Web3(window.web3.currentProvider)
                let ethContract = new web3.eth.Contract(abi.abi, "0x3d2dd604866d0ec1ddd5e8ef27848a6fc0962018") //所有代币的abi可以通用（abi,合约地址）
                //转账数量
                let amount = 100 * Math.pow(10, 18);//转账100个
                //小狐狸账户
                let fromAddress = await web3.eth.getAccounts()
                //接收地址
                let toAddress = "0xcaD75EADAf24F41d6274E129d7aE54764d7cd8E7";
                ethContract.methods.transfer(toAddress, amount + '').send({from: fromAddress[0]})
            }
        },

        //按钮6：【查询授权金额】
        async getAllowance() {
            if (window.web3) {
                let web3 = new Web3(window.web3.currentProvider)
                let fromAddress = "0x394A64e586FC05bD28783351F14dfcc426EFD230";//查询地址
                let ethContract = new web3.eth.Contract(abi.abi, "0x3d2dd604866d0ec1ddd5e8ef27848a6fc0962018") //所有代币的abi可以通用（abi,合约地址）
                let toAddress = "0xcaD75EADAf24F41d6274E129d7aE54764d7cd8E7";//被授权地址
                let balance = await ethContract.methods.allowance(fromAddress, toAddress).call()
                alert("授权金额" + balance / Math.pow(10, 18))
                /*
                let web3 = new Web3(window.web3.currentProvider)
                let abiContract = web3.eth.contract("代币合约Abi")
                let contractInstance = abiContract.at("代币合约地址")
                contractInstance.allowance("授权的用户钱包地址","授权的地址",(err, res) => {
                  if (!err) {
                    console.log("授权数量==",res.toNumber());
                  }
                })
                */
            }
        },
        //授权
        async getApprove() {
            if (window.web3) {
                let web3 = new Web3(window.web3.currentProvider)
                let ethContract = new web3.eth.Contract(abi.abi, "0x3d2dd604866d0ec1ddd5e8ef27848a6fc0962018") //所有代币的abi可以通用（abi,合约地址）
                //授权数量
                let amount = 100 * Math.pow(10, 18);//转账100个
                let toAddress = "0xcaD75EADAf24F41d6274E129d7aE54764d7cd8E7";//被授权地址
                //小狐狸账户
                let fromAddress = await web3.eth.getAccounts()
                ethContract.methods.approve(toAddress, amount + '').send({from: fromAddress[0]})
//用以太坊网络举例，由于ETH是原生资产，在向目标智能合约转账的时候，本身会携带ETH资产到目标合约中；而非原生资产ERC20代币在向目标合约转账时，
//只是更改ERC20代币合约本身的账本信息，目标合约不会收到任何通知，因此approve操作是告知ERC20代币合约，将来某授权账号可以划转我的资产。
// 授权（Approve），是允许第三方在不通知你的前提下，划转你的资产。
            }
        },
    }
}
</script>

<style>
.my-image {
    width: 400px; /* 设置图片宽度 */
    height: 300px; /* 设置图片高度 */
    margin-left: 300px; /* 设置图片水平偏移量 */
    margin-top: 30px; /* 设置图片垂直偏移量 */
}
</style>

