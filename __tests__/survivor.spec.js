
process.env.NODE_ENV = 'tests';

const { connect } = require('../src/service/sqlite3.service');
const request  = require('supertest');
const { expect } = require('chai');

describe('Testing ZSSN', () => {

    clearDataBase = (models) => {
        Promise.resolve(
            Object.keys(models).forEach(element => {
                models[element].destroy({where: {}, force: true});
            })
        );
    }

    before(async () => {
        const { models } = connect;
        clearDataBase(models)
    });
    after(async () => {
        const { models } = connect;
        clearDataBase(models)
    });

    describe('POST / ', () => {
        it('Create survivors', async () => {

            const payload = {
                "name": "nelson",
                "age": 27,
                "sex": "masculino",
                "inventory": {
                    "water": 2,
                    "food": 4,
                    "medication": 2,
                    "ammunition": 1
                },
                "location": {
                    "latitude": 100.6546578,
                    "longitude": -55.4213957
                }
            }

            const response = await request('http://localhost:3000')
                .post('/api/v1/survivors/')
                .send(payload);
          
            expect(response.status).to.equal(201);

        });
    });
    
    describe('GET /', () => {
        it('List survivors', async () => {

            const response = await request('http://localhost:3000')
                .get('/api/v1/survivors/');
            
            expect(response.status).to.equal(200);

        });
    });
});


