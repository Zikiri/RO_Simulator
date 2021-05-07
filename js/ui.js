var objBaseStats = [1, 1, 1, 1, 1, 1];
var objJobBonusStats = [0, 0, 0, 0, 0, 0];
var objEquipBonusStats = [0, 0, 0, 0, 0, 0];
var objTotalStats = [1, 1, 1, 1, 1, 1];
var objSubStats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var nClass = 0;
var nClass_eA = 0;
var nBaseClass = 0;
var nBaseJob = 0;
var nBaseLvl = 1;
var nJobLvl = 1;
var objRefineLvls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var strRHType = "";
var strLHType = "";
var objScriptsEquipped = {};
//var objScriptsCards = {};

// Function called when page is ready
$(function() {
    console.log('ready!');

    initialiseObjects();
    initSetup();

    $('.onlynum').keypress(function(event) {

        if (this.type = "Number") {
            var ASCIICode = (event.which) ? event.which : event.keyCode
            if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
                return false;
            return true;
        }
        console.log('key pressed');
    });

    $('input,select').change(function() {
        console.log('input/select changed');
        refreshAll();
    });
});

function initSetup() {
    setupClassList();
    setupEquipmentTable();
    setupListWeaponType();
    setupEquipmentLists();
    setupCardLists();
    setupEquipmentLinks();
    setupWeaponListSwitch();
    setupScriptsEquipped();
    refreshAll();
}

function refreshAll() {
    updateBaseStatData();
    updateJobBonusStatData();
    updateTotalStatsData();
    calculateSubStats();
    refreshUIValues();
    updateScriptsinUI();
}

function setupEquipmentTable() {

    var content = "";
    var i = 0;
    $.each(jsonEquipmentList, function(key, val) {

        //console.log(val.Name + " " + val.CardSlots + " " + val.refine);

        if (i % 2 == 0) content += "<tr>"

        if (i % 2 != 0) content += "<td id=\"" + val.Name + "_link\"> " + val.Label + " </td>";
        content += "<td> ";

        if (i == 4 || i == 5) { // add weapon type
            content += "<select id=\"" + val.Name + "_type\" style=\"width:100px;\"></select>";
        }

        content += "&nbsp;+ <input type=\"number\" id=\"" + val.Name + "_refine\" value=\"0\" min=\"0\" step=\"1\" max=\"20\" style=\"width:35px;\" /> ";
        content += " <select id=\"" + val.Name + "\" style=\"width:" + (i == 4 || i == 5 ? "250" : "350") + "px;float: right;\"></select> ";
        content += " <br /> ";
        for (var j = 0; j < val.CardSlots; j++)
            content += " <select id=\"" + val.Name + "_card" + j + "\" style=\"width:100px;\"></select> ";
        content += "</td>";
        if (i % 2 == 0) content += " <td id=\"" + val.Name + "_link\">" + val.Label + "</td> ";
        if (i == 0) content += " <td rowspan=\"5\">Char</td> "

        if (i % 2 != 0) content += " </tr> "

        i++;
    });
    console.log("equipment table setup");
    $('#EquipmentSection').html(content);


    //hide extra 3 card slots for LH until needed
    $("#Left_Hand_card1").hide();
    $("#Left_Hand_card2").hide();
    $("#Left_Hand_card3").hide();

    $('input,select').change(function() {
        console.log('input/select changed');
        refreshAll();
    });

}

function setupClassList() {
    for (var i = 0; i < jsonClassList.length; i++) {
        if (jsonClassList[i].id < 0)
            $('#Class').append($('<option disabled></option>').val(jsonClassList[i].id).html(jsonClassList[i].Name));
        else
            $('#Class').append($('<option></option>').val(jsonClassList[i].id).html(jsonClassList[i].Name));
    }
}

function setupListWeaponType() {

    $.each(jsonWeaponTypeList, function(val, text) {
        if (val != "Shield" && !text.includes("unused"))
            $('#Right_Hand_type').append($('<option></option>').val(val).html(text));
        if (val == "Shield" || val == "Dagger" || val == "1hSword" || val == "1hAxe" || val == "Unarmed")
            $('#Left_Hand_type').append($('<option></option>').val(val).html(text));
        //console.log("testRightLeftHandtypelist");
    });
}

function updateBaseStatData() {

    nClass = parseInt($("#Class").val().trim());
    nBaseLvl = parseInt($("#BaseLvl").val());
    nJobLvl = parseInt($("#JobLvl").val());

    strRHType = "Unarmed";
    strLHType = "Unarmed";

    for (var i = 0; i < jsonClassList.length; i++)
        if (jsonClassList[i].id == nClass) { nClass_eA = jsonClassList[i].ea_id; break; }

    nBaseClass = nClass_eA & EAJ_BASEMASK;
    nBaseJob = nClass_eA & EAJ_UPPERMASK;

    for (var i = 0; i < 6; i++)
        objBaseStats[i] = parseInt($("#baseStat" + i).val());

    for (var i = 0; i < 10; i++)
        objRefineLvls[i] = parseInt($("#" + jsonEquipmentList[i].Name + "_refine").val());
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

//fill select lists for all equipments except weapon
function setupEquipmentLists() {

    var i = 0
    $.each(jsonEquipmentList, function(val, text) {
        $('#' + val).empty();
        $('<option/>').val("0").html(" No " + text.Label).appendTo('#' + text.Name);
        //console.log("setupequip " + '#' + text.Name);
        for (j = 0; j < objEquipItemDB.length; j++) {

            if (objEquipItemDB[j][2] == "Armor" && objEquipItemDB[j][6] == text.Name && objEquipItemDB[j][6] != "Left_Hand")
                $('<option/>').val(objEquipItemDB[j][0]).html(objEquipItemDB[j][1]).appendTo('#' + text.Name);
            if (objEquipItemDB[j][2] == "Armor" && objEquipItemDB[j][6] == "Both_Accessory" && text.Name.includes("Accessory"))
                $('<option/>').val(objEquipItemDB[j][0]).html(objEquipItemDB[j][1]).appendTo('#' + text.Name);
        }

        var options = $('#' + text.Name + ' option');
        var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
        arr.sort(function(o1, o2) { return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0; });
        options.each(function(i, o) {
            o.value = arr[i].v;
            $(o).text(arr[i].t);
        });

        i++;
    });
}

function setupCardLists() {

    $.each(jsonEquipmentList, function(val, text) {
        for (var i = 0; i < text.CardSlots; i++) {
            $('#' + text.Name + '_card' + i).empty();
            $('<option/>').val("0").html(" No Card").appendTo('#' + text.Name + '_card' + i);

            for (j = 0; j < objCardItemDB.length; j++) {

                if ((objCardItemDB[j][3] == text.Name) || (objCardItemDB[j][3] == "Both_Accessory" && text.Name.includes("Accessory")) || (text.Name.substring(0, 4) == objCardItemDB[j][3]))
                    $('<option/>').val(objCardItemDB[j][0]).html(objCardItemDB[j][1]).appendTo('#' + text.Name + '_card' + i);
                //else if (objCardItemDB[j][1] == "Willow Card") console.log("error debug " + objCardItemDB[j][3] + " " + text.Name.substring(0, 4));
            }

            var options = $('#' + text.Name + '_card' + i + ' option');
            var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
            arr.sort(function(o1, o2) { return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0; });
            options.each(function(i, o) {
                o.value = arr[i].v;
                $(o).text(arr[i].t);
            });
        }
    });
}

function setupEquipmentLinks() {

    $.each(jsonEquipmentList, function(val, text) {

        var eleEquiplist = "#" + text.Name;

        for (var i = 0; i < text.CardSlots; i++)
            eleEquiplist += ",#" + text.Name + "_card" + i;

        if (text.Name.includes("Hand"))
            eleEquiplist += ",#" + text.Name + "_type";


        $(eleEquiplist).change(function() {

            eleID = this.id;
            eleValue = this.value;

            eleID = eleID.substring(0, (eleID.indexOf("_card") < 1 ? eleID.length : eleID.indexOf("_card")));
            eleID = eleID.substring(0, (eleID.indexOf("_type") < 1 ? eleID.length : eleID.indexOf("_type")));

            //console.log(eleID + " " + eleValue + ' changed ' + eleID.indexOf("_card"));
            //console.log(jsonEquipmentList[eleID]);
            var text = "";

            for (var k = 0; k < Object.keys(jsonEquipmentList).length; k++) {
                if (jsonEquipmentList[k].Name == eleID) break;
            }

            if ($('#' + eleID).val() != 0) {
                text += "<img src=\"https://static.divine-pride.net/images/items/item/" + $('#' + eleID).val() + ".png\">";
                text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#' + eleID).val() + "\">" + $('#' + eleID + ' option:selected').text() + "</a><br />";
            } else
                text += jsonEquipmentList[k].Label + "<br />";


            for (var j = 0; j < jsonEquipmentList[k].CardSlots; j++) {
                if ($('#' + eleID + "_card" + j).val() && $('#' + eleID + "_card" + j).val() != 0)
                    text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#' + eleID + "_card" + j).val() + "\">" + "Card" + (j + 1) + " " + "</a>";
            }
            //console.log('#' + eleID + "_link " + text);
            $('#' + eleID + "_link").html(text);
        });

    });

}

function setupWeaponListSwitch() {

    $("#Left_Hand_type,#Right_Hand_type").change(function() {

        //console.log(this.id + ' changed');

        if (objEquipItemDB.length < 1) return;

        eleID = this.id.substring(0, this.id.indexOf("_Hand")) + "_Hand";
        eleLabel = this.id.substring(0, this.id.indexOf("_Hand")) + " Hand";
        eleIDCard = eleID + "_card";
        $('#' + eleID).empty();

        //0:ID,1:Name,2:Type,3:SubType,4:Attack/def,5:Slots,6:Location,7:WeaponLvl,8:EquipLevelMin,9:Refineable

        if ($('#' + this.id).val() == "Unarmed") {
            $('<option/>').val("0").html("No " + eleLabel).appendTo('#' + eleID);
        } else {

            for (var i = 0; i < objEquipItemDB.length; i++) {

                if ($('#' + this.id).val() == objEquipItemDB[i][3] || ($('#' + this.id).val() == "Shield" && objEquipItemDB[i][6] == eleID))
                    $('<option/>').val(objEquipItemDB[i][0]).html(objEquipItemDB[i][1]).appendTo('#' + eleID);
            }


        }

        if (this.id == "Left_Hand_type") {

            var cardSlots;

            if ($('#' + this.id).val() == "Shield" || $('#' + this.id).val() == "Unarmed") {
                for (var i = 1; i < 4; i++) {
                    $('#Left_Hand_card' + i).empty();
                    $("#Left_Hand_card" + i).hide();
                }
                cardSlots = 1;
            } else {
                for (var i = 1; i < 4; i++) {
                    $('#Left_Hand_card' + i).empty();
                    $("#Left_Hand_card" + i).show();
                }
                cardSlots = 4;
            }
            // 0:ID,1:Name,2:Type,3:Location,4:Script
            for (var i = 0; i < cardSlots; i++) {
                //console.log('#' + eleIDCard + i);
                $('#' + eleIDCard + i).empty();
                $('<option/>').val("0").html(" No Card").appendTo('#' + eleIDCard + i);

                for (j = 0; j < objCardItemDB.length; j++) {

                    if ((objCardItemDB[j][3] == eleID && ($('#' + this.id).val() == "Shield" || $('#' + this.id).val() == "Unarmed")) || (!($('#' + this.id).val() == "Shield" || $('#' + this.id).val() == "Unarmed") && objCardItemDB[j][3] == "Right_Hand"))
                        $('<option/>').val(objCardItemDB[j][0]).html(objCardItemDB[j][1]).appendTo('#' + eleIDCard + i);
                    //else if (objCardItemDB[j][1] == "Willow Card") console.log("error debug " + objCardItemDB[j][3] + " " + text.Name.substring(0, 4));
                }

                var options = $('#' + eleIDCard + i + ' option');
                var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
                arr.sort(function(o1, o2) { return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0; });
                options.each(function(i, o) {
                    o.value = arr[i].v;
                    $(o).text(arr[i].t);
                });
            }

        }

        var options = $('#' + eleID + ' option');
        var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
        arr.sort(function(o1, o2) { return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0; });
        options.each(function(i, o) {
            o.value = arr[i].v;
            $(o).text(arr[i].t);
        });

        $("#" + eleID).trigger("change");

    });

}

function setupScriptsEquipped() {

    $.each(jsonEquipmentList, function(val, text) {

        var eleEquiplist = "#" + text.Name;
        $(eleEquiplist).change(function() {

            objScriptsEquipped[this.id] = "";
            for (var i = 0; i < objEquipItemDB.length; i++) {
                if (objEquipItemDB[i][0] == this.value && objEquipItemDB[i][10]) {
                    objScriptsEquipped[this.id] = objEquipItemDB[i][10];
                    break;
                }
            }
            updateScriptsinUI();
        });
    });

    $.each(jsonEquipmentList, function(val, text) {

        for (var i = 0; i < text.CardSlots; i++) {
            var eleCardList = '#' + text.Name + '_card' + i;
            $(eleCardList).change(function() {

                objScriptsEquipped[this.id] = "";
                for (var i = 0; i < objCardItemDB.length; i++) {
                    if (objCardItemDB[i][0] == this.value && objCardItemDB[i][4]) {
                        objScriptsEquipped[this.id] = objCardItemDB[i][4];
                        break;
                    }
                }
                updateScriptsinUI();
            });
        }
    });


}

function updateScriptsinUI() {
    var content = "";
    $.each(objScriptsEquipped, function(val, text) {
        content += '<br>' + val + ": " + text;
    });
    $('#allscripts').html(content);

    calculateScriptBonus();
}

function calculateScriptBonus() {

    var lexer = new Lexer();
    var parser = null;
    var evaluator = null;

    jsonActiveScripts = {};

    $.each(objScriptsEquipped, function(val, text) {

        var id = -1;
        for (var i = 0; i < 10; i++)
            if (jsonEquipmentList[i].Name == val) {
                id = i;
                break;
            }

        text = simplify_script(text, id);

        lexer.tokenize(text);
        parser = new Parser(lexer.lexlist, "SEMICOLON");
        parser.parse();
        evaluator = new Evaluator(parser.p);
        evaluator.evaluate();
    });


    /*
        if (objScriptsEquipped['Head_Top'] && objScriptsEquipped['Head_Top'] != "") {

            const lexer = new Lexer();
            lexer.tokenize(objScriptsEquipped['Head_Top']);
            //console.log(lexer.lexlist);

            const parser = new Parser(lexer.lexlist, "SEMICOLON");
            parser.parse();

            const evaluator = new Evaluator(parser.p);
            evaluator.evaluate();
            console.log(evaluator.data);

        }
    */

}