var expect = require('chai').expect;

import request from 'supertest';
import app from '../src/app';

describe('User', () => {
    it('Get All Users', async () => {
        await request(app)
            .get('/users')
            .expect(200);
    });


    it('Update user', async () => {
        await request(app)
            .put('/users/1')
            .send({
                name: 'Welber'
            })
            .expect(201);
    });

    it('Get User', async () => {
        await request(app)
            .get('/users/1')
            .expect(200);
    });

})


