import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { generateMerkleTree } from "../../lib/src/merkle";
import { AirdropType } from "../../lib/src/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  const merkleTree = generateMerkleTree(AirdropType.Huxlxy);

  await deploy("HuxlxyNFT", {
    from: deployer,
    args: [merkleTree.getHexRoot()],
    log: true,
  });
};

export default func;
func.tags = ["HuxlxyNFT"];
