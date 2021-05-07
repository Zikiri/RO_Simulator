var jsonWeaponTypeList = {
    "Unarmed": "Unarmed",
    "Dagger": "Dagger",
    "1hSword": "One-handed Sword",
    "2hSword": "Two-handed Sword",
    "1hSpear": "One-handed Spear",
    "2hSpear": "Two-handed Spear",
    "1hAxe": "One-handed Axe",
    "2hAxe": "Two-handed Axe",
    "Mace": "Mace",
    "2hMace": "2hMace(unused)",
    "Staff": "Staff",
    "Bow": "Bow",
    "Knuckle": "Knuckle",
    "Musical": "Instrument",
    "Whip": "Whip",
    "Book": "Book",
    "Katar": "Katar",
    "Revolver": "Revolver",
    "Rifle": "Rifle",
    "Gatling": "Gatling Gun",
    "Shotgun": "Shotgun",
    "Grenade": "Grenade Launcher",
    "Huuma": "Huuma Shuriken",
    "2hStaff": "Two-handed Staff",
    "Shield": "Shield"
};



var jsonPrimaryStatList = {
    "0": "bStr",
    "1": "bAgi",
    "2": "bVit",
    "3": "bInt",
    "4": "bDex",
    "5": "bLuk",
}

var jsonSubStatList = {
    "0": "Atk_status",
    "1": "Atk_weapon",
    "2": "Matk_status",
    "3": "Matk_weapon",
    "4": "Def_soft",
    "5": "Def_hard",
    "6": "Mdef_soft",
    "7": "Mdef_hard",
    "8": "Hit",
    "9": "Critical",
    "10": "Flee",
    "11": "PerfectDodge",
    "12": "Aspd",
    "13": "HP",
    "14": "SP",
    "15": "WeightLimit",
    "16": "PendingStatPoints",
    "17": "AttackRange",
    "18": "CastTimeReduction_variable",
    "19": "CastTimeReduction_Fixed",
    "20": "PerfectHit",
    "21": "Movement Speed",
    "22": "StatusResistance"
}

var jsonEquipmentList = {
    "0": {
        "Name": "Head_Top",
        "Label": "Top Head",
        "CardSlots": 1,
        "refine": true
    },
    "1": {
        "Name": "Head_Mid",
        "Label": "Mid Head",
        "CardSlots": 1,
        "refine": false
    },
    "2": {
        "Name": "Head_Low",
        "Label": "Lower Head",
        "CardSlots": 1,
        "refine": false
    },
    "3": {
        "Name": "Armor",
        "Label": "Armor",
        "CardSlots": 1,
        "refine": true
    },
    "4": {
        "Name": "Right_Hand",
        "Label": "Right Hand",
        "CardSlots": 4,
        "refine": true
    },
    "5": {
        "Name": "Left_Hand",
        "Label": "Left Hand",
        "CardSlots": 4,
        "refine": true
    },
    "6": {
        "Name": "Garment",
        "Label": "Garment",
        "CardSlots": 1,
        "refine": true
    },
    "7": {
        "Name": "Shoes",
        "Label": "Shoes",
        "CardSlots": 1,
        "refine": true
    },
    "8": {
        "Name": "Right_Accessory",
        "Label": "Right Accessory",
        "CardSlots": 1,
        "refine": true
    },
    "9": {
        "Name": "Left_Accessory",
        "Label": "Left Accessory",
        "CardSlots": 1,
        "refine": true
    }
}


//Convert a number to a hexadecimal string with:
//hexString = yourNumber.toString(16);
//And reverse the process with:
//yourNumber = parseInt(hexString, 16);

var EAJ_NOVICE = parseInt("0x0", 16);
var EAJ_SWORDMAN = parseInt("0x1", 16);
var EAJ_MAGE = parseInt("0x2", 16);
var EAJ_ARCHER = parseInt("0x3", 16);
var EAJ_ACOLYTE = parseInt("0x4", 16);
var EAJ_MERCHANT = parseInt("0x5", 16);
var EAJ_THIEF = parseInt("0x6", 16);
var EAJ_TAEKWON = parseInt("0x7", 16);
var EAJ_GUNSLINGER = parseInt("0x9", 16);
var EAJ_NINJA = parseInt("0x0A", 16);
var EAJ_GANGSI = parseInt("0x0D", 16);
var EAJ_SUMMONER = parseInt("0x10", 16);

var EAJL_2_1 = parseInt("0x100", 16); //2-1 Class
var EAJL_2_2 = parseInt("0x200", 16); //2-2 Class
var EAJL_2 = parseInt("0x300", 16); //2nd Class

var EAJL_UPPER = parseInt("0x1000", 16); //Rebith
var EAJL_BABY = parseInt("0x2000", 16); //Baby
var EAJL_THIRD = parseInt("0x4000", 16); //3rd Class

// & with job id to strip
var EAJ_BASEMASK = parseInt('0xff', 16); //strips also the 2nd class attributes
var EAJ_UPPERMASK = parseInt('0x0fff', 16); //strips the upper/baby characteristics of a class
//var EAJ_UPPER_T_MASK = parseInt('0x1fff', 16); //keeps characteristics of a class till trans
var EAJ_THIRDMASK = EAJL_THIRD | EAJ_UPPERMASK; //strips 3rd class attributes

var jsonClassList = [{
        "id": "0",
        "Name": "Novice",
        "ea_id": EAJ_NOVICE,
        "ScriptName": "Job_Novice",
        "Mask": EAJ_BASEMASK
    },
    {
        "id": "1",
        "Name": "Swordman",
        "ea_id": EAJ_SWORDMAN,
        "ScriptName": "Job_Swordman",
        "Mask": EAJ_BASEMASK
    },
    {
        "id": "2",
        "Name": "Mage",
        "ea_id": EAJ_MAGE,
        "ScriptName": "Job_Mage",
        "Mask": EAJ_BASEMASK
    },
    {
        "id": "3",
        "Name": "Archer",
        "ea_id": EAJ_ARCHER,
        "ScriptName": "Job_Archer",
        "Mask": EAJ_BASEMASK
    },
    {
        "id": "4",
        "Name": "Acolyte",
        "ea_id": EAJ_ACOLYTE,
        "ScriptName": "Job_Acolyte",
        "Mask": EAJ_BASEMASK
    },
    {
        "id": "5",
        "Name": "Merchant",
        "ea_id": EAJ_NOVICE,
        "ScriptName": "Job_Merchant",
        "Mask": EAJ_BASEMASK
    },
    {
        "id": "6",
        "Name": "Thief",
        "ea_id": EAJ_NOVICE,
        "ScriptName": "Job_Thief",
        "Mask": EAJ_BASEMASK
    },
    {
        "id": "-1",
        "Name": "─────────────────",
        "ea_id": "dummy",
        "ScriptName": "dummy"
    },
    {
        "id": "7",
        "Name": "Knight",
        "ea_id": EAJ_SWORDMAN | EAJL_2_1,
        "ScriptName": "Job_Knight",
        "Mask": EAJ_UPPERMASK
    },
    {
        "id": "8",
        "Name": "Priest",
        "ea_id": EAJ_ACOLYTE | EAJL_2_1,
        "ScriptName": "Job_Priest",
        "Mask": EAJ_UPPERMASK
    },
    {
        "id": "9",
        "Name": "Wizard",
        "ea_id": EAJ_MAGE | EAJL_2_1,
        "ScriptName": "Job_Wizard",
        "Mask": EAJ_UPPERMASK
    },
    {
        "id": "10",
        "Name": "Blacksmith",
        "ea_id": EAJ_MERCHANT | EAJL_2_1,
        "ScriptName": "Job_Blacksmith",
        "Mask": EAJ_UPPERMASK
    },
    {
        "id": "11",
        "Name": "Hunter",
        "ea_id": EAJ_ARCHER | EAJL_2_1,
        "ScriptName": "Job_Hunter",
        "Mask": EAJ_UPPERMASK
    },
    {
        "id": "12",
        "Name": "Assassin",
        "ea_id": EAJ_THIEF | EAJL_2_1,
        "ScriptName": "Job_Assassin",
        "Mask": EAJ_UPPERMASK
    },
    {
        "id": "14",
        "Name": "Crusader",
        "ea_id": EAJ_SWORDMAN | EAJL_2_2,
        "ScriptName": "Job_Crusader",
        "Mask": EAJ_UPPERMASK
    },
    {
        "id": "15",
        "Name": "Monk",
        "ea_id": EAJ_ACOLYTE | EAJL_2_2,
        "ScriptName": "Job_Monk",
        "Mask": EAJ_UPPERMASK
    },
    {
        "id": "16",
        "Name": "Sage",
        "ea_id": EAJ_MAGE | EAJL_2_2,
        "ScriptName": "Job_Sage",
        "Mask": EAJ_UPPERMASK
    },
    {
        "id": "17",
        "Name": "Rogue",
        "ea_id": EAJ_THIEF | EAJL_2_2,
        "ScriptName": "Job_Rogue",
        "Mask": EAJ_UPPERMASK
    },
    {
        "id": "18",
        "Name": "Alchemist",
        "ea_id": EAJ_MERCHANT | EAJL_2_2,
        "ScriptName": "Job_Alchemist",
        "Mask": EAJ_UPPERMASK
    },
    {
        "id": "19",
        "Name": "Bard",
        "ea_id": EAJ_ARCHER | EAJL_2_2,
        "ScriptName": "Job_Bard",
        "Mask": EAJ_UPPERMASK
    },
    {
        "id": "20",
        "Name": "Dancer",
        "ea_id": EAJ_ARCHER | EAJL_2_2,
        "ScriptName": "Job_Dancer",
        "Mask": EAJ_UPPERMASK
    },
    {
        "id": "-2",
        "Name": "─────────────────",
        "ea_id": "dummy",
        "ScriptName": "dummy"
    },
    {
        "id": "4001",
        "Name": "Novice High",
        "ea_id": EAJ_NOVICE | EAJL_UPPER,
        "ScriptName": ""
    },
    {
        "id": "4002",
        "Name": "Swordman High",
        "ea_id": EAJ_SWORDMAN | EAJL_UPPER,
        "ScriptName": ""
    },
    {
        "id": "4003",
        "Name": "Magician High",
        "ea_id": EAJ_MAGE | EAJL_UPPER,
        "ScriptName": ""
    },
    {
        "id": "4004",
        "Name": "Archer High",
        "ea_id": EAJ_ARCHER | EAJL_UPPER,
        "ScriptName": ""
    },
    {
        "id": "4005",
        "Name": "Acolyte High",
        "ea_id": EAJ_ACOLYTE | EAJL_UPPER,
        "ScriptName": ""
    },
    {
        "id": "4006",
        "Name": "Merchant High",
        "ea_id": EAJ_MERCHANT | EAJL_UPPER,
        "ScriptName": ""
    },
    {
        "id": "4007",
        "Name": "Thief High",
        "ea_id": EAJ_THIEF | EAJL_UPPER,
        "ScriptName": ""
    },
    {
        "id": "-3",
        "Name": "─────────────────",
        "ea_id": "dummy",
        "ScriptName": "dummy"
    },
    {
        "id": "4008",
        "Name": "Lord Knight",
        "ea_id": EAJ_SWORDMAN | EAJL_2_1 | EAJL_UPPER,
        "ScriptName": "Job_Lord_Knight"
    },
    {
        "id": "4009",
        "Name": "High Priest",
        "ea_id": EAJ_ACOLYTE | EAJL_2_1 | EAJL_UPPER,
        "ScriptName": ""
    },
    {
        "id": "4010",
        "Name": "High Wizard",
        "ea_id": EAJ_MAGE | EAJL_2_1 | EAJL_UPPER,
        "ScriptName": ""
    },
    {
        "id": "4011",
        "Name": "Whitesmith",
        "ea_id": EAJ_MERCHANT | EAJL_2_1 | EAJL_UPPER,
        "ScriptName": "Job_Whitesmith"
    },
    {
        "id": "4012",
        "Name": "Sniper",
        "ea_id": EAJ_ARCHER | EAJL_2_1 | EAJL_UPPER,
        "ScriptName": ""
    },
    {
        "id": "4013",
        "Name": "Assassin Cross",
        "ea_id": EAJ_THIEF | EAJL_2_1 | EAJL_UPPER,
        "ScriptName": ""
    },
    {
        "id": "4015",
        "Name": "Paladin",
        "ea_id": EAJ_SWORDMAN | EAJL_2_2 | EAJL_UPPER,
        "ScriptName": ""
    },
    {
        "id": "4016",
        "Name": "Champion",
        "ea_id": EAJ_ACOLYTE | EAJL_2_2 | EAJL_UPPER,
        "ScriptName": ""
    },
    {
        "id": "4017",
        "Name": "Professor",
        "ea_id": EAJ_MAGE | EAJL_2_2 | EAJL_UPPER,
        "ScriptName": ""
    },
    {
        "id": "4018",
        "Name": "Stalker",
        "ea_id": EAJ_THIEF | EAJL_2_2 | EAJL_UPPER,
        "ScriptName": "Job_Stalker"
    },
    {
        "id": "4019",
        "Name": "Creator",
        "ea_id": EAJ_MERCHANT | EAJL_2_2 | EAJL_UPPER,
        "ScriptName": "Job_Creator"
    },
    {
        "id": "4020",
        "Name": "Clown",
        "ea_id": EAJ_ARCHER | EAJL_2_2 | EAJL_UPPER,
        "ScriptName": ""
    },
    {
        "id": "4021",
        "Name": "Gypsy",
        "ea_id": EAJ_ARCHER | EAJL_2_2 | EAJL_UPPER,
        "ScriptName": ""
    },
    {
        "id": "-4",
        "Name": "─────────────────",
        "ea_id": "",
        "ScriptName": ""
    },
    {
        "id": "4060",
        "Name": "Rune Knight (trans)",
        "ea_id": EAJ_SWORDMAN | EAJL_2_1 | EAJL_UPPER | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "4061",
        "Name": "Warlock (trans)",
        "ea_id": EAJ_MAGE | EAJL_2_1 | EAJL_UPPER | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "4062",
        "Name": "Ranger (trans)",
        "ea_id": EAJ_ARCHER | EAJL_2_1 | EAJL_UPPER | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "4063",
        "Name": "Arch Bishop (trans)",
        "ea_id": EAJ_ACOLYTE | EAJL_2_1 | EAJL_UPPER | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "4064",
        "Name": "Mechanic (trans)",
        "ea_id": EAJ_MERCHANT | EAJL_2_1 | EAJL_UPPER | EAJL_THIRD,
        "ScriptName": "Job_Mechanic_T"
    },
    {
        "id": "4065",
        "Name": "Guillotine Cross (trans)",
        "ea_id": EAJ_THIEF | EAJL_2_1 | EAJL_UPPER | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "4073",
        "Name": "Royal Guard (trans)",
        "ea_id": EAJ_SWORDMAN | EAJL_2_2 | EAJL_UPPER | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "4074",
        "Name": "Sorcerer (trans)",
        "ea_id": EAJ_MAGE | EAJL_2_2 | EAJL_UPPER | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "4075",
        "Name": "Minstrel (trans)",
        "ea_id": EAJ_ARCHER | EAJL_2_2 | EAJL_UPPER | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "4076",
        "Name": "Wanderer (trans)",
        "ea_id": EAJ_THIEF | EAJL_2_2 | EAJL_UPPER | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "4077",
        "Name": "Sura (trans)",
        "ea_id": EAJ_ACOLYTE | EAJL_2_2 | EAJL_UPPER | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "4078",
        "Name": "Genetic (trans)",
        "ea_id": EAJ_MERCHANT | EAJL_2_2 | EAJL_UPPER | EAJL_THIRD,
        "ScriptName": "Job_Genetic_T"
    },
    {
        "id": "4079",
        "Name": "Shadow Chaser (trans)",
        "ea_id": EAJ_THIEF | EAJL_2_2 | EAJL_UPPER | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "-5",
        "Name": "─────────────────",
        "ea_id": "dummy",
        "ScriptName": "dummy"
    },
    {
        "id": "4054",
        "Name": "Rune Knight (non-trans)",
        "ea_id": EAJ_SWORDMAN | EAJL_2_1 | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "4055",
        "Name": "Warlock (non-trans)",
        "ea_id": EAJ_MAGE | EAJL_2_1 | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "4056",
        "Name": "Ranger (non-trans)",
        "ea_id": EAJ_ARCHER | EAJL_2_1 | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "4057",
        "Name": "Arch Bishop (non-trans)",
        "ea_id": EAJ_ACOLYTE | EAJL_2_1 | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "4058",
        "Name": "Mechanic (non-trans)",
        "ea_id": EAJ_MERCHANT | EAJL_2_1 | EAJL_THIRD,
        "ScriptName": "Job_Mechanic"
    },
    {
        "id": "4059",
        "Name": "Guillotine Cross (non-trans)",
        "ea_id": EAJ_THIEF | EAJL_2_1 | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "4066",
        "Name": "Royal Guard (non-trans)",
        "ea_id": EAJ_SWORDMAN | EAJL_2_2 | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "4067",
        "Name": "Sorcerer (non-trans)",
        "ea_id": EAJ_MAGE | EAJL_2_2 | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "4068",
        "Name": "Minstrel (non-trans)",
        "ea_id": EAJ_ARCHER | EAJL_2_2 | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "4069",
        "Name": "Wanderer (non-trans)",
        "ea_id": EAJ_ARCHER | EAJL_2_2 | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "4070",
        "Name": "Sura (non-trans)",
        "ea_id": EAJ_ACOLYTE | EAJL_2_2 | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "4071",
        "Name": "Genetic (non-trans)",
        "ea_id": EAJ_MERCHANT | EAJL_2_2 | EAJL_THIRD,
        "ScriptName": "Job_Genetic"
    },
    {
        "id": "4072",
        "Name": "Shadow Chaser (non-trans)",
        "ea_id": EAJ_THIEF | EAJL_2_2 | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "-6",
        "Name": "─────────────────",
        "ea_id": "dummy",
        "ScriptName": "dummy"
    },
    {
        "id": "23",
        "Name": "Super Novice",
        "ea_id": EAJ_NOVICE | EAJL_2_1,
        "ScriptName": "Job_SuperNovice"
    },
    {
        "id": "24",
        "Name": "Gunslinger",
        "ea_id": EAJ_GUNSLINGER,
        "ScriptName": "Job_Gunslinger"
    },
    {
        "id": "25",
        "Name": "Ninja",
        "ea_id": EAJ_NINJA,
        "ScriptName": "Job_Ninja"
    },
    {
        "id": "4046",
        "Name": "Taekwon",
        "ea_id": EAJ_TAEKWON,
        "ScriptName": "Job_Taekwon"
    },
    {
        "id": "-7",
        "Name": "─────────────────",
        "ea_id": "dummy",
        "ScriptName": "dummy"
    },
    {
        "id": "4047",
        "Name": "Star Gladiator",
        "ea_id": EAJ_TAEKWON | EAJL_2_1,
        "ScriptName": "Job_Star_Gladiator"
    },
    {
        "id": "4049",
        "Name": "Soul Linker",
        "ea_id": EAJ_TAEKWON | EAJL_2_2,
        "ScriptName": "Job_Soul_Linker"
    },
    {
        "id": "4211",
        "Name": "Kagerou",
        "ea_id": EAJ_NINJA | EAJL_2_1,
        "ScriptName": ""
    },
    {
        "id": "4212",
        "Name": "Oboro",
        "ea_id": EAJ_NINJA | EAJL_2_1,
        "ScriptName": ""
    },
    {
        "id": "4215",
        "Name": "Rebellion",
        "ea_id": EAJ_GUNSLINGER | EAJL_2_1,
        "ScriptName": ""
    },
    {
        "id": "114",
        "Name": "Expanded Super Novice",
        "ea_id": EAJ_NOVICE | EAJL_2_1 | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "-8",
        "Name": "─────────────────",
        "ea_id": "dummy",
        "ScriptName": "dummy"
    },
    {
        "id": "4239",
        "Name": "Star Emperor",
        "ea_id": EAJ_NINJA | EAJL_2_1 | EAJL_THIRD,
        "ScriptName": "Job_Star_Gladiator2"
    },
    {
        "id": "4240",
        "Name": "Soul Reaper",
        "ea_id": EAJ_NINJA | EAJL_2_2 | EAJL_THIRD,
        "ScriptName": ""
    },
    {
        "id": "-9",
        "Name": "─────────────────",
        "ea_id": "dummy",
        "ScriptName": "dummy"
    },
    {
        "id": "4218",
        "Name": "Summoner",
        "ea_id": EAJ_SUMMONER,
        "ScriptName": "Job_Summoner"
    },
];