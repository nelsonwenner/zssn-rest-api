import survivorRepository from '../../src/app/repositories/survivor.repository';
import flagRepository from '../../src/app/repositories/flag.repository';
import itemRepository from '../../src/app/repositories/item.repository';
import survivorBuilder from '../data-builders/mockes.survivor';
import app from '../../src/app';
import request from 'supertest';
import { expect } from 'chai';


describe('Flagging', () => {
    
    const indexSurvivor = [];
    const indexItens = [];

    it('Flag config', async (done) => {

        const item1 = await itemRepository.create({name: 'Fiji Water'});
        const item2 = await itemRepository.create({name: 'Campbell Soup'});
        const item3 = await itemRepository.create({name: 'First Aid Pouch'});
        const item4 = await itemRepository.create({name: 'AK47'});

        indexItens.push(item1.item_id);
        indexItens.push(item2.item_id);
        indexItens.push(item3.item_id);
        indexItens.push(item4.item_id);
        
        const survivor1 = await survivorBuilder.createRandomSurvivor(indexItens);
        const survivor2 = await survivorBuilder.createRandomSurvivor(indexItens);
        const survivor3 = await survivorBuilder.createRandomSurvivor(indexItens);
        const survivor4 = await survivorBuilder.createRandomSurvivor(indexItens);
        const survivor5 = await survivorBuilder.createRandomSurvivor(indexItens);
        const survivor6 = await survivorBuilder.createRandomSurvivor(indexItens);
        
        indexSurvivor.push(survivor1);
        indexSurvivor.push(survivor2);
        indexSurvivor.push(survivor3);
        indexSurvivor.push(survivor4);
        indexSurvivor.push(survivor5);
        indexSurvivor.push(survivor6);

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
        expect(res.body).to.have.property('error', 'SURVIVOR_IS_INFECTED');

        done();
    });

    it('Survivor trying to infect himself', async (done) => {

        const sender = indexSurvivor[1];
        const target = indexSurvivor[1];

        const res = await request(app)
            .post(`/${sender}/flags/${target}/`);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error', 'YOU CANNOT SELF FLEGGAR');

        done();
    });

    it('Survivor flagging twice the same survivor', async (done) => {

        const sender = indexSurvivor[3];
        const target = indexSurvivor[4];
        
        await request(app)
            .post(`/${sender}/flags/${target}/`);
        
        const res = await request(app)
            .post(`/${sender}/flags/${target}/`);
        
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error','YOU ALREADY FLAGGED THIS SURVIVOR');

        done();
    });

    it('Suvivor does not exists', async (done) => {

        const sender = 1000;
        const target = indexSurvivor[4];

        const res = await request(app)
            .post(`/${sender}/flags/${target}/`);
    
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error','SURVIVOR_DOES_NOT_EXIST');

        done();
    });
});