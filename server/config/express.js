/**
 * Express configuration
 */

'use strict';

import express from 'express';
import path from 'path';
import config from './';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';

export default (app) => {
	app.set('views', config.root + '/server/views');
	app.set('view engine', 'html');
	app.use(bodyParser.urlencoded({ extended: true }) );
	app.use(bodyParser.json());
}