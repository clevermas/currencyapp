/**
 * Rate Model
 */

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import {Schema} from 'mongoose';

var rateSchema = new Schema({
    base: String,
    rates: {}
});

export default mongoose.model('Rate', rateSchema);