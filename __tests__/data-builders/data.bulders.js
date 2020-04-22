import survivorRepository from '../../src/app/repositories/survivor.repository';
import locationRepository from '../../src/app/repositories/location.repository';
import random from 'random';
import faker from 'faker';


const Survivor = () => {

    return Object.assign({

        name: faker.name.findName(),
        age: faker.random.number(18, 50),
        sex: random.int(0, 1) === 1 ? 'male' : 'female',
        inventory: [
            {item: 1, quantity: random.int(10, 20)},
            {item: 2, quantity: random.int(1, 20)},
            {item: 3, quantity: random.int(1, 20)},
            {item: 4, quantity: random.int(1, 20)}
        ],
        location: {
            latitude: parseInt(faker.address.latitude(), 10),
            longitude: parseInt(faker.address.longitude(), 10) 
        }
    });
};

const Location = () => {

    return Object.assign({
        latitude: parseInt(faker.address.latitude(), 10),
        longitude: parseInt(faker.address.longitude(), 10) 
    });
}

const infectSurvivor = async (id) => {
    const survivor = await survivorRepository.get(id);
    survivor.infected = true;
    return await survivor.save();
} 

const createRandomSurvivor = async () => {

    const { survivor_id } = await survivorRepository.create({
        name: faker.name.findName(),
        age: faker.random.number(18, 65),
        sex: random.int(0, 1) === 1 ? 'male' : 'female',
    });
	
    await locationRepository.create({
        survivor_id: survivor_id, 
        latitude: parseInt(faker.address.latitude(), 10),
        longitude: parseInt(faker.address.longitude(), 10) 
    });
    
    return survivor_id;
}

export default { Survivor, Location, infectSurvivor, createRandomSurvivor };