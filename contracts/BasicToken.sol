
// Contract Live on Kovan
// https://kovan.etherscan.io/address/0x57d361995334fc7087c10014adba50ed3b9e5274

pragma solidity ^0.4.24;

contract BasicToken {
  event Transfer(address indexed _to, uint256 indexed _amount);
  
  mapping(address => uint256) public balances;
  uint256 public totalSupply = 0;
  address internal owner;
  
  constructor() {
    owner = msg.sender;
  }
  
  function mint(address _to, uint256 _amount) external {
    require(msg.sender == owner);
    balances[_to] += _amount;
    totalSupply += _amount;
    emit Transfer(_to, _amount);
  }
  
  function transfer(address _to, uint256 _amount) external {
    require(balances[msg.sender] >= _amount);
    balances[msg.sender] -= _amount;
    balances[_to] += _amount;
    emit Transfer(_to, _amount);
  }
  
}
