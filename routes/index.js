var express = require('express');
var router = express.Router();
const {Client} = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl:true
});

client.connect();

/* GET home page. */
router.get('/accounts', function(req, res, next) {
  client.query('SELECT "sfdcID", "name" FROM "public"."sfdcAccount" LIMIT 20', (err, pres) => {
    res.render('index', { object: 'Accounts', rows: pres.rows });
  });
});

router.get('/contacts', function(req, res, next){
  client.query('SELECT "sfdcID", "name", "accountID" FROM "public"."sfdcContact" LIMIT 20', (err,pres)=>{
    res.render('index', { object: 'Contacts', rows: pres.rows});
  });
});

router.post('/upsertRecord/:recordId', function(req, res, next){
  //Account, Contact
  //new, or 
  console.log('upsert detected');
  console.log(req.params);

  if(req.params.recordId.startsWith('001')){
    console.log('Account');
    console.log(req.body);
    console.log(req.body.Id + ';' + req.body.Name);
    client.query('INSERT INTO "public"."sfdcAccount"("sfdcID", "name") VALUES($1, $2) RETURNING "id"', [req.body.Id, req.body.Name], (err,pres)=>{
      if(err) console.error(err);
      else {
        console.log(pres);
        
      }
    });
    } else if (req.params.recordId.startsWith('003')) {
    console.log('Contact');
    console.log(req.body);
    console.log(req.body.Id + ';' + req.body.Name+';'+req.body.AccountId);
    client.query('INSERT INTO "public"."sfdcContact"("sfdcID", "name", "accountID") VALUES($1, $2, $3) RETURNING id', [req.body.Id, req.body.Name, req.body.AccountId], (err,pres)=>{
      if(err) console.error(err);
      else {
        console.log(pres);
      }
      });
    }
    else {
      console.log('Uh nop.');
    }
    res.sendStatus(200);
});





module.exports = router;
