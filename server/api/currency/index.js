'use strict';

import {Router} from 'express';
import * as controller from './currency.controller';

var router = new Router();

router.get('/', controller.indexReq);

controller.getCurrencies();

export default router;
