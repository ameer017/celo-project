const { ethers } = require("hardhat");
const hre = require("hardhat");

require("dotenv").config();


async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy(1000000);
  await token.deployed();
  console.log(token);

  const NetCelo = await hre.ethers.getContractFactory("NetCelo");
  const netCelo = await NetCelo.deploy(process.env.TokenAdd);
  console.log("NetCelo deployed to:", netCelo.target);
  console.log(netCelo)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
