/**
 * Created by root on 2/19/17.
 */
var express = require('express');
var router = express.Router();
var Manufacturers = require('../model/manufacturerModel')
var Units = require('../model/unitModel');


// router.get('/',function(req,res,next){
//     Manufacturers.find({},function (err,manufacturers) {
//         if(err){
//             res.send("error getting manus")
//         }
//         else {
//             Units.find({},(err,units)=>{
//                 if(err){
//                     res.send("error getting units")
//                 }
//                 else{
//                     res.render('manufacturers/indexx',{manufacturers:manufacturers,units:units})
//                 }
//             })
//
//         }
//     })
// })

router.post('/add',(req,res,next)=>{
    var un = req.body.unit;
    Units.findOne({'unit':un},function (err,unit) {
        if (err){
            res.send("unit post failed")
        }
        else if(unit){
            res.send("unitt already exists")
        }
        else{
            var newUnit = new Units({
                unit:un
            });
            newUnit.save((err)=>{
                if(err){
                    res.send('couldnt enter unit')
                }
                else{
                    res.redirect('/manufacturers')
                }
            })
        }
    })

})



module.exports = router;