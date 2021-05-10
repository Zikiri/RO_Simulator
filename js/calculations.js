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

    /*$('input,select').change(function() {
        console.log('input/select changed');
        refreshAll();
    });*/
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
        objTotalStats[i] = objBaseStats[i] + objJobBonusStats[i] + objEquipBonusStats[i];
}

function calculateSubStats() {
    objSubStats[0] = StatusAtk(nBaseLvl, objTotalStats);
    objSubStats[1] = WeaponAtk();
    objSubStats[2] = StatusMatk(nBaseLvl, objTotalStats);
    objSubStats[3] = WeaponMatk();
    objSubStats[4] = SoftDef(nBaseLvl, objTotalStats);
    objSubStats[5] = HardDef();
    objSubStats[6] = SoftMdef(nBaseLvl, objTotalStats);
    objSubStats[7] = HardMdef();
    objSubStats[8] = TotalHit(nBaseLvl, objTotalStats, 0); // bonus hit pending
    objSubStats[9] = TotalCritRate(objTotalStats, 0); // bonus crit pending
    objSubStats[10] = TotalFlee(nBaseLvl, objTotalStats, 0); // bonus flee pending
    objSubStats[11] = TotalPerfectDodge(objTotalStats, 0); // bonus PD pending
    objSubStats[12] = TotalAspd(nClass, objTotalStats, strRHType);
    objSubStats[13] = MaxHP(nClass, nBaseLvl, objTotalStats, 0, 0);
    objSubStats[14] = MaxSP(nClass, nBaseLvl, objTotalStats, 0, 0);
    objSubStats[15] = 0;
    objSubStats[16] = PendingStatPoints(nBaseLvl, nClass, objBaseStats);
}

function refreshUIValues() {
    //job+equipment bonus stats
    for (var i = 0; i < 6; i++) {
        $('#addStat' + i).html(objJobBonusStats[i] + objEquipBonusStats[i]);
        $('#reqdStat' + i).html(NextStatPointCost(objBaseStats[i]));
    }
    //sub stats
    for (var i = 0; i < 17; i++)
        $('#subStat' + i).html(objSubStats[i]);
}

function updateScriptsinUI() {
    var content = "";
    $.each(objScriptsEquipped, function(val, text) {
        if (text) content += '<br>' + val + ": " + text;
    });
    $('#allscripts').html(content);
}

function calculateScriptBonus() {

    var lexer = new Lexer();
    var parser = null;
    var evaluator = null;

    //jsonActiveScripts = {};
    jsonActiveScripts = JSON.parse(JSON.stringify(jsonActiveScriptsTemplate));

    $.each(objScriptsEquipped, function(val, text) {

        var id = -1;
        for (var i = 0; i < 10; i++)
            if (jsonEquipmentList[i].Name == val) {
                id = i;
                break;
            }

        text = simplify_script(text, id);

        //console.log("simplified script ");
        //console.log(text);

        lexer.tokenize(text);
        parser = new Parser(lexer.lexlist, "SEMICOLON");
        parser.parse();
        evaluator = new Evaluator(parser.p);
        evaluator.evaluate();
    });
}