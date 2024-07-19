/*

    This script describes a list of objects, builds a query to retrieve them, and then executes the query.
    The results are then written to a file.

    The Salesforce CLI (sf) commands are used to execute describe and query and describe commands.
    
    Buckeye Dreamin' 24
    Javascript Beyond LWC
    Author: Evan Kormos
    Demo #1

    Dependency: working sf project folder with connected org alias.

    Usage: node sfclirunner.js <ORG_ALIAS> <FOLDER>
    ORG_ALIAS: alias of authenticated org. Can be checked with the command: sf org list
    FOLDER: target folder of working project.
    
*/

const fs = require('fs');
const path = require('path'); 
const { json } = require('stream/consumers');
const SF_ORG_ALIAS = process.argv[2];
const currDir = process.argv[3];

var objs = [ 'Team__c' , 'Player__c', 'Season__c', 'Game__c', 'Game_Player__c', 'Play__c' ]

const exec = require('child_process').exec;

function processObj(obj) {
    console.log('Describing '+ obj);
    exec('sf sobject describe --sobject ' + obj + ' --json -o ' + SF_ORG_ALIAS,{
        cwd: currDir,
        maxBuffer: 2 * 1024 * 1024,
    },
        async function (err, stdo, stde) {
            if (err !== null) {
                console.log('exec error: ' + err);
            }
            var result = JSON.parse(stdo).result;
            var objName = result.name; 

            var fields = result.fields.filter(field => 
                field.type !== 'address' && 
                field.type !== 'location' && 
                !field.name.includes('__s') && 
                !field.name.includes('Latitude') && 
                !field.name.includes('Geolocation') && 
                !field.name.includes('Longitude')
            ).map(field => field.name);

            var query = 'SELECT ' + fields.join(',') + ' FROM ' + result.name; 
            console.log('Querying '+ obj);
            await exec('sf data query --query "' + query + '" --bulk --wait 3 --result-format csv -o ' + SF_ORG_ALIAS,{
                cwd: currDir,
                maxBuffer: 2 * 1024 * 1024,
                },
                async function (er, so, se) {
                    if (er !== null) {
                        console.log('exec error: ' + er);
                    }
                    //
                    fs.writeFileSync("data/" + objName + ".csv", so);
                }
            );
        }
    );
}

objs.forEach(processObj);