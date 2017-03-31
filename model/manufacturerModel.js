/**
 * Created by root on 2/19/17.
 */
/**
 * Created by root on 2/19/17.
 */
var mongoose = require('mongoose');

var schema = mongoose.Schema;

var manufacturer = new schema({
    manufacturer : String,
    quantity:Number
})

module.exports = mongoose.model('Manufacturers',manufacturer)