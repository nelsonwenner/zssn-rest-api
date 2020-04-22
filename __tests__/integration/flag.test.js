import survivorRepository from '../../src/app/repositories/survivor.repository';
import flagRepository from '../../src/app/repositories/flag.repository';
import data from '../data-builders/data.bulders';
import app from '../../src/app';
import request from 'supertest';
import { expect } from 'chai';

const prefix = '/flags/';

describe(`${prefix}`, () => {

    let indexSurvivor;

    beforeAll(async () => {
        indexSurvivor = await Promise.all([
            data.createRandomSurvivor(),
            data.createRandomSurvivor(),
            data.createRandomSurvivor(),
            data.createRandomSurvivor(),
            data.createRandomSurvivor(),
            data.createRandomSurvivor(),
        ])    
    });

    it('It should perform the Infecting on survivor / status: 201', async (done) => {

        const target = indexSurvivor[indexSurvivor.length - 1];

        const promisses = indexSurvivor.map(async (sender, index) => {
            
            if (sender != target) {
                const res = await request(app).post(`/${sender}/flags/${target}/`);
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

    
    it('It should not  Infecting survivor. Infected survivor tries to flagging another survivor / status: 400', async (done) => {

        const senderInfected = indexSurvivor[indexSurvivor.length - 1];
        const target = indexSurvivor[0];

        const res = await request(app)
            .post(`/${senderInfected}/flags/${target}/`);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error', 'SURVIVOR_IS_INFECTED');

        done();
    });

    
    it('It should Infecting not survivor. Survivor trying to infect himself. / status: 400', async (done) => {

        const sender = indexSurvivor[1];
        const target = indexSurvivor[1];

        const res = await request(app)
            .post(`/${sender}/flags/${target}/`);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error', 'YOU CANNOT SELF FLEGGAR');

        done();
    });


});