// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract HuxlxyNFT is ERC721A, Ownable {
  string private baseURI;

  bytes32 public immutable merkleRoot;
  uint256 private immutable airdropStart;
  mapping(address => bool) private claimed;

  constructor(bytes32 merkleRoot_) ERC721A("Huxlxy", "HUXLXY") {
    merkleRoot = merkleRoot_;
    airdropStart = block.timestamp;
  }

  function isClaimed(address user) public view returns (bool) {
    return claimed[user];
  }

  function mint(
    address account,
    uint256 amount,
    bytes32[] calldata merkleProof
  ) external {
    // Check merkle proof
    require(!isClaimed(account), "Airdrop already claimed.");
    require(totalSupply() < 10000, "Mint limit reached.");
    bytes32 node = keccak256(abi.encodePacked(account, amount));

    require(
      MerkleProof.verify(merkleProof, merkleRoot, node),
      "Invalid proof."
    );

    claimed[account] = true;

    _safeMint(account, amount);
  }

  function setBaseURI(string calldata _baseURI) external onlyOwner {
    baseURI = _baseURI;
  }

  function _baseURI() internal view override returns (string memory) {
    return baseURI;
  }

  function sweep() public onlyOwner {
    require(block.timestamp > airdropStart + 30 days, "Airdrop period has not ended.");
    _safeMint(msg.sender, 10000 - totalSupply());
  }
}