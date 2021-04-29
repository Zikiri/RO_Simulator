// initial logic. trashed in order to pick values directly from rAthena file

/*function JobBonusStats(Class, JobLvl) {

    var BonusStats = [0, 0, 0, 0, 0, 0];

    for (var i = 0; i < Object.keys(JSONJobBonus).length; i++) {
        if (JSONJobBonus[i]["JobNo"] == Class) {
            for (var j = 0; j <= JobLvl; j++) {
                if (JSONJobBonus[i]["Bonus"][j] !== undefined && j <= JobLvl) {
                    switch (JSONJobBonus[i]["Bonus"][j]) {
                        case "Str":
                            BonusStats[0]++;
                            break;
                        case "Agi":
                            BonusStats[1]++;
                            break;
                        case "Vit":
                            BonusStats[2]++;
                            break;
                        case "Int":
                            BonusStats[3]++;
                            break;
                        case "Dex":
                            BonusStats[4]++;
                            break;
                        case "Luk":
                            BonusStats[5]++;
                            break;
                    }
                }
            }
            break;
        }
    }
    return BonusStats;
}*/

var JSONJobBonus = [{
        "Job": "Novice",
        "JobNo": "0",
        "Bonus": { "2": "Luk", "3": "Dex", "5": "Agi", "6": "Vit", "8": "Str", "9": "Int" }
    },
    {
        "Job": "Swordman",
        "JobNo": "1",
        "Bonus": { "2": "Str", "6": "Vit", "10": "Dex", "14": "Str", "18": "Vit", "22": "Dex", "26": "Luk", "30": "Agi", "36": "Dex", "38": "Vit", "44": "Luk", "46": "Agi", "33": "Str", "40": "Str", "42": "Vit", "47": "Str", "49": "Str", "50": "Str" }
    },
    {
        "Job": "Thief",
        "JobNo": "2",
        "Bonus": { "2": "Agi", "6": "Str", "10": "Dex", "14": "Vit", "18": "Int", "22": "Dex", "26": "Luk", "30": "Str", "33": "Agi", "36": "Agi", "38": "Str", "40": "Luk", "42": "Dex", "44": "Vit", "46": "Luk", "47": "Str", "49": "Dex", "50": "Agi" }
    },
    {
        "Job": "Acolyte",
        "JobNo": "3",
        "Bonus": { "2": "Luk", "6": "Vit", "10": "Int", "14": "Dex", "18": "Luk", "22": "Agi", "26": "Str", "30": "Vit", "33": "Int", "36": "Dex", "38": "Luk", "40": "Agi", "42": "Str", "44": "Vit", "46": "Int", "47": "Dex", "49": "Str", "50": "Luk" }
    },
    {
        "Job": "Archer",
        "JobNo": "4",
        "Bonus": { "2": "Dex", "6": "Str", "10": "Int", "14": "Dex", "18": "Dex", "22": "Luk", "26": "Agi", "30": "Dex", "33": "Agi", "36": "Dex", "38": "Str", "40": "Str", "42": "Dex", "44": "Luk", "46": "Vit", "47": "Int", "49": "Agi", "50": "Dex" }
    },
    {
        "Job": "Mage",
        "JobNo": "5",
        "Bonus": { "2": "Int", "6": "Dex", "10": "Dex", "14": "Int", "18": "Agi", "22": "Int", "26": "Agi", "30": "Luk", "33": "Int", "36": "Dex", "38": "Int", "40": "Agi", "42": "Luk", "44": "Int", "46": "Int", "47": "Agi", "49": "Luk", "50": "Int" }
    },
    {
        "Job": "Merchant",
        "JobNo": "6",
        "Bonus": { "2": "Vit", "6": "Dex", "10": "Str", "14": "Dex", "18": "Vit", "22": "Str", "26": "Int", "30": "Vit", "33": "Agi", "36": "Luk", "38": "Dex", "40": "Str", "42": "Dex", "44": "Str", "46": "Luk", "47": "Vit", "49": "Str", "50": "Dex" }
    },
    {
        "Job": "Knight",
        "JobNo": "10",
        "Bonus": { "1": "Vit", "3": "Vit", "4": "Str", "5": "Luk", "8": "Vit", "10": "Str", "11": "Dex", "12": "Vit", "13": "Agi", "15": "Str", "17": "Vit", "18": "Vit", "19": "Dex", "20": "Luk", "21": "Str", "23": "Vit", "27": "Str", "28": "Luk", "29": "Vit", "31": "Dex", "33": "Str", "36": "Vit", "37": "Luk", "38": "Agi", "40": "Dex", "43": "Vit", "46": "Str", "47": "Str", "48": "Dex", "49": "Dex" }
    },
    {
        "Job": "Assassin",
        "JobNo": "11",
        "Bonus": { "1": "Agi", "2": "Agi", "3": "Agi", "4": "Int", "6": "Vit", "8": "Vit", "9": "Dex", "11": "Str", "14": "Int", "15": "Agi", "16": "Agi", "17": "Agi", "18": "Agi", "19": "Agi", "20": "Agi", "21": "Agi", "24": "Dex", "25": "Str", "27": "Str", "30": "Dex", "31": "Dex", "32": "Str", "38": "Int", "40": "Dex", "41": "Dex", "42": "Int", "45": "Str", "46": "Dex", "48": "Str", "50": "Dex" }
    },
    {
        "Job": "Priest",
        "JobNo": "12",
        "Bonus": { "1": "Luk", "3": "Luk", "4": "Str", "6": "Agi", "7": "Vit", "8": "Int", "9": "Int", "10": "Luk", "11": "Str", "14": "Vit", "16": "Dex", "17": "Str", "20": "Dex", "21": "Luk", "22": "Int", "25": "Dex", "27": "Str", "29": "Agi", "31": "Luk", "32": "Dex", "34": "Vit", "35": "Str", "36": "Vit", "37": "Agi", "39": "Luk", "42": "Int", "43": "Int", "45": "Vit", "48": "Agi", "50": "Luk" }
    },
    {
        "Job": "Hunter",
        "JobNo": "13",
        "Bonus": { "1": "Dex", "3": "Int", "4": "Dex", "5": "Luk", "6": "Str", "8": "Dex", "10": "Str", "11": "Str", "12": "Agi", "14": "Dex", "15": "Luk", "17": "Vit", "19": "Agi", "20": "Agi", "21": "Dex", "23": "Vit", "27": "Dex", "29": "Luk", "31": "Agi", "33": "Dex", "34": "Int", "38": "Dex", "39": "Agi", "41": "Int", "42": "Luk", "43": "Dex", "44": "Str", "46": "Int", "47": "Agi", "49": "Dex" }
    },
    {
        "Job": "Wizard",
        "JobNo": "14",
        "Bonus": { "1": "Int", "2": "Dex", "4": "Int", "5": "Dex", "6": "Agi", "9": "Int", "10": "Agi", "12": "Str", "13": "Dex", "15": "Luk", "18": "Int", "22": "Int", "24": "Agi", "26": "Dex", "29": "Int", "31": "Int", "32": "Dex", "33": "Int", "34": "Agi", "36": "Luk", "38": "Vit", "39": "Dex", "40": "Int", "41": "Agi", "43": "Agi", "45": "Int", "46": "Agi", "47": "Agi", "48": "Int", "50": "Int" }
    },
    {
        "Job": "Blacksmith",
        "JobNo": "15",
        "Bonus": { "1": "Dex", "3": "Str", "4": "Dex", "5": "Dex", "7": "Vit", "8": "Str", "9": "Dex", "11": "Luk", "12": "Dex", "13": "Vit", "16": "Str", "19": "Dex", "20": "Vit", "21": "Int", "23": "Str", "26": "Dex", "28": "Dex", "29": "Agi", "31": "Str", "32": "Vit", "34": "Int", "36": "Dex", "37": "Vit", "38": "Agi", "39": "Dex", "40": "Dex", "44": "Str", "46": "Luk", "47": "Dex", "49": "Vit" }
    },
    {
        "Job": "Crusader",
        "JobNo": "20",
        "Bonus": { "1": "Luk", "2": "Luk", "3": "Luk", "4": "Luk", "5": "Luk", "7": "Str", "9": "Int", "11": "Str", "12": "Vit", "14": "Dex", "15": "Vit", "17": "Str", "20": "Int", "21": "Int", "22": "Vit", "23": "Str", "25": "Str", "28": "Dex", "30": "Agi", "32": "Str", "34": "Dex", "35": "Int", "36": "Agi", "38": "Int", "40": "Vit", "41": "Vit", "44": "Int", "46": "Vit", "48": "Str", "50": "Vit" }
    },
    {
        "Job": "Rogue",
        "JobNo": "21",
        "Bonus": { "1": "Agi", "2": "Vit", "3": "Dex", "5": "Str", "6": "Vit", "7": "Agi", "9": "Vit", "11": "Dex", "14": "Vit", "15": "Vit", "16": "Agi", "18": "Dex", "20": "Dex", "23": "Agi", "25": "Str", "26": "Vit", "27": "Str", "29": "Agi", "30": "Str", "33": "Dex", "34": "Dex", "36": "Str", "38": "Int", "39": "Agi", "42": "Str", "43": "Int", "45": "Agi", "47": "Int", "48": "Int", "50": "Dex" }
    },
    {
        "Job": "Monk",
        "JobNo": "22",
        "Bonus": { "1": "Str", "2": "Str", "4": "Dex", "5": "Agi", "7": "Vit", "10": "Agi", "12": "Str", "13": "Str", "15": "Luk", "16": "Int", "18": "Agi", "20": "Vit", "21": "Agi", "22": "Dex", "23": "Agi", "25": "Vit", "26": "Str", "27": "Str", "30": "Dex", "32": "Luk", "33": "Vit", "35": "Agi", "38": "Int", "40": "Luk", "41": "Vit", "43": "Dex", "44": "Agi", "46": "Vit", "49": "Str", "50": "Str" }
    },
    {
        "Job": "Bard",
        "JobNo": "23",
        "Bonus": { "1": "Dex", "2": "Agi", "3": "Str", "5": "Int", "6": "Luk", "7": "Dex", "9": "Luk", "10": "Agi", "11": "Agi", "13": "Int", "15": "Dex", "16": "Dex", "17": "Vit", "19": "Dex", "20": "Luk", "21": "Int", "24": "Agi", "28": "Str", "30": "Agi", "32": "Dex", "33": "Vit", "35": "Agi", "38": "Dex", "40": "Int", "41": "Luk", "43": "Vit", "46": "Dex", "47": "Int", "48": "Agi", "50": "Dex" }
    },
    {
        "Job": "Dancer",
        "JobNo": "24",
        "Bonus": { "1": "Luk", "2": "Agi", "3": "Str", "5": "Int", "6": "Dex", "7": "Luk", "9": "Dex", "10": "Agi", "11": "Agi", "13": "Int", "15": "Luk", "16": "Dex", "17": "Vit", "19": "Luk", "20": "Dex", "21": "Int", "24": "Agi", "28": "Str", "30": "Agi", "32": "Luk", "33": "Vit", "35": "Agi", "38": "Luk", "40": "Int", "41": "Dex", "43": "Vit", "46": "Luk", "47": "Int", "48": "Agi", "50": "Luk" }
    },
    {
        "Job": "Sage",
        "JobNo": "25",
        "Bonus": { "1": "Int", "3": "Agi", "4": "Vit", "6": "Agi", "8": "Int", "11": "Vit", "13": "Agi", "15": "Int", "17": "Luk", "18": "Vit", "20": "Dex", "22": "Agi", "24": "Int", "25": "Dex", "27": "Dex", "30": "Int", "32": "Dex", "33": "Agi", "35": "Luk", "37": "Int", "38": "Int", "39": "Dex", "40": "Luk", "42": "Str", "44": "Str", "45": "Int", "46": "Str", "47": "Str", "48": "Str", "50": "Int" }
    },
    {
        "Job": "Alchemist",
        "JobNo": "26",
        "Bonus": { "1": "Int", "2": "Dex", "3": "Dex", "6": "Str", "8": "Dex", "9": "Int", "11": "Agi", "13": "Dex", "14": "Agi", "15": "Str", "17": "Int", "19": "Dex", "20": "Vit", "21": "Dex", "23": "Int", "24": "Int", "25": "Dex", "26": "Str", "28": "Dex", "29": "Int", "31": "Vit", "32": "Dex", "34": "Str", "36": "Vit", "38": "Int", "40": "Agi", "43": "Str", "45": "Agi", "49": "Agi", "50": "Agi" }
    },
    {
        "Job": "High Novice",
        "JobNo": "30",
        "Bonus": { "2": "Luk", "3": "Dex", "5": "Agi", "6": "Vit", "8": "Str", "9": "Int" }
    },
    {
        "Job": "High Swordman",
        "JobNo": "31",
        "Bonus": { "2": "Str", "6": "Vit", "10": "Dex", "14": "Str", "18": "Vit", "22": "Dex", "26": "Luk", "30": "Agi", "36": "Dex", "38": "Vit", "44": "Luk", "46": "Agi", "33": "Str", "40": "Str", "42": "Vit", "47": "Str", "49": "Str", "50": "Str" }
    },
    {
        "Job": "High Thief",
        "JobNo": "32",
        "Bonus": { "2": "Agi", "6": "Str", "10": "Dex", "14": "Vit", "18": "Int", "22": "Dex", "26": "Luk", "30": "Str", "33": "Agi", "36": "Agi", "38": "Str", "40": "Luk", "42": "Dex", "44": "Vit", "46": "Luk", "47": "Str", "49": "Dex", "50": "Agi" }
    },
    {
        "Job": "High Acolyte",
        "JobNo": "33",
        "Bonus": { "2": "Luk", "6": "Vit", "10": "Int", "14": "Dex", "18": "Luk", "22": "Agi", "26": "Str", "30": "Vit", "33": "Int", "36": "Dex", "38": "Luk", "40": "Agi", "42": "Str", "44": "Vit", "46": "Int", "47": "Dex", "49": "Str", "50": "Luk" }
    },
    {
        "Job": "High Archer",
        "JobNo": "34",
        "Bonus": { "2": "Dex", "6": "Str", "10": "Int", "14": "Dex", "18": "Dex", "22": "Luk", "26": "Agi", "30": "Dex", "33": "Agi", "36": "Dex", "38": "Str", "40": "Str", "42": "Dex", "44": "Luk", "46": "Vit", "47": "Int", "49": "Agi", "50": "Dex" }
    },
    {
        "Job": "High Mage",
        "JobNo": "35",
        "Bonus": { "2": "Int", "6": "Dex", "10": "Dex", "14": "Int", "18": "Agi", "22": "Int", "26": "Agi", "30": "Luk", "33": "Int", "36": "Dex", "38": "Int", "40": "Agi", "42": "Luk", "44": "Int", "46": "Int", "47": "Agi", "49": "Luk", "50": "Int" }
    },
    {
        "Job": "High Merchant",
        "JobNo": "36",
        "Bonus": { "2": "Vit", "6": "Dex", "10": "Str", "14": "Dex", "18": "Vit", "22": "Str", "26": "Int", "30": "Vit", "33": "Agi", "36": "Luk", "38": "Dex", "40": "Str", "42": "Dex", "44": "Str", "46": "Luk", "47": "Vit", "49": "Str", "50": "Dex" }
    },
    {
        "Job": "Lord Knight",
        "JobNo": "40",
        "Bonus": { "1": "Str", "2": "Agi", "3": "Luk", "4": "Dex", "5": "Vit", "6": "Str", "7": "Str", "8": "Str", "10": "Agi", "11": "Dex", "12": "Vit", "13": "Int", "14": "Agi", "16": "Dex", "17": "Agi", "19": "Str", "22": "Vit", "25": "Str", "27": "Luk", "28": "Dex", "29": "Vit", "31": "Dex", "33": "Str", "36": "Dex", "37": "Agi", "38": "Luk", "40": "Vit", "41": "Str", "43": "Vit", "44": "Dex", "46": "Str", "47": "Str", "49": "Dex", "52": "Str", "53": "Agi", "56": "Str", "57": "Str", "58": "Vit", "60": "Agi", "62": "Dex", "64": "Str", "65": "Agi", "67": "Int", "68": "Vit", "70": "Str" }
    },
    {
        "Job": "Assassin Cross",
        "JobNo": "41",
        "Bonus": { "1": "Agi", "2": "Str", "3": "Luk", "4": "Agi", "5": "Agi", "7": "Str", "8": "Luk", "9": "Vit", "10": "Dex", "12": "Str", "15": "Agi", "16": "Luk", "18": "Luk", "20": "Agi", "21": "Str", "23": "Dex", "24": "Agi", "25": "Agi", "26": "Luk", "29": "Str", "31": "Agi", "32": "Agi", "33": "Agi", "34": "Luk", "37": "Dex", "38": "Str", "39": "Dex", "42": "Agi", "43": "Dex", "46": "Agi", "47": "Vit", "48": "Luk", "50": "Str", "51": "Agi", "53": "Dex", "54": "Str", "56": "Agi", "57": "Dex", "61": "Dex", "62": "Agi", "64": "Dex", "65": "Luk", "66": "Str", "69": "Vit", "70": "Dex" }
    },
    {
        "Job": "High Priest",
        "JobNo": "42",
        "Bonus": { "1": "Int", "3": "Agi", "4": "Vit", "5": "Str", "7": "Int", "8": "Agi", "11": "Int", "12": "Str", "13": "Dex", "16": "Dex", "19": "Agi", "20": "Int", "21": "Str", "22": "Vit", "23": "Int", "24": "Int", "26": "Dex", "28": "Dex", "29": "Agi", "30": "Vit", "31": "Str", "34": "Int", "37": "Dex", "38": "Str", "40": "Luk", "42": "Agi", "43": "Dex", "45": "Str", "46": "Dex", "47": "Int", "49": "Luk", "50": "Vit", "51": "Vit", "55": "Agi", "56": "Dex", "57": "Int", "58": "Vit", "60": "Str", "61": "Int", "62": "Dex", "65": "Agi", "66": "Int", "67": "Vit", "68": "Agi", "70": "Int" }
    },
    {
        "Job": "Sniper",
        "JobNo": "43",
        "Bonus": { "1": "Dex", "2": "Agi", "3": "Dex", "4": "Dex", "5": "Int", "6": "Agi", "8": "Str", "10": "Agi", "11": "Agi", "12": "Vit", "14": "Luk", "16": "Dex", "17": "Dex", "20": "Int", "21": "Agi", "22": "Dex", "24": "Str", "25": "Luk", "26": "Dex", "28": "Agi", "30": "Dex", "31": "Luk", "32": "Vit", "33": "Agi", "35": "Dex", "36": "Luk", "38": "Agi", "40": "Dex", "42": "Int", "43": "Agi", "45": "Str", "46": "Dex", "48": "Agi", "50": "Luk", "51": "Dex", "54": "Int", "55": "Vit", "57": "Luk", "58": "Agi", "60": "Dex", "61": "Str", "62": "Luk", "65": "Int", "69": "Dex", "70": "Luk" }
    },
    {
        "Job": "High Wizard",
        "JobNo": "44",
        "Bonus": { "1": "Int", "2": "Dex", "3": "Vit", "5": "Int", "8": "Agi", "9": "Dex", "10": "Int", "12": "Luk", "14": "Int", "17": "Dex", "18": "Agi", "19": "Int", "20": "Str", "22": "Dex", "23": "Dex", "24": "Int", "26": "Agi", "28": "Int", "29": "Vit", "31": "Dex", "32": "Int", "34": "Agi", "37": "Int", "38": "Int", "39": "Int", "40": "Str", "41": "Luk", "43": "Dex", "46": "Int", "47": "Vit", "49": "Int", "50": "Agi", "53": "Vit", "55": "Int", "56": "Agi", "57": "Luk", "59": "Int", "60": "Str", "61": "Dex", "62": "Int", "65": "Agi", "66": "Vit", "67": "Dex", "69": "Agi", "70": "Int" }
    },
    {
        "Job": "Whitesmith",
        "JobNo": "45",
        "Bonus": { "1": "Dex", "2": "Str", "3": "Str", "4": "Int", "6": "Dex", "7": "Agi", "8": "Luk", "9": "Vit", "12": "Dex", "13": "Vit", "15": "Int", "16": "Luk", "17": "Str", "19": "Agi", "20": "Agi", "22": "Int", "23": "Dex", "26": "Str", "28": "Luk", "29": "Vit", "31": "Agi", "32": "Dex", "33": "Str", "34": "Int", "36": "Agi", "38": "Dex", "39": "Luk", "41": "Dex", "44": "Luk", "45": "Luk", "47": "Dex", "48": "Vit", "50": "Int", "52": "Str", "55": "Dex", "56": "Dex", "58": "Agi", "60": "Vit", "61": "Int", "62": "Dex", "64": "Agi", "65": "Vit", "66": "Luk", "67": "Luk", "70": "Dex" }
    },
    {
        "Job": "Paladin",
        "JobNo": "50",
        "Bonus": { "1": "Vit", "2": "Str", "3": "Agi", "6": "Dex", "7": "Int", "8": "Agi", "9": "Vit", "10": "Str", "12": "Dex", "14": "Int", "15": "Vit", "16": "Agi", "17": "Dex", "18": "Str", "21": "Vit", "23": "Dex", "24": "Agi", "26": "Str", "29": "Int", "30": "Vit", "33": "Str", "36": "Dex", "37": "Agi", "39": "Luk", "40": "Str", "42": "Vit", "43": "Int", "45": "Dex", "48": "Str", "49": "Vit", "52": "Agi", "53": "Vit", "54": "Int", "55": "Str", "57": "Dex", "59": "Luk", "60": "Agi", "61": "Int", "63": "Vit", "64": "Str", "65": "Int", "67": "Luk", "68": "Dex", "69": "Vit", "70": "Agi" }
    },
    {
        "Job": "Stalker",
        "JobNo": "51",
        "Bonus": { "1": "Str", "2": "Agi", "4": "Luk", "5": "Int", "6": "Vit", "9": "Agi", "10": "Dex", "11": "Str", "12": "Agi", "15": "Vit", "16": "Dex", "17": "Dex", "20": "Luk", "21": "Agi", "22": "Str", "24": "Luk", "26": "Dex", "27": "Agi", "29": "Dex", "31": "Luk", "32": "Str", "34": "Agi", "37": "Dex", "38": "Dex", "41": "Agi", "42": "Vit", "43": "Str", "44": "Int", "45": "Agi", "47": "Str", "49": "Dex", "50": "Luk", "52": "Dex", "53": "Str", "56": "Dex", "57": "Int", "58": "Agi", "59": "Luk", "60": "Dex", "62": "Str", "63": "Vit", "64": "Agi", "66": "Dex", "67": "Str", "70": "Agi" }
    },
    {
        "Job": "Champion",
        "JobNo": "52",
        "Bonus": { "1": "Str", "2": "Int", "3": "Vit", "4": "Agi", "6": "Dex", "9": "Str", "11": "Int", "12": "Agi", "13": "Luk", "15": "Vit", "16": "Dex", "17": "Str", "20": "Agi", "21": "Agi", "22": "Dex", "24": "Vit", "27": "Str", "29": "Agi", "30": "Dex", "33": "Int", "34": "Luk", "37": "Str", "38": "Dex", "39": "Vit", "42": "Vit", "44": "Dex", "45": "Agi", "46": "Luk", "47": "Int", "48": "Str", "50": "Dex", "52": "Agi", "53": "Dex", "56": "Int", "58": "Vit", "59": "Str", "60": "Dex", "62": "Agi", "64": "Int", "65": "Str", "66": "Str", "67": "Dex", "68": "Vit", "69": "Int", "70": "Agi" }
    },
    {
        "Job": "Clown",
        "JobNo": "53",
        "Bonus": { "1": "Agi", "2": "Dex", "4": "Agi", "5": "Str", "7": "Dex", "8": "Int", "9": "Agi", "10": "Str", "11": "Luk", "13": "Agi", "15": "Dex", "16": "Vit", "18": "Luk", "19": "Str", "21": "Int", "23": "Dex", "24": "Agi", "26": "Luk", "28": "Int", "30": "Dex", "32": "Agi", "33": "Str", "36": "Agi", "39": "Dex", "40": "Dex", "41": "Int", "43": "Dex", "45": "Str", "47": "Luk", "49": "Agi", "50": "Dex", "53": "Agi", "54": "Str", "56": "Dex", "57": "Dex", "58": "Agi", "59": "Vit", "61": "Dex", "62": "Str", "63": "Dex", "65": "Agi", "66": "Dex", "68": "Agi", "69": "Int", "70": "Str" }
    },
    {
        "Job": "Gypsy",
        "JobNo": "54",
        "Bonus": { "1": "Dex", "2": "Str", "4": "Agi", "6": "Str", "8": "Int", "9": "Dex", "11": "Agi", "12": "Agi", "13": "Agi", "14": "Dex", "15": "Dex", "17": "Vit", "18": "Dex", "20": "Str", "22": "Dex", "23": "Dex", "25": "Agi", "26": "Int", "27": "Luk", "28": "Dex", "31": "Agi", "33": "Dex", "35": "Str", "38": "Agi", "39": "Int", "41": "Dex", "43": "Dex", "45": "Dex", "47": "Agi", "49": "Dex", "50": "Str", "52": "Agi", "53": "Int", "54": "Vit", "57": "Agi", "58": "Dex", "60": "Int", "61": "Agi", "62": "Agi", "63": "Luk", "65": "Dex", "66": "Str", "67": "Agi", "69": "Dex", "70": "Agi" }
    },
    {
        "Job": "Professor",
        "JobNo": "55",
        "Bonus": { "1": "Int", "2": "Int", "3": "Agi", "5": "Str", "7": "Vit", "8": "Dex", "11": "Int", "12": "Agi", "14": "Int", "16": "Dex", "18": "Str", "20": "Dex", "21": "Luk", "22": "Int", "23": "Agi", "24": "Vit", "26": "Dex", "27": "Str", "29": "Dex", "30": "Int", "32": "Agi", "34": "Dex", "36": "Str", "37": "Dex", "38": "Int", "39": "Vit", "41": "Int", "43": "Agi", "45": "Str", "46": "Dex", "49": "Int", "50": "Agi", "52": "Dex", "54": "Agi", "55": "Dex", "56": "Str", "57": "Int", "60": "Agi", "62": "Dex", "63": "Vit", "64": "Int", "66": "Luk", "68": "Int", "69": "Agi", "70": "Int" }
    },
    {
        "Job": "Creator",
        "JobNo": "56",
        "Bonus": { "1": "Dex", "3": "Luk", "5": "Agi", "6": "Str", "7": "Int", "8": "Luk", "9": "Vit", "10": "Dex", "13": "Int", "15": "Dex", "18": "Agi", "20": "Luk", "22": "Int", "23": "Dex", "25": "Luk", "27": "Agi", "30": "Int", "31": "Str", "33": "Vit", "34": "Luk", "35": "Dex", "38": "Agi", "41": "Dex", "42": "Dex", "43": "Dex", "45": "Luk", "46": "Int", "47": "Dex", "49": "Dex", "51": "Luk", "52": "Luk", "53": "Str", "54": "Agi", "56": "Dex", "57": "Dex", "59": "Int", "60": "Luk", "61": "Vit", "63": "Dex", "64": "Luk", "66": "Str", "67": "Agi", "68": "Int", "69": "Luk", "70": "Dex" }
    },
    {
        "Job": "Rune Knight (trans)",
        "JobNo": "60",
        "Bonus": { "1": "Int", "2": "Int", "3": "Dex", "4": "Vit", "5": "Int", "10": "Str", "11": "Str", "12": "Int", "13": "Int", "14": "Vit", "15": "Dex", "19": "Dex", "20": "Agi", "21": "Agi", "22": "Int", "23": "Vit", "24": "Dex", "30": "Int", "31": "Dex", "32": "Vit", "33": "Str", "39": "Int", "40": "Dex", "41": "Agi", "44": "Dex", "45": "Vit", "46": "Int", "47": "Luk", "48": "Luk", "49": "Luk", "50": "Int", "51": "Str", "53": "Agi", "55": "Dex", "57": "Luk", "59": "Vit", "60": "Str" }
    },
    {
        "Job": "Guillotine Cross (trans)",
        "JobNo": "61",
        "Bonus": { "1": "Agi", "2": "Dex", "4": "Str", "5": "Str", "9": "Str", "10": "Agi", "11": "Dex", "14": "Vit", "15": "Vit", "16": "Str", "19": "Vit", "20": "Str", "23": "Agi", "24": "Agi", "25": "Dex", "28": "Int", "29": "Int", "30": "Str", "31": "Vit", "35": "Agi", "36": "Dex", "37": "Dex", "41": "Int", "42": "Vit", "43": "Agi", "44": "Agi", "48": "Int", "49": "Dex", "50": "Dex", "51": "Luk", "52": "Str", "53": "Agi", "54": "Vit", "56": "Int", "58": "Str", "59": "Luk", "60": "Agi" }
    },
    {
        "Job": "Arch Bishop (trans)",
        "JobNo": "62",
        "Bonus": { "1": "Int", "3": "Vit", "5": "Dex", "7": "Int", "8": "Int", "10": "Vit", "11": "Vit", "14": "Dex", "15": "Dex", "18": "Str", "19": "Str", "22": "Int", "24": "Str", "26": "Agi", "27": "Agi", "28": "Str", "32": "Int", "34": "Vit", "36": "Dex", "38": "Agi", "39": "Agi", "40": "Int", "41": "Int", "44": "Dex", "45": "Vit", "46": "Str", "49": "Int", "50": "Dex", "51": "Luk", "52": "Agi", "53": "Vit", "54": "Str", "55": "Int", "57": "Vit", "58": "Luk", "59": "Dex", "60": "Int" }
    },
    {
        "Job": "Ranger (trans)",
        "JobNo": "63",
        "Bonus": { "1": "Dex", "2": "Int", "3": "Int", "4": "Agi", "7": "Agi", "8": "Dex", "9": "Int", "12": "Vit", "13": "Vit", "14": "Vit", "17": "Dex", "18": "Agi", "21": "Int", "22": "Vit", "23": "Dex", "26": "Str", "27": "Str", "30": "Dex", "31": "Agi", "32": "Vit", "36": "Int", "37": "Int", "38": "Int", "39": "Agi", "43": "Agi", "44": "Dex", "45": "Agi", "49": "Int", "50": "Agi", "51": "Luk", "52": "Dex", "54": "Int", "55": "Agi", "57": "Vit", "58": "Luk", "59": "Dex", "60": "Agi" }
    },
    {
        "Job": "Warlock (trans)",
        "JobNo": "64",
        "Bonus": { "1": "Int", "2": "Int", "3": "Dex", "6": "Dex", "7": "Int", "8": "Agi", "12": "Int", "13": "Dex", "15": "Vit", "18": "Vit", "19": "Dex", "20": "Agi", "23": "Int", "24": "Vit", "25": "Vit", "28": "Dex", "29": "Agi", "31": "Luk", "34": "Str", "35": "Int", "36": "Int", "39": "Dex", "40": "Agi", "41": "Int", "44": "Int", "45": "Int", "47": "Agi", "50": "Int", "51": "Dex", "52": "Vit", "53": "Luk", "54": "Agi", "55": "Int", "57": "Vit", "58": "Agi", "59": "Dex", "60": "Int" }
    },
    {
        "Job": "Mechanic (trans)",
        "JobNo": "65",
        "Bonus": { "1": "Luk", "2": "Str", "5": "Str", "7": "Luk", "8": "Agi", "9": "Dex", "10": "Int", "13": "Int", "14": "Luk", "17": "Agi", "19": "Vit", "20": "Vit", "21": "Int", "22": "Dex", "25": "Vit", "26": "Luk", "29": "Vit", "31": "Str", "32": "Str", "33": "Vit", "34": "Luk", "37": "Int", "38": "Int", "42": "Vit", "43": "Vit", "44": "Str", "45": "Str", "48": "Dex", "49": "Agi", "51": "Luk", "52": "Str", "53": "Dex", "55": "Int", "56": "Vit", "57": "Agi", "59": "Dex", "60": "Str" }
    },
    {
        "Job": "Royal Guard (trans)",
        "JobNo": "70",
        "Bonus": { "2": "Vit", "3": "Int", "4": "Str", "5": "Int", "6": "Dex", "9": "Vit", "11": "Int", "13": "Str", "14": "Dex", "16": "Luk", "19": "Int", "20": "Dex", "23": "Agi", "24": "Int", "26": "Int", "27": "Vit", "30": "Str", "31": "Dex", "33": "Luk", "34": "Agi", "37": "Int", "38": "Int", "40": "Str", "41": "Vit", "42": "Vit", "44": "Dex", "45": "Str", "46": "Int", "48": "Str", "49": "Dex", "51": "Agi", "53": "Vit", "54": "Luk", "56": "Dex", "58": "Str", "59": "Vit", "60": "Int" }
    },
    {
        "Job": "Shadow Chaser (trans)",
        "JobNo": "71",
        "Bonus": { "1": "Luk", "2": "Str", "5": "Str", "7": "Luk", "8": "Agi", "9": "Dex", "10": "Int", "13": "Int", "14": "Luk", "17": "Agi", "19": "Vit", "20": "Vit", "21": "Int", "22": "Dex", "25": "Vit", "26": "Luk", "29": "Vit", "31": "Str", "32": "Str", "33": "Vit", "34": "Luk", "37": "Int", "38": "Int", "42": "Vit", "43": "Vit", "44": "Str", "45": "Str", "48": "Dex", "49": "Agi", "51": "Int", "52": "Vit", "53": "Str", "54": "Agi", "56": "Luk", "57": "Dex", "59": "Str", "60": "Agi" }
    },
    {
        "Job": "Sura (trans)",
        "JobNo": "72",
        "Bonus": { "1": "Agi", "2": "Dex", "4": "Str", "5": "Str", "9": "Str", "10": "Agi", "11": "Dex", "14": "Vit", "15": "Vit", "16": "Str", "19": "Vit", "20": "Str", "23": "Agi", "24": "Agi", "25": "Dex", "28": "Int", "29": "Int", "30": "Str", "31": "Vit", "35": "Agi", "36": "Dex", "37": "Dex", "41": "Int", "42": "Vit", "43": "Agi", "44": "Agi", "48": "Int", "49": "Dex", "50": "Dex", "51": "Str", "53": "Agi", "54": "Int", "55": "Luk", "56": "Vit", "58": "Dex", "59": "Str", "60": "Int" }
    },
    {
        "Job": "Minstrel (trans)",
        "JobNo": "73",
        "Bonus": { "1": "Int", "3": "Vit", "5": "Dex", "7": "Int", "8": "Int", "10": "Vit", "11": "Vit", "14": "Dex", "15": "Dex", "18": "Str", "19": "Str", "22": "Int", "24": "Str", "26": "Agi", "27": "Agi", "28": "Str", "32": "Int", "34": "Vit", "36": "Dex", "38": "Agi", "39": "Agi", "40": "Int", "41": "Int", "44": "Dex", "45": "Vit", "46": "Str", "49": "Int", "50": "Dex", "51": "Agi", "52": "Vit", "53": "Str", "54": "Luk", "56": "Dex", "57": "Vit", "58": "Str", "59": "Int", "60": "Dex" }
    },
    {
        "Job": "Wanderer (trans)",
        "JobNo": "74",
        "Bonus": { "1": "Dex", "2": "Int", "3": "Int", "4": "Agi", "7": "Agi", "8": "Dex", "9": "Int", "12": "Vit", "13": "Vit", "14": "Vit", "17": "Dex", "18": "Agi", "21": "Int", "22": "Vit", "23": "Dex", "26": "Str", "27": "Str", "30": "Dex", "31": "Agi", "32": "Vit", "36": "Int", "37": "Int", "38": "Int", "39": "Agi", "43": "Agi", "44": "Dex", "45": "Agi", "49": "Int", "50": "Agi", "51": "Str", "52": "Vit", "53": "Dex", "55": "Luk", "56": "Int", "58": "Vit", "59": "Agi", "60": "Dex" }
    },
    {
        "Job": "Sorcerer (trans)",
        "JobNo": "75",
        "Bonus": { "1": "Int", "2": "Int", "3": "Dex", "4": "Vit", "5": "Int", "10": "Str", "11": "Str", "12": "Int", "13": "Int", "14": "Vit", "15": "Dex", "19": "Dex", "20": "Agi", "21": "Agi", "22": "Int", "23": "Vit", "24": "Dex", "30": "Int", "31": "Dex", "32": "Vit", "33": "Str", "39": "Int", "40": "Dex", "41": "Agi", "44": "Dex", "45": "Vit", "46": "Int", "47": "Luk", "48": "Luk", "49": "Luk", "50": "Int", "51": "Dex", "53": "Str", "55": "Agi", "57": "Vit", "59": "Dex", "60": "Int" }
    },
    {
        "Job": "Genetic (trans)",
        "JobNo": "76",
        "Bonus": { "1": "Int", "2": "Int", "3": "Dex", "6": "Dex", "7": "Int", "8": "Agi", "12": "Int", "13": "Dex", "15": "Vit", "18": "Vit", "19": "Dex", "20": "Agi", "23": "Int", "24": "Vit", "25": "Vit", "28": "Dex", "29": "Agi", "31": "Luk", "34": "Str", "35": "Int", "36": "Int", "39": "Dex", "40": "Agi", "41": "Int", "44": "Int", "45": "Int", "47": "Agi", "50": "Int", "51": "Str", "52": "Vit", "53": "Dex", "55": "Agi", "56": "Str", "57": "Vit", "58": "Luk", "59": "Dex", "60": "Int" }
    },
    {
        "Job": "Rune Knight (non-trans)",
        "JobNo": "80",
        "Bonus": { "1": "Int", "2": "Int", "3": "Dex", "4": "Vit", "5": "Int", "10": "Str", "11": "Str", "12": "Int", "13": "Int", "14": "Vit", "15": "Dex", "19": "Dex", "20": "Agi", "21": "Agi", "22": "Int", "23": "Vit", "24": "Dex", "30": "Int", "31": "Dex", "32": "Vit", "33": "Str", "39": "Int", "40": "Dex", "41": "Agi", "44": "Dex", "45": "Vit", "46": "Int", "47": "Luk", "48": "Luk", "49": "Luk", "50": "Int", "51": "Str", "53": "Agi", "55": "Dex", "57": "Luk", "59": "Vit", "60": "Str" }
    },
    {
        "Job": "Guillotine Cross (non-trans)",
        "JobNo": "81",
        "Bonus": { "1": "Agi", "2": "Dex", "4": "Str", "5": "Str", "9": "Str", "10": "Agi", "11": "Dex", "14": "Vit", "15": "Vit", "16": "Str", "19": "Vit", "20": "Str", "23": "Agi", "24": "Agi", "25": "Dex", "28": "Int", "29": "Int", "30": "Str", "31": "Vit", "35": "Agi", "36": "Dex", "37": "Dex", "41": "Int", "42": "Vit", "43": "Agi", "44": "Agi", "48": "Int", "49": "Dex", "50": "Dex", "51": "Luk", "52": "Str", "53": "Agi", "54": "Vit", "56": "Int", "58": "Str", "59": "Luk", "60": "Agi" }
    },
    {
        "Job": "Arch Bishop (non-trans)",
        "JobNo": "82",
        "Bonus": { "1": "Int", "3": "Vit", "5": "Dex", "7": "Int", "8": "Int", "10": "Vit", "11": "Vit", "14": "Dex", "15": "Dex", "18": "Str", "19": "Str", "22": "Int", "24": "Str", "26": "Agi", "27": "Agi", "28": "Str", "32": "Int", "34": "Vit", "36": "Dex", "38": "Agi", "39": "Agi", "40": "Int", "41": "Int", "44": "Dex", "45": "Vit", "46": "Str", "49": "Int", "50": "Dex", "51": "Luk", "52": "Agi", "53": "Vit", "54": "Str", "55": "Int", "57": "Vit", "58": "Luk", "59": "Dex", "60": "Int" }
    },
    {
        "Job": "Ranger (non-trans)",
        "JobNo": "83",
        "Bonus": { "1": "Dex", "2": "Int", "3": "Int", "4": "Agi", "7": "Agi", "8": "Dex", "9": "Int", "12": "Vit", "13": "Vit", "14": "Vit", "17": "Dex", "18": "Agi", "21": "Int", "22": "Vit", "23": "Dex", "26": "Str", "27": "Str", "30": "Dex", "31": "Agi", "32": "Vit", "36": "Int", "37": "Int", "38": "Int", "39": "Agi", "43": "Agi", "44": "Dex", "45": "Agi", "49": "Int", "50": "Agi", "51": "Luk", "52": "Dex", "54": "Int", "55": "Agi", "57": "Vit", "58": "Luk", "59": "Dex", "60": "Agi" }
    },
    {
        "Job": "Warlock (non-trans)",
        "JobNo": "84",
        "Bonus": { "1": "Int", "2": "Int", "3": "Dex", "6": "Dex", "7": "Int", "8": "Agi", "12": "Int", "13": "Dex", "15": "Vit", "18": "Vit", "19": "Dex", "20": "Agi", "23": "Int", "24": "Vit", "25": "Vit", "28": "Dex", "29": "Agi", "31": "Luk", "34": "Str", "35": "Int", "36": "Int", "39": "Dex", "40": "Agi", "41": "Int", "44": "Int", "45": "Int", "47": "Agi", "50": "Int", "51": "Dex", "52": "Vit", "53": "Luk", "54": "Agi", "55": "Int", "57": "Vit", "58": "Agi", "59": "Dex", "60": "Int" }
    },
    {
        "Job": "Mechanic (non-trans)",
        "JobNo": "85",
        "Bonus": { "1": "Luk", "2": "Str", "5": "Str", "7": "Luk", "8": "Agi", "9": "Dex", "10": "Int", "13": "Int", "14": "Luk", "17": "Agi", "19": "Vit", "20": "Vit", "21": "Int", "22": "Dex", "25": "Vit", "26": "Luk", "29": "Vit", "31": "Str", "32": "Str", "33": "Vit", "34": "Luk", "37": "Int", "38": "Int", "42": "Vit", "43": "Vit", "44": "Str", "45": "Str", "48": "Dex", "49": "Agi", "51": "Luk", "52": "Str", "53": "Dex", "55": "Int", "56": "Vit", "57": "Agi", "59": "Dex", "60": "Str" }
    },
    {
        "Job": "Royal Guard (non-trans)",
        "JobNo": "90",
        "Bonus": { "2": "Vit", "3": "Int", "4": "Str", "5": "Int", "6": "Dex", "9": "Vit", "11": "Int", "13": "Str", "14": "Dex", "16": "Luk", "19": "Int", "20": "Dex", "23": "Agi", "24": "Int", "26": "Int", "27": "Vit", "30": "Str", "31": "Dex", "33": "Luk", "34": "Agi", "37": "Int", "38": "Int", "40": "Str", "41": "Vit", "42": "Vit", "44": "Dex", "45": "Str", "46": "Int", "48": "Str", "49": "Dex", "51": "Agi", "53": "Vit", "54": "Luk", "56": "Dex", "58": "Str", "59": "Vit", "60": "Int" }
    },
    {
        "Job": "Shadow Chaser (non-trans)",
        "JobNo": "91",
        "Bonus": { "1": "Luk", "2": "Str", "5": "Str", "7": "Luk", "8": "Agi", "9": "Dex", "10": "Int", "13": "Int", "14": "Luk", "17": "Agi", "19": "Vit", "20": "Vit", "21": "Int", "22": "Dex", "25": "Vit", "26": "Luk", "29": "Vit", "31": "Str", "32": "Str", "33": "Vit", "34": "Luk", "37": "Int", "38": "Int", "42": "Vit", "43": "Vit", "44": "Str", "45": "Str", "48": "Dex", "49": "Agi", "51": "Int", "52": "Vit", "53": "Str", "54": "Agi", "56": "Luk", "57": "Dex", "59": "Str", "60": "Agi" }
    },
    {
        "Job": "Sura (non-trans)",
        "JobNo": "92",
        "Bonus": { "1": "Agi", "2": "Dex", "4": "Str", "5": "Str", "9": "Str", "10": "Agi", "11": "Dex", "14": "Vit", "15": "Vit", "16": "Str", "19": "Vit", "20": "Str", "23": "Agi", "24": "Agi", "25": "Dex", "28": "Int", "29": "Int", "30": "Str", "31": "Vit", "35": "Agi", "36": "Dex", "37": "Dex", "41": "Int", "42": "Vit", "43": "Agi", "44": "Agi", "48": "Int", "49": "Dex", "50": "Dex", "51": "Str", "53": "Agi", "54": "Int", "55": "Luk", "56": "Vit", "58": "Dex", "59": "Str", "60": "Int" }
    },
    {
        "Job": "Minstrel (non-trans)",
        "JobNo": "93",
        "Bonus": { "1": "Int", "3": "Vit", "5": "Dex", "7": "Int", "8": "Int", "10": "Vit", "11": "Vit", "14": "Dex", "15": "Dex", "18": "Str", "19": "Str", "22": "Int", "24": "Str", "26": "Agi", "27": "Agi", "28": "Str", "32": "Int", "34": "Vit", "36": "Dex", "38": "Agi", "39": "Agi", "40": "Int", "41": "Int", "44": "Dex", "45": "Vit", "46": "Str", "49": "Int", "50": "Dex", "51": "Agi", "52": "Vit", "53": "Str", "54": "Luk", "56": "Dex", "57": "Vit", "58": "Str", "59": "Int", "60": "Dex" }
    },
    {
        "Job": "Wanderer (non-trans)",
        "JobNo": "94",
        "Bonus": { "1": "Dex", "2": "Int", "3": "Int", "4": "Agi", "7": "Agi", "8": "Dex", "9": "Int", "12": "Vit", "13": "Vit", "14": "Vit", "17": "Dex", "18": "Agi", "21": "Int", "22": "Vit", "23": "Dex", "26": "Str", "27": "Str", "30": "Dex", "31": "Agi", "32": "Vit", "36": "Int", "37": "Int", "38": "Int", "39": "Agi", "43": "Agi", "44": "Dex", "45": "Agi", "49": "Int", "50": "Agi", "51": "Str", "52": "Vit", "53": "Dex", "55": "Luk", "56": "Int", "58": "Vit", "59": "Agi", "60": "Dex" }
    },
    {
        "Job": "Sorcerer (non-trans)",
        "JobNo": "95",
        "Bonus": { "1": "Int", "2": "Int", "3": "Dex", "4": "Vit", "5": "Int", "10": "Str", "11": "Str", "12": "Int", "13": "Int", "14": "Vit", "15": "Dex", "19": "Dex", "20": "Agi", "21": "Agi", "22": "Int", "23": "Vit", "24": "Dex", "30": "Int", "31": "Dex", "32": "Vit", "33": "Str", "39": "Int", "40": "Dex", "41": "Agi", "44": "Dex", "45": "Vit", "46": "Int", "47": "Luk", "48": "Luk", "49": "Luk", "50": "Int", "51": "Dex", "53": "Str", "55": "Agi", "57": "Vit", "59": "Dex", "60": "Int" }
    },
    {
        "Job": "Genetic (non-trans)",
        "JobNo": "96",
        "Bonus": { "1": "Int", "2": "Int", "3": "Dex", "6": "Dex", "7": "Int", "8": "Agi", "12": "Int", "13": "Dex", "15": "Vit", "18": "Vit", "19": "Dex", "20": "Agi", "23": "Int", "24": "Vit", "25": "Vit", "28": "Dex", "29": "Agi", "31": "Luk", "34": "Str", "35": "Int", "36": "Int", "39": "Dex", "40": "Agi", "41": "Int", "44": "Int", "45": "Int", "47": "Agi", "50": "Int", "51": "Str", "52": "Vit", "53": "Dex", "55": "Agi", "56": "Str", "57": "Vit", "58": "Luk", "59": "Dex", "60": "Int" }
    }, {
        "Job": "Taekwon",
        "JobNo": "100",
        "Bonus": { "1": "Str", "2": "Str", "3": "Str", "4": "Str", "5": "Str", "6": "Str", "10": "Dex", "11": "Dex", "12": "Dex", "13": "Dex", "14": "Dex", "15": "Dex", "20": "Agi", "21": "Agi", "22": "Agi", "23": "Agi", "24": "Agi", "25": "Agi" }
    },
    {
        "Job": "Ninja",
        "JobNo": "101",
        "Bonus": { "1": "Agi", "2": "Agi", "10": "Dex", "11": "Agi", "20": "Int", "21": "Agi", "22": "Dex", "29": "Int", "30": "Luk", "31": "Agi", "32": "Dex", "40": "Luk", "41": "Agi", "42": "Int", "43": "Dex", "50": "Int", "51": "Agi", "52": "Luk", "53": "Dex", "59": "Str", "60": "Vit", "61": "Agi", "62": "Int", "63": "Dex", "64": "Luk" }
    },
    {
        "Job": "Gunslinger",
        "JobNo": "102",
        "Bonus": { "1": "Dex", "2": "Luk", "4": "Luk", "6": "Dex", "11": "Dex", "12": "Luk", "17": "Dex", "21": "Luk", "25": "Dex", "31": "Luk", "32": "Str", "35": "Dex", "41": "Str", "45": "Dex", "50": "Str", "51": "Luk", "52": "Int", "55": "Dex", "59": "Agi", "60": "Vit", "61": "Int", "62": "Dex", "63": "Luk", "64": "Str" }
    },
    {
        "Job": "Super Novice",
        "JobNo": "103",
        "Bonus": { "1": "Str", "3": "Agi", "5": "Vit", "7": "Int", "9": "Dex", "11": "Luk", "13": "Str", "15": "Agi", "17": "Vit", "19": "Int", "21": "Dex", "23": "Luk", "25": "Str", "27": "Agi", "29": "Vit", "31": "Int", "33": "Dex", "35": "Luk", "37": "Str", "39": "Agi", "41": "Vit", "43": "Int", "45": "Dex", "47": "Luk", "49": "Str", "52": "Agi", "56": "Vit", "60": "Int", "64": "Dex", "68": "Luk" }
    },
    {
        "Job": "Star Gladiator",
        "JobNo": "110",
        "Bonus": { "1": "Str", "2": "Str", "3": "Str", "4": "Str", "5": "Str", "6": "Str", "7": "Str", "8": "Str", "9": "Str", "10": "Str", "11": "Str", "12": "Str", "20": "Dex", "21": "Dex", "22": "Dex", "23": "Dex", "24": "Dex", "25": "Dex", "39": "Agi", "40": "Agi", "41": "Agi", "42": "Agi", "43": "Agi", "44": "Agi", "45": "Agi", "46": "Agi", "47": "Agi", "48": "Agi", "49": "Agi", "50": "Agi" }
    },
    {
        "Job": "Soul Linker",
        "JobNo": "111",
        "Bonus": { "1": "Int", "2": "Int", "3": "Int", "4": "Int", "5": "Int", "6": "Int", "7": "Int", "8": "Int", "9": "Int", "10": "Int", "11": "Int", "12": "Int", "20": "Vit", "21": "Vit", "22": "Vit", "23": "Vit", "24": "Vit", "25": "Vit", "39": "Dex", "40": "Dex", "41": "Dex", "42": "Dex", "43": "Dex", "44": "Dex", "45": "Dex", "46": "Dex", "47": "Dex", "48": "Dex", "49": "Dex", "50": "Dex" }
    },
    {
        "Job": "Kagerou/Oboro",
        "JobNo": "112",
        "Bonus": { "1": "Dex", "3": "Int", "5": "Agi", "6": "Vit", "8": "Str", "9": "Luk", "11": "Dex", "12": "Str", "13": "Agi", "15": "Int", "16": "Luk", "17": "Vit", "19": "Str", "20": "Dex", "21": "Agi", "23": "Luk", "24": "Vit", "25": "Int", "27": "Dex", "29": "Agi", "31": "Str", "32": "Int", "34": "Dex", "35": "Int", "37": "Vit", "38": "Dex", "39": "Str", "41": "Agi", "42": "Int", "43": "Str", "45": "Dex", "46": "Luk", "47": "Agi", "48": "Str", "50": "Dex" }
    },
    {
        "Job": "Rebellion",
        "JobNo": "113",
        "Bonus": { "2": "Dex", "4": "Int", "6": "Vit", "7": "Dex", "8": "Int", "9": "Agi", "10": "Luk", "13": "Vit", "14": "Int", "16": "Agi", "17": "Dex", "18": "Int", "19": "Vit", "20": "Luk", "23": "Vit", "24": "Dex", "25": "Str", "26": "Int", "27": "Agi", "30": "Luk", "31": "Vit", "33": "Dex", "34": "Int", "35": "Str", "38": "Dex", "40": "Agi", "41": "Luk", "43": "Dex", "44": "Vit", "45": "Int", "50": "Str", "51": "Agi", "52": "Luk", "54": "Int", "55": "Dex", "57": "Agi" }
    },
    {
        "Job": "Expanded Super Novice",
        "JobNo": "114",
        "Bonus": { "1": "Str", "2": "Agi", "4": "Vit", "6": "Int", "7": "Dex", "9": "Luk", "11": "Str", "12": "Agi", "14": "Vit", "16": "Int", "17": "Dex", "19": "Luk", "21": "Str", "22": "Agi", "24": "Vit", "26": "Int", "27": "Dex", "29": "Luk", "31": "Str", "32": "Agi", "34": "Vit", "36": "Int", "37": "Dex", "39": "Luk", "41": "Str", "42": "Agi", "44": "Vit", "46": "Int", "47": "Dex", "49": "Luk" }
    }
];