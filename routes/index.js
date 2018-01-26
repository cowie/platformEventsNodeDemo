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

router.post('/upsertRecord/:recordId', function(req, res, next){
  //Account, Contact
  //new, or 
  console.log('upsert detected');
  console.log(req.params);

  if(req.params.recordId.startsWith('001')){
    console.log('Account');
    console.log(req.body.Id + ';' + rec.body.Name);
    } else if (req.params.recordId.startsWith('003')) {
    console.log('Contact');
    console.log(req.body.Id + ';' + rec.body.Name+';'+req.body.AccountId);
    }
    else {
      console.log('Uh nop.');
    }
    res.sendStatus(200);
});





module.exports = router;
