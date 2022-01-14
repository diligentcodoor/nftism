import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { generateMerkleTree } from "../../lib/merkle";
import { AirdropType } from "../../lib/snapshot";

const NFTISM_ABI = [
  "function transfer(address recipient, uint256 amount) public returns (bool)",
];

const ONE_MILLION = 1_000_000;

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const [owner] = await ethers.getSigners();

  const nftism = new ethers.Contract(
    (await get("NFTism")).address,
    NFTISM_ABI,
    owner
  );

  const merkleTree = generateMerkleTree(AirdropType.NFTism);

  const deployment = await deploy("MerkleDistributor", {
    from: deployer,
    args: [nftism.address, merkleTree.getHexRoot()],
    log: true,
  });

  const tx = await nftism.transfer(
    deployment.address,
    ethers.utils.parseEther(ONE_MILLION.toString())
  );

  await tx.wait();
};

export default func;
func.tags = ["MerkleDistributor"];
