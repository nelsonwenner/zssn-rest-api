const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const survivalModel = require('../src/models/Survival');
const should = chai.should();

chai.use(chaiHttp);

describe('\n\nTesting ZSNN', () => {
    
    it('Create survival', (done) => {

        const payload = {
            "name": "nelson",
            "age": 27,
            "sex": "masculino",
            "inventory": {
                "water": 2,
                "food": 1,
                "medication": 2,
                "ammunition": 1
            },
            "lastLocation": {
                "latitude": 100.6546578,
                "longitude": -55.4213957
            }
        }
        
        chai.request('http://localhost:3000')
        .post('/api/v1/survivals/')
        .send(payload)
        .end((error, response) => {

            response.should.have.status(201);
            done();
        });
    });

    it('Update position', (done) => {

        const payload = {
            "survivalId": 1,
            "latitude": -222.2569874,
            "longitude": 111.5698745
        }

        chai.request('http://localhost:3000')
        .put('/api/v1/locations/')
        .send(payload)
        .end((error, response) => {

            response.should.have.status(200);
            done();
        });
    });
});


