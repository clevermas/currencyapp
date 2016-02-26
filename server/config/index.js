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
    },
    rateexchange: {
        app_id: '243728e176cd44f1a739836ff5202663'
    },
    // passphrase
    passphrase: 'testkey__'
}

export default all;
