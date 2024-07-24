
const exec = require('child_process').exec;
/*
    Usage: node sfclirunner.js <ORG_ALIAS>
*/
const SF_ORG_ALIAS = process.argv[2];

// List of objects to fetch to CSV
var objs = [ 'Team__c' , 'Player__c', 'Play__c', 'Game__c' ]

function processObj(obj) {
    console.log('Describing '+ obj);
    exec('sf sobject describe --sobject ' + obj + ' --json -o ' + SF_ORG_ALIAS,{
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