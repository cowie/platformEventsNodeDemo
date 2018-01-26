Yo this ain't like...docced out so uh you can try it or something but you'll be flying blind right now. Come back later.

First, this wombocombos with https://github.com/pete-sfdc/CDGEventApp - we're examining platform events vs standard callouts from triggers within SFDC.

This scrublord app has three main components
GET - /accounts or /contacts - pull up a simple html list showing the pg database's tables accordingly

POST - /upsertRecord:recordId - api endpoint to submit a POST request to create a new Account or Contact record. Simulates backend integration.

A Faye COMETD serverside check against a Platform Event that will also update either Account or Contact tables accordingly.

Idea here is looking where the work is. Either server set up with APIs to be called from Salesforce, requiring Apex/Node work to be happening, and highly coupling activities in SFDC with what's going on here, or we listen to an event bus, and do what we want.

Way easier to just yell bankruptcy and let other people do what they want vs going through a process. Has Michael Scott taught us nothing?

Setup process-
Clone https://github.com/pete-sfdc/CDGEventApp repo down locally.
SFDX set up your project there (in the dir, set up default hub auth if not already and default org)
SFDX spin up a scratch
SFDX MDDeploy the zip in /mdapi
SFDX source push to your org
in org
-create new connected app to get your oauth happiness

then
clone this repo down
create new heroku app, push repo up
go into app settings, set configuration accordingly

go back to sfdc
update url for connected app
