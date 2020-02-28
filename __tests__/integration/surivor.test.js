import truncate from '../utils/truncate';
import mockes from '../utils/mockes';
import app from '../../src/app/app';
import request from 'supertest';
import { expect } from 'chai';

describe('Survivors', () => {

    beforeAll(async () => {
        await truncate();
    });
    
    it('Create survivor', async (done) => {

        const res = await request(app)
            .post('/survivors/')
            .send(mockes.survivor);
        expect(res.status).to.equal(201);
        
        done();

    });

});

