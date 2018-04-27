'use strict';

const logger = require('../lib/logger');
const Bird = require('../model/bird');
const storage = require('../lib/storage');
const response = require('../lib/response');

module.exports = function routeBird(router) {
  router.post('/api/v1/bird', (req, res) => {
    try {
      const newBird = new Bird(req.body.name, req.body.type, req.body.info);
      storage.create('Bird', newBird)
        .then((bird) => {
          response.sendJSON(res, 201, bird);
          // res.writeHead(201, { 'Content-Type': 'application/json' });
          // res.write(JSON.stringify(bird));
          // res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `BIRD-ROUTE: There was a bad request ${err}`);
      response.sendText(res, 400, err.message);
      // res.writeHead(400, { 'Content-Type': 'text/plain' });
      // res.write('BIRD-ROUTE: Bad request');
      // res.end();
      return undefined;
    }
    return undefined;
  });

  router.get('/api/v1/bird', (req, res) => {
    if (!req.url.query.id) {
      response.sendText(res, 404, 'Your request requires an id');
      // res.writeHead(400, { 'Content-Type': 'text/plain' });
      // res.write('Your request requires an id');
      // res.end();
      return undefined;
    }
    storage.fetchOne('Bird', req.url.query.id)
      .then((item) => {
        response.sendJSON(res, 200, item);
        // res.writeHead(200, { 'Content-Type': 'application/json' });
        // res.write(JSON.stringify(item));
        // res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        response.sendText(res, 404, 'Resource not found');
        // res.writeHead(404, { 'Content-Type': 'text/plain' });
        // res.write('Resource not found');
        // res.end();
        return undefined;
      });
    return undefined;
  });
};
