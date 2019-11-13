import truncate from '../utils/truncate';
import mockes from '../utils/mockes';
import app from '../../src/app/App';
import request from 'supertest';

const prefix = '/api/v1';

describe('ZSSN', () => {
    
    beforeEach(async () => {
        await truncate();
    });

    it('Create survivor', async (done) => {
    
        const response = await request(app)
            .post(`${prefix}/survivors/`)
            .send(mockes.survivor);
                
        expect(response.status).toBe(201);
        
        done();
    });

});


