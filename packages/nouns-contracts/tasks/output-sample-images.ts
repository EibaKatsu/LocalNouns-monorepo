import { task, types } from 'hardhat/config';
import { BigNumber } from 'ethers';
// import ImageData from '../files/image-data-v2.json';
// import { dataToDescriptorInput } from './utils';

task('output-sample-images', 'Output sample images')
  .addOptionalParam(
    'nftDescriptor',
    'The `NFTDescriptorV2` contract address',
    '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    types.string,
  )
  .addOptionalParam(
    'nounsDescriptor',
    'The `NounsDescriptorV2` contract address',
    '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    types.string,
  )
  .addOptionalParam(
    'nounsSeeder',
    'The `NounsSeeder` contract address',
    '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
    types.string,
  )
  .addOptionalParam(
    'localNounsToken',
    'The `LocalNounsToken` contract address',
    '0x0165878A594ca255338adfa4d48449f69242Eb8F',
    types.string,
  )
  .setAction(async ({ nftDescriptor, nounsDescriptor, nounsSeeder, localNounsToken }, { ethers, network }) => {
    const options = { gasLimit: network.name === 'hardhat' ? 30000000 : undefined };

    const [deployer] = await ethers.getSigners();

    const descriptorFactory = await ethers.getContractFactory('NounsDescriptorV2', {
      libraries: {
        NFTDescriptorV2: nftDescriptor,
      },
    });
    const descriptorContract = descriptorFactory.attach(nounsDescriptor);

    // const seederFactory = await ethers.getContractFactory('NounsSeeder');
    // const seederContract = seederFactory.attach(nounsSeeder);

    const tokenFactory = await ethers.getContractFactory('LocalNounsToken');
    const tokenContract = tokenFactory.attach(localNounsToken);

    tokenContract.on('Transfer', (from, to, tokenId) => {
      console.log('Minted token ID:', tokenId.toString(), 'From:',from, "To:",to);
    });

    // const seed = await seederContract.generateSeed(1, descriptorContract.address);
    // const tx = await tokenContract.mint();
    // await tx.wait();
    console.log('ownerOf:', await tokenContract.ownerOf(BigNumber.from(1)) );
    console.log('tokenURI:', await tokenContract.tokenURI(BigNumber.from(1)) );
    // console.log('tokenURI:', await tokenContract.tokenURI(BigNumber.from(1),{gasLimit: 1_000_000}) );

    // console.log("test-minter:",await tokenContract.tokenURI(BigNumber.from(tokenId)));

    // console.log("test-svg:",await descriptorContract.generateSVGImage((1,5,77,6,14));
    // console.log("test-svg:",await descriptorContract.generateSVGImage(seed));

    console.log('Finish output sample imases.');
  });
