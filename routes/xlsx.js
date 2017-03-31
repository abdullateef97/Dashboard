/**
 * Created by belle on 3/28/17.
 */
'use strict'
var express = require('express');
var fs = require('fs');
var router = express.Router();
var Xlsx = require('../model/xlsxmodel');

router.get('/',(req,res,next)=>{
    Xlsx.find({},(err,xlsx)=>{
        if(err){
            res.send("couldnt get xlsx files")
        }
        else{
            res.render('xlsx/index',{xlsx})
        }
    })
});
router.get('/:id',(req,res,next)=>{
    let id  = req.params.id
    Xlsx.find({"_id":id},(err,xlsx)=>{
        if(err){
            res.send("couldnt get xlsx")
        }
        else{
            xlsx.forEach(function(x){
                console.log(x)
                console.log(x['xlsx'])
                var filename = x.xlsx;
                var file = 'xlsx/'+filename+'.xlsx'
                res.download(file,(err)=>{
                    if(err){
                        res.send('there was an error')
                    }
                    else{
                        res.render('download')
                     /*   setTimeout(()=>{
                            res.render('download');
                            res.location('/goods');
                            res.redirect('/goods');
                        },3000)*/

                    }
                })

            })


          /*  var contents = fs.readFileSync(xlsx);
            var b = JSON.parse(contents);
            console.log(b)
            res.send(b);*/
          /*  var filename = xlsx.xlsx
            var file = __dirname+'../xlsx/'+filename;
            res.download(file)*/
        }
    })
})



module.exports = router;