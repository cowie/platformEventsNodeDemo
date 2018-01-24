var express = require('express');
var router = express.Router();
const {Client} = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl:true
});

client.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/queryRecord/:objectType/:recordId', function(req, res, next){
  //Account, Contact, AccountContacts
  switch(req.params.objectType){
    case 'Account':
      console.log('Account');
      client.query('SELECT name, sfdcID FROM sfdcAccount WHERE sfdcID = $1::text', [req.params.recordId], (err,res)=>{
        
        client.end();
      });

    case 'Contact':
      console.log('Contact');
      client.query('SELECT name, sfdcID, accountID FROM sfdcContact WHERE sfdcID = $1::text', [req.params.recordId], (err,res)=>{

        client.end();
      });
    case 'AccountContacts':
      console.log('AccountContacts');
      client.query('SELECT name, sfdcID, accountID FROM sfdcContact WHERE accountID = $1::text', [req.params.recordId], (err,res)=>{
        
        client.end();
      });
    default:
      console.log('Uh, nope.');
  }
});

router.post('/upsertRecord/:objectType/:recordId', function(req, res, next){
  //Account, Contact
  //new, or ID
  switch(req.params.objectType){
    case 'Account':
      console.log('Account');
    case 'Contact':
      console.log('Contact');
    default:
      console.log('Uh nop.');
  }
});





module.exports = router;
