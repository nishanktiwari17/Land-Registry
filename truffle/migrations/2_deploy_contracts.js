const landRecords = artifacts.require('landRecords'); // present in build folder (remove ".json")

module.exports = async function (deployer, network, accounts) {
	// deployment steps
	const deployer_address = '0x5E8b6aE26693A190776f6792AB72d2952c317f44';
	await deployer.deploy(landRecords, { from: deployer_address });
};
