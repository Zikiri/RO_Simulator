//Character specific variables
var objBaseStats = [1, 1, 1, 1, 1, 1];
var objJobBonusStats = [0, 0, 0, 0, 0, 0];
//var objEquipBonusStats = [0, 0, 0, 0, 0, 0];
var objTotalStats = [1, 1, 1, 1, 1, 1];
var objSubStats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var nClass = 0;
var nClass_eA = 0;
var nBaseClass = 0;
var nBaseJob = 0;
var nBaseLvl = 1;
var nJobLvl = 1;
var objRefineLvls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var strRHType = "Unarmed";
var strLHType = "Unarmed";
var objScriptsEquipped = {};
var objEquipData = {};
var nMaxAspd = 193;

//DB objects loaded from file
var objJobBonusStatsTable = [];
var objBaseHPSPTable = [];
var objTotalStatValues = [];
var objAspdTable = {};
var objEquipItemDB = [];
var objCardItemDB = [];
//var objEquipScriptsDB = [];

var path_job_basehpsp_db = 'data/rathena_files/db/re/job_basehpsp_db.txt';
var path_job_bonus_stats = 'data/rathena_files/db/job_db2.txt';
var path_job_base_aspd = 'data/rathena_files/db/re/job_db1.txt';
var path_item_db_equip = 'data/rathena_files/db/re/item_db_equip.yml';
var path_item_db_etc = 'data/rathena_files/db/re/item_db_etc.yml';
var loadcount = 5; // needs to be aligned with total files loaded


//JSON objects for constant tables
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
};

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
};

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
};

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


var jsonActiveScriptsTemplate = {
    "bStr": 0,
    "bAgi": 0,
    "bVit": 0,
    "bInt": 0,
    "bDex": 0,
    "bLuk": 0,
    "bAllStats": 0,
    "bAgiVit": 0,
    "bAgiDexStr": 0,
    "bMaxHP": 0, // MaxHP + n
    "bMaxSP": 0, // MaxSP + n
    "bMaxHPrate": 0, // MaxHP + n%
    "bMaxSPrate": 0, // MaxSP + n%
    "bAtk": 0,
    "bAtk2": 0,
    "bAtkRate": 0, // Attack power + n%
    "bBaseAtk": 0, // Equip Atk + n
    "bMatk": 0,
    "bIntMatk": 0,
    "bMatkRate": 0,
    "bEquipmentMatk": 0,
    "bDef": 0, // Equipment DEF + n
    "bDef2": 0, // VIT based DEF + n
    "bDefRate": 0, // Equipment DEF + n%
    "bDef2Rate": 0, // VIT based DEF + n%
    "bMdef": 0, // Equipment MDEF + n
    "bMdef2": 0, // INT based MDEF + n
    "bMdefRate": 0, // Equipment MDEF + n%
    "bMdef2Rate": 0, // INT based MDEF + n%
    "bHit": 0, //Hit + n
    "bHitRate": 0, // Hit + n%
    "bCritical": 0, // Critical + n
    "bCriticalRate": 0, // Critical + n%
    "bCritAtkRate": 0, // Increase critical damage by +n%
    "bFlee": 0, // Flee + n
    "bFleeRate": 0, // Flee + n%
    "bFlee2": 0, // Perfect Dodge + n
    "bFlee2Rate": 0, // Perfect Dodge + n%
    "bSpeedRate": 0, // Moving speed + n% (only the highest among all is applied)
    "bSpeedAddRate": 0, // Moving speed + n%
    "bAspd": 0, // Attack speed + n
    "bAspdRate": 0, //Attack speed + n%
    "bAtkRange": 0, // Attack range + n
    "bCastrate": 0, // Skill casting time rate + n%
    "bUseSPrate": 0, // SP consumption + n%
    "bHPrecovRate": 0, // Natural HP recovery ratio + n%
    "bSPrecovRate": 0, // Natural SP recovery ratio + n%
    "bDoubleRate": 0, // Double Attack probability n% (works with all weapons | only the highest among all is applied)
    "bDoubleAddRate": 0, // Double Attack probability + n% (works with all weapons)
    "bPerfectHitRate": 0, // On-target impact attack probability n% (only the highest among all is applied)
    "bPerfectHitAddRate": 0, // On-target impact attack probability + n%
    "bCriticalDef": 0, // Critical ? and others the trap it is, probability + n%
    "bNearAtkDef": 0, // Adds n% damage reduction against melee physical attacks
    "bLongAtkDef": 0, // Adds n% damage reduction against ranged physical attacks
    "bMagicAtkDef": 0, // Adds n% damage reduction against magical attacks
    "bMiscAtkDef": 0, // Adds n% damage reduction against MISC attacks (traps, falcon, ...)
    "bIgnoreDefRace": {}, // Disregard DEF against enemies of race n
    "bIgnoreDefEle": 0, // Disregard DEF against enemies of element n
    "bIgnoreMDefRace": 0, // Disregard MDEF against enemies of race n
    "bIgnoreMDefEle": 0, // Disregard MDEF against enemies of element n
    "bIgnoreMdefRate": 0, // Disregard n% of the target's MDEF
    "bDefRatioAtkRace": 0, // Does more damage depending on monster Defense against race n (defense disregard)
    "bDefRatioAtkEle": 0, // n attribute if defensive power is high the high extent big damage is given, (defense disregard)
    "bAtkEle": "", //Gives the player's attacks element n
    "bDefEle": "", // Gives the player's defense element n
    "bSplashRange": 0, // Splash attack radius + n (e.g. n=1 makes a 3*3 cells area, n=2 a 5*5 area, etc)
    "bSplashAddRange": 0, // Splash attack radius + n (e.g. n=1 makes a 3*3 cells area, n=2 a 5*5 area, etc)
    "bRestartFullRecover": 0, // When reviving, HP and SP are fully healed (n is meaningless)
    "bNoCastCancel": false, // Prevents casting from being interrupted when hit (does not work in GvG)
    "bNoCastCancel2": false, // Prevents casting from being interrupted when hit (works even in GvG)
    "bNoSizeFix": false, // The attack revision with the size of the monster is not received / drake card effect
    "bNoWeaponDamage": 0, // Prevents from receiving n% physical damage
    "bNoMagicDamage": 0, // Prevents from receiving n% magical effect (Attack, Healing, Support spells are all blocked) GTB effect
    "bNoGemStone": false, // Skills requiring Gemstones do no require them (Hocus Pocus will still require 1 Yellow Gemstone)
    "bIntravision": true, // Always see Hiding and Cloaking players/mobs
    "bHealPower": 0, // Increase heal amount of all heal skills by n%
    "bHealPower2": 0, // Increase heal amount if you are healed by any skills by n%
    "bNoRegen": 0, // Stops regeneration for n: 1=HP, 2=SP
    "bUnstripableWeapon": false, // Weapon cannot be taken off via Strip skills 
    "bUnstripableArmor": false, // Armor cannot be taken off via Strip skills
    "bUnstripableHelm": false, // Helm cannot be taken off via Strip skills
    "bUnstripableShield": false, // Shield cannot be taken off via Strip skills
    "bSPGainValue": 0, // When killing a monster by physical attack, you gain n SP
    "bHPGainValue": 0, // When killing a monster by physical attack, you gain n HP
    "bAddStealRate": 0, // n/100% increase to Steal skill success chance
    "bHPDrainValue": 0, // Heals +n HP with normal attack.
    "bSPDrainValue": 0, // When hitting a monster by physical attack, you gain n SP
    "bAddItemHealRate": 0, // Increases HP recovered by x% for healing items
    "bUnbreakableGarment": false, // Garment cannot be damaged/broken by any means
    "bUnbreakableWeapon": false, // Weapon cannot be damaged/broken by any means
    "bUnbreakableArmor": false, // Armor cannot be damaged/broken by any means
    "bUnbreakableHelm": false, // Helm cannot be damaged/broken by any means
    "bUnbreakableShield": false, // Shield cannot be damaged/broken by any means
    "bUnbreakableShoes": false, // Shoes cannot be damaged/broken by any means
    "bBreakWeaponRate": 0, // Adds a n/100% chance to break enemy's weapon while attacking (stacks with other break chances)
    "bBreakArmorRate": 0, // Adds a n/100% chance to break enemy's armor while attacking (stacks with other break chances)
    "bUnbreakable": 0, // Reduces the break chance of all equipped equipment by n%
    "bShortWeaponDamageReturn": 0, // Reflects n% of received melee damage back to the enemy that caused it
    "bLongWeaponDamageReturn": 0, // Reflects n% of received ranged damage back to the enemy that caused it
    "bMagicDamageReturn": 0, // Adds a n% chance to reflect targetted magic spells back to the enemy that caused it
    "bPerfectHide": false, // Hidden/cloaked character is no longer detected by monsters with 'detector' mode
    "bNoKnockback": false, // Character is no longer knocked back by enemy skills with such effect
    "bClassChange": 0, // Gives a n/100% chance to change the attacked monster's class with normal attack
    "bNoMiscDamage": 0, // Adds n% reduction to received misc damage
    "bLongAtkRate": 0, // Increases damage of ranged attacks by n%
    "bUnstripable": false, // Armor cannot be taken off via strip skills
    "bMagicSPGainValue": 0, // Heals +n SP when killing an enemy with magic attack
    "bMagicHPGainValue": 0, // Heals +n HP when killing an enemy with magic attack
    "bFixedCastrate": 0, // Increases fixed cast time of skills by x%
    "bVariableCastrate": 0, // Increases variable cast time of skills by x%
    "bIgnoreDefClass": {},

    "bAddEff": [], // Adds a x/100 chance to cause effect e to the target when attacking
    "bResEff": [], // Adds a x/100 tolerance to effect e
    "bCastrate": {}, // Adjust casting time of skill n by x%
    "bAddSize": {}, // +x% physical damage against size n
    "bMagicAddSize": {}, // +x% magical damage against size n
    "bSubSize": {}, // x% Damage reduction against size n
    "bAddRace": {}, // +x% physical damage against race n
    "bMagicAddRace": {}, // +x% magical damage against race n
    "bSubRace": {}, // +x% damage reduction against race n
    "bAddEle": {}, // +x% physical damage against element n
    "bMagicAddEle": {}, // +x% magical damage against element n
    "bSubEle": {}, // x% Damage reduction against element n
    "bAddDamageClass": {}, // +x% extra physical damage against monsters of class n
    "bAddMagicDamageClass": {}, // +x% extra magical damage against monsters of class n
    "bAddDefClass": {}, // x% physical damage reduction against monsters of class n
    "bAddMDefClass": {}, // x% magical damage reduction against monsters of class n
    "bIgnoreMdefRate": {}, // Disregard x% of the target's MDEF if the target belongs to race n
    "bHPDrainRate": {}, // n/10 % probability to drain x% HP when attacking
    "bSPDrainRate": {}, // n/10 % probability to drain x% SP when attacking
    "bSPVanishRate": {}, // Add the (n/10)% chance of decreasing enemy's SP (player) amount by x% when attacking
    "bAddMonsterDropItem": [], // Adds a x/100% chance for item n to be dropped, when killing any monster.
    "bGetZenyNum": {}, // When killing a monster, there is a x% chance of gaining 1~n zeny (only the highest among all is applied)
    "bAddGetZenyNum": {}, // Same as bGetZenyNum, but the rates and zeny to gain stack
    "bCriticalAddRace": {}, // Critical + n vs. enemies of race r
    "bHPRegenRate": {}, // Gain n HP every x milliseconds
    "bHPLossRate": {}, // Lose n HP every x milliseconds
    "bAddEffWhenHit": {}, // x/100% chance to cause n state to the enemy when being hit by physical damage
    "bSkillAtk": {}, // Increase damage of skill n by x% (supports skill names)
    "bSkillHeal": {}, // Increase heal amount of skill n by x% (supports skill names)
    "bSkillHeal2": {}, // Increase heal amount if you are healed by skill n by x% (supports skill names)
    "bAddRace2": {}, // Increase damage by x% vs. enemies of race n (differnt category of race like orcs, goblin, scaraba, etc)
    "bAddItemHealRate": {}, // Increases HP recovered by n type items by x%, can also use direct item IDs instead of group values
    "bSPRegenRate": {}, // Gain n SP every x milliseconds
    "bSPLossRate": {}, // Lose n SP every x milliseconds
    "bExpAddRace": {}, // Increase exp gained by x% vs. enemies of race n
    "bSPGainRace": {}, // When killing a monster of race n by physical attack gain x amount of sp
    "bSubRace2": {}, // Damage x% reduction from enemies of race n (differnt category of race like orcs, goblin, scaraba, etc)
    "bAddMonsterDropItemGroup": {}, // Adds a x/100% chance to get an item of group type n when you kill a monster
    "bWeaponComaRace": {}, // y/100% chance to cause Coma when attacking a monster of race x with a normal attack
    "bAddSkillBlow": {}, // Pushback the target by y cells when using skill x
    "bIgnoreDefRate": {}, // Disregard x% of the target's DEF if the target belongs to race n
    "bWeaponComaEle": {}, // Adds a n/100% chance to cause Coma when attacking a monster of element x with normal attack
    "bAddEff2": [], // Adds a n/100% chance to cause status change x on self when attacking
    "bWeaponAtk": {}, // Adds n ATK when weapon of type x is equipped
    "bWeaponAtkRate": {}, // Adds n% damage to normal attacks when weapon of type x is equipped
    "bHPDrainValueRace": {}, // Adds a n/10% chance to receive x% of dealed damage as HP from a monster of race r with normal attack
    "bSPDrainValueRace": {}, // Adds a n/10% chance to receive x% of dealed damage as SP from a monster of race r with normal attack
    "bHPGainRaceAttack": {}, // Heals n HP when attacking x Race on every hit
    "bSPGainRaceAttack": {}, // Heals n SP when attacking x Race on every hit
    "bSkillUseSPrate": {}, // Reduces SP consumption of skill s by x%
    "bSkillUseSP": {}, // Reduces SP consumption of skill s by x
    "bSkillCooldown": {}, // Increases cooldown of skill s by x milliseconds
    "bSkillFixedCast": {}, // Increases fixed cast time of skill s by x milliseconds
    "bSkillVariableCast": {}, // Increases variable cast time of skill s by x milliseconds
    "bSkillVariableCastrate": {}, // Increases variable cast time of skill s by x% (rAthena uses bVariableCastrate, renamed to remove ambiguity)

    "bAutoSpell": [], // Auto Spell casting on attack of spell n at level x with y/10% chance
    "bAutoSpellWhenHit": {}, // n/10% chance to cast skill x of level y on attacker (unless it is a self or support skill) when being hit by a
    "bAutoSpellOnSkill": {}, // Adds a n/10% chance to autospell skill x at level l when using skill s
    "bHPDrainRateRace": {}, // Adds a n/10% chance to receive x% of dealed damage as HP from a monster of race r with normal attack
    "bSPDrainRateRace": {}, // Adds a n/10% chance to receive x% of dealed damage as SP from a monster of race r with normal attack
    "bAddEffOnSkill": {}, // Adds a n/100% chance to cause status change x on enemy when using skill s
    "bAddClassDropItem": {}, // Adds an n/100% chance of dropping item s when killing monster class x
};

var jsonRefineDefBonus = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 6,
    "6": 8,
    "7": 10,
    "8": 12,
    "9": 15,
    "10": 18,
    "11": 21,
    "12": 24,
    "13": 28,
    "14": 32,
    "15": 36,
    "16": 40,
    "17": 45,
    "18": 50,
    "19": 55,
    "20": 60,
}