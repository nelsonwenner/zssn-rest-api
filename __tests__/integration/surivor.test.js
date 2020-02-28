import truncate from '../utils/truncate';
import mockes from '../utils/mockes';
import app from '../../src/app/app';
import request from 'supertest';
import { expect } from 'chai';


describe('Survivors', () => {

    beforeAll(async () => {
        await truncate();
    });
    
    it('Create itens', async (done) => {

        const promisses = [];

        mockes.itens.forEach(async data => {

            const res = await request(app)
                .post('/itens/')
                .send({name: data});
                expect(res.status).to.equal(201);
                
                promisses.push(res);
        });

        await Promise.all(promisses);

        done();
    });

    it('Create survivor', async (done) => {

        const res = await request(app)
            .post('/survivors/')
            .send(mockes.survivor);
        expect(res.status).to.equal(201);
        
        done();
    });

});

