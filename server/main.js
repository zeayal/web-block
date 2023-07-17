const { ethers } = require('ethers');

// Uniswap v2 factory contract address on Ethereum mainnet
const factoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';

// Create an ethers provider instance
const provider = ethers.getDefaultProvider('mainnet');

// Create an ethers contract instance for the Uniswap v2 factory contract
const factoryContract = new ethers.Contract(factoryAddress, [
  'event PairCreated(address indexed token0, address indexed token1, address pair, uint)',
  'function allPairs(uint) external view returns (address)'
], provider);

// Listen for PairCreated events on the factory contract
factoryContract.on('PairCreated', async (token0, token1, pairAddress) => {
  // Create an ethers contract instance for the pair contract
  const pairContract = new ethers.Contract(pairAddress, [
    'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)'
  ], provider);

  // Get the reserves for the pair
  const { reserve0, reserve1 } = await pairContract.getReserves();

  // Do something with the reserves, such as adding them to a database or sending a notification
  console.log(`Pair ${pairAddress} has reserves of ${reserve0} and ${reserve1}`);
});