import survivorRepository from '../../src/repositories/survivor.repository';
import itemRepository from '../../src/repositories/item.repository';
import survivorBuilder from '../data-builders/mockes.survivor'
import truncate from '../utils/truncate';
import app from '../../src/app/app';
import request from 'supertest';
import { expect } from 'chai';


describe('Trade', () => {

    const indexSurvivor = [];
    const indexItens = [];

    it('Trade config', async (done) => {

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
        
        indexSurvivor.push(survivor1);
        indexSurvivor.push(survivor2);
        indexSurvivor.push(survivor3);
        indexSurvivor.push(survivor4);

        done();
    });

    it(' ERROR / Suvivor does not exists on trade', async (done) => {

        const sender = 1000;
        const target = indexSurvivor[4];

        const res = await request(app)
            .post(`/${sender}/trades/${target}/`);
        
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error','SURVIVOR_DOES_NOT_EXIST');

        done();
    });

    it(' ERROR / trying to trade himself', async (done) => {

        const sender = indexSurvivor[0];
        const target = indexSurvivor[0];

        const res = await request(app)
            .post(`/${sender}/trades/${target}/`);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error', 'YOU CANNOT SELF FLEGGAR');

        done();
    });

    it(' ERROR / Infected survivor, tries to trade another survivor', async (done) => {
    
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

    it('ERROR / Checking the values ​​of the informed inventory, find out if you really have these quantity of items', async (done) => {
    
        const sender = indexSurvivor[0];
        const target = indexSurvivor[1];

        const res = await request(app)
            .post(`/${sender}/trades/${target}/`)
            .send({
                sender: [
                    {item: indexItens[0], quantity: 100},
                    {item: indexItens[1], quantity: 0},
                    {item: indexItens[2], quantity: 0},
                    {item: indexItens[3], quantity: 0}
                ],
                target: [
                    {item: indexItens[0], quantity: 1},
                    {item: indexItens[1], quantity: 0},
                    {item: indexItens[2], quantity: 0},
                    {item: indexItens[3], quantity: 0}
                ]
            });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error', 'INVENTORY_INVALID');
        
        done();
    });

    it(' SUCCESS / Checking the values ​​of the informed inventory, find out if you really have these quantity of items', async (done) => {
    
        const sender = indexSurvivor[0];
        const target = indexSurvivor[1];
  
        const res = await request(app)
            .post(`/${sender}/trades/${target}/`)
            .send({
                sender: [
                    {item: indexItens[0], quantity: 1},
                    {item: indexItens[1], quantity: 0},
                    {item: indexItens[2], quantity: 0},
                    {item: indexItens[3], quantity: 0}
                ],
                target: [
                    {item: indexItens[0], quantity: 1},
                    {item: indexItens[1], quantity: 0},
                    {item: indexItens[2], quantity: 0},
                    {item: indexItens[3], quantity: 0}
                ]
            });
        
        expect(res.status).to.equal(200);
        
        done();
    });

    it('Survivors with incompatible item points', async (done) => {
        
        const sender = indexSurvivor[0];
        const target = indexSurvivor[1];
  
        const res = await request(app)
            .post(`/${sender}/trades/${target}/`)
            .send({
                sender: [
                    {item: indexItens[0], quantity: 2},
                    {item: indexItens[1], quantity: 0},
                    {item: indexItens[2], quantity: 0},
                    {item: indexItens[3], quantity: 0}
                ],
                target: [
                    {item: indexItens[0], quantity: 1},
                    {item: indexItens[1], quantity: 0},
                    {item: indexItens[2], quantity: 0},
                    {item: indexItens[3], quantity: 0}
                ]
            });
        
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error', 'NUMBER OF POINTS ARE INCOMPATIBLE');

        done();
    });

    it('01 / Survivors exchanging items', async (done) => {
        
        const sender = indexSurvivor[0];
        const target = indexSurvivor[1];
        
        const res = await request(app)
            .post(`/${sender}/trades/${target}/`)
            .send({
                sender: [
                    {item: indexItens[0], quantity: 5},
                    {item: indexItens[1], quantity: 0},
                    {item: indexItens[2], quantity: 5},
                    {item: indexItens[3], quantity: 0}
                ],
                target: [
                    {item: indexItens[0], quantity: 0},
                    {item: indexItens[1], quantity: 6},
                    {item: indexItens[2], quantity: 0},
                    {item: indexItens[3], quantity: 6}
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
        
        done();
    });

    it('02 / Survivors exchanging items', async (done) => {
        
        const sender = indexSurvivor[0];
        const target = indexSurvivor[1];
        
        const res = await request(app)
            .post(`/${sender}/trades/${target}/`)
            .send({
                sender: [
                    {item: indexItens[0], quantity: 0},
                    {item: indexItens[1], quantity: 0},
                    {item: indexItens[2], quantity: 4},
                    {item: indexItens[3], quantity: 0}
                ],
                target: [
                    {item: indexItens[0], quantity: 0},
                    {item: indexItens[1], quantity: 2},
                    {item: indexItens[2], quantity: 0},
                    {item: indexItens[3], quantity: 2}
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
