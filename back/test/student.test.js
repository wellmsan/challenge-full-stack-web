var expect = require('chai').expect;

import request from 'supertest';
import app from '../src/app';

describe('Student', () => {

    it('Create student', async () => {
        await request(app)
            .post('/students')
            .send({
                academic_record: '6541321308',
                name: 'Juliana da Silva Santos',
                email: 'jusilva81@outlook.com',
                cpf: '21345698765',
            })
            .expect(201);
    });

    it('Get All Students', async () => {
        await request(app)
            .get('/students')
            .expect(200);
    });

    it('Update student', async () => {
        await request(app)
            .put('/students/1')
            .send({
                name: 'Juliana Santos',
                academic_record: '3235465412',
            })
            .expect(201);
    });

    it('Get Student - valid not change academic_record', async () => {
        const response = await request(app)
            .get('/students/1')

        expect(response.body).to.be.have.property('academic_record').eql('6541321308');

    });

    it('Get Student - valid change name', async () => {
        const response = await request(app)
            .get('/students/1')

        expect(response.body).to.be.have.property('name').eql('Juliana Santos');

    });

})


