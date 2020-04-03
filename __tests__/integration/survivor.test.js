import itemRepository from '../../src/app/repositories/item.repository';
import survivorBuilder from '../data-builders/mockes.survivor';
import mockes from '../utils/mockes';
import app from '../../src/app';
import request from 'supertest';
import { expect } from 'chai';


describe('Survivors', () => {

    const indexItens = [];

    it('Survivor config', async (done) => {

        const item1 = await itemRepository.create({name: 'Fiji Water'});
        const item2 = await itemRepository.create({name: 'Campbell Soup'});
        const item3 = await itemRepository.create({name: 'First Aid Pouch'});
        const item4 = await itemRepository.create({name: 'AK47'});
        
        indexItens.push(item1.item_id);
        indexItens.push(item2.item_id);
        indexItens.push(item3.item_id);
        indexItens.push(item4.item_id);

        done();
    });

    it('Create itens', async (done) => {
        
        const res = await request(app)
            .post('/itens/')
            .send({name: 'Fiji Water'});

        expect(res.status).to.equal(201);

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
            .send(survivorBuilder.randomSurvivor(indexItens));

        expect(res.status).to.equal(201);

        done();
    });
});

