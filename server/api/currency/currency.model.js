/**
 * Currency Model
 */

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import {Schema} from 'mongoose';

var currencySchema = new Schema({
    name: String,
    description: String
});

export default mongoose.model('Currency', currencySchema);