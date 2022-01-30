// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "erc721a/contracts/ERC721A.sol";
import "./LilOwnable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract HuxlxyNFT is ERC721A, LilOwnable {
  string private baseURI;

  bytes32 public immutable merkleRoot;
  uint256 private immutable airdropStart;
  mapping(address => bool) private claimed;
  address private owner;

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

  function setBaseURI(string calldata baseURI_) external {
    if (msg.sender != _owner) revert NotOwner();

    baseURI = baseURI_;
  }

  function sweep() external {
    if (msg.sender != _owner) revert NotOwner();

    require(block.timestamp > airdropStart + 30 days, "Airdrop period has not ended.");
    _safeMint(msg.sender, 10000 - totalSupply());
  }

  function _baseURI() internal view override returns (string memory) {
    return baseURI;
  }

  function supportsInterface(bytes4 interfaceId) public pure override(ERC721A, LilOwnable) returns (bool) {
    return
      interfaceId == type(IERC721).interfaceId ||
      interfaceId == type(IERC721Metadata).interfaceId ||
      interfaceId == type(IERC721Enumerable).interfaceId ||
      interfaceId == 0x7f5828d0 || // ERC165 Interface ID for ERC173
      super.supportsInterface(interfaceId);
  }
}