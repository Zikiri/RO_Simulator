// Function called when page is ready
$(function() {
    console.log('ready!');

    initialiseObjects();
    //initSetup();
    //refreshAll();

    $('.onlynum').keypress(function(event) {

        if (this.type = "Number") {
            var ASCIICode = (event.which) ? event.which : event.keyCode
            if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
                return false;
            return true;
        }
        console.log('key pressed');
    });
});


function refreshAll() {
    console.log("refresh all called");
    calculateScriptBonus();
    updateTotalStatsData();
    calculateSubStats();
    refreshUIValues();
}

function updateJobBonusStatData() {
    objJobBonusStats = JobBonusStats(nClass, nJobLvl);
}

function updateTotalStatsData() {
    for (var i = 0; i < 6; i++)
        objTotalStats[i] = objBaseStats[i] + objJobBonusStats[i] + jsonActiveScripts[jsonPrimaryStatList[i]] // objEquipBonusStats[i];
}

function calculateSubStats() {
    objSubStats[0] = StatusAtk(nBaseLvl, objTotalStats, strRHType);
    objSubStats[1] = WeaponAtk(objEquipData, objRefineLvls, jsonActiveScripts);
    objSubStats[2] = StatusMatk(nBaseLvl, objTotalStats);
    objSubStats[3] = WeaponMatk();
    objSubStats[4] = SoftDef(nBaseLvl, objTotalStats);
    objSubStats[5] = HardDef();
    objSubStats[6] = SoftMdef(nBaseLvl, objTotalStats);
    objSubStats[7] = HardMdef();
    objSubStats[8] = TotalHit(nBaseLvl, objTotalStats, jsonActiveScripts['bHit']);
    objSubStats[9] = TotalCritRate(objTotalStats, jsonActiveScripts['bCritical']);
    objSubStats[10] = TotalFlee(nBaseLvl, objTotalStats, jsonActiveScripts['bFlee']);
    objSubStats[11] = TotalPerfectDodge(objTotalStats, jsonActiveScripts['bFlee2']);
    objSubStats[12] = TotalAspd(nClass, objTotalStats, strRHType);
    objSubStats[13] = MaxHP(nClass, nBaseLvl, objTotalStats, jsonActiveScripts['bMaxHP'], jsonActiveScripts['bMaxHPrate']);
    objSubStats[14] = MaxSP(nClass, nBaseLvl, objTotalStats, jsonActiveScripts['bMaxSP'], jsonActiveScripts['bMaxSPrate']);
    objSubStats[15] = WeightLimit();
    objSubStats[16] = PendingStatPoints(nBaseLvl, nClass, objBaseStats);
}

function refreshUIValues() {
    //job+equipment bonus stats
    for (var i = 0; i < 6; i++) {
        $('#addStat' + i).html(objJobBonusStats[i] + jsonActiveScripts[jsonPrimaryStatList[i]]);
        $('#reqdStat' + i).html(NextStatPointCost(objBaseStats[i]));
    }
    //sub stats
    for (var i = 0; i < 17; i++)
        $('#subStat' + i).html(objSubStats[i]);
}

function updateScriptsinUI() {
    var content = "";
    $.each(objEquipData, function(val, text) {
        //    $.each(objScriptsEquipped, function(val, text) {
        if (text && text[10]) content += '<br>' + val + ": " + text[10];
    });
    $('#allscripts').html(content);
}

function calculateScriptBonus() {

    var lexer = new Lexer();
    var parser = null;
    var evaluator = null;

    //jsonActiveScripts = {};
    jsonActiveScripts = JSON.parse(JSON.stringify(jsonActiveScriptsTemplate));

    $.each(objEquipData, function(val, text) {
        //$.each(objScriptsEquipped, function(val, text) {
        var id = -1;
        for (var i = 0; i < 10; i++)
            if (jsonEquipmentList[i].Name == val) {
                id = i;
                break;
            }

        if (text[10]) {
            var temp = JSON.parse(JSON.stringify(text[10])); // need to create copy so that the original script is preserved and not modified in subsequent calculations
            //console.log("passed id " + id);
            temp = simplify_script(temp, id);

            //console.log("simplified script ");
            //console.log(temp);

            lexer.tokenize(temp);
            parser = new Parser(lexer.lexlist, "SEMICOLON");
            parser.parse();
            evaluator = new Evaluator(parser.p);
            evaluator.evaluate();
        }
    });
}