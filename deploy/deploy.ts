import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const deployedDebtRegister = await deploy("EncryptedDebtRegister", {
    from: deployer,
    log: true,
  });

  console.log(`EncryptedDebtRegister contract: `, deployedDebtRegister.address);
};
export default func;
func.id = "deploy_encryptedDebtRegister"; // id required to prevent reexecution
func.tags = ["EncryptedDebtRegister"];

