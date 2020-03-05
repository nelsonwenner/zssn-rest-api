import survivorRepository from '../../src/repositories/survivor.repository';
import survivorBuilder from '../data-builders/mockes.survivor'
import mockesItens from '../utils/mockes.itens';
import truncate from '../utils/truncate';
import app from '../../src/app/app';
import request from 'supertest';
import { expect } from 'chai';


describe('Trade', () => {

    afterAll(async () => {
        await truncate();
    });

    const indexSurvivor = [];
    const indexItens = [];

    it('Trade config', async (done) => {

        const quantity = [1, 2, 3, 4];

        const promisses1 = mockesItens.itens.map(async (data, index) => {
            const res = await request(app)
                .post('/itens/')
                .send({name: data});
            indexItens.push(res.body.item_id);
            expect(res.status).to.equal(201);
        });
        await Promise.all(promisses1);

        const promisses2 = quantity.map(async (data, index) => {
            const res = await request(app)
                .post('/survivors/')
                .send(survivorBuilder.randomSurvivor(indexItens));
            indexSurvivor.push(res.body.survivor_id);
            expect(res.status).to.equal(201);
        });
        await Promise.all(promisses2);

        done();
    });

    it('Suvivor does not exists on trade', async (done) => {

        const sender = 1000;
        const target = indexSurvivor[4];

        const res = await request(app)
            .post(`/${sender}/trades/${target}/`);
        
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error','SURVIVOR_DOES_NOT_EXIST');

        done();
    });

    it('Survivor trying to trade himself', async (done) => {

        const sender = indexSurvivor[0];
        const target = indexSurvivor[0];

        const res = await request(app)
            .post(`/${sender}/trades/${target}/`);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error', 'YOU CANNOT SELF FLEGGAR');

        done();
    });

    it('Infected survivor, tries to trade another survivor', async (done) => {
    
        const indexInfected = indexSurvivor[2];
        const target = indexSurvivor[3];
        
        const survivorInfected = await survivorRepository.get(indexInfected);
        survivorInfected.infected = true;

        await survivorInfected.save();

        const res = await request(app)
            .post(`/${indexInfected}/trades/${target}/`);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error', 'SURVIVOR_IS_INFECTED');

        done();
    });


});
