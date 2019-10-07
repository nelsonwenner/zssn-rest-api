const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const survivalModel = require('../src/models/Survival');
const should = chai.should();


chai.use(chaiHttp);

describe('\n\nTesting ZSNN', () => {
    
    const remove = async (id) => {
        return await survivalModel.destroy({where: {survivalId: id}, force: true})
    }
    
    it('Create survival', (done) => {
      
        const payload = {
            "name": "felipe",
            "age": 19,
            "sex": "masculino",
            "inventory": {
                "water": 6,
                "medication": 8,
                "food": 6
            },
            "lastLocation": {
                "latitude": 666.78888958,
                "longitude": -111.18975632
            }
        }
        /*
        chai.request('http://localhost:3000')
        .post('/api/v1/survivals/')
        .send(payload)
        .end((error, response) => {

            remove(response.body.survivalModel.survivalId);
            response.should.have.status(201);
            done();
           
        });
        */

       remove(1);
        
    });
    

});


