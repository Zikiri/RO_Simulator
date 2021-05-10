// Functions dealing with inital setup on first load

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

    $('#Class').change(function() {
        console.log('Class changed');

        nClass = parseInt($("#Class").val().trim());
        for (var i = 0; i < jsonClassList.length; i++)
            if (jsonClassList[i].id == nClass) { nClass_eA = jsonClassList[i].ea_id; break; }

        nBaseClass = nClass_eA & EAJ_BASEMASK;
        nBaseJob = nClass_eA & EAJ_UPPERMASK;
        // add function call to update UI
        //update equip list(maybe / no implementation as of yet)
        updateJobBonusStatData();
        //update sub stats

        refreshAll();
    });

    $('.level').change(function() {
        nBaseLvl = parseInt($("#BaseLvl").val());
        nJobLvl = parseInt($("#JobLvl").val());

        updateJobBonusStatData();
        // update equip list as per lvl req (maybe / no implementation as of yet)
        // update substats
        refreshAll();
    });

    $('.basestat').change(function() {

        for (var i = 0; i < 6; i++)
            objBaseStats[i] = parseInt($("#baseStat" + i).val());

        refreshAll();
    });

    $('.refine').change(function() {

        for (var i = 0; i < 10; i++)
            objRefineLvls[i] = parseInt($("#" + jsonEquipmentList[i].Name + "_refine").val());

        // update substats
        // update scripts (since some are reliant on refine levels)

        calculateScriptBonus();
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


function setupEquipmentTable() {

    var content = "";
    var i = 0;
    $.each(jsonEquipmentList, function(key, val) {

        if (i % 2 == 0) content += "<tr>"
        if (i % 2 != 0) content += "<td id=\"" + val.Name + "_link\"> " + val.Label + " </td>";
        content += "<td> ";

        if (i == 4 || i == 5) { // add weapon type
            content += "<select id=\"" + val.Name + "_type\" style=\"width:100px;\" class=\"weapontype\"></select>";
        }

        content += "&nbsp;+ <input type=\"number\" id=\"" + val.Name + "_refine\" value=\"0\" min=\"0\" step=\"1\" max=\"20\" style=\"width:35px;\" class=\"refine\" /> ";
        content += " <select id=\"" + val.Name + "\" style=\"width:" + (i == 4 || i == 5 ? "250" : "350") + "px;float: right;\" class=\"equip\"></select> ";
        content += " <br /> ";
        for (var j = 0; j < val.CardSlots; j++)
            content += " <select id=\"" + val.Name + "_card" + j + "\" style=\"width:100px;\" class=\"card\"></select> ";
        content += "</td>";
        if (i % 2 == 0) content += " <td id=\"" + val.Name + "_link\" class=\"link\">" + val.Label + "</td> ";
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


function setupListWeaponType() {
    $.each(jsonWeaponTypeList, function(val, text) {
        if (val != "Shield" && !text.includes("unused"))
            $('#Right_Hand_type').append($('<option></option>').val(val).html(text));
        if (val == "Shield" || val == "Dagger" || val == "1hSword" || val == "1hAxe" || val == "Unarmed")
            $('#Left_Hand_type').append($('<option></option>').val(val).html(text));
    });
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
                text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#' + eleID).val() + "\">";
                text += "<img src=\"https://static.divine-pride.net/images/items/item/" + $('#' + eleID).val() + ".png\">";
                text += "</a><br />";
                //text += "<img src=\"https://static.divine-pride.net/images/items/item/" + $('#' + eleID).val() + ".png\">";
                //text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#' + eleID).val() + "\">" + $('#' + eleID + ' option:selected').text() + "</a><br />";
            } else
                text += jsonEquipmentList[k].Label + "<br />";


            for (var j = 0; j < jsonEquipmentList[k].CardSlots; j++) {
                if ($('#' + eleID + "_card" + j).val() && $('#' + eleID + "_card" + j).val() != 0) {
                    text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#' + eleID + "_card" + j).val() + "\">";
                    text += "<img src=\"https://static.divine-pride.net/images/items/item/" + $('#' + eleID + "_card" + j).val() + ".png\">";
                    text += "</a>";
                    //text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#' + eleID + "_card" + j).val() + "\">" + "Card" + (j + 1) + " " + "</a>";
                }
            }
            //console.log('#' + eleID + "_link " + text);
            $('#' + eleID + "_link").html(text);
        });
    });
}


function setupWeaponListSwitch() {

    $("#Left_Hand_type,#Right_Hand_type").change(function() {

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
            calculateScriptBonus();
            updateScriptsinUI();
            refreshAll();
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
                calculateScriptBonus();
                updateScriptsinUI();
                refreshAll();
            });
        }
    });
}