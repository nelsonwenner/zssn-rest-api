import data from '../data-builders/data.bulders';
import app from '../../src/app';
import request from 'supertest';
import { expect } from 'chai';

const prefix = '/trades/';


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
            .post(`/${sender.body.survivor_id}/trades/${target.body.survivor_id}/`);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error', 'SURVIVOR_IS_INFECTED');

        done();
    });

    it('It should not perform the exchange, Checking the values ​​of the informed inventory, find out if you really have these quantity of items / status: 400', async (done) => {
    
        const sender = await request(app).post('/survivors/').send(data.Survivor());
        const target = await request(app).post('/survivors/').send(data.Survivor());

        const res = await request(app)
            .post(`/${sender.body.survivor_id}/trades/${target.body.survivor_id}/`)
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

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error', 'INVENTORY_INVALID');
        
        done();
    });

});