import { task, types } from 'hardhat/config';
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
    '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    types.string,
  )
  .addOptionalParam(
    'nounsSeeder',
    'The `NounsSeeder` contract address',
    '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    types.string,
  )
  .setAction(async ({ nftDescriptor, nounsDescriptor, nounsSeeder }, { ethers, network }) => {
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
    
    const seed = await seederContract.generateSeed(1, descriptorContract.address);

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
