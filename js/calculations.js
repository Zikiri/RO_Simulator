var objJobBonusStats = [];
var objBaseHPSP = [];
var objTotalStatValues = [];
var objAspdTable = [];
var objEquipItemDB = [];
var objCardItemDB = [];

// Object initialisation to fetch  base hp and sp values
$.get('data/rathena_files/db/re/job_basehpsp_db.txt', function(data) {
    var lines = data.split("\n");
    objBaseHPSP = [];
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("//") || lines[i] === "")
            continue;
        objBaseHPSP.push(lines[i].split(","));
    }
    console.log("job_basehpsp_db file loaded");
    Calculate();
});

// Object initialisation to fetch bonus stats for all jobs
$.get('data/rathena_files/db/job_db2.txt', function(data) {
    var lines = data.split("\n");
    objJobBonusStats = [];
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("//") || lines[i] === "")
            continue;
        objJobBonusStats.push(lines[i].split(","));
    }
    console.log("job_db2 file loaded");
    Calculate();
});

// Object initialisation to fetch base aspd values from rAthena file
$.get('data/rathena_files/db/re/job_db1.txt', function(data) {

    var lines = data.replace(/ /g, "").split("\n");
    objAspdTable = [];
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("//") || lines[i] === "")
            continue;
        objAspdTable.push(lines[i].split(","));
    }
    console.log("job_db1 file loaded");
    //console.log(objAspdTable);
    Calculate();

});

// Object initialisation to fetch all equips and details from rAthena file
// 0:ID,1:Name,2:Type,3:SubType,4:Attack/def,5:Slots,6:Location,7:WeaponLvl,8:EquipLevelMin,9:Refineable,10:Script (script pending implementation)
$.get('data/rathena_files/db/re/item_db_equip.yml', function(data) {

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
        }
    }
    objEquipItemDB.push(objItem); // push the last pending option
    //console.log(objEquipItemDB);

    PopulateEquipmentList();
});


// Object initialisation to fetch all cards and details from rAthena file
// 0:ID,1:Name,2:Type,3:Location,4:Script (pending implementation for script)
$.get('data/rathena_files/db/re/item_db_etc.yml', function(data) {

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

        }

    }
    objCardItemDB.push(objItem); // push the last pending option
    //console.log(objCardItemDB);

    PopulateCardsList()
});

// Function called when page is ready
$(function() {
    console.log('ready!');

    // Initial data setup
    Calculate();

    //input change update
    $('input,select').change(function() {
        console.log('input/select changed');
        Calculate();
    })

    //input type=Number allow only numbers
    $('input').keypress(function(event) {

        if (this.type = "Number") {
            var ASCIICode = (event.which) ? event.which : event.keyCode
            if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
                return false;
            return true;
        }
        console.log('key pressed');
    })

    $.each(WeaponTypeList, function(val, text) {
        if (val != "Shield" && !text.includes("unused"))
            $('#RightHandType').append($('<option></option>').val(val).html(text))
        if (val == "Shield" || val == "Dagger" || val == "1hSword" || val == "1hAxe" || val == "Unarmed")
            $('#LeftHandType').append($('<option></option>').val(val).html(text))
        console.log("testRightLeftHandtypelist");
    });

    $('#RightHandType').change(function() {
        console.log('RightHandType changed');

        if (objEquipItemDB.length < 1) return;

        $('#RightHand').empty();

        //0:ID,1:Name,2:Type,3:SubType,4:Attack/def,5:Slots,6:Location,7:WeaponLvl,8:EquipLevelMin,9:Refineable

        if ($('#RightHandType').val() == "Unarmed") {
            $('<option/>').val("0").html("No Weapon").appendTo('#RightHand');
        } else {

            for (var i = 0; i < objEquipItemDB.length; i++) {

                if ($('#RightHandType').val() == objEquipItemDB[i][3])
                    $('<option/>').val(objEquipItemDB[i][0]).html(objEquipItemDB[i][1]).appendTo('#RightHand');
            }
        }
        Calculate();
    });


    $('#LeftHandType').change(function() {
        console.log('LeftHandType changed');

        if (objEquipItemDB.length < 1) return;

        $('#LeftHand').empty();

        //0:ID,1:Name,2:Type,3:SubType,4:Attack/def,5:Slots,6:Location,7:WeaponLvl,8:EquipLevelMin,9:Refineable

        if ($('#LeftHandType').val() == "Unarmed") {
            $('<option/>').val("0").html("No Weapon").appendTo('#LeftHand');
        } else {

            for (var i = 0; i < objEquipItemDB.length; i++) {
                if ($('#LeftHandType').val() == objEquipItemDB[i][3] || ($('#LeftHandType').val() == "Shield" && objEquipItemDB[i][6] == "Left_Hand"))
                    $('<option/>').val(objEquipItemDB[i][0]).html(objEquipItemDB[i][1]).appendTo('#LeftHand');
            }
        }

        $('#LeftHandCard1').empty();
        $('#LeftHandCard2').empty();
        $('#LeftHandCard3').empty();
        $('#LeftHandCard4').empty();
        $('<option/>').val("0").html("No Card").appendTo('#LeftHandCard1');
        $('<option/>').val("0").html("No Card").appendTo('#LeftHandCard2');
        $('<option/>').val("0").html("No Card").appendTo('#LeftHandCard3');
        $('<option/>').val("0").html("No Card").appendTo('#LeftHandCard4');
        for (i = 0; i < objCardItemDB.length; i++) {
            if ($('#LeftHandType').val() != "Shield") {
                $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#LeftHandCard1');
                $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#LeftHandCard2');
                $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#LeftHandCard3');
                $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#LeftHandCard4');
            } else if (objCardItemDB[i][3] == "Left_Hand" && $('#LeftHandType').val() == "Shield") {
                $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#LeftHandCard1');
            }
        }
        Calculate();
    });


    $('#RightHandType,#RightHand,#RightHandCard1,#RightHandCard2,#RightHandCard3,#RightHandCard4').change(function() {
        console.log('RightHand changed');

        var text = "";

        if ($('#RightHand').val() != 0) {
            text += "<img src=\"https://static.divine-pride.net/images/items/item/" + $('#RightHand').val() + ".png\">";
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#RightHand').val() + "\">" + $('#RightHand option:selected').text() + "</a><br />";
        } else
            text += "Right Weapon<br />";
        if ($('#RightHandCard1').val() != 0)
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#RightHandCard1').val() + "\">" + "Card1 " + "</a>";
        if ($('#RightHandCard2').val() != 0)
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#RightHandCard2').val() + "\">" + "Card2 " + "</a>";
        if ($('#RightHandCard3').val() != 0)
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#RightHandCard3').val() + "\">" + "Card3 " + "</a>";
        if ($('#RightHandCard4').val() != 0)
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#RightHandCard4').val() + "\">" + "Card4" + "</a>";

        //console.log(text);
        $('#LinkRightHand').html(text);
    });


    $('#LeftHandType,#LeftHand,#LeftHandCard1,#LeftHandCard2,#LeftHandCard3,#LeftHandCard4').change(function() {
        console.log('LeftHand changed');

        var text = "";

        if ($('#LeftHand').val() != 0) {
            text += "<img src=\"https://static.divine-pride.net/images/items/item/" + $('#LeftHand').val() + ".png\">";
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#LeftHand').val() + "\">" + $('#LeftHand option:selected').text() + "</a><br />";
        } else
            text += "Left Weapon<br />";
        if ($('#LeftHandCard1').val() != 0)
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#LeftHandCard1').val() + "\">" + "Card1 " + "</a>";
        if ($('#LeftHandCard2').val() != 0)
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#LeftHandCard2').val() + "\">" + "Card2 " + "</a>";
        if ($('#LeftHandCard3').val() != 0)
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#LeftHandCard3').val() + "\">" + "Card3 " + "</a>";
        if ($('#LeftHandCard4').val() != 0)
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#LeftHandCard4').val() + "\">" + "Card4" + "</a>";

        //console.log(text);
        $('#LinkLeftHand').html(text);
    });




    $('#HeadTop,#HeadTopCard1').change(function() {
        console.log('Head top changed');
        var text = "";
        if ($('#HeadTop').val() != 0) {
            text += "<img src=\"https://static.divine-pride.net/images/items/item/" + $('#HeadTop').val() + ".png\">";
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#HeadTop').val() + "\">" + $('#HeadTop option:selected').text() + "</a><br />";
        } else
            text += "Top Head<br />";
        if ($('#HeadTopCard1').val() != 0)
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#HeadTopCard1').val() + "\">" + "Card1 " + "</a>";
        $('#LinkHeadTop').html(text);
    });

    $('#HeadMid,#HeadMidCard1').change(function() {
        console.log('Head mid changed');
        var text = "";
        if ($('#HeadMid').val() != 0) {
            text += "<img src=\"https://static.divine-pride.net/images/items/item/" + $('#HeadMid').val() + ".png\">";
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#HeadMid').val() + "\">" + $('#HeadMid option:selected').text() + "</a><br />";
        } else
            text += "Mid Head<br />";
        if ($('#HeadMidCard1').val() != 0)
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#HeadMidCard1').val() + "\">" + "Card1 " + "</a>";
        $('#LinkHeadMid').html(text);
    });

    $('#HeadLow,#HeadLowCard1').change(function() {
        console.log('Head low changed');
        var text = "";
        if ($('#HeadLow').val() != 0) {
            text += "<img src=\"https://static.divine-pride.net/images/items/item/" + $('#HeadLow').val() + ".png\">";
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#HeadLow').val() + "\">" + $('#HeadLow option:selected').text() + "</a><br />";
        } else
            text += "Low Head<br />";
        if ($('#HeadLowCard1').val() != 0)
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#HeadLowCard1').val() + "\">" + "Card1 " + "</a>";
        $('#LinkHeadLow').html(text);
    });

    $('#Armor,#ArmorCard1').change(function() {
        console.log('Head low changed');
        var text = "";
        if ($('#Armor').val() != 0) {
            text += "<img src=\"https://static.divine-pride.net/images/items/item/" + $('#Armor').val() + ".png\">";
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#Armor').val() + "\">" + $('#Armor option:selected').text() + "</a><br />";
        } else
            text += "Armor<br />";
        if ($('#ArmorCard1').val() != 0)
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#ArmorCard1').val() + "\">" + "Card1 " + "</a>";
        $('#LinkArmor').html(text);
    });

    $('#Garment,#GarmentCard1').change(function() {
        console.log('Head low changed');
        var text = "";
        if ($('#Garment').val() != 0) {
            text += "<img src=\"https://static.divine-pride.net/images/items/item/" + $('#Garment').val() + ".png\">";
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#Garment').val() + "\">" + $('#Garment option:selected').text() + "</a><br />";
        } else
            text += "Garment<br />";
        if ($('#GarmentCard1').val() != 0)
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#GarmentCard1').val() + "\">" + "Card1 " + "</a>";
        $('#LinkGarment').html(text);
    });

    $('#Shoes,#ShoesCard1').change(function() {
        console.log('Head low changed');
        var text = "";
        if ($('#Shoes').val() != 0) {
            text += "<img src=\"https://static.divine-pride.net/images/items/item/" + $('#Shoes').val() + ".png\">";
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#Shoes').val() + "\">" + $('#Shoes option:selected').text() + "</a><br />";
        } else
            text += "Shoes<br />";
        if ($('#ShoesCard1').val() != 0)
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#ShoesCard1').val() + "\">" + "Card1 " + "</a>";
        $('#LinkShoes').html(text);
    });

    $('#AccessoryRight,#AccessoryRightCard1').change(function() {
        console.log('Head low changed');
        var text = "";
        if ($('#AccessoryRight').val() != 0) {
            text += "<img src=\"https://static.divine-pride.net/images/items/item/" + $('#AccessoryRight').val() + ".png\">";
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#AccessoryRight').val() + "\">" + $('#AccessoryRight option:selected').text() + "</a><br />";
        } else
            text += "Right Accessory<br />";
        if ($('#AccessoryRightCard1').val() != 0)
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#AccessoryRightCard1').val() + "\">" + "Card1 " + "</a>";
        $('#LinkAccessoryRight').html(text);
    });

    $('#AccessoryLeft,#AccessoryLeftCard1').change(function() {
        console.log('Head low changed');
        var text = "";
        if ($('#AccessoryLeft').val() != 0) {
            text += "<img src=\"https://static.divine-pride.net/images/items/item/" + $('#AccessoryLeft').val() + ".png\">";
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#AccessoryLeft').val() + "\">" + $('#AccessoryLeft option:selected').text() + "</a><br />";
        } else
            text += "Left Accessory<br />";
        if ($('#AccessoryLeftCard1').val() != 0)
            text += "<a href=\"https://www.divine-pride.net/database/item/" + $('#AccessoryLeftCard1').val() + "\">" + "Card1 " + "</a>";
        $('#LinkAccessoryLeft').html(text);
    });

});


//Populate all equips except weapons (weapon populate depends on SubType)
// 0:ID,1:Name,2:Type,3:SubType,4:Attack/def,5:Slots,6:Location,7:WeaponLvl,8:EquipLevelMin,9:Refineable,10:Script (script pending implementation)
function PopulateEquipmentList() {

    $('#HeadTop').empty();
    $('#HeadMid').empty();
    $('#HeadLow').empty();
    $('#Armor').empty();
    $('#Garment').empty();
    $('#Shoes').empty();
    $('#AccessoryRight').empty();
    $('#AccessoryLeft').empty();

    $('<option/>').val("0").html("No Headgear").appendTo('#HeadTop');
    $('<option/>').val("0").html("No Headgear").appendTo('#HeadMid');
    $('<option/>').val("0").html("No Headgear").appendTo('#HeadLow');
    $('<option/>').val("0").html("No Armor").appendTo('#Armor');
    $('<option/>').val("0").html("No Garment").appendTo('#Garment');
    $('<option/>').val("0").html("No Shoes").appendTo('#Shoes');
    $('<option/>').val("0").html("No Accessory").appendTo('#AccessoryRight');
    $('<option/>').val("0").html("No Accessory").appendTo('#AccessoryLeft');

    console.log("PopulateEquipmentList called" + objEquipItemDB.length);
    for (i = 0; i < objEquipItemDB.length; i++) {
        if (objEquipItemDB[i][2] == "Armor" && objEquipItemDB[i][6] == "Head_Top")
            $('<option/>').val(objEquipItemDB[i][0]).html(objEquipItemDB[i][1]).appendTo('#HeadTop');
        else if (objEquipItemDB[i][2] == "Armor" && objEquipItemDB[i][6] == "Head_Mid")
            $('<option/>').val(objEquipItemDB[i][0]).html(objEquipItemDB[i][1]).appendTo('#HeadMid');
        else if (objEquipItemDB[i][2] == "Armor" && objEquipItemDB[i][6] == "Head_Low")
            $('<option/>').val(objEquipItemDB[i][0]).html(objEquipItemDB[i][1]).appendTo('#HeadLow');
        else if (objEquipItemDB[i][2] == "Armor" && objEquipItemDB[i][6] == "Armor")
            $('<option/>').val(objEquipItemDB[i][0]).html(objEquipItemDB[i][1]).appendTo('#Armor');
        else if (objEquipItemDB[i][2] == "Armor" && objEquipItemDB[i][6] == "Garment")
            $('<option/>').val(objEquipItemDB[i][0]).html(objEquipItemDB[i][1]).appendTo('#Garment');
        else if (objEquipItemDB[i][2] == "Armor" && objEquipItemDB[i][6] == "Shoes")
            $('<option/>').val(objEquipItemDB[i][0]).html(objEquipItemDB[i][1]).appendTo('#Shoes');
        else if (objEquipItemDB[i][2] == "Armor" && objEquipItemDB[i][6].includes("Accessory")) {
            if (objEquipItemDB[i][6] == "Right_Accessory" || objEquipItemDB[i][6] == "Both_Accessory")
                $('<option/>').val(objEquipItemDB[i][0]).html(objEquipItemDB[i][1]).appendTo('#AccessoryRight');
            if (objEquipItemDB[i][6] == "Left_Accessory" || objEquipItemDB[i][6] == "Both_Accessory")
                $('<option/>').val(objEquipItemDB[i][0]).html(objEquipItemDB[i][1]).appendTo('#AccessoryLeft');
        } else {
            //console.log(i);
            //if (!objEquipItemDB[i][6].includes("Costume") && !objEquipItemDB[i][2].includes("Weapon"))
            //    console.log("missed type " + /*objEquipItemDB[i][6] + " " + objEquipItemDB[i][1] + " " + objEquipItemDB[i][2] + " " +*/ objEquipItemDB[i]);
        }

    }

}


// 0:ID,1:Name,2:Type,3:Location,4:Script
function PopulateCardsList() {

    //Weapon cards
    $('#RightHandCard1').empty();
    $('#RightHandCard2').empty();
    $('#RightHandCard3').empty();
    $('#RightHandCard4').empty();
    $('#LeftHandCard1').empty();
    $('#LeftHandCard2').empty();
    $('#LeftHandCard3').empty();
    $('#LeftHandCard4').empty();
    $('#HeadTopCard1').empty();
    $('#ArmorCard1').empty();
    $('#GarmentCard1').empty();
    $('#ShoesCard1').empty();
    $('#AccessoryRightCard1').empty();
    $('#AccessoryLeftCard1').empty();

    $('<option/>').val("0").html("No Card").appendTo('#RightHandCard1');
    $('<option/>').val("0").html("No Card").appendTo('#RightHandCard2');
    $('<option/>').val("0").html("No Card").appendTo('#RightHandCard3');
    $('<option/>').val("0").html("No Card").appendTo('#RightHandCard4');
    $('<option/>').val("0").html("No Card").appendTo('#LeftHandCard1');
    $('<option/>').val("0").html("No Card").appendTo('#LeftHandCard2');
    $('<option/>').val("0").html("No Card").appendTo('#LeftHandCard3');
    $('<option/>').val("0").html("No Card").appendTo('#LeftHandCard4');
    $('<option/>').val("0").html("No Card").appendTo('#HeadTopCard1');
    $('<option/>').val("0").html("No Card").appendTo('#HeadMidCard1');
    $('<option/>').val("0").html("No Card").appendTo('#HeadLowCard1');
    $('<option/>').val("0").html("No Card").appendTo('#ArmorCard1');
    $('<option/>').val("0").html("No Card").appendTo('#GarmentCard1');
    $('<option/>').val("0").html("No Card").appendTo('#ShoesCard1');
    $('<option/>').val("0").html("No Card").appendTo('#AccessoryRightCard1');
    $('<option/>').val("0").html("No Card").appendTo('#AccessoryLeftCard1');

    for (i = 0; i < objCardItemDB.length; i++) {

        if (objCardItemDB[i][3] == "Right_Hand") {
            $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#RightHandCard1');
            $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#RightHandCard2');
            $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#RightHandCard3');
            $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#RightHandCard4');

            if ($('#LeftHandType').val() != "Shield") {
                $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#LeftHandCard1');
                $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#LeftHandCard2');
                $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#LeftHandCard3');
                $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#LeftHandCard4');
            }
        } else if (objCardItemDB[i][3] == "Left_Hand" && $('#LeftHandType').val() == "Shield") {
            $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#LeftHandCard1');
        } else if (objCardItemDB[i][3] == "Head") {
            $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#HeadTopCard1');
            $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#HeadMidCard1');
            $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#HeadLowCard1');
        } else if (objCardItemDB[i][3] == "Armor") {
            $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#ArmorCard1');
        } else if (objCardItemDB[i][3] == "Garment") {
            $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#GarmentCard1');
        } else if (objCardItemDB[i][3] == "Shoes") {
            $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#ShoesCard1');
        } else if (objCardItemDB[i][3] && objCardItemDB[i][3].includes("Accessory")) {
            if (objCardItemDB[i][3] == "Left_Accessory" || objCardItemDB[i][3] == "Both_Accessory")
                $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#AccessoryLeftCard1');
            if (objCardItemDB[i][3] == "Right_Accessory" || objCardItemDB[i][3] == "Both_Accessory")
                $('<option/>').val(objCardItemDB[i][0]).html(objCardItemDB[i][1]).appendTo('#AccessoryRightCard1');
        }
    }
}




// Refresh all values on UI
function Calculate() {

    // Pending stat points calculation
    let Stats = [$("#baseStr").val(), $("#baseAgi").val(), $("#baseVit").val(), $("#baseInt").val(), $("#baseDex").val(), $("#baseLuk").val()]
    $('#valStatusPoint').html(PendingStatPoints($("#BaseLvl").val(), $("#Class").val(), Stats));

    // Next Stat point cost calculation
    $('#reqdStatStr').html(NextStatPointCost($("#baseStr").val()));
    $('#reqdStatAgi').html(NextStatPointCost($("#baseAgi").val()));
    $('#reqdStatVit').html(NextStatPointCost($("#baseVit").val()));
    $('#reqdStatInt').html(NextStatPointCost($("#baseInt").val()));
    $('#reqdStatDex').html(NextStatPointCost($("#baseDex").val()));
    $('#reqdStatLuk').html(NextStatPointCost($("#baseLuk").val()));

    // Job Bonus calculation
    // pending addition of equip bonuses
    var jobBonusStats = JobBonusStats($("#Class").val(), $("#JobLvl").val());
    //console.log(jobBonusStats);
    $('#addStr').html(jobBonusStats[0]);
    $('#addAgi').html(jobBonusStats[1]);
    $('#addVit').html(jobBonusStats[2]);
    $('#addInt').html(jobBonusStats[3]);
    $('#addDex').html(jobBonusStats[4]);
    $('#addLuk').html(jobBonusStats[5]);

    // Setup object for total stat values
    objTotalStatValues = TotalStatValues(Stats, jobBonusStats);
    //console.log(objTotalStatValues);

    // Base HP Calculation
    $('#valHP').html(MaxHP($("#Class").val(), $("#BaseLvl").val(), objTotalStatValues[2], 0, 0));

    // Base SP Calculation
    $('#valSP').html(MaxSP($("#Class").val(), $("#BaseLvl").val(), objTotalStatValues[3], 0, 0));

    // Crit Rate Calculation
    $('#valCrit').html(TotalCritRate(objTotalStatValues[5], 0));

    // Aspd Calculation
    $('#valAspd').html(TotalAspd($("#Class").val(), objTotalStatValues[1], objTotalStatValues[4], 1)); // 1 = dagger

    // Hit Calculation
    $('#valHit').html(TotalHit($("#BaseLvl").val(), objTotalStatValues[4], objTotalStatValues[5], 0));

    // Flee + PD Calculation
    $('#valFlee').html(TotalFlee($("#BaseLvl").val(), objTotalStatValues[1], objTotalStatValues[5], 0) + " + " + TotalPerfectDodge(objTotalStatValues[5], 0));

    // Matk Calculation
    $('#valMatk').html(StatusMatk($("#BaseLvl").val(), objTotalStatValues[3], objTotalStatValues[4], objTotalStatValues[5]) + " + " + WeaponMatk());

    // Mdef Calculation
    $('#valMdef').html(SoftMdef($("#BaseLvl").val(), objTotalStatValues[2], objTotalStatValues[3], objTotalStatValues[4]) + " + " + HardMdef());

    // Atk Calculation
    $('#valAtk').html(StatusAtk($("#BaseLvl").val(), objTotalStatValues[0], objTotalStatValues[4], objTotalStatValues[5]) + " + " + WeaponAtk());

    // Mdef Calculation
    $('#valDef').html(SoftDef($("#BaseLvl").val(), objTotalStatValues[1], objTotalStatValues[2]) + " + " + HardDef());

}