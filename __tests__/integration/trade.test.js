import data from '../data-builders/data.bulders';
import app from '../../src/app';
import request from 'supertest';
import { expect } from 'chai';

const prefix = '/trades/';

const indexSurvivors = [];

describe(`${prefix}`, () => {
    

    it('It should not perform the exchange, the survivor does not exist / status: 404', async (done) => {
       
        const target = 1000;
     
        const sender = await request(app).post('/survivors/').send(data.Survivor());
        
        const res = await request(app)
            .post(`/${sender.body.survivor_id}${prefix}${target}/`);
        
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error','SURVIVOR_DOES_NOT_EXIST');

        done();
    });

    it('It should not perform the exchange, trying to trade himself / status: 400', async (done) => {

        const sender = await request(app).post('/survivors/').send(data.Survivor());

        const res = await request(app)
            .post(`/${sender.body.survivor_id}${prefix}${sender.body.survivor_id}/`);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error', 'YOU CANNOT SELF FLEGGAR');

        done();
    });

    it('It should not perform the exchange, trying to trade Infected survivor, tries to trade another survivor / status: 400', async (done) => {
        
        const sender = await request(app).post('/survivors/').send(data.Survivor());
        const target = await request(app).post('/survivors/').send(data.Survivor());
     
        await data.infectSurvivor(target.body.survivor_id);
        
        const res = await request(app)
            .post(`/${sender.body.survivor_id}${prefix}${target.body.survivor_id}/`);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error', 'SURVIVOR_IS_INFECTED');

        done();
    });

    it('It should not perform the exchange, Checking the values ​​of the informed inventory, find out if you really have these quantity of items / status: 400', async (done) => {
    
        const sender = await request(app).post('/survivors/').send(data.Survivor());
        const target = await request(app).post('/survivors/').send(data.Survivor());
      
        const { status, body } = await request(app)
            .post(`/${sender.body.survivor_id}${prefix}${target.body.survivor_id}/`)
            .send({
                sender: [
                    {item: 1, quantity: 100},
                    {item: 2, quantity: 0},
                    {item: 3, quantity: 0},
                    {item: 4, quantity: 0}
                ],
                target: [
                    {item: 1, quantity: 1},
                    {item: 2, quantity: 0},
                    {item: 3, quantity: 0},
                    {item: 4, quantity: 0}
                ]
            });

        expect(status).to.equal(400);
        expect(body).to.have.property('error', 'INVENTORY_INVALID');
        
        done();
    });

    it('It should not perform the exchange, Checking the values ​​of the informed inventory, find out if you really have these quantity of items / status: 200', async (done) => {
    
        const sender = await request(app).post('/survivors/').send(data.Survivor());
        const target = await request(app).post('/survivors/').send(data.Survivor());
  
        const res = await request(app)
            .post(`/${sender.body.survivor_id}${prefix}${target.body.survivor_id}/`)
            .send({
                sender: [
                    {item: 1, quantity: 1},
                    {item: 2, quantity: 0},
                    {item: 3, quantity: 0},
                    {item: 4, quantity: 0}
                ],
                target: [
                    {item: 1, quantity: 1},
                    {item: 2, quantity: 0},
                    {item: 3, quantity: 0},
                    {item: 4, quantity: 0}
                ]
            });
        
        expect(res.status).to.equal(200);
        
        done();
    });

    it('It should not perform the exchange, survivors with incompatible item points / status: 400', async (done) => {
        
        const sender = await request(app).post('/survivors/').send(data.Survivor());
        const target = await request(app).post('/survivors/').send(data.Survivor());
  
        const res = await request(app)
            .post(`/${sender.body.survivor_id}${prefix}${target.body.survivor_id}/`)
            .send({
                sender: [
                    {item: 1, quantity: 2},
                    {item: 2, quantity: 0},
                    {item: 3, quantity: 0},
                    {item: 4, quantity: 0}
                ],
                target: [
                    {item: 1, quantity: 1},
                    {item: 2, quantity: 0},
                    {item: 3, quantity: 0},
                    {item: 4, quantity: 0}
                ]
            });
        
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error', 'NUMBER OF POINTS ARE INCOMPATIBLE');

        done();
    });

    it('It should perform the exchange, survivors exchanging items / test: {1/2} status: 200', async (done) => {
        
        const dataSender = data.Survivor();
        const dataTarget = data.Survivor();

        dataSender.inventory = [
            {item: 1, quantity: 31},
            {item: 2, quantity: 24},
            {item: 3, quantity: 14},
            {item: 4, quantity: 9}
        ]

        dataTarget.inventory = [
            {item: 1, quantity: 31},
            {item: 2, quantity: 24},
            {item: 3, quantity: 14},
            {item: 4, quantity: 9}
        ]

        const sender = await request(app).post('/survivors/').send(dataSender);
        const target = await request(app).post('/survivors/').send(dataTarget);
        
        const res = await request(app)
            .post(`/${sender.body.survivor_id}${prefix}${target.body.survivor_id}/`)
            .send({
                sender: [
                    {item: 1, quantity: 5},
                    {item: 2, quantity: 0},
                    {item: 3, quantity: 5},
                    {item: 4, quantity: 0}
                ],
                target: [
                    {item: 1, quantity: 0},
                    {item: 2, quantity: 6},
                    {item: 3, quantity: 0},
                    {item: 4, quantity: 6}
                ]
            });
        
        expect(res.status).to.equal(200);

        /* Sender */
        expect(res.body.sender[0].quantity).to.equal(26);
        expect(res.body.sender[2].quantity).to.equal(9);
        expect(res.body.sender[1].quantity).to.equal(30);
        expect(res.body.sender[3].quantity).to.equal(15);
        
        /* Target */
        expect(res.body.target[1].quantity).to.equal(18);
        expect(res.body.target[3].quantity).to.equal(3);
        expect(res.body.target[0].quantity).to.equal(36);
        expect(res.body.target[2].quantity).to.equal(19);

        indexSurvivors.push({sender: sender.body.survivor_id, target: target.body.survivor_id});

        done();
    });

    it('It should perform the exchange, survivors exchanging items / test: {2/2} status: 200', async (done) => {
        
        const res = await request(app)
            .post(`/${indexSurvivors[0].sender}${prefix}${indexSurvivors[0].target}/`)
            .send({
                sender: [
                    {item: 1, quantity: 0},
                    {item: 2, quantity: 0},
                    {item: 3, quantity: 4},
                    {item: 4, quantity: 0}
                ],
                target: [
                    {item: 1, quantity: 0},
                    {item: 2, quantity: 2},
                    {item: 3, quantity: 0},
                    {item: 4, quantity: 2}
                ]
            });
        
        expect(res.status).to.equal(200);
        
        /* Sender */
        expect(res.body.sender[2].quantity).to.equal(5);
        expect(res.body.sender[1].quantity).to.equal(32);
        expect(res.body.sender[3].quantity).to.equal(17);
        
        /* Target */
        expect(res.body.target[1].quantity).to.equal(16);
        expect(res.body.target[3].quantity).to.equal(1);
        expect(res.body.target[2].quantity).to.equal(23);

        done();
    });

});