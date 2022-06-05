// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.10;

import {DSTestPlus} from "solmate/test/utils/DSTestPlus.sol";
import {DSInvariantTest} from "solmate/test/utils/DSInvariantTest.sol";

import {MockERC721} from "./utils/mocks/MockERC721.sol";
import {ERC721AUser} from "./utils/users/ERC721AUser.sol";

import {ERC721TokenReceiver} from "solmate/tokens/ERC721.sol";

contract ERC721Recipient is ERC721TokenReceiver {
    address public operator;
    address public from;
    uint256 public id;
    bytes public data;

    function onERC721Received(
        address _operator,
        address _from,
        uint256 _id,
        bytes calldata _data
    ) public virtual override returns (bytes4) {
        operator = _operator;
        from = _from;
        id = _id;
        data = _data;

        return ERC721TokenReceiver.onERC721Received.selector;
    }
}

contract RevertingERC721Recipient is ERC721TokenReceiver {
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) public virtual override returns (bytes4) {
        revert(string(abi.encodePacked(ERC721TokenReceiver.onERC721Received.selector)));
    }
}

contract WrongReturnDataERC721Recipient is ERC721TokenReceiver {
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) public virtual override returns (bytes4) {
        return 0xCAFEBEEF;
    }
}

contract NonERC721Recipient {}

contract ERC721Test is DSTestPlus {
    MockERC721 token;

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) public returns (bytes4) {
        return ERC721TokenReceiver.onERC721Received.selector;
    }

    function setUp() public {
        token = new MockERC721("Token", "TKN", 20);
    }

    function invariantMetadata() public {
        assertEq(token.name(), "Token");
        assertEq(token.symbol(), "TKN");
    }

    function testMetadata() public {
        assertEq(token.name(), "Token");
        assertEq(token.symbol(), "TKN");
    }

    function testMint() public {
        token.mint(address(0xBEEF), 10);

        assertEq(token.balanceOf(address(0xBEEF)), 10);
        assertEq(token.ownerOf(5), address(0xBEEF));
    }

    function testApprove() public {
        token.mint(address(this), 10);

        token.approve(address(0xBEEF), 5);

        assertEq(token.getApproved(5), address(0xBEEF));
    }

    function testApproveAll() public {
        token.setApprovalForAll(address(0xBEEF), true);

        assertTrue(token.isApprovedForAll(address(this), address(0xBEEF)));
    }

    function testTransferFrom() public {
        ERC721AUser from = new ERC721AUser(token);

        token.mint(address(from), 10);

        from.approve(address(this), 5);

        token.transferFrom(address(from), address(0xBEEF), 5);

        assertEq(token.getApproved(5), address(0));
        assertEq(token.ownerOf(5), address(0xBEEF));
        assertEq(token.balanceOf(address(0xBEEF)), 1);
        assertEq(token.balanceOf(address(from)), 9);
    }

    function testTransferFromSelf() public {
        token.mint(address(this), 10);

        token.transferFrom(address(this), address(0xBEEF), 5);

        assertEq(token.getApproved(5), address(0));
        assertEq(token.ownerOf(5), address(0xBEEF));
        assertEq(token.balanceOf(address(0xBEEF)), 1);
        assertEq(token.balanceOf(address(this)), 9);
    }

    function testTransferFromApproveAll() public {
        ERC721AUser from = new ERC721AUser(token);

        token.mint(address(from), 10);

        from.setApprovalForAll(address(this), true);

        token.transferFrom(address(from), address(0xBEEF), 5);

        assertEq(token.getApproved(5), address(0));
        assertEq(token.ownerOf(5), address(0xBEEF));
        assertEq(token.balanceOf(address(0xBEEF)), 1);
        assertEq(token.balanceOf(address(from)), 9);
    }

    function testSafeTransferFromToEOA() public {
        ERC721AUser from = new ERC721AUser(token);

        token.mint(address(from), 10);

        from.setApprovalForAll(address(this), true);

        token.safeTransferFrom(address(from), address(0xBEEF), 9);

        assertEq(token.getApproved(9), address(0));
        assertEq(token.ownerOf(9), address(0xBEEF));
        assertEq(token.balanceOf(address(0xBEEF)), 1);
        assertEq(token.balanceOf(address(from)), 9);
    }

    function testSafeTransferFromToERC721Recipient() public {
        ERC721AUser from = new ERC721AUser(token);
        ERC721Recipient recipient = new ERC721Recipient();

        token.mint(address(from), 10);

        from.setApprovalForAll(address(this), true);

        token.safeTransferFrom(address(from), address(recipient), 5);

        assertEq(token.getApproved(5), address(0));
        assertEq(token.ownerOf(5), address(recipient));
        assertEq(token.balanceOf(address(recipient)), 1);
        assertEq(token.balanceOf(address(from)), 9);

        assertEq(recipient.operator(), address(this));
        assertEq(recipient.from(), address(from));
        assertEq(recipient.id(), 5);
        assertBytesEq(recipient.data(), "");
    }

    function testSafeTransferFromToERC721RecipientWithData() public {
        ERC721AUser from = new ERC721AUser(token);
        ERC721Recipient recipient = new ERC721Recipient();

        token.mint(address(from), 20);

        from.setApprovalForAll(address(this), true);

        token.safeTransferFrom(address(from), address(recipient), 13, "testing 123");

        assertEq(token.getApproved(13), address(0));
        assertEq(token.ownerOf(13), address(recipient));
        assertEq(token.balanceOf(address(recipient)), 1);
        assertEq(token.balanceOf(address(from)), 19);

        assertEq(recipient.operator(), address(this));
        assertEq(recipient.from(), address(from));
        assertEq(recipient.id(), 13);
        assertBytesEq(recipient.data(), "testing 123");
    }

    function testSafeMintToEOA() public {
        token.safeMint(address(0xBEEF), 10);

        assertEq(token.ownerOf(9), address(address(0xBEEF)));
        assertEq(token.balanceOf(address(address(0xBEEF))), 10);
    }

    function testSafeMintToERC721Recipient() public {
        ERC721Recipient to = new ERC721Recipient();

        token.safeMint(address(to), 10);

        assertEq(token.ownerOf(9), address(to));
        assertEq(token.balanceOf(address(to)), 10);

        assertEq(to.operator(), address(this));
        assertEq(to.from(), address(0));
        assertEq(to.id(), 9);
        assertBytesEq(to.data(), "");
    }

    function testSafeMintToERC721RecipientWithData() public {
        ERC721Recipient to = new ERC721Recipient();

        token.safeMint(address(to), 10, "testing 123");

        assertEq(token.ownerOf(7), address(to));
        assertEq(token.balanceOf(address(to)), 10);

        assertEq(to.operator(), address(this));
        assertEq(to.from(), address(0));
        assertEq(to.id(), 9);
        assertBytesEq(to.data(), "testing 123");
    }

    function testFailMintToZero() public {
        token.mint(address(0), 10);
    }

    function testFailOverMint() public {
        token.mint(address(0xBEEF), 21);
        token.mint(address(0xBEEF), 21);
    }

    function testFailApproveUnMinted() public {
        token.approve(address(0xBEEF), 5);
    }

    function testFailApproveUnAuthorized() public {
        token.mint(address(0xCAFE), 10);

        token.approve(address(0xBEEF), 5);
    }

    function testFailTransferFromUnOwned() public {
        token.transferFrom(address(0xFEED), address(0xBEEF), 1337);
    }

    function testFailTransferFromWrongFrom() public {
        token.mint(address(0xCAFE), 10);

        token.transferFrom(address(0xFEED), address(0xBEEF), 5);
    }

    function testFailTransferFromToZero() public {
        token.mint(address(this), 10);

        token.transferFrom(address(this), address(0), 1337);
    }

    function testFailTransferFromNotOwner() public {
        token.mint(address(0xFEED), 1337);

        token.transferFrom(address(0xFEED), address(0xBEEF), 1337);
    }

    function testFailSafeTransferFromToNonERC721Recipient() public {
        token.mint(address(this), 10);

        token.safeTransferFrom(address(this), address(new NonERC721Recipient()), 1337);
    }

    function testFailSafeTransferFromToNonERC721RecipientWithData() public {
        token.mint(address(this), 10);

        token.safeTransferFrom(address(this), address(new NonERC721Recipient()), 1337, "testing 123");
    }

    function testFailSafeTransferFromToRevertingERC721Recipient() public {
        token.mint(address(this), 10);

        token.safeTransferFrom(address(this), address(new RevertingERC721Recipient()), 1337);
    }

    function testFailSafeTransferFromToRevertingERC721RecipientWithData() public {
        token.mint(address(this), 10);

        token.safeTransferFrom(address(this), address(new RevertingERC721Recipient()), 1337, "testing 123");
    }

    function testFailSafeTransferFromToERC721RecipientWithWrongReturnData() public {
        token.mint(address(this), 10);

        token.safeTransferFrom(address(this), address(new WrongReturnDataERC721Recipient()), 1337);
    }

    function testFailSafeTransferFromToERC721RecipientWithWrongReturnDataWithData() public {
        token.mint(address(this), 10);

        token.safeTransferFrom(address(this), address(new WrongReturnDataERC721Recipient()), 1337, "testing 123");
    }

    function testFailSafeMintToNonERC721Recipient() public {
        token.safeMint(address(new NonERC721Recipient()), 10);
    }

    function testFailSafeMintToNonERC721RecipientWithData() public {
        token.safeMint(address(new NonERC721Recipient()), 10, "testing 123");
    }

    function testFailSafeMintToRevertingERC721Recipient() public {
        token.safeMint(address(new RevertingERC721Recipient()), 10);
    }

    function testFailSafeMintToRevertingERC721RecipientWithData() public {
        token.safeMint(address(new RevertingERC721Recipient()), 10, "testing 123");
    }

    function testFailSafeMintToERC721RecipientWithWrongReturnData() public {
        token.safeMint(address(new WrongReturnDataERC721Recipient()), 10);
    }

    function testFailSafeMintToERC721RecipientWithWrongReturnDataWithData() public {
        token.safeMint(address(new WrongReturnDataERC721Recipient()), 10, "testing 123");
    }

    function testMetadata(string memory name, string memory symbol) public {
        MockERC721 tkn = new MockERC721(name, symbol, 20);

        assertEq(tkn.name(), name);
        assertEq(tkn.symbol(), symbol);
    }
}