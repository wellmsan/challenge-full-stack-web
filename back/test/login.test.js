var expect = require('chai').expect;

import request from 'supertest';
import app from '../src/app';

import md5 from "js-md5";

describe('Authentication', () => {

    it('Create user', async () => {
        await request(app)
            .post('/users')
            .send({
                name: 'Welber Macedo',
                email: 'devopswell@gmail.com',
                pass: md5('54321')
            })
            .expect(201);
    });

    it('Login Authentication JWT whith valid credintials', async () => {
        await request(app)
            .post('/login')
            .send({
                username: 'devopswell@gmail.com',
                password: md5('54321')
            })
            .expect(200);
    });
})