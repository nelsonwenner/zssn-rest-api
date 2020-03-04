import survivorRepository from '../../src/repositories/survivor.repository';
import flagRepository from '../../src/repositories/flag.repository';
import survivorBuilder from '../data-builders/mockes.survivor'
import mockesItens from '../utils/mockes.itens';
import truncate from '../utils/truncate';
import app from '../../src/app/app';
import request from 'supertest';
import { expect } from 'chai';


describe('Flagging', () => {
    
    const indexSurvivor = [];
    const indexItens = [];

    it('Create itens', async (done) => {
        
        const promisses = mockesItens.itens.map(async (data, index) => {

            const res = await request(app)
                .post('/itens/')
                .send({name: data});

            indexItens.push(res.body.item_id);
            expect(res.status).to.equal(201);
        });

        await Promise.all(promisses);

        done();
    });

    it('Create list from survivors', async (done) => {

        const quantity = [1, 2, 3, 4, 5, 6];

        const promisses = quantity.map(async (data, index) => {

            const res = await request(app)
                .post('/survivors/')
                .send(survivorBuilder.randomSurvivor(indexItens));
       
            indexSurvivor.push(res.body.survivor_id);
            expect(res.status).to.equal(201);
        });

        await Promise.all(promisses);

        done();
    });

    it('Infecting survivor', async (done) => {

        const target = indexSurvivor[indexSurvivor.length - 1];

        const promisses = indexSurvivor.map(async (sender, index) => {
            
            if (sender != target) {
                const res = await request(app)
                    .post(`/${sender}/flags/${target}/`);

                expect(res.status).to.equal(201);
            }
        });

        await Promise.all(promisses);

        const countFlags = await flagRepository.countFlags(target);
        const survivorTarget = await survivorRepository.get(target);
     
        expect(countFlags).to.equal(5);
        expect(survivorTarget.infected).to.equal(true);
        
        done();
    });

    it('Infected survivor, tries to flagging another survivor', async (done) => {

        const senderInfected = indexSurvivor[indexSurvivor.length - 1];
        const target = indexSurvivor[0];

        const res = await request(app)
            .post(`/${senderInfected}/flags/${target}/`);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');

        done();
    });

    it('Survivor trying to infect himself', async (done) => {

        const sender = indexSurvivor[1];
        const target = indexSurvivor[1];

        const res = await request(app)
            .post(`/${sender}/flags/${target}/`);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');

        done();
    });

    it('Survivor flagging twice the same survivor', async (done) => {

        const sender = indexSurvivor[2];
        const target = indexSurvivor[3];
   
        await request(app)
            .post(`/${sender}/flags/${target}/`);
   
        const res = await request(app)
            .post(`/${sender}/flags/${target}/`);
 
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');

        done();
    });
});