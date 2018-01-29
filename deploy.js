const pg = require("pg");

const connectionString = process.env.DATABASE_URL;
const client = new pg.Client(connectionString);

client.connect();

var acctQuery = 'CREATE TABLE "public"."sfdcAccount" ("id" serial,"name" text,"sfdcID" text,"createdDateTime" text,PRIMARY KEY ("id"))';
var contQuery = 'CREATE TABLE "public"."sfdcContact" ("id" serial,"name" text,"sfdcID" text,"createdDateTime" text,"accountID" text,PRIMARY KEY ("id"))';
console.log('entering query system');
client.query(acctQuery, function(err, res){
    if(err){
        console.log(err);
    }else{
        console.log('account table created');
        client.query(contQuery, function(err,res){
            if(err){
                console.log(err);
            }else{
                console.log('contact table created');
                console.log('db setup completed');
                client.end();
            }
        });
    }
})

