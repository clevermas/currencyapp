/**
 * Main application routes
 */

'use strict';

import * as errors from './components/errors';
import path from 'path';
import * as currency from './api/currency/currency.controller';

function updateReq(req, res) {
	currency.updateReq(req, res);
	res.status(200).json({error: false});
}

export default function(app) {
  // Insert routes below
  app.put('/api/update', updateReq);
  app.use('/api/currencies', require('./api/currency'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|components)/*')
   .get(errors.pageNotFound);

}