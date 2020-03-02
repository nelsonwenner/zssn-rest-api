import faker from 'faker';


const randomSurvivor = (options) => {

    return Object.assign({

        name: faker.name.findName(),
        age: faker.random.number(40),
        sex: "masculino",
        inventory: [
            {item: options[0], quantity: faker.random.number(20)},
            {item: options[1], quantity: faker.random.number(20)},
            {item: options[2], quantity: faker.random.number(20)},
            {item: options[3], quantity: faker.random.number(20)}
        ],
        location: {
            latitude: 100.6546578,
            longitude: -97.4213957
        }
    });
};

export default { randomSurvivor };

