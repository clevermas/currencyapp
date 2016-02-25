/**
 * Error responses
 */

'use strict';

export function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

export function pageNotFound(req, res) {
  var viewFilePath = '404';
  var statusCode = 404;
  var result = {
    status: statusCode
  };

  res.status(result.status);
  res.render(viewFilePath, {}, function(err, html) {
    if (err) {
      return res.json(result, result.status);
    }

    res.send(html);
  });
};