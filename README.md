# ek-BD24-js
Scripts related to JavaScript Beyond LWC session at Buckeye Dreamin 24

```Demo #1 - CLI Runner```

  This script describes a list of objects, builds a query to retrieve them, and then executes the query.
    The results are then written to a file.
    
  The Salesforce CLI (sf) commands are used to execute describe and query and describe commands.


  Pre-requisites:
      - Working sf project folder with connected org alias.
 
  Usage: ```node sfclirunner.js <ORG_ALIAS> <FOLDER>```
  
  ORG_ALIAS: alias of authenticated org. Can be checked with the command: sf org list

  OUTPUT: objects in the script are output to CSV file in the data/ subdir
  
  FOLDER: target folder of working project. 

```Demo #2 - Platform Event Subscription```

Pre-requisites:
  - [Nodejs](https://nodejs.org/en) installed w/npm
  - Install npm dependencies
    ```npm install jsforce```
