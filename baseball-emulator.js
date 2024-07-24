const exec = require('child_process').exec; 
const jsforce = require('jsforce');
/*
    Usage: node sfclirunner.js <ORG_ALIAS> <DEBUG_MODE>
*/

const SF_ORG_ALIAS = process.argv[2];
const DEBUG_MODE = process.argv[3]; // OPTIONAL
const PLAY_DELAY = 1500;
const delay = ms => new Promise(res => setTimeout(res, ms));

function getConn(orgData) {
    return new jsforce.Connection({
        instanceUrl: orgData.instanceUrl,
        accessToken: orgData.accessToken
    });
}

async function sendPlay(orgData, home, away, balls, strikes, outs, inning){
    if (PLAY_DELAY > 0) {
        await delay(PLAY_DELAY);
    }
    const conn = getConn(orgData);
    const play = {
        Home_Score__c: home,
        Away_Score__c: away,
        Ball_Count__c: balls,
        Strike_Count__c: strikes,
        Out_Count__c: outs,
        Inning__c: inning,
        Is_Bottom__c: false,
        Is_Top__c: true,
        Away_Team_Mascot__c: 'Tigers',
        Away_Team_Name__c: 'Detroit',
        Game_Id__c: '1234',
        Home_Team_Mascot__c: 'Guardians',
        Home_Team_Name__c: 'Cleveland',
        Outcome__c: 'Test'
    };
    console.log('Scoring play via Salesforce event.. ');
    return await conn.sobject("Baseball_Play__e").create(play);
}

exec('sf org list --json', {
        maxBuffer: 2 * 1024 * 1024,
    },
    async function (err, stdo, stde) {
        if (err !== null) {
            console.log('exec error: ' + err);
            return;
        }
        try {
            var orgList = JSON.parse(stdo);
            //console.log(orgList.result);

            // Get access information for org alias from nonScratchOrgs (note: may require adjustment for different org types)
            const orgData = orgList.result.nonScratchOrgs.filter((org) => org.alias == SF_ORG_ALIAS)[0];         
     
            if (DEBUG_MODE) {
                console.log('Streaming plays for debugging..');
                const conn = new jsforce.Connection({
                    instanceUrl: orgData.instanceUrl,
                    accessToken: orgData.accessToken
                });
                conn.streaming.topic("/event/Baseball_Play__e").subscribe((message) => {
                    console.log("message rec ack_" + message.event.replayId);
                });
            } else {

                // Begin Baseball Game Sim
                console.log('Starting Baseball Game Sim...');


                await sendPlay(orgData,0,0,0,1,0,1);
                await sendPlay(orgData,0,0,1,1,0,1);
                await sendPlay(orgData,0,0,0,0,1,1);
                await sendPlay(orgData,0,0,1,0,0,1);
                await sendPlay(orgData,0,0,1,1,0,1);
                await sendPlay(orgData,0,0,1,2,1,1);
                await sendPlay(orgData,0,0,0,0,2,1);
                await sendPlay(orgData,0,0,0,0,2,1);
                await sendPlay(orgData,0,0,0,1,2,1);
                await sendPlay(orgData,0,0,1,1,2,1);
                await sendPlay(orgData,0,0,1,2,2,1);
                await sendPlay(orgData,0,0,0,0,3,1);
                await sendPlay(orgData,0,0,0,0,0,1);
                await sendPlay(orgData,0,0,0,1,0,1);
                await sendPlay(orgData,1,0,0,0,0,1);
                await sendPlay(orgData,1,0,0,0,0,1);
                await sendPlay(orgData,1,0,1,0,0,1);
                await sendPlay(orgData,1,0,0,0,1,1);
                await sendPlay(orgData,1,0,1,0,1,1);
                await sendPlay(orgData,1,0,2,0,1,1);
                await sendPlay(orgData,1,0,3,0,1,1);
                await sendPlay(orgData,1,0,1,0,1,1);
                await sendPlay(orgData,3,0,0,0,1,1);
                await sendPlay(orgData,3,0,1,0,1,1);
                await sendPlay(orgData,3,0,2,0,1,1);
                await sendPlay(orgData,3,0,3,0,2,1);
                await sendPlay(orgData,3,0,1,0,2,1);
                await sendPlay(orgData,3,0,1,1,2,1);
                await sendPlay(orgData,3,0,1,2,2,1);
                await sendPlay(orgData,3,0,2,2,2,1);
                await sendPlay(orgData,3,0,3,2,3,2);
                await sendPlay(orgData,3,0,0,0,0,2);
                await sendPlay(orgData,3,0,1,0,0,2);
                await sendPlay(orgData,3,1,0,0,0,2);

            }

        } catch (e) {
            console.log('JSON parse error: ' + e);
            return;
        }
    }
);