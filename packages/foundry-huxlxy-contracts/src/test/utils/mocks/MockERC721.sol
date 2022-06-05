// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.0;

import {ERC721A} from "../../../ERC721A.sol";
import {ERC721TokenReceiver} from "solmate/tokens/ERC721.sol";

contract MockERC721 is ERC721A {
    constructor(string memory _name, string memory _symbol, uint256 _maxBatchSize) ERC721A(_name, _symbol, _maxBatchSize) {}

    function tokenURI(uint256) public pure virtual override returns (string memory) {}

    function mint(address to, uint256 quantity) public virtual {
        _safeMint(to, quantity);
    }

    function safeMint(address to, uint256 quantity) public virtual {
        _safeMint(to, quantity);
    }

    function safeMint(
        address to,
        uint256 quantity,
        bytes memory data
    ) public virtual {
        _safeMint(to, quantity, data);
    }

    
}