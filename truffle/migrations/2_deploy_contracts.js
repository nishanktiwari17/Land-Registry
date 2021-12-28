const landRecords = artifacts.require('landRecords'); // present in build folder (remove ".json")

module.exports = async function (deployer, network, accounts) {
	// deployment steps
	const deployer_address = '0xE2A6333078302A7C19E2E22F91e48d416Ad27D6a';
	await deployer.deploy(landRecords, { from: deployer_address });
};
