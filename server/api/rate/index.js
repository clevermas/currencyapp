'use strict';

import {Router} from 'express';
import * as controller from './rate.controller';

var router = new Router();

router.get('/', controller.indexReq);
router.get('/:id', controller.showReq);

controller.getLatest();

export default router;
