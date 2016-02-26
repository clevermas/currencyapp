'use strict';

import express from 'express';
import * as tokenAuth from './auth.token';

var router = express.Router();

router.use('/', tokenAuth.route);

export default router;