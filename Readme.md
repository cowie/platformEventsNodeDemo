Hi there, wtf is this right?

First, this wombocombos with https://github.com/pete-sfdc/CDGEventApp - we're examining platform events vs standard callouts from triggers within SFDC.

This scrublord app has three main components
GET - /accounts or /contacts - pull up a simple html list showing the pg database's tables accordingly

POST - /upsertRecord:recordId - api endpoint to submit a POST request to create a new Account or Contact record. Simulates backend integration.

A Faye COMETD serverside check against a Platform Event that will also update either Account or Contact tables accordingly.


Idea here is looking where the work is. Either server set up with APIs to be called from Salesforce, requiring Apex/Node work to be happening, and highly coupling activities in SFDC with what's going on here, or we listen to an event bus, and do what we want.

Way easier to just yell bankruptcy and let other people do what they want vs going through a process. Has Michael Scott taught us nothing?