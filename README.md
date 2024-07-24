# ek-BD24-js
Scripts related to JavaScript Beyond LWC session at Buckeye Dreamin 24
[Slide deck]('/demo-assets/JavaScript beyond LWC - Kormos - Buckeye Dreamin 2024.pdf')

Note: see [demo #2](https://github.com/kormco/bd24-demo2) repo for full stack app

```Demo #1 - CLI Runner```

  This script describes a list of objects, builds a query to retrieve them, and then executes the query.
    The results are then written to a file.
    
  The Salesforce CLI (sf) commands are used to execute describe and query and describe commands.


  Pre-requisites:
      - ORG_ALIAS: alias of authenticated org. Can be checked with the command: sf org list 

  Usage: ```node sfclirunner.js <ORG_ALIAS>```
  
  OUTPUT: objects in the script are output to CSV file in the ```data/`` subdir
  

```Demo #2 - Platform Event Subscription```

  This script acts as the baseball simulator and simulator event debugger.

Pre-requisites:
  - [Nodejs](https://nodejs.org/en) installed w/npm
  - Install npm dependencies
    ```npm install jsforce```
  - ORG_ALIAS: alias of authenticated org. Can be checked with the command: sf org list
  - DEBUG_MODE: optional. If any value in this paramter debug mode will subscribe to events only for debugging


    Usage: ```node sfclirunner.js <ORG_ALIAS> <DEBUG_MODE>```
  


