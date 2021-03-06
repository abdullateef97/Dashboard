/**
 * Created by root on 2/19/17.
 */
"use strcd DAshboacd Dasict"
var express= require('express');
var router = express.Router();
// var Manufacturers = require('../model/manufacturerModel');
var Goods = require('../model/goodModel')
var Manufacturers = require('../model/manufacturerModel');
var Units = require('../model/unitModel');


router.get('/',(req,res,next) =>{
    Manufacturers.find({},(err,manufacturers)=>{
        if(err){
            res.send('couldnt find manufacturers')
        }
        else{
            manufacturers.forEach(function (manu) {
                Goods.find({"manufacturer":manu.manufacturer},
                    function (err,man) {
                        if(err){
                            console.log("couldnt get to count")
                        }
                        else{
                            var count =0;
                            for(m in man){
                                count++
                            }
                            var quantity = count;
                            Manufacturers.update({manufacturer : manu.manufacturer},
                                {quantity : quantity},
                                (err)=>{
                                if(err){
                                    console.log("failed after count");
                                }
                                })
                        }
                    })
            })
            Units.find({},(err,units)=>{
                if(err){
                    res.send('units not found')
                }
                else {
                    Units.find({},(err,units)=>{
                        if(err){
                            res.send('units not found')
                        }
                        else {
                            // res.render('manufacturers/index',{manufacturers: manufacturers,units: units})
                            units.forEach(function (uni) {
                                Goods.find({"unit":uni.unit},
                                    (err,un)=>{
                                        if(err){
                                            console.log("couldnt get to unit count")
                                        }
                                        else{
                                            var uncount =0;
                                            for(u in un){
                                                uncount++
                                            }
                                            var quantity = uncount;
                                            Units.update({unit:uni.unit},{quantity : quantity},
                                                (err)=>{
                                                    if(err){
                                                        console.log("failed after count")
                                                    }
                                                })
                                        }
                                    })
                            })
                            res.render('manufacturers/index',{manufacturers: manufacturers,units: units})
                        }
                    })

                }
            })
        }
    })

});
router.get('/count',function (req,res,next) {
    Goods.find({"manufacturer":"Dangote"},function (err,b) {
        if(err){
            res.send("fuck")
        }
        else {
            var count =0;
            for(mm in b){
                count++
            }
            res.send(b)
            console.log(count)
        }
    })
})

router.post('/add',(req,res,next)=>{
    var manu = req.body.manufacturer;
    Manufacturers.findOne({'manufacturer': manu},function (err,manufacturer) {
        if(err){
            res.send('error')
        }
        else if(manufacturer){
            res.send("manuy exists")
        }
        else{
            var newManu = new Manufacturers({
                manufacturer : manu
            })
            newManu.save((err)=>{
                if(err){
                    res.send('couldnt add manu')
                }
                else{
                    res.redirect('/manufacturers')
                }
            })
        }
    })

})
router.post('/delete/:id',(req,res,next)=>{
    Manufacturers.remove({_id:req.params.id},(err)=>{
        if(err){
            res.send('couldnt delete')
        }
        else{
            res.location('/manufacturers')
            res.redirect('/manufacturers')
        }
    })
})
module.exports= router;