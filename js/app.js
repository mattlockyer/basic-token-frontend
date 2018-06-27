

// Contract Live on Kovan
// https://kovan.etherscan.io/address/0x57d361995334fc7087c10014adba50ed3b9e5274

const qs = (sel) => document.querySelector(sel);
const val = (sel) => qs(sel).value;
const promisify = (inner) => new Promise((resolve, reject) =>
  inner((err, res) => {
    if (err) { reject(err) }
    resolve(res);
  })
);

//app global state
const store = {
  address: '0x57d361995334fc7087c10014adba50ed3b9e5274',
};

async function initWeb3() {
  //get the current web3 provider (MetaMask)
  let web3Provider;
  if (typeof web3 !== 'undefined') {
    web3Provider = web3.currentProvider;
  } else {
    web3Provider = new Web3.providers.HttpProvider(host);
  }
  web3 = new Web3(web3Provider);
  store.accounts = await promisify((cb) => window.web3.eth.getAccounts(cb));
  store.account = store.accounts[0];
}

async function initContract() {
  const abi = await fetch('../abi/abi.json').then((res) => res.json());
  const tokenContract = TruffleContract({ abi });
  tokenContract.setProvider(web3.currentProvider);
  store.contract = await tokenContract.at(store.address);
}

async function getBalance() {
  qs('#balance').innerHTML = store.balance = (await store.contract.balances.call(store.account)).toNumber();
}

function initListeners() {
  qs('#mint').onclick = () => store.contract.mint(val('#mint-to'), val('#mint-amount'));
  qs('#transfer').onclick = () => store.contract.mint(val('#transfer-to'), val('#transfer-amount'));
}

async function init() {
  await initWeb3();
  await initContract();
  getBalance();
  initListeners();
}

window.onload = init;