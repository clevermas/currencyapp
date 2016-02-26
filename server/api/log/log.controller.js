'use strict';

import Log from './log.model';
import config from '../../config';
import { handleError } from '../../components/errors';
import http from 'http';

function add(time, description) {
	var log = new Log({ time: time, description: description });
	log.save(function (err, usd) {
	  if (err) return console.error(err);
	  console.log('Added new log: ', time, ' ', description);
	});
}

function clearAll(callback) {
	Log.find({}).removeAsync().then(callback);
}

export function indexReq(req, res) {
    Log.findAsync({})
        .then(logs => {
        	let response = [];
        	logs.forEach((log, index) =>
        	{
        		response.push({time: log.time, description: log.description});
        	});

            res.status(200).json(response);
        }).catch(handleError(res));
}

export function clearAllReq(req, res) {
    clearAll(()=>{
        console.log('Logs have been cleaned');
        res.status(200).json({error: false});
    });
}


export function updateLog() {
	var time = new Date(),
        description = 'Update Log';

    add(time, description);
}
