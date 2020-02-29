var express = require('express');
var router = express.Router();
<<<<<<< HEAD
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

=======
var connection = require('../lib/dbconf');

/* GET clientes listing. */
router.get('/', function(req, res, next) {
  
  connection.query('SELECT * FROM clientes_tabela ORDER BY idcliente desc', function(err, rows) {

    if(err){
      req.flash('error', err)
      res.render('clientes/index', {title:'GERENCLIENTES - INDEX', data:''});
    } else {
      res.render('clientes/index', {title:'GERENCLIENTES - INDEX', data: rows});
    }

  });

});

// Get mostrar formulário
router.get('/add', function(req, res, next){

  res.render('clientes/addclientes', {
    title: 'GERENCLIENTES - ADD CLIENTES',
    nome_cliente: '',
    contato_cliente: '',
    email_cliente: '',
    logradouro_cliente: '',
    servicoprestado_cliente: ''
  })

});

// Metodo para add cliente via post

router.post('/add', function(req, res , next){

  req.assert('nome_cliente', "- Campo nome não deve estar vazio!").notEmpty()
  req.assert('contato_cliente', "- Campo telefone não deve estar vazio!").notEmpty()
  req.assert('email_cliente', "- Campo email deve ser preenchido por um email válido!").isEmail()
  req.assert('logradouro_cliente', "- Campo logradouro não deve estar vazio!").notEmpty()
  req.assert('servicoprestado_cliente', "- Escolha o serviço prestado!").notEmpty()

  var errors = req.validationErrors()

  if(!errors) {

    var user = {
      nome_cliente: req.sanitize('nome_cliente').escape().trim(),
      contato_cliente: req.sanitize('contato_cliente').escape().trim(),
      email_cliente: req.sanitize('email_cliente').escape().trim(),
      logradouro_cliente: req.sanitize('logradouro_cliente').escape().trim(),
      servicoprestado_cliente: req.sanitize('servicoprestado_cliente').escape().trim()
    }

    connection.query('INSERT INTO clientes_tabela SET ?', user, function(err, result){
      if(err){
        req.flash('error', err)


        res.render('clientes/addclientes', {
          title: 'GERENCLIENTES - ADD UM NOVO CLIENTE',
          nome_cliente: user.nome_cliente,
          contato_cliente: user.contato_cliente,
          email_cliente: user.email_cliente,
          logradouro_cliente: user.logradouro_cliente,
          servicoprestado_cliente: user.servicoprestado_cliente
        })

      } else {
        req.flash('sucess', 'Cliente add com sucesso!');
        res.redirect('/clientes')
      }

    })

  } else {

    var error_msg = '';
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })                
        req.flash('error', error_msg)        
         
        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */ 
        res.render('clientes/addclientes', { 
            title: 'GERENCLIENTES - ADD UM NOVO CLIENTE',
            nome_cliente: req.body.nome_cliente,
            telefone_cliente: req.body.telefone_cliente,
            email_cliente: req.body.email_cliente,
            logradouro_cliente: req.body.logradouro_cliente,
            servicoprestado_cliente: req.body.servicoprestado_cliente
        })

  }

});

router.get('/edit/(:idcliente)', function(req, res, next){

    connection.query('SELECT * FROM clientes_tabela WHERE idcliente = ' + req.params.idcliente, function(err, rows, fields){

      if(err) throw err

      //caso o cliente nao seja encontrado
        if(rows.length <= 0){
              req.flash('error', 'Cliente não encontrado com id ' + req.params.idcliente)
              res.redirect('/clientes')
        } else { 
          // Caso o cliente seja encontrado
          req.render('clientes/editclientes', {
              title: 'Edite os dados do cliente',
              nome_cliente: rows[0].nome_cliente,
              contato_cliente: rows[0].contato_cliente,
              email_cliente: rows[0].email_cliente,
              logradouro_cliente: rows[0].logradouro_cliente,
              servicoprestado_cliente: rows[0].servicoprestado_cliente
          })
        }

    })

})


>>>>>>> problema na rota edit
module.exports = router;
