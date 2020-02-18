var mysql=require('mysql');
var connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'ale9226',
  database:'crudexpress'
});
connection.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected!:)');
  }
});  
module.exports = connection; 