'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { name: 'Hummingbird', type: 'Tiny Tiny', info: 'Cute but mean.' };
let mockId = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

// post first BEFORE you get, because you can't get something until it is created.

describe('VALID request to the API', () => {
  describe('POST /api/v1/bird', () => {
    // superagent.post() is a promise
    it('should respond with status 201 and created a new bird', () => superagent.post(`:${testPort}/api/v1/bird`)
      .send(mockResource)
      .then((res) => {
        mockId = res.body.id;
        expect(res.body.name).toEqual(mockResource.name);
        expect(res.body.type).toEqual(mockResource.type);
        expect(res.body.info).toEqual(mockResource.info);
        expect(res.status).toEqual(201);
      }));
  });

  describe('GET /api/v1/bird?id=ID', () => {
    it('should respond with the previously created bird.', () => superagent.get(`:${testPort}/api/v1/bird?id=${mockId}`)
      .then((res) => {
        console.log(res.body, 'RES.BODY IN GET BLOCK .THEN');
        expect(res.body.id).toEqual(mockId);
        //  expect(res.body.name).toEqual(mockResource.name);
        //  expect(res.body.type).toEqual(mockResource.type);
        //  expect(res.body.info).toEqual(mockResource.info);
        //  expect(res.status).toEqual(200);
      }));
  });
});
