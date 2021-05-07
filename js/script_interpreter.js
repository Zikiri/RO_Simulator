// Interpreter to parse the various scripts attached to equips and cards as defined in the rAthena db files

//var teststring = "bonus bAtkEle,Ele_Wind;\nbonus bAspdRate,5;\nbonus bUnbreakableWeapon;\n";
//var teststring = 'bonus bAtkEle,Ele_Water;\nbonus2 bAddEff,Eff_Freeze,500;\nbonus2 bAddEff2,Eff_Freeze,10;\nskill "MG_COLDBOLT",3;\nbonus3 bAutoSpell,"MG_COLDBOLT",3,100;';
var teststring = 'bonus2 bSubClass,Class_Normal,-10;bonus2 bAddClass,Class_Boss,50;bonus bAllStats,2;';
//var teststring = 'bonus bAtkEle,Ele_Ghost;bonus3 bSPVanishRate,3,30,BF_WEAPON;bonus bSPDrainValue,-1;bonus bUnbreakableWeapon;';
//var teststring = 'bonus bCritical,10;if (100>=80)   bonus bBreakArmorRate,500;';
//var teststring = 'bonus2 bAddEff,Eff_Bleeding,800;     bonus3 bAutoSpell,"AL_DECAGI",1,30;';
//var teststring = 'bonus bFlee2,10;bonus bFlee2,10;if (50>=70 || (true && 50>=50))   autobonus "{ bonus bBaseAtk,50; }",10,10000,BF_WEAPON,"{ specialeffect2 EF_POTION_BERSERK; }";if (10>8) {   bonus bDelayrate,-20;  bonus bUseSPrate,-20; bonus bUseSPrate,-20;}';
//var teststring = 'if (50>=70 || (true && 50>=50))   autobonus "{ bonus bBaseAtk,50; }",10,10000,BF_WEAPON,"{ specialeffect2 EF_POTION_BERSERK; }";';
//var teststring = 'if (10>8) {   bonus bDelayrate,-20;   bonus bUseSPrate,-20;}';
//var teststring = 'bonus bAtkEle,Ele_Ghost;autobonus "{ bonus bCritical,100; bonus bBaseAtk,50; }",1,5000,0,"{ specialeffect2 EF_FIRESPLASHHIT; }";bonus bHPGainValue,100;';
//var teststring = 'bonus2 bAddRace,RC_DemiHuman,70;bonus2 bAddRace,RC_Player_Human,70;bonus2 bIgnoreDefRaceRate,RC_DemiHuman,25;bonus2 bIgnoreDefRaceRate,RC_Player_Human,25;bonus bUnbreakableWeapon;if (6>5) {   bonus2 bAddRace,RC_DemiHuman,pow(min(14,6)-3,2);   bonus2 bAddRace,RC_Player_Human,pow(min(14,6)-3,2);   bonus2 bIgnoreDefRaceRate,RC_DemiHuman,5;   bonus2 bIgnoreDefRaceRate,RC_Player_Human,5;}if (9>8) {   bonus3 bAutoSpell,"LK_CONCENTRATION",max(getskilllv("LK_CONCENTRATION"),1),30;   bonus3 bAutoSpell,"LK_AURABLADE",max(getskilllv("LK_AURABLADE"),1),30;}';
//var teststring = 'bonus2 bAddRace,RC_DemiHuman,pow(min(14,4)-3,1);';
//var teststring = 'if (10 == 10) {  bonus2 bSkillAtk,"SM_BASH",50;}if (10 == 10) {   bonus2 bSkillAtk,"KN_BOWLINGBASH",50;}bonus bStr,1;bonus bDex,1;';


// All applicable scripts held in this object
var jsonActiveScripts = {};

class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
    toString() {
        return "Token(" + this.type + "," + this.value + ")";
    }
}

class Lexer {
    constructor() {
        this.lexlist = [];
        this.i = 0;
        this.mathRegex = /pow|min|max/;
    }
    tokenize(text) {

        for (this.i = 0; this.i < text.length; this.i++) {

            if (' \n'.includes(text.charAt(this.i))) {
                // Ignore new line and white space. Do nothing
                //this.lexlist.push(new Token("NEWLINE", ""));

            } else if ('+-*/<>=|&'.includes(text.charAt(this.i))) {
                this.lexlist.push(new Token("OPERATOR", text.charAt(this.i)));

            } else if ('(){}'.includes(text.charAt(this.i))) {
                this.lexlist.push(new Token("BRACKET", text.charAt(this.i)));

            } else if (','.includes(text.charAt(this.i))) {
                this.lexlist.push(new Token("COMMA", text.charAt(this.i)));

            } else if (';'.includes(text.charAt(this.i))) {
                this.lexlist.push(new Token("SEMICOLON", text.charAt(this.i)));

            } else if (text.charAt(this.i).match(/[_a-zA-Z]/)) {
                var value = this.scan(text, /[_a-zA-Z0-9]/);
                if (value.match(/(auto)*bonus([0-9])*/)) this.lexlist.push(new Token("KEYWORD", value));
                //else if (value.match(/skill/)) this.lexlist.push(new Token("KEYWORD", value));
                else if (value.match(/if|else|skill/)) this.lexlist.push(new Token("KEYWORD", value));
                else if (value.match(/true|false/)) this.lexlist.push(new Token("BOOLEAN", value));
                else if (value.match(this.mathRegex)) this.lexlist.push(new Token("MATH_FN", value));
                else this.lexlist.push(new Token("VARIABLE", value));

            } else if (text.charAt(this.i).match(/[0-9]/)) {
                this.lexlist.push(new Token("NUMBER", this.scan(text, /[.0-9]/)));

            } else if (text.charAt(this.i).match(/\./)) {
                this.lexlist.push(new Token("DEFINED_VAR", this.scan(text, /[@a-zA-Z]/)));

            } else if ('"'.includes(text.charAt(this.i))) {
                this.lexlist.push(new Token("STRING", this.scan_string(text, '"')));

            } else {
                console.log("char not tokenized at position " + this.i + ": " + text.charAt(this.i));
            }
        }
    }

    scan(text, regex) {
        var value = text.charAt(this.i);
        this.i++;
        while (text.charAt(this.i) && text.charAt(this.i).match(regex)) {
            value = value + text.charAt(this.i);
            this.i++;
        }
        this.i--;
        return value;
    }

    scan_string(text, delim) {
        var value = ""; // = text.charAt(this.i);
        this.i++;
        while (text.charAt(this.i) && text.charAt(this.i) != delim) {
            value = value + text.charAt(this.i);
            this.i++;
        }
        //this.i--;
        return value;
    }
}

class Parser {
    constructor(tokens, stop_at) {
        this.tokens = tokens;
        this.stop_at = stop_at;
        this.p = [];
        this.variables = {};
    }

    parse() {
        var p;
        while (this.tokens.length > 0) {
            p = this.next_expr(null);

            //console.log("logging p" + p);
            //if (p) console.log(p);
            //console.log("logging this.p " + this.p);
            //if (this.p) console.log(this.p);

            //if (p != null && this.p == null) this.p = JSON.parse(p);
            //else if (p != null) this.p = [].concat(this.p, JSON.parse(p));

            if (p != null && this.p == null) this.p = p;
            else if (p != null) this.p = this.p.concat([p]);


            //console.log("logging this.p after " + this.p);
            //console.log(this.p);
        }
    }

    next_expr(prev) {

        // fail if at end and no semicolon found (pending code)

        const tok = this.tokens.shift();
        //if (tok) console.log("initial call " + tok.toString());
        if (tok && tok.type == this.stop_at) return prev;

        if (!prev && tok.type == "KEYWORD") {
            if (tok.value.includes("bonus")) return this.parse_bonus(tok);
            else if (tok.value == "skill") return this.parse_skill(tok);
            else if (tok.value == "if") return this.parse_if(tok);
            else return "parser error keyword return check";
        } else if (tok.type == "DEFINED_VAR") {
            return this.parse_var_asssignment(tok);
        }

        return "parser error last return check" + tok;
    }

    parse_var_asssignment(tok) {
        //console.log("parse_var_assignment called");

        if (!tok.value.startsWith('.@')) return "error: check variable assignment" + tok;

        var operator = this.tokens.shift();
        var right_operand = this.tokens.shift();
        if (right_operand.type == "OPERATOR") {
            operator.value += right_operand.value;
            right_operand = this.tokens.shift();
        }

        var semic_check = this.tokens.shift();
        if (semic_check.type != 'SEMICOLON') console.log('semicolon not found at end of assignment operation' + semic_check); // remove semicolon from tokens

        /*if (operator.value == '=')
            this.variables[tok.value] = right_operand.value;
        else if (operator.value == '+=')
            this.variables[tok.value] ? this.variables[tok.value] + right_operand.value : right_operand.value;
        else if (operator.value == '-=')
            this.variables[tok.value] ? this.variables[tok.value] - right_operand.value : -right_operand.value;
        */

        //console.log("Var assingment string");
        //console.log('{"type": "ASSIGNMENT", "left_operand": "' + tok.value + '", "right_operand": "' + right_operand.value + '", "operator": "' + operator.value + '"}');
        return JSON.parse('{"type": "ASSIGNMENT", "left_operand": "' + tok.value + '", "right_operand": "' + right_operand.value + '", "operator": "' + operator.value + '"}');
    }

    parse_bonus(tok) {
        var args = [];

        //console.log("parse bonus called");

        if (tok.value.includes("bonus")) {

            var i = 0;
            var bracket_depth = 0;

            do {
                var temp = this.tokens.shift();

                //console.log("temp " + i + " " + temp);

                if (temp.type == "SEMICOLON") break;
                if (temp.type == 'COMMA' && bracket_depth == 0) { i++; continue; }

                args[i] ? args[i] += temp.value : args[i] = temp.value;

                if (temp.value == '(') bracket_depth++;
                else if (temp.value == ')') bracket_depth--;

                //args[i] = temp;
                //if (args[i].value == '-') args[i] = new Token("NUMBER", args[i].value + this.tokens.shift().value);

                /*if (args[i].type == "MATH_FN") {
                    console.log("math regex matched " + args[i].value);
                    var x = parse_math_fn(args[i]);
                }*/
                //i++;

            } while (this.tokens.length > 0);
        }


        var returnvalue = '{"type": "' + tok.type + '", "value": "' + tok.value + '"';
        for (var i = 0; i < args.length; i++) {
            returnvalue += ', "arg' + i + '":"' + args[i] + '"';
        }
        returnvalue += '}';
        //console.log(returnvalue);
        return JSON.parse(returnvalue);
        //return this.next_expr('{"type": "' + tok.type + '", "value": "' + tok.value + '", "arg0": "' + args[0].value + '" , "arg1": "' + args[1].value + '"}');
    }

    parse_skill(tok) {

        var args = [];
        args[0] = this.tokens.shift();
        this.tokens.shift(); // ignore comma
        args[1] = this.tokens.shift();

        var returnvalue = '{"type": "' + tok.type + '", "value": "' + tok.value + '"';
        for (var i = 0; i < args.length; i++) {
            returnvalue += ', "arg' + i + '":"' + args[i].value + '"';
        }
        returnvalue += '}';
        //console.log(returnvalue);
        return JSON.parse(returnvalue);
    }

    parse_if(tok) {

        if (this.tokens.shift().value != '(') return "error: if condition not starting with ("; // should be condition bracket open
        var expression = this.parse_if_expr();
        //console.log("returned expression " + expression);

        //console.log("parse_if check ops " + operand1.value + operator.value + operand2.value);
        var returnvalue = '{"type": "' + tok.type + '", "value": "' + tok.value + '", "expression":"' + expression + '"';

        var truestatements = [];
        var falsestatements = [];

        truestatements = this.parse_block();

        var checkelse = this.tokens.shift();
        //console.log("check else token " + checkelse);

        if (checkelse && checkelse.value == 'else') {
            falsestatements = this.parse_block();
        } else if (checkelse)
            this.tokens.unshift(checkelse);

        returnvalue += ',"iftrue":' + JSON.stringify(truestatements) + ', "iffalse":' + JSON.stringify(falsestatements) + '}';
        //console.log("returnvalue " + returnvalue);
        return JSON.parse(returnvalue);
    }

    parse_if_expr() {
        var returnvalue = "(";

        var ops = [];
        var i = 0;

        //this.tokens.shift(); // remove inital bracket
        do {

            //find number or another expr first
            ops[i] = this.tokens.shift();

            //console.log("check ops" + i + " value " + ops[i]);

            if (ops[i].value == ')') { /*console.log(")found---");*/ break; }
            if (ops[i].value == '(') ops[i].value = this.parse_if_expr();
            else if (ops[i].type != 'NUMBER' && ops[i].type != 'BOOLEAN' && ops[i].type != 'VARIABLE')
                return "error: ops" + i + " number/boolean/variable not found " + ops[i];
            i++;

            //find operator
            ops[i] = this.tokens.shift();
            if (ops[i].value == ')') { /*console.log(")found---");*/ break; }
            var temp = this.tokens.shift();
            if (temp.type == "OPERATOR") {
                ops[i].value = ops[i].value + temp.value;

            } else this.tokens.unshift(temp);
            i++;
        } while (this.tokens.length > 0);

        //console.log("ops");
        //console.log(ops);

        for (var j = 0; j < i; j++)
            returnvalue += ops[j].value;
        returnvalue += ')';
        //console.log("returnvalue " + returnvalue);

        return returnvalue;
    }

    parse_block() {

        var tok = this.tokens.shift();
        var block = [];

        if (tok.value != '{') {
            this.tokens.unshift(tok);
            block = [this.next_expr(null)];
        } else {
            do {

                var temp = this.tokens.shift();
                //console.log("parse block do loop called" + temp);

                if (temp.value == "}") {
                    //console.log("break called for }");
                    break;
                }
                this.tokens.unshift(temp);
                temp = this.next_expr(null);
                block = block.concat([temp]);
            }
            while (this.tokens.length > 0);
        }
        return block;
    }

}


function simplify_script(script, equip_id) {


    if (script.includes('readparam')) {
        for (var i = 0; i < Object.keys(jsonPrimaryStatList).length; i++) {
            script = script.replaceAll('readparam(' + jsonPrimaryStatList[i] + ')', objBaseStats[i]);
        }
    }

    script = script.replaceAll(/JobLevel/ig, nJobLvl);
    script = script.replaceAll(/Baselevel/ig, nBaseLvl);

    script = script.replaceAll(/getrefine\(\)/ig, objRefineLvls[equip_id]);
    script = script.replaceAll('.@r = ' + objRefineLvls[equip_id] + ';', '');
    script = script.replaceAll('.@r', objRefineLvls[equip_id]);
    script = script.replaceAll(/eaclass\(\)/ig, nClass_eA);



    script = script.replaceAll(/BaseClass/ig, nBaseClass);
    script = script.replaceAll(/BaseJob/ig, nBaseJob);
    script = script.replaceAll(/Class ==/ig, nClass_eA + ' ==');

    script = script.replaceAll(/Job_Star_Gladiator2/ig, 'Job_Star_Gladiator'); // 2 probably refers to flying gladiator. fix it to normal gladiator job
    for (var i = 0; i < jsonClassList.length; i++)
        if (jsonClassList[i].ScriptName.length > 0)
            script = script.replaceAll(new RegExp(jsonClassList[i].ScriptName, 'ig'), jsonClassList[i].ea_id);


    script = script.replaceAll(/getskilllv\("[_A-Za-z]*"\) [<>=!]* [0-9]*/ig, 'true'); //all skill level checks are considered true by default


    return script;


}

class Evaluator {
    constructor(parseTree) {
        this.parseTree = parseTree;
        this.variables = {};
        //this.data = {};
    }

    evaluate() {

        while (this.parseTree.length > 0)
            this.eval_node(this.parseTree.shift());


    }

    eval_node(node) {

        if (node.type == "KEYWORD") {

            switch (node.value) {
                case "bonus":
                    this.eval_bonus(node);
                    break;
                case "bonus2":
                    this.eval_bonus2(node);
                    break;
                case "bonus3":
                    this.eval_bonus3(node);
                    break;
                case "autobonus":
                    this.eval_autobonus(node);
                    break;
                case "if":
                    this.eval_if(node);
                    break;
                default:
                    console.log("node not evaluated: " + node.type + " " + node.value);

            }
        }
    }

    eval_bonus(node) {
        if (!node.arg1)
            jsonActiveScripts[node.arg0] = "true";
        else {
            var val = 0;
            if ( /*isNumeric(node.arg1) ||*/ node.arg0 == 'bAtkEle') val = node.arg1;
            else val = this.eval_math_expr(node.arg1);

            if (!jsonActiveScripts[node.arg0]) jsonActiveScripts[node.arg0] = val;
            else jsonActiveScripts[node.arg0] += val;
        }
    }

    eval_bonus2(node) {
        var val = 0;

        if (node.arg0 == 'bAddEff2') val = 'Adds a ' + (node.arg2 / 100) + '% chance of inflicting ' + node.arg1 + ' on the user when performing a physical attack.';
        else if (node.arg0 == 'bAddEff') val = 'Adds a ' + (node.arg2 / 100) + '% chance of inflicting ' + node.arg1 + ' on the target when performing a physical attack.';

        else if (node.arg0 == 'bSubClass' || node.arg0 == 'bAddClass' || node.arg0 == 'bSubRace' || node.arg0 == 'bAddRace' || node.arg0 == 'bIgnoreDefRaceRate') {

            node.arg2 = this.eval_math_expr(node.arg2);
            val = JSON.parse('{"' + node.arg1 + '":"' + node.arg2 + '"}');
        } else if (node.arg0 == 'bSkillAtk') val = 'Increase damage of ' + node.arg1 + ' by ' + node.arg2 + '%';

        else console.log('error bonus2 not evaluated ' + node.arg0);

        if (!jsonActiveScripts[node.arg0]) jsonActiveScripts[node.arg0] = [val];
        else jsonActiveScripts[node.arg0] = jsonActiveScripts[node.arg0].concat([val]);

    }

    eval_bonus3(node) {
        var val = 0;
        if (node.arg0 == 'bAutoSpell') val = 'Adds a ' + (node.arg3 / 100) + '% chance of casting Level 1 ' + node.arg1 + ' on the user when performing a physical attack, if a higher level of this skill is known, it will be cast instead.';
        else if (node.arg0 == 'bSPVanishRate') val = 'Adds a ' + (node.arg1 / 10) + '% chance to drain ' + node.arg2 + '% SP from the target when performing a physical attack.';


        if (!jsonActiveScripts[node.arg0]) jsonActiveScripts[node.arg0] = [val];
        else jsonActiveScripts[node.arg0] = jsonActiveScripts[node.arg0].concat([val]);
    }

    eval_autobonus(node) {

        //autobonus "{ bonus bCritical,100; bonus bBaseAtk,50; }",1,5000,0,"{ specialeffect2 EF_FIRESPLASHHIT; }"

        var val = 0;
        val = 'Has a ' + (node.arg1 / 10.0) + '% chance of activating an effect for ' + (node.arg2 / 1000) + ' seconds while dealing physical damage: ' + node.arg0;

        if (!jsonActiveScripts[node.value]) jsonActiveScripts[node.value] = [val];
        else jsonActiveScripts[node.value] = jsonActiveScripts[node.value].concat([val]);
    }

    eval_math_expr(expr) {

        expr = expr.replaceAll("pow", "Math.pow");
        expr = expr.replaceAll("min", "Math.min");
        expr = expr.replaceAll("max", "Math.max");
        expr = expr.replaceAll("(", "Math.floor(");
        expr = "Math.floor(" + expr + ")";

        expr = eval(expr);
        return expr;
    }

    eval_if(node) {
        console.log("eval_if called");
        if (eval(node.expression)) {
            console.log("eval_if true section called");
            while (node.iftrue.length > 0) {
                //console.log(node.iftrue.shift());
                this.eval_node(node.iftrue.shift());
            }
        } else {
            while (node.iffalse.length > 0) {
                this.eval_node(node.iffalse.shift());
            }
        }
    }
}

function isNumeric(value) {
    return /^-?[0-9]*[.]?[0-9]*$/.test(value);
}

//90910 line
//var teststring = '.@r = getrefine();bonus bMdef,10;if (getskilllv("AS_GRIMTOOTH") == 5) {   bonus2 bSkillAtk,"AS_GRIMTOOTH",50;}if (getskilllv("GC_CROSSIMPACT") == 5) {   bonus2 bSkillAtk,"GC_CROSSIMPACT",5;}if (getskilllv("ASC_BREAKER") == 10) {   bonus2 bSkillAtk,"ASC_BREAKER",50;}if (.@r>=7) {   .@delay += 3;   bonus2 bSkillAtk,"AS_GRIMTOOTH",Baselevel;   bonus2 bSkillAtk,"ASC_BREAKER",Baselevel/3;   bonus2 bSkillAtk,"GC_CROSSIMPACT",Baselevel/30;}if (.@r>=9) {   .@delay += 3;   bonus bMaxSPrate,5;}bonus bDelayrate,-.@delay;if (eaclass()&EAJL_THIRD && BaseJob == Job_Assassin) {   if (.@r >= 7) {      bonus bMaxHPrate,20;      bonus bLongAtkDef,35;   }   else {      bonus bMaxHPrate,15;      bonus bLongAtkDef,20;   }}';


//var abc = 'if (readparam(bLuk)>=90) {    bonus bBaseAtk,20; } if (readparam(bDex)>=90) {    bonus bCritical,5; } if (readparam(bDex)>=90 && readparam(bLuk)>=90) {    bonus2 bSkillAtk,"MC_MAMMONITE",15; }';
//console.log('logging abc');
//console.log(simplify_script(abc, 0));

teststring = simplify_script(teststring, 0);
console.log('logging teststring simplified');
console.log(teststring);
const obj = new Lexer();
obj.tokenize(teststring);
//console.log("scan output " + obj.scan(teststring, 0, "[_a-zA-Z0-9]"));
console.log(obj.lexlist);
const obj2 = new Parser(obj.lexlist, "SEMICOLON");
obj2.parse();
var copyofparse = [...obj2.p];
console.log(copyofparse);
const obj3 = new Evaluator(obj2.p);
obj3.evaluate();
console.log(jsonActiveScripts);
console.log(JSON.stringify(jsonActiveScripts));
/**/

//----------------------------------
//Notes
/*
bStr
bAgi
bVit
bInt
bDex
bLuk
bAllStats
bFlee
bFlee2: perfect dodge
bMaxHPrate: max hp % mod
bMaxSPrate: max sp % mod
bHPrecovRate: reduce hp recovery by x%
bSPrecovRate: reduce sp recovery by x%
bHPRegenRate: recover x hp every y/1000 secs
bHPDrainRate: HP steal
bHPLossRate: x hp loss every y seconds
bSPLossRate: x sp loss every y seconds
bSPDrainValue: gain x sp every atk (value is in negative for immaterial sword where its a loss, moonlight dagger has positive value)
bSPVanishRate: remove sp % from target (check immaterial sword)
bDefRate
bDef2Rate
bCritical: add %critrate
bCritAtkRate: add %critdmg
bAspdRate: add %aspd
bAddEff: chance for status on monster during physical atk
bAddEff2: chance for status on user during physical atk
skill: allow use of skill
bAutoSpell: autocast spell during physical atk at a certain chance
bAtkEle: weapon attack element
bAddRace: increase dmg% against certain race
bSubRace: decrease dmg% taken from certain race
bAddEle: increase dmg% against certain element
bAddClass: increase dmg% against certain class of monster (eg boss type)
bSubClass: decrease dmg% taken from certain class of monster
bIgnoreDefRace: 1 argument for race. ignore 100% def for the race
bIgnoreDefRaceRate: ignore x% of def for monster race
bAddMonsterDropItemGroup: drop items from a certain item group on kill
bAddMonsterDropItem: drop a certain item on kill
specialeffect2: special effect on player(probably) can be ignored
bBreakArmorRate: armor break chance
bDefRatioAtkClass: ice pick effect
bClassChange: transform monster (Azoth weapon-dagger)
bUnbreakableWeapon
bGetZenyNum: get zeny from 1-x amt at y% (zeny knife)
bSkillAtk: add % dmg to a skill
bVariableCastrate: reduce variable cast time by x%. negative = decrease
bLongAtkDef


Races: RC_DemiHuman, RC_Player_Human, RC_Plant, RC_Demon
Elements: Ele_Holy, Ele_Dark, Ele_Fire, Ele_Earth, Ele_Wind, Ele_Water, Ele_Poison, Ele_Undead
Classes: Class_All
Effects: Eff_Poison, Eff_Curse, Eff_Freeze, Eff_Blind, Eff_Silence, Eff_Sleep, Eff_Bleeding
bAutoSpell: NPC_CRITICALWOUND (Wild Beast Claw), NPC_DRAGONFEAR (Inverse Scale), ST_FULLSTRIP (Drill katar), NPC_WIDEBLEEDING (Blood Tears), AS_SONICBLOW
BaseClass: 
    Job_Swordman
    Job_Thief
    Job_Merchant
    Job_Archer
    Job_Mage
    Job_Acolyte
    Job_Gunslinger
    Job_Ninja
    Job_Taekwon
BaseJob:
    Job_Novice
    Job_SuperNovice
    Job_Soul_Linker
    Job_Summoner


for simplification: 
done readparam(bStr)
done JobLevel
done BaseLevel
getrefine()
eaclass() -> should be returning the job id
EAJL_THIRD -> check if job is 3rd job. usage: eaclass()&EAJL_THIRD
eaclass()&EAJL_THIRD -> probably better to replace with true/false or 1/0 if class is 3rd or not
getskilllv("SM_BASH") or any other skill. fix it to max lvl 10
BaseJob == Job_Assassin
.@delay += 3;
bonus bDelayrate,-.@delay;
*/