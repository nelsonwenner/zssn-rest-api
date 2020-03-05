import faker from 'faker';


const randomSurvivor = (options) => {

    return Object.assign({

        name: faker.name.findName(),
        age: faker.random.number(18, 65),
        sex: faker.random.number(1) == 0 ? 'masculino': 'femenino',
        inventory: [
            {item: options[0], quantity: faker.random.number(1, 20)},
            {item: options[1], quantity: faker.random.number(1, 20)},
            {item: options[2], quantity: faker.random.number(1, 20)},
            {item: options[3], quantity: faker.random.number(1, 20)}
        ],
        location: {
            latitude: faker.address.latitude(),
            longitude: faker.address.longitude()
        }
    });
};

export default { randomSurvivor };

