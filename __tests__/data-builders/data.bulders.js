import Survivor from '../../src/app/models/survivor';
import Location from '../../src/app/models/location';
import { factory } from 'factory-girl';
import random from 'random';
import faker from 'faker';


factory.define('Survivor', Survivor, {
    name: faker.name.findName(),
    age: random.int(18, 50),
    sex: random.int(0, 1) === 1 ? 'male' : 'female',
    inventory: [
        {item: 1, quantity: random.int(10, 20)},
        {item: 2, quantity: random.int(1, 20)},
        {item: 3, quantity: random.int(1, 20)},
        {item: 4, quantity: random.int(1, 20)}
    ],
    location: {
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude()
    }
});

factory.define('Location', Location, {
  latitude: faker.address.latitude,
  longitude: faker.address.longitude,
});

export default factory;