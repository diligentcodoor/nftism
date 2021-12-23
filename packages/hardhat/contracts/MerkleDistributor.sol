// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleDistributor {
    address public immutable token;
    bytes32 public immutable merkleRoot;
    mapping(address => bool) private claimed;

    event Claimed(address account, uint256 amount);

    constructor(address token_, bytes32 merkleRoot_) {
      token = token_;
      merkleRoot = merkleRoot_;
    }

    function isClaimed(address user) public view returns (bool) {
      return claimed[user];
    }

    function claim(
      address account,
      uint256 amount,
      bytes32[] calldata merkleProof
    ) public {
      require(!isClaimed(account), "MerkleDistributor: Drop already claimed.");
      bytes32 node = keccak256(abi.encodePacked(account, amount));

      require(
          MerkleProof.verify(merkleProof, merkleRoot, node),
          "MerkleDistributor: Invalid proof."
      );

      claimed[account] = true;
      require(IERC20(token).transfer(account, amount * 10**18), "MerkleDistributor: Transfer failed.");

      emit Claimed(account, amount);
    }
}