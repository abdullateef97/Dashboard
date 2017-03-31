/**
 * Created by root on 2/19/17.
 */
var mongoose = require('mongoose');

var schema = mongoose.Schema;

var good = new schema({
    productname : String,
    manufacturer : String,
    quantity : Number,
    unit : String,
    price : Number
})

module.exports = mongoose.model('Goods',good);