'use strict';

import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import config from '../../config/';

var router = express.Router();

router.post('/', function(req, res, next) {
    if (req.body.password == config.passphrase) {
        var token = jwt.sign({}, config.passphrase);
        res.json({ token: token });
    } else
        res.status(401).end();
});

export var route = router;

export function isVerified(req, res, next) {
    try {
        jwt.verify(req.headers.token || '', config.passphrase);
    } catch (e) {
        return res.status(401).end();
    }
    next();
}
