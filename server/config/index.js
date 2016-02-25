/**
 * Server configuration
 */

let path = require('path');

'use strict';

let all = {
    root: path.normalize(__dirname + '/../..'),
    // Server port
    port: 3333,
    // Server IP
    ip: '0.0.0.0',
    mongo: {
        uri: 'mongodb://testuser:VYd3ufsWsaPwnYb2NK6C@ds017248.mlab.com:17248/currencyapp',
        options: {
            db: {
                safe: true
            }
        }
    }
}

export default all;
