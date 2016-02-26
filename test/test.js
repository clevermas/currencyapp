'use strict';

import app from '../server';
import request from 'supertest';
import should from 'should';
import config from '../server/config';

describe('currencyapp API', function() {
    var passphrase = config.passphrase;
    var token = '';

    describe('Unauthorized', function() {
        describe('GET /api/currencies', function() {
            it('should respond with 401 unauthorized', function(done) {
                request(app)
                    .get('/api/currencies')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        res.status.should.equal(401);
                        done();
                    });
            });
        });

        describe('GET /api/logs', function() {
            it('should respond with 401 unauthorized', function(done) {
                request(app)
                    .get('/api/logs')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        res.status.should.equal(401);
                        done();
                    });
            });
        });

        describe('GET /api/rates', function() {
            it('should respond with 401 unauthorized', function(done) {
                request(app)
                    .get('/api/rates')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        res.status.should.equal(401);
                        done();
                    });
            });
        });

        describe('PUT /api/update', function() {
            it('should respond with 401 unauthorized', function(done) {
                request(app)
                    .put('/api/update')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        res.status.should.equal(401);
                        done();
                    });
            });
        });
    });

    describe('Authorization', function() {
        it('should respond with 401 unauthorized if password was wrong', function(done) {
            request(app)
                .post('/login')
                .expect(200)
                .send({ password: passphrase + '!' })
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.status.should.equal(401);
                    done();
                });
        });

        it('should respond with auth token if password was correct', function(done) {
            request(app)
                .post('/login')
                .expect(200)
                .send({ password: passphrase })
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    (typeof res.body.token != 'undefined').should.equal(true);
                    done();
                });
        });

    });

    describe('Authorized', function() {
        var token = '';

        before(function(done) {
            request(app)
                .post('/login')
                .expect(200)
                .send({ password: passphrase })
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    token = res.body.token || '';
                    (typeof res.body.token != 'undefined').should.equal(true);
                    done();
                });
        });

        describe('GET /api/currencies', function() {
            it('should respond with 200 OK', function(done) {
                request(app)
                    .get('/api/currencies')
                    .set('token', token)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        res.status.should.equal(200);
                        done();
                    });
            });
        });

        describe('GET /api/logs', function() {
            it('should respond with 200 OK', function(done) {
                request(app)
                    .get('/api/logs')
                    .set('token', token)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        res.status.should.equal(200);
                        done();
                    });
            });
        });

        describe('GET /api/rates', function() {
        	// request takes over 5 secs. Increase timeout time.
            this.timeout(10000);

            it('should respond with 200 OK', function(done) {

                setTimeout(function() {

                    request(app)
                        .get('/api/rates')
                        .set('token', token)
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .end((err, res) => {
                            res.status.should.equal(200);
                            done();
                        });
                }, 0);
            });


        });


        describe('GET /api/rates/usd', function() {

            it('should respond with base USD currency', function(done) {

                    request(app)
                        .get('/api/rates')
                        .set('token', token)
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .end((err, res) => {
                            res.body.base.should.equal('USD')
                            done();
                        });
            });


        });


        describe('GET /api/rates/gbp', function() {

            it('should respond error if we get request about british pound', function(done) {

                    request(app)
                        .get('/api/rates/gbp')
                        .set('token', token)
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .end((err, res) => {
                            res.body.error.should.equal(true);
                            res.body.msg.should.equal("No rates were found.")
                            done();
                        });
            });


        });


        describe('PUT /api/update', function() {
            it('should respond with 200 OK', function(done) {
                request(app)
                    .put('/api/update')
                    .set('token', token)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        res.status.should.equal(200);
                        done();
                    });
            });
        });

    });

});
