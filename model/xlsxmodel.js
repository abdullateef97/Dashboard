/**
 * Created by belle on 3/28/17.
 */
var mongoose = require('mongoose');

var schema = mongoose.Schema;

var xlsx = new schema({
    xlsx : String,
    date :Date

})

module.exports = mongoose.model('Xlsx',xlsx);