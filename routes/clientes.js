var express = require('express');
var router = express.Router();
var connection = require('../lib/db.js');

/* GET clientes listing. */
router.get('/', function(req, res, next) {
  res.render('admin/clientes', {title:'CADASTRO DE CLIENTES'});
});


/* Adicionar clientes */
router.get('/addclientes', function(req, res, next) {

    
    
});

module.exports = router;
