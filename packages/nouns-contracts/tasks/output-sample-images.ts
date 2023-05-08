import { task, types } from 'hardhat/config';
// import ImageData from '../files/image-data-v2.json';
// import { dataToDescriptorInput } from './utils';

task('output-sample-images', 'Output sample images')
  .addOptionalParam(
    'nftDescriptor',
    'The `NFTDescriptorV2` contract address',
    '0x46b142DD1E924FAb83eCc3c08e4D46E82f005e0E',
    types.string,
  )
  .addOptionalParam(
    'nounsDescriptor',
    'The `NounsDescriptorV2` contract address',
    '0x1c85638e118b37167e9298c2268758e058DdfDA0',
    types.string,
  )
  .addOptionalParam(
    'nounsSeeder',
    'The `NounsSeeder` contract address',
    '0x7A9Ec1d04904907De0ED7b6839CcdD59c3716AC9',
    types.string,
  )
  .addOptionalParam(
    'localNounsToken',
    'The `LocalNounsToken` contract address',
    '0x49fd2BE640DB2910c2fAb69bB8531Ab6E76127ff',
    types.string,
  )
  .setAction(async ({ nftDescriptor, nounsDescriptor, nounsSeeder,localNounsToken }, { ethers, network }) => {
    const options = { gasLimit: network.name === 'hardhat' ? 30000000 : undefined };

    const [deployer] = await ethers.getSigners();

    const descriptorFactory = await ethers.getContractFactory('NounsDescriptorV2', {
      libraries: {
        NFTDescriptorV2: nftDescriptor,
      },
    });
    const descriptorContract = descriptorFactory.attach(nounsDescriptor);
    
    const seederFactory = await ethers.getContractFactory('NounsSeeder');
    const seederContract = seederFactory.attach(nounsSeeder);
    
    const tokenFactory = await ethers.getContractFactory('LocalNounsToken');
    const tokenContract = tokenFactory.attach(localNounsToken);

    const seed = await seederContract.generateSeed(1, descriptorContract.address);

    console.log("test-tokenName:",await tokenContract.name());
    console.log("test-seed:",seed);

    // console.log("test-svg:",await descriptorContract.generateSVGImage((1,5,77,6,14));
    console.log("test-svg:",await descriptorContract.generateSVGImage(seed));


    // const { bgcolors, palette, images } = ImageData;
    // const { bodies, accessories, heads, glasses } = images;

    // const bodiesPage = dataToDescriptorInput(bodies.map(({ data }) => data));
    // const headsPage = dataToDescriptorInput(heads.map(({ data }) => data));
    // const glassesPage = dataToDescriptorInput(glasses.map(({ data }) => data));
    // const accessoriesPage = dataToDescriptorInput(accessories.map(({ data }) => data));

    // await descriptorContract.addManyBackgrounds(bgcolors);
    // await descriptorContract.setPalette(0, `0x000000${palette.join('')}`);

    // await descriptorContract.addBodies(
    //   bodiesPage.encodedCompressed,
    //   bodiesPage.originalLength,
    //   bodiesPage.itemCount,
    //   options,
    // );
    // await descriptorContract.addHeads(
    //   headsPage.encodedCompressed,
    //   headsPage.originalLength,
    //   headsPage.itemCount,
    //   options,
    // );
    // await descriptorContract.addGlasses(
    //   glassesPage.encodedCompressed,
    //   glassesPage.originalLength,
    //   glassesPage.itemCount,
    //   options,
    // );
    // await descriptorContract.addAccessories(
    //   accessoriesPage.encodedCompressed,
    //   accessoriesPage.originalLength,
    //   accessoriesPage.itemCount,
    //   options,
    // );

    console.log('Finish output sample imases.');
  });
