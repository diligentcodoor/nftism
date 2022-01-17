// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { HuxlxyNFT } from "../HuxlxyNFT.sol";
import { DSTest } from "ds-test/test.sol"; // DSTest

interface Vm {
  function prank(address) external;
}

contract HuxlxyNFTTest is DSTest {
  Vm vm = Vm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);
  HuxlxyNFT private NFT;
  address private kenny = 0x2F075618681D45458aE20E17ca3CCf1C797d6E1a;
  address private huxlxy = 0x044a7f02FcC653Fc4acD8aD22ea6106100A0c1DD;
  address private j = 0x1489A38EA1B5b1547301a480f19Fa17a0A3db223;

  function setUp() public virtual {
    NFT = new HuxlxyNFT(0x15f223bf631799536040eaef274828cf864389a53c597029aa4d9f74d7c11a26);
  }

  function testNameAndSymbol() public {
    assertEq(NFT.name(), "Huxlxy");
    assertEq(NFT.symbol(), "HUXLXY");
  }

  function testGas() public {
    bytes32[] memory huxlxyProof = new bytes32[](1);
    huxlxyProof[0] = 0x32e5a10452dfafadf933a14f8faf830dcb46822b41229d01036e13670e871941;
    NFT.mint(huxlxy, 850, huxlxyProof);
  }

  function testMint() public {
    bytes32[] memory kennyProof = new bytes32[](1);
    kennyProof[0] = 0x00dd157c719a371abfae566c7f73f9421f9aa8d410bfab0b9660d7ee623f5d6a;
    bytes32[] memory huxlxyProof = new bytes32[](1);
    huxlxyProof[0] = 0x32e5a10452dfafadf933a14f8faf830dcb46822b41229d01036e13670e871941;

    uint256 kennyPreBalance = NFT.balanceOf(kenny);
    uint256 huxlxyPreBalance = NFT.balanceOf(huxlxy);
    NFT.mint(kenny, 150, kennyProof);
    NFT.mint(huxlxy, 850, huxlxyProof);
    uint256 kennyPostBalance = NFT.balanceOf(kenny);
    uint256 huxlxyPostBalance = NFT.balanceOf(huxlxy);

    assertEq(kennyPostBalance, kennyPreBalance + 150);
    assertEq(NFT.ownerOf(0), kenny);
    assertEq(NFT.ownerOf(75), kenny);
    assertEq(NFT.ownerOf(149), kenny);
    assertEq(huxlxyPostBalance, huxlxyPreBalance + 850);
    assertEq(NFT.ownerOf(150), huxlxy);
    assertEq(NFT.ownerOf(500), huxlxy);
    assertEq(NFT.ownerOf(999), huxlxy);
  }

  function testFailKennyClaimTwice() public {
    bytes32[] memory kennyProof = new bytes32[](1);
    kennyProof[0] = 0x00dd157c719a371abfae566c7f73f9421f9aa8d410bfab0b9660d7ee623f5d6a;
    NFT.mint(kenny, 150, kennyProof);
    NFT.mint(kenny, 150, kennyProof);
  }

  function testFailKennyClaimInvalidProof() public {
    bytes32[] memory kennyProof = new bytes32[](1);
    kennyProof[0] = 0x11dd157c719a371abfae566c7f73f9421f9aa8d410bfab0b9660d7ee623f5d6a;
    NFT.mint(kenny, 150, kennyProof);
  }

  function testFailKennyClaimInvalidAmount() public {
    bytes32[] memory kennyProof = new bytes32[](1);
    kennyProof[0] = 0x00dd157c719a371abfae566c7f73f9421f9aa8d410bfab0b9660d7ee623f5d6a;
    NFT.mint(kenny, 250, kennyProof);
  }

  function testFailJClaim() public {
    bytes32[] memory kennyProof = new bytes32[](1);
    kennyProof[0] = 0x00dd157c719a371abfae566c7f73f9421f9aa8d410bfab0b9660d7ee623f5d6a;

    NFT.mint(j, 150, kennyProof);
  }

  function testJClaimForKenny() public {
    bytes32[] memory kennyProof = new bytes32[](1);
    kennyProof[0] = 0x00dd157c719a371abfae566c7f73f9421f9aa8d410bfab0b9660d7ee623f5d6a;

    vm.prank(j);
    NFT.mint(kenny, 150, kennyProof);
  }
}