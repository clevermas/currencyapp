'use strict';

import {Router} from 'express';
import * as controller from './log.controller';

var router = new Router();

router.get('/', controller.indexReq);

router.delete('/', controller.clearAllReq);

export default router;
