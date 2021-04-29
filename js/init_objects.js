// Initialise objects and values on UI

var loadcount = 5;

var objJobBonusStatsTable = [];
var objBaseHPSPTable = [];
var objTotalStatValues = [];
var objAspdTable = [];
var objEquipItemDB = [];
var objCardItemDB = [];

var objEquipScriptsDB = [];

var path_job_basehpsp_db = 'data/rathena_files/db/re/job_basehpsp_db.txt';
var path_job_bonus_stats = 'data/rathena_files/db/job_db2.txt';
var path_job_base_aspd = 'data/rathena_files/db/re/job_db1.txt';
var path_item_db_equip = 'data/rathena_files/db/re/item_db_equip.yml';
var path_item_db_etc = 'data/rathena_files/db/re/item_db_etc.yml';


function initialiseObjects() {

    // Object initialisation to fetch  base hp and sp values
    $.get(path_job_basehpsp_db, function(data) {
        var lines = data.split("\n");
        objBaseHPSPTable = [];
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].startsWith("//") || lines[i] === "")
                continue;
            objBaseHPSPTable.push(lines[i].split(","));
        }
        console.log("path_job_basehpsp_db file loaded");
        loadcount--;
        if (loadcount == 0) initSetup();
    });

    // Object initialisation to fetch bonus stats for all jobs
    $.get(path_job_bonus_stats, function(data) {
        var lines = data.split("\n");
        objJobBonusStatsTable = [];
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].startsWith("//") || lines[i] === "")
                continue;
            objJobBonusStatsTable.push(lines[i].split(","));
        }
        console.log("path_job_basehpsp_db file loaded");
        loadcount--;
        if (loadcount == 0) initSetup();
    });

    // Object initialisation to fetch base aspd values from rAthena file
    $.get(path_job_base_aspd, function(data) {

        var lines = data.replace(/ /g, "").split("\n");
        objAspdTable = [];
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].startsWith("//") || lines[i] === "")
                continue;
            objAspdTable.push(lines[i].split(","));
        }
        console.log("path_job_base_aspd file loaded");
        loadcount--;
        if (loadcount == 0) initSetup();
    });

    // Object initialisation to fetch all equips and details from rAthena file
    // 0:ID,1:Name,2:Type,3:SubType,4:Attack/def,5:Slots,6:Location,7:WeaponLvl,8:EquipLevelMin,9:Refineable,10:Script
    $.get(path_item_db_equip, function(data) {

        objEquipItemDB = [];
        var lines = data.split("\n");
        //console.log(lines);

        var k = -1
        var objItem = [];
        for (var i = 0; i < lines.length; i++) {

            //ignore comments and empty lines
            if (lines[i].startsWith("#") || lines[i] === "")
                continue;

            //console.log(lines[i]);

            //check for new Id and start next entry
            if (lines[i].startsWith("  - Id: ")) {

                if (objItem.length > 0) {
                    objEquipItemDB.push(objItem);
                    //console.log("obj pushed " + objItem);
                }
                k++;
                objItem = [];
                objItem[0] = parseInt(lines[i].replace("  - Id: ", "")); //.push(parseInt(lines[i].replace("  - Id: ", "")));
                //console.log("test " + lines[i] + " " + lines[i].replace("-Id:", ""));

            } else if (lines[i].startsWith("    Name: ")) {
                objItem[1] = lines[i].replace("    Name: ", "");
            } else if (lines[i].startsWith("    Type: ")) {
                objItem[2] = lines[i].replace("    Type: ", "");
            } else if (lines[i].startsWith("    SubType: ")) {
                objItem[3] = lines[i].replace("    SubType: ", "");
            } else if (lines[i].startsWith("    Attack: ")) {
                objItem[4] = lines[i].replace("    Attack: ", "");
            } else if (lines[i].startsWith("    Defense: ")) {
                objItem[4] = lines[i].replace("    Defense: ", "");
            } else if (lines[i].startsWith("    Slots: ")) {
                objItem[5] = lines[i].replace("    Slots: ", "");
            } else if (lines[i].startsWith("    Locations:")) {

                if (lines[i + 1].startsWith("      Right_Hand: ") && lines[i + 2].startsWith("      Left_Hand: "))
                    objItem[6] = "Dual_Hand";
                else if (lines[i + 1].startsWith("      Right_Hand: "))
                    objItem[6] = "Right_Hand";
                else if (lines[i + 1].startsWith("      Left_Hand: "))
                    objItem[6] = "Left_Hand";
                else
                    objItem[6] = lines[i + 1].replace(": true", "").trim();

            } else if (lines[i].startsWith("    WeaponLevel: ")) {
                objItem[7] = lines[i].replace("    WeaponLevel: ", "");
            } else if (lines[i].startsWith("    EquipLevelMin: ")) {
                objItem[8] = lines[i].replace("    EquipLevelMin: ", "");
            } else if (lines[i].startsWith("    Refineable: ")) {
                objItem[9] = lines[i].replace("    Refineable: ", "");
            } else if (lines[i].startsWith("    Script:")) {

                objItem[10] = "";
                for (var j = i + 1; j < lines.length; j++) {
                    if (lines[j].startsWith("  - Id: ")) {
                        i = j - 1;
                        break;
                    }
                    objItem[10] += lines[j].trim() + "\n";
                    //console.log(lines[j]);
                }

            }
        }
        objEquipItemDB.push(objItem); // push the last pending option
        console.log("path_item_db_equip file loaded");
        //console.log(objEquipItemDB);
        loadcount--;
        if (loadcount == 0) initSetup();
    });


    // Object initialisation to fetch all cards and details from rAthena file
    // 0:ID,1:Name,2:Type,3:Location,4:Script (pending implementation for script)
    $.get(path_item_db_etc, function(data) {

        objCardItemDB = [];
        var lines = data.split("\n");
        //console.log(lines);

        var k = -1
        var objItem = [];
        for (var i = 0; i < lines.length; i++) {

            //ignore comments and empty lines
            if (lines[i].startsWith("#") || lines[i] === "")
                continue;

            //console.log(lines[i]);

            //check for new Id and start next entry
            if (lines[i].startsWith("  - Id: ")) {

                if (objItem.length > 0) {
                    objCardItemDB.push(objItem);
                    //console.log("obj pushed " + objItem);
                }
                k++;
                objItem = [];
                objItem[0] = parseInt(lines[i].replace("  - Id: ", "")); //.push(parseInt(lines[i].replace("  - Id: ", "")));
                //console.log("test " + lines[i] + " " + lines[i].replace("-Id:", ""));

            } else if (lines[i].startsWith("    Name: ")) {
                objItem[1] = lines[i].replace("    Name: ", "");
            } else if (lines[i].startsWith("    Type: ")) {

                if (lines[i].includes("Card"))
                    objItem[2] = "Card";
                else {
                    //Not a card. skip to next entry
                    //console.log("not a card. skipping to next id " + lines[i]);
                    objItem = [];
                    for (; i < lines.length; i++) {
                        if (lines[i].startsWith("  - Id: ")) {
                            i--;
                            break;
                        }
                    }
                }
            } else if (lines[i].startsWith("    Locations:")) {

                if (lines[i + 1].startsWith("      Head_"))
                    objItem[3] = "Head";
                else
                    objItem[3] = lines[i + 1].replace(": true", "").trim();

            } else if (lines[i].startsWith("    Script: |")) {

                objItem[4] = "";
                for (var j = i + 1; j < lines.length; j++) {
                    if (lines[j].startsWith("  - Id: ")) {
                        i = j - 1;
                        break;
                    }
                    objItem[4] += lines[j].trim() + "\n";
                    //console.log(lines[j]);
                }

            }

        }
        objCardItemDB.push(objItem); // push the last pending option
        console.log("path_item_db_etc file loaded");
        loadcount--;
        if (loadcount == 0) initSetup();
    });

    //test to pull only scripts
    /*
    $.get(path_item_db_equip, function(data) {

        objEquipScriptsDB = [];
        var lines = data.split("\n");
        //console.log(lines);

        var k = -1
        var objID = -1;
        var objItemScript = "";

        for (var i = 0; i < lines.length; i++) {

            //ignore comments and empty lines
            if (lines[i].startsWith("#") || lines[i] === "")
                continue;

            //console.log(lines[i]);

            //check for new Id and start next entry
            if (lines[i].startsWith("  - Id: ")) {

                if (objItemScript && objItemScript.length > 0 && objID > 0) {
                    //console.log("checkobjid " + objID);
                    objEquipScriptsDB[objID] = objItemScript;
                    //console.log("obj pushed " + objItem);
                }
                k++;
                objItemScript = "";
                ObjID = parseInt(lines[i].replace("  - Id: ", "")); //.push(parseInt(lines[i].replace("  - Id: ", "")));
                //console.log("test " + lines[i] + " " + lines[i].replace("-Id:", ""));

            } else if (lines[i].startsWith("    Script:")) {



                objItemScript = "";
                for (var j = i + 1; j < lines.length; j++) {
                    if (lines[j].startsWith("  - Id: "))
                        break;
                    objItemScript += lines[j].trim() + "\n";
                    //console.log(objItemScript);
                }
                //console.log(objItemScript);
            }

        }

        //console.log("checkobjid at end " + ObjID);
        //console.log("check script value at end " + objItemScript);

        if (objItemScript.length > 0 && objID > 0)
            objEquipScriptsDB[objID] = objItemScript;

        console.log("path_item_db_equip file loaded to equip script object");
    });*/
}