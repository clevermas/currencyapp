'use strict';

import Rate from './rate.model';
import config from '../../config';
import { handleError } from '../../components/errors';
import http from 'http';

function add(base, rates) {
    var rate = new Rate({ base: base, rates: rates });
    rate.save(function(err, usd) {
        if (err) return console.error(err);
        // console.log('Added new rate: ', base, ' ', rates);
    });
}

function clearAll(callback) {
    Rate.find({}).removeAsync().then(callback);
}

export function indexReq(req, res) {
    Rate.findAsync({})
        .then(rates => {
            let rate = rates[0];

            var _rate = {};
            _rate['base'] = rate.base;
            _rate['rates'] = rate.rates;

            res.status(200).json(_rate);
        }).catch(handleError(res));
}

export function showReq(req, res) {
    Rate.findAsync({base: new String(req.params.id).toUpperCase()})
        .then(rates => {
            if (rates.length)
            {
                let rate = rates[0];

                var _rate = {};
                _rate['base'] = rate.base;
                _rate['rates'] = rate.rates;
            }
            else
                var _rate = {error: true, msg: "No rates were found."};

            res.status(200).json(_rate);
        }).catch(handleError(res));
}

export function getLatest() {
    var options = {
        hostname: 'openexchangerates.org',
        path: `/api/latest.json?app_id=${config.rateexchange.app_id}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    let latest = "";

    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            latest += chunk;
        });
        res.on('end', () => {
            latest = JSON.parse(latest);
            clearAll(processRates);
        });
    });
    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    req.end();

    function processRates() {
        var base = latest['base'],
            rates = latest['rates'];

        add(base, rates);
        console.log('Rate has been stored');
    }
}

// There`s no need in Express handling here
export function updateReq() {
    // fixed: getrates tp getLatest
    getLatest();
}
