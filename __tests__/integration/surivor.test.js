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
        
        const promisses = mockes.itens.map(async (data, index) => {

            const res = await request(app)
                .post('/itens/')
                .send({name: data});

            expect(res.status).to.equal(201);
    
        });

        await Promise.all(promisses);

        done();
    });

    it('Data Validator from survivor, without inventory', async (done) => {

        const res = await request(app)
            .post('/survivors/')
            .send(mockes.validator01);

        expect(res.status).to.equal(400);
        
        done();
    });

    it('Data Validator from survivor, without location', async (done) => {

        const res = await request(app)
            .post('/survivors/')
            .send(mockes.validator02);

        expect(res.status).to.equal(400);
        
        done();
    });

    it('Data Validator from survivor, with latitude of location bigger what 180', async (done) => {

        const res = await request(app)
            .post('/survivors/')
            .send(mockes.validator03);

        expect(res.status).to.equal(400);
        
        done();
    });

    it('Data Validator from survivor, with latitude of location smaller what -180', async (done) => {

        const res = await request(app)
            .post('/survivors/')
            .send(mockes.validator04);

        expect(res.status).to.equal(400);
        
        done();
    });
    
    it('Item does not exists', async (done) => {

        const res = await request(app)
            .post('/survivors/')
            .send(mockes.itemNotExists);

        expect(res.status).to.equal(400);
        
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

