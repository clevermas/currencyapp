'use strict';

import Currency from './currency.model';
import config from '../../config';
import { handleError } from '../../components/errors';
import http from 'http';

function add(name, description) {
	var currency = new Currency({ name: name, description: description });
	currency.save(function (err, usd) {
	  if (err) return console.error(err);
	  // console.log('Added new currency: ', name, ' ', description);
	});
}

function clearAll(callback) {
	Currency.find({}).removeAsync().then(callback);
}

export function indexReq(req, res) {
    Currency.findAsync({})
        .then(currencies => {
        	let response = {};
        	currencies.forEach((currency, index) =>
        	{
        		response[currency.name] = currency.description;
        	});

            res.status(200).json(response);
        }).catch(handleError(res));
}

export function getCurrencies() {
    var options = {
        hostname: 'openexchangerates.org',
        path: '/api/currencies.json',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    let currencies = "";

    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            currencies += chunk;
        });
        res.on('end', () => {
            currencies = JSON.parse(currencies);
            clearAll(processCurrencies);
        });
    });
    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    req.end();

    function processCurrencies() {
    	for (var name in currencies)
    	{
    		var description = currencies[name];

    		add(name, description);    		
    	}
    	// The message below displays before currencies have been stored into db,
    	// because they`ve been processed with asynchronous handler
    	console.log('Currencies have been stored');
    }
}

export function updateReq(req, res) {
	getCurrencies();
}
