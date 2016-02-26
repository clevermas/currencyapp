/**
 * Main application routes
 */

'use strict';

import * as errors from './components/errors';
import path from 'path';
import * as currency from './api/currency/currency.controller';
import * as rate from './api/rate/rate.controller';
import * as log from './api/log/log.controller';
import jwt from 'jsonwebtoken';
import config from './';
import {isVerified} from './components/auth/auth.token';

function updateReq(req, res) {
    currency.updateReq();
    rate.updateReq();
    log.updateLog();
    res.status(200).json({ error: false });
}

export default function(app) {
    // Insert routes below
    app.put('/api/update', isVerified, updateReq);
    app.use('/api/currencies', isVerified, require('./api/currency'));
    app.use('/api/rates', isVerified, require('./api/rate'));
    app.use('/api/logs', isVerified, require('./api/log'));

    // Authentification
    app.use('/login', require('./components/auth'));
}
