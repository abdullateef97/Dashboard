/**
 * Created by root on 2/19/17.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var json2xls = require('json2xls');
var Goods = require('../model/goodModel');
var Manufacturers = require('../model/manufacturerModel');
var Units = require('../model/unitModel');
var Xlsx = require('../model/xlsxmodel')



/* GET home page. */
router.get('/', function(req, res, next) {
    Goods.find({},function (err,goods) {
        if(err){
            res.send('error shoki')
        }
        else{
            Manufacturers.find({},(err,manufacturers)=>{
                if(err){
                    console.log("couldnt ge t d manu")
                }
                else{
                    Units.find({},(err,units)=>{
                        if(err){
                            console.log("couldnt get units")
                        }
                        else{
                            res.render('goods/index', {
                                goods:goods,manufacturers:manufacturers,units:units
                            })
<<<<<<< HEAD
                          // res.send(goods)
=======
>>>>>>> 6789d06eb46a7a4426576d8b656361cdf658df33
                        }
                    })
                }
            })

        }
<<<<<<< HEAD
    }).sort({$natural : -1})
=======
    })
>>>>>>> 6789d06eb46a7a4426576d8b656361cdf658df33
    ;
});
router.get('/add',(req,res,next) =>{
    Manufacturers.find({},(err,manufacturers)=>{
        if(err){
            res.send('couldnt find manufacturers')
        }
        else{
           Units.find({},(err,units)=>{
               if(err){
                   res.send('units not found')
               }
               else {
                   res.render('goods/add',{manufacturers: manufacturers,units: units})
               }
           })
        }
    })

});
router.post('/add',(req,res,next)=>{
    var productname = req.body.productname;
    var manufacturer = req.body.manufacturer;
    var quantity = req.body.quantity;
    var unit = req.body.unit;
    var price = req.body.price;
<<<<<<< HEAD
    console.log(manufacturer);
=======
>>>>>>> 6789d06eb46a7a4426576d8b656361cdf658df33
    var newGoods = new Goods({
       productname : productname,manufacturer : manufacturer,quantity:quantity,unit: unit,price:price
    });
    newGoods.save((err)=>{
        if(err){
            res.send('couldnt send');
        }
        else{
            res.redirect('/goods')
        }
    })

});
// router.get('/edit/:id',(req,res,next)=>{
//     Goods.findOne({
//         _id : req.params.id
//     })
//         .exec((err,good)=>{
//         if(err){
//             console.log("couldnt find book")
//         }
//         else {
//             Manufacturers.find({},(err,manufacturers)=>{
//                 if(err){
//                     console.log("couldnt ge t d manu")
//                 }
//                 else{
//                     Units.find({},(err,units)=>{
//                         if(err){
//                             console.log("couldnt get units")
//                         }
//                         else{
//                             res.render('goods/edit', {
//                                 good:good,manufacturers:manufacturers,units:units
//                             })
//                         }
//                     })
//                 }
//             })
//
//         } })
//
// });
router.post('/edit/:id',(req,res,next)=>{
    var productname = req.body.productname;
    var manufacturer = req.body.manufacturer;
    var quantity = req.body.quantity;
    var unit = req.body.unit;
    var price = req.body.price;

    Goods.update({
        _id : req.params.id
    },{
        productname : productname,
        manufacturer : manufacturer,
        quantity : quantity,
        unit : unit,
        price : price
    },
        (err)=>{
        if(err){
            console.log("coudnt update")
            res.send("couldnt update")
        }
        res.redirect('/goods')
        })
});

router.post('/delete/:id',(req,res,next)=>{
    Goods.remove({_id : req.params.id},(err)=>{
        if(err){
            res.send("couldnt delete")
        }
        else{
            res.location('/goods');
            res.redirect('/goods');
        }
    })
})
//search function
// router.post('/search',(req,res,next)=>{
//     var search = req.body.search;
//     Goods.find({/*"productname": search,"manufacturer":search,"unit" : search*/
//                     // $or:[{"productname" : search},{"manufacturer" : search}]},
//     function (err,goods) {
//         if(err){
//             res.send("search failed")
//         }
//         else{
//
//
//                 }
//             })
//             // Manufacturers.find({},(err,manufacturers)=>{
//             //     if(err){
//             //         console.log("couldnt ge t d manu")
//             //     }
//             //     else{
//             //         Units.find({},(err,units)=>{
//             //             if(err){
//             //                 console.log("couldnt get units")
//             //             }
//             //             else{
//             //                 res.render('goods/index', {
//             //                     goods:goods,manufacturers:manufacturers,units:units
//             //                 })
//             //             }
//             //         })
//             //     }
//             // })
//
//
// })

<<<<<<< HEAD
/*router.post('/search',(req,res,next)=>{
=======
router.post('/search',(req,res,next)=>{
>>>>>>> 6789d06eb46a7a4426576d8b656361cdf658df33
    var search = req.body.search;
    Goods.find({"manufacturer":search},(err,goods)=>{
        if(err){
            res.send("terminated before it got to goods");
        }
        else{
<<<<<<< HEAD
            /!*Goods.find({"productname":search},(err,manu)=>{
                if(err){
                    res.send("terminated after goods but before manu")
                }
                else{
                    goods.push(manu);*!/

=======
>>>>>>> 6789d06eb46a7a4426576d8b656361cdf658df33
                    Manufacturers.find({},(err,manufacturers)=>{
                        if(err){
                            console.log("couldnt ge t d manu")
                        }
                        else{
                            Units.find({},(err,units)=>{
                                if(err){
                                    console.log("couldnt get units")
                                }
                                else{
                                    res.render('goods/index', {
                                        goods:goods,manufacturers:manufacturers,units:units
                                    })
                                }
                            })
                        }
                    })

<<<<<<< HEAD
            /!*})*!/
        }
    })
});*/

router.post('/search',(req,res,next)=>{
    var search = req.body.search;
    console.log(search)
   // Goods.createIndex({"productname" : "text","manufacturer":"text"});
    Goods.find({$text : {$search : search}},(err,goods)=>{
       if(err){
           res.send(err)
       }
       else{
           Manufacturers.find({},(err,manufacturers)=>{
               if(err){
                   console.log("couldnt ge t d manu")
               }
               else{
                   Units.find({},(err,units)=>{
                       if(err){
                           console.log("couldnt get units")
                       }
                       else{
                           res.render('goods/index', {
                               goods:goods,manufacturers:manufacturers,units:units
                           })
                           // res.send(goods)
                       }
                   })
               }
           })
       }
    })
})
=======
            }

    })
});
>>>>>>> 6789d06eb46a7a4426576d8b656361cdf658df33
router.get('/save',(req,res,next)=> {
    Goods.find({}, (err, goods) => {
        if (err) {
            res.send('couldnt find goods to save');
        }
        else {
            var xls = json2xls(goods, {
                fields: {
                    productname: 'string', manufacturer: 'string', quantity: 'string', unit: 'string', price: 'string'
                }
            });
            var xlsx = Date.now();
            var newxlsx = new Xlsx({xlsx : xlsx,date : Date.now()})
            newxlsx.save((err)=>{
                if(err){
                    res.send('couldnt save')
                }
                else{
                    fs.writeFileSync('xlsx/' + xlsx + '.xlsx', xls, 'binary')
                    res.location('/goods')
                    res.redirect('/goods')
                }
            })
            // fs.createWriteStream('xls/'+xlsname+'.xlsx')


            // res.send(goods)
        }
    })
})


/*router.get('/print',function(req,res,next){
    Goods.find({},function (err,goods) {
        if(err){
            console.log("fuck")
        }
        else{

        }
    })
})*/




module.exports = router;
