// Interpreter to parse the various scripts attached to equips and cards as defined in the rAthena db files

//var teststring = "bonus bAtkEle,Ele_Wind;\nbonus bAspdRate,5;\nbonus bUnbreakableWeapon;\n"
var teststring = 'bonus bAtkEle,Ele_Water;\nbonus2 bAddEff,Eff_Freeze,500;\nbonus2 bAddEff2,Eff_Freeze,10;\nskill "MG_COLDBOLT",3;\nbonus3 bAutoSpell,"MG_COLDBOLT",3,100;"'

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
    }
    tokenize(text) {

        for (this.i = 0; this.i < text.length; this.i++) {

            if (' \n'.includes(text.charAt(this.i))) {
                // Ignore new line and white space. Do nothing
                //this.lexlist.push(new Token("NEWLINE", ""));

            } else if ('+-*/'.includes(text.charAt(this.i))) {
                this.lexlist.push(new Token("OPERATION", text.charAt(this.i)));

            } else if (','.includes(text.charAt(this.i))) {
                this.lexlist.push(new Token("COMMA", text.charAt(this.i)));

            } else if (';'.includes(text.charAt(this.i))) {
                this.lexlist.push(new Token("SEMICOLON", text.charAt(this.i)));

            } else if (text.charAt(this.i).match(/[_a-zA-Z]/)) {
                var value = this.scan(text, /[_a-zA-Z0-9]/);
                if (value.match(/(auto)*bonus([0-9])*/)) this.lexlist.push(new Token("KEYWORD", value));
                else if (value.match(/skill/)) this.lexlist.push(new Token("KEYWORD", value));
                else this.lexlist.push(new Token("VARIABLE", value));

            } else if (text.charAt(this.i).match(/[.0-9]/)) {
                this.lexlist.push(new Token("NUMBER", this.scan(text, /[.0-9]/)));

            } else {
                /*if (text.charAt(this.i) != " ")*/
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
}

class Parser {
    constructor(tokens, stop_at) {
        this.tokens = tokens;
        this.stop_at = stop_at;
        this.p = null;
    }

    parse() {
        var p;
        while (this.tokens.length > 0) {
            p = this.next_expr(null);
            console.log("logging p" + p);
            console.log(p);
            console.log("logging this.p " + this.p);
            console.log(this.p);
            if (p != null && this.p == null) this.p = JSON.parse(p);
            else if (p != null) this.p = [].concat(this.p, JSON.parse(p));
            console.log("logging this.p after " + this.p);
            console.log(this.p);
        }
    }

    next_expr(prev) {

        // fail if at end and no semicolon found (pending code)

        const tok = this.tokens.shift();
        //if (tok) console.log("initial call " + tok.toString());
        if (tok && tok.type == this.stop_at) return prev;

        if (!prev && tok.type == "BONUS") {
            var args = [];
            args[0] = this.tokens.shift();
            var commacheck = this.tokens.shift();
            //var next2;
            if (commacheck.type != "SEMICOLON")
                args[1] = this.tokens.shift();
            else {
                this.tokens.unshift(commacheck);
                args[1] = new Token("dummy", "true");
            }
            return this.next_expr('{"type": "' + tok.type + '", "value": "' + tok.value + '", "arg0": "' + args[0].value + '" , "arg1": "' + args[1].value + '"}');
        }

        return "last return check";
    }
}


class Evaluator {
    constructor(parseTree) {
        this.parseTree = parseTree;
        this.data = {};
    }

    evaluate() {
        for (var i = 0; i < this.parseTree.length; i++) {
            this.parseNode(this.parseTree[i]);
            //if (typeof value !== "undefined") output += value + "\n";
            // add to data obj pending
        }
    }

    parseNode(node) {

        if (node.type == "BONUS") {

            switch (node.value) {
                case "bonus":
                    if (!this.data[node.arg0]) this.data[node.arg0] = node.arg1;
                    else this.data[node.arg0] += node.arg1;
            }
        }

    }
}


const obj = new Lexer();
obj.tokenize(teststring);
//console.log("scan output " + obj.scan(teststring, 0, "[_a-zA-Z0-9]"));
//console.log(obj.lexlist);
const obj2 = new Parser(obj.lexlist, "SEMICOLON");
obj2.parse();
console.log(obj2.p);
/*const obj3 = new Evaluator(obj2.p);
obj3.evaluate();
console.log(obj3.data);*/