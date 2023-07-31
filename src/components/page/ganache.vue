<template>
<div class='container' style='text-align: center'>
    <el-button  type="info" @click="sendTransaction">Send Transaction</el-button>
    <el-button  type="info" @click="getAccounts">Get Accounts</el-button>
    <div v-for="account in accounts" :key="account">{{ account }}</div>
</div>
</template>

<script>
import web3 from '../../../src/services/web3service.js';
import Web3 from 'web3';

export default {
    data () {
        return {
            accounts: [],
        }
    },
    props:{
    },
    methods: {
        async getAccounts () {     //获取所有用户
            this.accounts = await web3.eth.getAccounts()
        },
        async sendTransaction () {  //发送交易
            const [from, to] = await web3.eth.getAccounts()
            const transaction = {
                from,
                to,
                value: '0x1'
            }
            const result = await web3.eth.sendTransaction(transaction)
            console.log(result)
        },
    }
}
</script>

<style>
.container {
    padding-top: 20px;
    width: 80%; /* 设置容器的固定宽度 */
    height: auto;
    margin: 0 auto; /* 左右外边距自动设置为相等的值 */
}
</style>