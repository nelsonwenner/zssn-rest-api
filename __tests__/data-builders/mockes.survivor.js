import inventoryRepository from '../../src/app/repositories/inventory.repository';
import survivorRepository from '../../src/app/repositories/survivor.repository';
import locationRepository from '../../src/app/repositories/location.repository';
import resourceRepository from '../../src/app/repositories/resource.repository';
import faker from 'faker';


const randomSurvivor = (options) => {

    return Object.assign({

        name: faker.name.findName(),
        age: faker.random.number(18, 65),
        sex: faker.random.number(1) == 0 ? 'masculino': 'femenino',
        inventory: [
            {item: options[0], quantity: 10},
            {item: options[1], quantity: faker.random.number(20)},
            {item: options[2], quantity: faker.random.number(20)},
            {item: options[3], quantity: faker.random.number(20)}
        ],
        location: {
            latitude: faker.address.latitude(),
            longitude: faker.address.longitude()
        }
    });
};

const createRandomSurvivor = async (options) => {

    const { survivor_id } = await survivorRepository.create({
        name: faker.name.findName(),
        age: faker.random.number(18, 65),
        sex: faker.random.number(1) == 0 ? 'masculino': 'femenino'
    });

    await locationRepository.create({
        survivor_id: survivor_id, 
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude()
    });

    const { inventory_id } = await inventoryRepository.create({survivor_id: survivor_id});

    const inventory = [
        {item: options[0], quantity: 31},
        {item: options[1], quantity: 24},
        {item: options[2], quantity: 14},
        {item: options[3], quantity: 9}
    ]

    await Promise.all(
        inventory.map(async (data, index) => {

            await resourceRepository.create({
            inventory_id: inventory_id, 
            item_id: data.item,
            quantity: data.quantity});
        })
    );

    return survivor_id;
}


export default { randomSurvivor, createRandomSurvivor };

