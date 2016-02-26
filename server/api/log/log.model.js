/**
 * Log Model
 */

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import {Schema} from 'mongoose';

var logSchema = new Schema({
    time: { type: Date, default: Date.now },
    description: String
});

export default mongoose.model('Log', logSchema);