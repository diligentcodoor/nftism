// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./ERC721A.sol";

error DoesNotExist();

contract HuxlxyNFT is ERC721A {
  string public baseURI;

  constructor() ERC721A("Huxlxy", "HUXLXY", 1050) {}

  function mint(uint16 amount) external {
    _safeMint(msg.sender, amount);
  }

  function _baseURI() internal view virtual returns (string memory) {
    // TODO: Change
    return "";
  }
}