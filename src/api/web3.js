const ethereumButton = document.querySelector('.Web3Button');
const showAccount = document.querySelector('.showAccount');
const showBalance = document.querySelector('.showBalance');
const cont = document.querySelector('.cont');
const toAccount = document.querySelector('.account');
const toBalance = document.querySelector('.balance');
const btnPay = document.querySelector('.btnPay');

// 我的账户余额，对方账户余额
let AccountValue, BalanceValue, toAccountValue, toBalanceValue;

// 页面显示转账内容
function showCont() {
    // 我的账户余额，对方账户余额
    // AccountValue,BalanceValue,toAccountValue,toBalanceValue
    cont.innerHTML = `我的账户:${AccountValue}-->对方账户:${toAccountValue},余额:${BalanceValue},转账金额:${web3.utils.fromWei(toBalanceValue, 'ether')}`;
}
// 获取内容
toAccount.onblur = () => {
    toAccountValue = toAccount.value;
    console.log(toAccount.value);
}
toBalance.onblur = () => {
    if (toBalance.value) {
        // eth转wei 转账 web3.utils.toWei('1', 'ether')
        toBalanceValue = web3.utils.toWei(toBalance.value, 'ether');
        showCont();
    }
    console.log(toBalance.value, toBalanceValue);
}

// Web3浏览器检测
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
}

// 实例化
window.web3 = new Web3(window.web3.currentProvider);
var web3 = window.web3;

// 检测MetaMask
/*
if (web3.currentProvider.isMetaMask == true) {
  console.log('metamask 可用');
} else {
  console.log('metamask 不可用');
}*/
if (window.ethereum) {
    window.ethereum.enable().then((res) => {
        alert("当前钱包地址:" + res[0]);
    });
} else {
    alert("请安装MetaMask钱包");
}

// 获取账户信息
ethereumButton.addEventListener('click', () => {
    getAccount();
});

async function getAccount() {
    // 请求用户授权 解决web3js无法直接唤起Meta Mask获取用户身份
    const enable = await window.ethereum.enable();
    console.log(enable,11)

    // 授权获取账户
    // let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    let accounts = await web3.eth.getAccounts();
    AccountValue = accounts[0];
    console.log(AccountValue,1);

    // 返回指定地址账户的余额
    let balance = await web3.eth.getBalance(AccountValue);
    BalanceValue = web3.utils.fromWei(balance, 'ether');
    console.log(balance,BalanceValue,2);
    showAccount.innerHTML = AccountValue;
    showBalance.innerHTML = `wei:${balance}, ether:${BalanceValue}`;

    console.log(AccountValue, balance, BalanceValue);
}

// 转账
btnPay.addEventListener('click', () => {
    toPay();
});

async function toPay() {
    showCont();
    // 转账
    var r = confirm("确认转账吗？");
    if (r===true) {
        // const res = await web3.eth.sendTransaction({
        //     from:AccountValue,
        //     to:toAccountValue,
        //     value:toBalanceValue,
        // });
        // console.log(res);
        web3.eth.sendTransaction({
            from: AccountValue,
            to: toAccountValue,
            value: toBalanceValue,
        }, (err, address) => {
            if (!err) {
                console.log(address);
                alert("转账成功！");
            } else {
                console.log(err);
            }
        });
    }
    else {
        alert("您已经取消转账！");
    }
}
