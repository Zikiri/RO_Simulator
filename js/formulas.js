//-------------------------------------------------------------------------------
//Stat points calculation
function PendingStatPoints(BaseLvl, Class, Stats) {
    return TotalStatPoints(BaseLvl, Class) - UsedStatPoints(Stats);
}

function TotalStatPoints(BaseLvl, Class) {
    var points = 0;

    for (var i = 1; i < BaseLvl; i++) {
        if (i < 100)
            points += Math.floor(i / 5) + 3;
        else if (i < 151)
            points += Math.floor(i / 10) + 13;
        else if (i < 200)
            points += Math.floor((i - 150) / 7) + 28;
    }

    if (isTranscended(Class))
        points += 100;
    else
        points += 48;

    return BaseLvl == 200 ? points - 1 : points;
}

function isTranscended(Class) {
    if ((Class >= 4001 && Class <= 4021) || (Class >= 4060 && Class <= 4079))
        return true;
    return false;
}

function UsedStatPoints(Stats) {
    var usedStats = 0;
    for (var j = 0; j < 6; j++) {
        for (var i = 1; i < Stats[j]; i++) {
            if (i < 100)
                usedStats += Math.floor((i - 1) / 10) + 2;
            else
                usedStats += 4 * Math.floor((i - 100) / 5) + 16;
        }
    }
    return usedStats;
}

function NextStatPointCost(Stat) {
    if (Stat < 100)
        return Math.floor((Stat - 1) / 10) + 2;
    else if (Stat >= 130)
        return "";
    return 4 * Math.floor((Stat - 100) / 5) + 16;
}


//-------------------------------------------------------------------------------
// All Stat values calculation
// Implementation pending for equipment and food bonuses
function TotalStatValues(BaseStats, JobBonusStats) {
    for (var i = 0; i < 6; i++) {
        BaseStats[i] = parseInt(BaseStats[i]) + JobBonusStats[i];
    }
    return BaseStats;
}


//-------------------------------------------------------------------------------
// Job bonus stats calculation
function JobBonusStats(Class, JobLvl) {

    //console.log("JobBonusStats called " + Class + " " + JobLvl);
    var BonusStats = [0, 0, 0, 0, 0, 0];

    for (var i = 0; i < objJobBonusStatsTable.length; i++) {
        if (objJobBonusStatsTable[i][0].includes(Class)) {
            //console.log(objJobBonusStats[i]);
            for (var j = 1; j < objJobBonusStatsTable[i].length && j <= JobLvl; j++) {
                switch (objJobBonusStatsTable[i][j]) {
                    case "1":
                        BonusStats[0]++;
                        break;
                    case "2":
                        BonusStats[1]++;
                        break;
                    case "3":
                        BonusStats[2]++;
                        break;
                    case "4":
                        BonusStats[3]++;
                        break;
                    case "5":
                        BonusStats[4]++;
                        break;
                    case "6":
                        BonusStats[5]++;
                        break;
                }
            }
            break;
        }
    }
    return BonusStats;
}

//-------------------------------------------------------------------------------
// HP Calculation
function BaseHP(Class, BaseLvl) {
    for (var i = 0; i < objBaseHPSPTable.length; i++)
        if (objBaseHPSPTable[i][2].split(":").includes(Class.toString()) && objBaseHPSPTable[i][3] == 0 && (parseInt(BaseLvl) + 4) <= objBaseHPSPTable[i].length)
            return objBaseHPSPTable[i][parseInt(BaseLvl) + 4];
    return -1;
}

function MaxHP(Class, BaseLvl, totalStats, modHPAdd, modHPMul) {
    var maxHP = BaseHP(Class, BaseLvl);
    maxHP = Math.floor(maxHP * (1 + totalStats[2] * 0.01) * (isTranscended(Class) ? 1.25 : 1));

    maxHP += modHPAdd;
    maxHP = Math.floor(maxHP * (1 + modHPMul * 0.01));
    return maxHP;
}


//-------------------------------------------------------------------------------
// SP Calculation
function BaseSP(Class, BaseLvl) {
    for (var i = 0; i < objBaseHPSPTable.length; i++)
        if (objBaseHPSPTable[i][2].includes(Class) && objBaseHPSPTable[i][3] == 1 && (parseInt(BaseLvl) + 4) <= objBaseHPSPTable[i].length)
            return objBaseHPSPTable[i][parseInt(BaseLvl) + 4];

    return -1;
}

function MaxSP(Class, BaseLvl, totalStats, modSPAdd, modSPMul) {
    var maxSP = BaseSP(Class, BaseLvl);
    maxSP = Math.floor(maxSP * (1 + totalStats[3] * 0.01) * (isTranscended(Class) ? 1.25 : 1));

    maxSP += modSPAdd;
    maxSP = Math.floor(maxSP * (1 + modSPMul * 0.01));
    return maxSP;
}

//-------------------------------------------------------------------------------
// Critical Rate Calculation
function LukCritRate(totalStats) {
    return totalStats[5] * 0.3;
}

function TotalCritRate(totalStats, bonusCrit) {
    return Math.floor(LukCritRate(totalStats) + bonusCrit);
}

//-------------------------------------------------------------------------------
// Aspd Calculation
function TotalAspd(Class, totalStats, weaponType) {
    var temp_aspd = 0.0;
    var val = 0.0;
    var index = Object.keys(jsonWeaponTypeList).indexOf(weaponType);
    var amotion;

    amotion = objAspdTable[Class][weaponType];
    if (strLHType == "Shield") amotion += objAspdTable[Class]["Shield"];
    else if (strLHType != "Unarmed")
        amotion += Math.floor(objAspdTable[Class][strLHType] / 4);

    // need to add part to modify amotion as per shield and dual weild
    //console.log(amotion);
    var temp_aspd = 0;
    switch (strRHType) {
        case "Bow":
        case "Musical":
        case "Whip":
        case "Revolver":
        case "Rifle":
        case "Gatling":
        case "Shotgun":
        case "Grenade":
            temp_aspd = totalStats[4] * totalStats[4] / 7.0 + totalStats[1] * totalStats[1] * 0.5;
            break;
        default:
            temp_aspd = totalStats[4] * totalStats[4] / 5.0 + totalStats[1] * totalStats[1] * 0.5;
    }

    temp_aspd = (Math.sqrt(temp_aspd) * 0.25) + 196;

    // pending section for aspd related skills

    amotion = parseInt((temp_aspd + 0 * totalStats[1] / 200) - Math.min(amotion, 200)); // need modification to add other aspd mods
    //console.log("aspd1 " + amotion);
    amotion = amotion + Math.round((nMaxAspd - amotion) * jsonActiveScripts['bAspdRate'] / 100) + jsonActiveScripts['bAspd'];
    //console.log("aspd2 " + amotion);
    return Math.min(Math.max(amotion, 0), nMaxAspd);
}

/*
// from \rathena-master\rathena-master\src\map\status.cpp

    int16 skill_lv, val = 0;
	float temp_aspd = 0;

	amotion = job_info[classidx].aspd_base[sd->weapontype1]; // Single weapon
	if (sd->status.shield)
		amotion += job_info[classidx].aspd_base[MAX_WEAPON_TYPE];
	else if (sd->weapontype2 != W_FIST && sd->equip_index[EQI_HAND_R] != sd->equip_index[EQI_HAND_L])
		amotion += job_info[classidx].aspd_base[sd->weapontype2] / 4; // Dual-wield

	switch(sd->status.weapon) {
		case W_BOW:
		case W_MUSICAL:
		case W_WHIP:
		case W_REVOLVER:
		case W_RIFLE:
		case W_GATLING:
		case W_SHOTGUN:
		case W_GRENADE:
			temp_aspd = status->dex * status->dex / 7.0f + status->agi * status->agi * 0.5f;
			break;
		default:
			temp_aspd = status->dex * status->dex / 5.0f + status->agi * status->agi * 0.5f;
			break;
	}
	temp_aspd = (float)(sqrt(temp_aspd) * 0.25f) + 0xc4;
	if ((skill_lv = pc_checkskill(sd,SA_ADVANCEDBOOK)) > 0 && sd->status.weapon == W_BOOK)
		val += (skill_lv - 1) / 2 + 1;
	if ((skill_lv = pc_checkskill(sd, SG_DEVIL)) > 0 && ((sd->class_&MAPID_THIRDMASK) == MAPID_STAR_EMPEROR || pc_is_maxjoblv(sd)))
		val += 1 + skill_lv;
	if ((skill_lv = pc_checkskill(sd,GS_SINGLEACTION)) > 0 && (sd->status.weapon >= W_REVOLVER && sd->status.weapon <= W_GRENADE))
		val += ((skill_lv + 1) / 2);
	if ((skill_lv = pc_checkskill(sd, RG_PLAGIARISM)) > 0)
		val += skill_lv;
	if (pc_isriding(sd))
		val -= 50 - 10 * pc_checkskill(sd, KN_CAVALIERMASTERY);
	else if (pc_isridingdragon(sd))
		val -= 25 - 5 * pc_checkskill(sd, RK_DRAGONTRAINING);
	amotion = ((int)(temp_aspd + ((float)(status_calc_aspd(&sd->bl, &sd->sc, true) + val) * status->agi / 200)) - min(amotion, 200));
*/


//-------------------------------------------------------------------------------
// Hit Calculation
function TotalHit(baseLvl, totalStats, bonusHit) {
    return 175 + parseInt(baseLvl) + totalStats[4] + Math.floor(totalStats[5] / 3) + bonusHit;
}

//-------------------------------------------------------------------------------
// Flee Calculation
function TotalFlee(baseLvl, totalStats, bonusFlee) {
    return 100 + parseInt(baseLvl) + totalStats[1] + Math.floor(totalStats[5] / 5) + bonusFlee;
}

//-------------------------------------------------------------------------------
// Perfect Dodge Calculation
function TotalPerfectDodge(totalStats, bonusPerfectDodge) {
    return 1 + Math.floor(totalStats[5] / 10) + bonusPerfectDodge;
}

//-------------------------------------------------------------------------------
// Matk Calculation
function StatusMatk(baseLvl, totalStats) {
    return Math.floor(Math.floor(parseInt(baseLvl) / 4) + totalStats[3] + Math.floor(totalStats[3] / 2) + Math.floor(totalStats[4] / 5) + Math.floor(totalStats[5] / 3));
    //floor[floor[BaseLevel ?? 4] + Int + floor[Int ?? 2] + floor[Dex ?? 5] + floor[Luk ?? 3]]
}

function WeaponMatk() {
    var val = 0
    if (objEquipData['Right_Hand'] && objEquipData['Right_Hand'] != "" && objEquipData['Right_Hand'][11]) {
        val += parseInt(objEquipData['Right_Hand'][11]); //base weapon atk
        val += objRefineLvls[4] * Math.max(parseInt(objEquipData['Right_Hand'][7]) * 2 - 1, 2); // refine bonus
    }
    val += jsonActiveScripts['bMatk'];
    //console.log("returned val for matk 1st" + val);
    if (objEquipData['Left_Hand'] && objEquipData['Left_Hand'] != "" && objEquipData['Left_Hand'][2] == "Weapon" && objEquipData['Left_Hand'][11]) {
        val += parseInt(objEquipData['Left_Hand'][4]); //base weapon atk
        val += objRefineLvls[5] * Math.max(parseInt(objEquipData['Left_Hand'][7]) * 2 - 1, 2); // refine bonus
    }
    //console.log("returned val for matk" + val);
    return val;
}

//-------------------------------------------------------------------------------
// Mdef Calculation
function HardMdef() {
    var val = 0;
    val += jsonActiveScripts['bMdef'];
    return val; // pending implementation
}

function SoftMdef(baseLvl, totalStats) {
    return Math.floor(totalStats[3] + (totalStats[2] / 5) + (totalStats[4] / 5) + (baseLvl / 4));
    //floor((INT + (VIT ?? 5) + (DEX ?? 5) + (BaseLv ?? 4))
    //pending addition of additive/multiplicative multipliers from angelus / divine protection
}

//-------------------------------------------------------------------------------
// Atk calculation
function StatusAtk(BaseLvl, totalStats, weaponType) {
    var val = 0;
    if (weaponType == 'Bow' || weaponType == 'Musical' || weaponType == 'Whip' || weaponType == 'Revolver' || weaponType == 'Rifle' || weaponType == 'Gatling' || weaponType == 'Shotgun' || weaponType == 'Grenade')
        val = Math.floor((BaseLvl / 4) + (totalStats[0] / 5) + totalStats[4] + (totalStats[5] / 3));
    val = Math.floor((BaseLvl / 4) + totalStats[0] + (totalStats[4] / 5) + (totalStats[5] / 3));
    //StatusATK = floor[(BaseLevel ?? 4) + Str + (Dex ?? 5) + (Luk ?? 3)]
    return Math.max(val, 0);
}

function WeaponAtk() {
    var val = 0
    if (objEquipData['Right_Hand'] && objEquipData['Right_Hand'] != "") {
        val += parseInt(objEquipData['Right_Hand'][4]); //base weapon atk
        val += objRefineLvls[4] * Math.max(parseInt(objEquipData['Right_Hand'][7]) * 2 - 1, 2); // refine bonus
    }
    val += jsonActiveScripts['bBaseAtk'];

    if (objEquipData['Left_Hand'] && objEquipData['Left_Hand'] != "" && objEquipData['Left_Hand'][2] == "Weapon") {
        val += parseInt(objEquipData['Left_Hand'][4]); //base weapon atk
        val += objRefineLvls[5] * Math.max(parseInt(objEquipData['Left_Hand'][7]) * 2 - 1, 2); // refine bonus
    }

    return val;
}

//-------------------------------------------------------------------------------
// Def calculation
function HardDef() {
    var val = 0;

    //raw def fom armor
    $.each(objEquipData, function(id, text) {
        if (text[2] == "Armor" && text[4]) val += parseInt(text[4]);
    });
    //console.log("val 1hardef " + val);
    //def from refine
    for (var i = 0; i < 10; i++) {
        if ((i != 4 && i != 5) || (i == 5 && strLHType == "Shield"))
            val += jsonRefineDefBonus[objRefineLvls[i]];
    }
    //console.log("val 2hardef " + val);
    //def from scripts
    val += jsonActiveScripts['bDef'];
    //console.log("val 3hardef " + val);

    val = Math.floor(val * (1 + jsonActiveScripts['bDefRate'] / 100));
    return val;
}

function SoftDef(BaseLvl, totalStats) {
    var val = Math.floor((totalStats[2] / 2) + (totalStats[1] / 5) + (BaseLvl / 2));
    //SoftDEF      = floor((VIT ?? 2) + (AGI ?? 5) + (BaseLv ?? 2))

    val = Math.floor(val * (1 + jsonActiveScripts['bDef2Rate'] / 100));

    return val;
}

function WeightLimit() {
    var MAX_WGT = 0;
    MAX_WGT += objAspdTable[nClass]['Weight'] / 10;
    MAX_WGT += 30 * objBaseStats[0];

    // skill bonuses pending

    return MAX_WGT;
}