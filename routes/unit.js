/**
 * Created by root on 2/19/17.
 */
var express = require('express');
var router = express.Router();
var Manufacturers = require('../model/manufacturerModel')
var Units = require('../model/unitModel');


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
router.post('/delete/:id',(req,res,next)=>{
    Units.remove({_id:req.params.id},(err)=>{
        if(err){
            res.send('couldnt delete')
        }
        else{
            res.location('/manufacturers')
            res.redirect('/manufacturers')
        }
    })
})


module.exports = router;