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

});