var express = require('express');
var router = express.Router();
var connection = require('../lib/db.js');

/* GET show lista de clientes. */
router.get('/', function(req, res, next) {
  
  connection.query('SELECT * FROM cadastro_clientes ORDER BY id ASC',function(err,rows)     {
 
    if(err){
     req.flash('error', err); 
     res.render('admin/clientes',{page_title:"CRUDEXPRESS - Node.js",data:''});   
    }else{
        
        res.render('admin/clientes',{page_title:"CRUDEXPRESS - Node.js",data:rows});
    }
                        
     });
    
});

module.exports = router;
