/**
 * Node.js Application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import http from 'http';

/**
 * Database
 */
mongoose.connect(config.mongo.uri, config.mongo.options);
let db = mongoose.connection;
db.on('error', function(err) {
	console.error(`MongoDB connection error: ${err}`);
	process.exit(-1);
});
db.once('open', function() {
  console.log("Sucessfully connected to database.");
});

/**
 * Server
 */
let app = express();
let server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
function startServer() {
  server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

module.exports = app;