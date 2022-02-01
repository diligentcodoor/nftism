import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { generateMerkleTree } from "../../lib/src/merkle";
import { AirdropType } from "../../lib/src/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  const merkleTree = generateMerkleTree(AirdropType.Huxlxy);

  console.log("Deploying...");
  const deployment = await deploy("HuxlxyNFT", {
    from: deployer,
    args: [merkleTree.getHexRoot()],
    log: true,
    gasPrice: ethers.utils.parseUnits("100", "gwei"),
    gasLimit: 2000000,
  });
  console.log("Deployment successful");

  const baseURI = "ipfs://QmbtGcu8Fu7uAaG3NdiCfEGEyD7V4HRPbWstyztpU8Yshx/";
  console.log(`Setting base uri to ${baseURI}`);
  const huxlxy = await ethers.getContractAt("HuxlxyNFT", deployment.address);
  const tx = await huxlxy.setBaseURI(baseURI, {
    gasPrice: ethers.utils.parseUnits("100", "gwei"),
  });
  await tx.wait();
};

export default func;
func.tags = ["HuxlxyNFT"];
