# Platform Events v API Demo

Hey there champ, how's it going.

This is a quick repo to deploy a Node app w/ PG on Heroku to simulate two forms of serverside integration. One uses REST API endpoints, hit by @future triggers, etc, the other uses the more newfangled Platform Events, consumed by Faye (https://faye.jcoglan.com) for use without a client. Both will input new rows into the PG database in Account and Contact, and you can view the tables from a browser by hitting /accounts and /contacts.

### Setup
* Spin up a SFDC instance. Can't test SFDC without SFDC yeah? Either use your devhub to hand you a new Scratch Org or use a Dev sandbox, or use a Developer Edition, whatever's clever.
* Create a new connected app on the instance, and set up OAuth. Use `http://localhost:3000/oauth/_callback` as your callback url. Give it data and events access in the scopes. Let it log in as you, etc.
* Create a new Platform Event type, and note the API name for it.
* Run the Heroku button here - https://heroku.com/deploy?template=https://github.com/cowie/platformEventsNodeDemo
* Put in the variables from your oauth and your username/password into the variables, and spin up the instance. Should be good to go here.

### Execution/Test
* Once this thing is up, Faye should attempt to connect to your platform event  streaming service. If it doesn't, use the CLI to restart. Check that you got the right creds (don't forget the token after yer password). If it's erroring, use the Heroku CLI, `heroku logs -a your-app-name` to see what's up.
* If you want to wire into the APIs, make a POST call with the data in the body (use `Apex.Serialize(object)`) and at least Name and SFDC ID as fields to insert to `/upsertRecord/:recordId`, and the system will detect if Account or Contact accordingly.

*  If you want to mess with things, code for Events is located in `app.js`, code for the apis is located in `index.js`


### How to feel after the fact
Good that you're probably better at code than I am, but don't have to build this, so huzzah.
