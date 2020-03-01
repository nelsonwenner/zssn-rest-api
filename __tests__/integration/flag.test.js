import survivorRepository from '../../src/repositories/survivor.repository';
import flagRepository from '../../src/repositories/flag.repository';
import mockesSurvivor from '../utils/mockes.survivor';
import truncate from '../utils/truncate';
import app from '../../src/app/app';
import request from 'supertest';
import { expect } from 'chai';

const survivors = [
    mockesSurvivor.survivor1,
    mockesSurvivor.survivor2,
    mockesSurvivor.survivor3,
    mockesSurvivor.survivor4,
    mockesSurvivor.survivor5,
    mockesSurvivor.survivor6
];


describe('Flags', () => {

    beforeAll(async () => {
        await truncate();
    });

    it('Create list from survivors', async (done) => {

        const promisses = survivors.map(async (data, index) => {

            const res = await request(app)
                .post('/survivors/')
                .send(data);

            expect(res.status).to.equal(201);
        });

        await Promise.all(promisses);

        done();
    });

    it('Infecting survivor', async (done) => {

        const indexSurvivor = [1, 2, 3, 4, 5];

        const promisses = indexSurvivor.map(async (data, index) => {

            const res = await request(app)
                .post(`/${data}/flags/${7}/`);

            expect(res.status).to.equal(201);
        });

        await Promise.all(promisses);

        const countFlags = await flagRepository.countFlags(7);
        const survivorTarget = await survivorRepository.get(7);

        expect(countFlags).to.equal(5);
        expect(survivorTarget.infected).to.equal(true);

        done();
    });

});