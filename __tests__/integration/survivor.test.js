import data from '../data-builders/data.bulders';
import app from '../../src/app';
import request from 'supertest';
import { expect } from 'chai';

const prefix = '/survivors/';


describe(`${prefix}`, () => {

    it('It should create survivor with success / status: 201', async (done) => {
        
        const survivor = data.Survivor();
        
        const res = await request(app)
            .post(prefix)
            .send(survivor);
        
        expect(res.status).to.equal(201);

        done();
    });
    
    it('It should cannot register survivor, without inventory / status: 400', async (done) => {

        const survivor = data.Survivor();

        survivor.inventory = "";

        const res = await request(app)
            .post(prefix)
            .send(survivor);

        expect(res.status).to.equal(400);
        
        done();
    });

    it('It should cannot register survivor, without location / status: 400', async (done) => {

        const survivor = data.Survivor();
        
        survivor.location = "";

        const res = await request(app)
            .post(prefix)
            .send(survivor);

        expect(res.status).to.equal(400);
        
        done();
    });

    it('It should cannot register survivor, with latitude of location bigger what 180 / status: 400', async (done) => {

        const survivor = data.Survivor();

        survivor.location = {latitude: 191.6546578, longitude: -55.4213957};

        const res = await request(app)
            .post(prefix)
            .send(survivor);

        expect(res.status).to.equal(400);
        
        done();
    });

    it('It should cannot register survivor, with latitude of location smaller what -180 / status: 400', async (done) => {

        const survivor = data.Survivor();

        survivor.location = {latitude: 100.6546578, longitude: -190.4213957};

        const res = await request(app)
            .post(prefix)
            .send(survivor);

        expect(res.status).to.equal(400);
        
        done();
    });

    it('It should cannot register survivor does item not exist / status: 404', async (done) => {

        const survivor = data.Survivor();

        survivor.inventory = [
            {item: 1, quantity: 4},
            {item: 2, quantity: 2},
            {item: 3, quantity: 1},
            {item: 10, quantity: 6}
        ];

        const res = await request(app)
            .post(prefix)
            .send(survivor);

        expect(res.status).to.equal(404);
        
        done();
    });
});

