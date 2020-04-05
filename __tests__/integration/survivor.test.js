import dbConnection from '../../src/database/connection.database';
import factory from '../data-builders/data.bulders';
import app from '../../src/app';
import request from 'supertest';
import { expect } from 'chai';

const prefix = '/survivors/';


describe(`${prefix}`, () => {

    afterAll(async () => {

        dbConnection.connection.close();
    });

    it('It should Create survivor with success / status: 201', async (done) => {

        const survivor = await factory.attrs('Survivor');
        
        const res = await request(app)
            .post(prefix)
            .send(survivor);
        
        expect(res.status).to.equal(201);

        done();
    });

});

