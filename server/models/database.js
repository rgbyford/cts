"use strict";
const connFns = require("./connection.js");
let iBadOnes = 0;
let aasTagsMain = [
    ['1', '1'],
    ['event', 'event'],
    ['los', 'los'],
    ['mashable', 'mashable'],
    ['PP', 'PP'],
    ['seven-horizons', 'seven-horizons'],
    ['via-ace', 'via-ace'],
    ['x', 'x'],
    ['pp', 'Prodigium'],
    ['coc', 'Cinema of Change'],
    ['dis', 'dis'],
    ['ethn', 'ethnicity'],
    ['gend', 'gender'],
    ['intellectual', 'intellectual'],
    ['id', 'ideology'],
    ['lang', 'language spoken'],
    ['loc', 'location'],
    ['net', 'shared network'],
    ['team', 'Prodigium worker'],
    ['research', 'researcher'],
    ['sport', 'sports pro'],
    ['queer', 'neither']
];
let aoTagNames = [];
for (let i = 0; i < aasTagsMain.length; i++) {
    aoTagNames.push({
        'sShortName': aasTagsMain[i][0],
        'sLongName': aasTagsMain[i][1]
    });
}
class AoCats {
    constructor(sCat, sSubCat) {
        this.sIsSubCatOf = sCat;
        this.sThisCat = sSubCat;
    }
}
let aoCatsRead;
//import fsDB from './csvjson';
const fsDB = require("fs");
let fdCats;
function indexOfByKey(obj_list, key, value) {
    for (let index = 0; index < obj_list.length; index++) {
        //    for (index in obj_list) {
        // console.log("iOBK: ", index, obj_list[index][key], value);
        if (obj_list[index][key] === value)
            return index;
    }
    return -1;
}
module.exports.writeDateFile = function () {
    const fdDate = fsDB.openSync('loaddate.txt', 'w');
    let dDate = new Date();
    let sDate;
    console.log('sDate1: ', dDate);
    sDate = dDate.toString().slice(4, 15);
    console.log("sDate2:", sDate);
    fsDB.writeFileSync(fdDate, sDate);
    fsDB.closeSync(fdDate);
};
module.exports.readDateFile = function () {
    const fdDate = fsDB.openSync('loaddate.txt', 'r');
    const sDate = fsDB.readFileSync(fdDate, "utf8");
    fsDB.closeSync(fdDate);
    return (sDate);
};
// functions for dealing with the categories
function openCatsFile(mode) {
    // if (mode === 'r') {
    // fsDB.accessSync('categories.txt', fsDB.constants.F_OK, (err) => {
    //     console.log(`categories.txt ${err ? 'does not exist' : 'exists'}`);
    //     if (err) {
    //         mode = 'w';     // open it for write (makes new one)
    //     }
    //   });
    // }
    fdCats = fsDB.openSync("categories.txt", mode);
}
function writeCatsFile(aoCats) {
    openCatsFile("w");
    fsDB.writeFileSync(fdCats, JSON.stringify(aoCats));
    fsDB.closeSync(fdCats);
}
module.exports.deleteCatsFile = function () {
    fsDB.unlinkSync('categories.txt', (err) => {
        if (err)
            throw err;
        console.log('categories file deleted');
    });
};
module.exports.writeFile = function () {
    console.log("wCF: ", aoCatsRead.length);
    console.log("Bad tags: ", iBadOnes);
    aoCatsRead.sort((a, b) => (a.sThisCat > b.sThisCat) ? 1 : (b.sThisCat > a.sThisCat) ? -1 : 0);
    writeCatsFile(aoCatsRead);
    iBadOnes = 0;
};
module.exports.readCatsFile = function () {
    openCatsFile("a+");
    const sCats = fsDB.readFileSync(fdCats, "utf8");
    if (sCats.length) {
        aoCatsRead = JSON.parse(sCats);
    }
    else {
        aoCatsRead = [];
    }
    fsDB.closeSync(fdCats);
    return (aoCatsRead);
};
/*
module.exports.findSubCats = function (sCat: string) {
    let asSubCats: string[];
    for (let i = 0; i < aoCatsRead.length; i++) {
        if (aoCatsRead[i].sIsSubCatOf === sCat) {
            asSubCats.push(aoCatsRead.sThisCat);
        }
    }
};
*/
let contactsSource;
//let oTest: oMod;
//type oModType = keyof typeof oTest;
//const propName: oModType = 'test';
//let oCon: {[id: number]: oMod};
module.exports.clearContacts = function (source) {
    contactsSource = source;
    aoContacts.length = 0;
    connFns.prepLoad();
};
module.exports.pushContact = function (oContact) {
    aoContacts.push(oContact);
};
var arrayUnique = function (arr) {
    return arr.filter(function (item, index) {
        return arr.indexOf(item) >= index;
    });
};
function buildCategories(asTag) {
    for (let i = 0; i < asTag.length; i++) {
        // first, clean up the string
        // ignore anything that doesn't begin with .
        if (asTag[i][0] !== ".") {
            //console.log ("continue");
            iBadOnes++;
            continue;
        }
        asTag[i] = asTag[i].slice(1); // remove the .
        // replace .. with _
        asTag[i] = asTag[i].replace("..", "_");
        // replace vendors with vendor
        asTag[i] = asTag[i].replace("vendors", "vendor");
        // replace . with _
        asTag[i] = asTag[i].replace(/\./g, "_");
        // tag is now "_cat_subcat_subcat_subcat...
        let asCatSub = asTag[i].split("_"); // Cat in the first element of the array, Subs in the others
        // replace short category names with long
        let iTagPos = indexOfByKey(aoTagNames, 'sShortName', asCatSub[0]);
        // console.log ("iTP: ", iTagPos);
        if (iTagPos >= 0) {
            asCatSub[0] = aoTagNames[iTagPos].sLongName;
            //console.log ("sTS: ", req.body.sValue[0], sSearch);            
        }
        let sIsSubCatOf = "";
        for (let j = 0; j < asCatSub.length; j++) { // go through the cats & subCats
            let iCatFound;
            //            if (aoCatsRead.length === 0) {
            //                iCatFound = -1;
            //            } else {
            //                console.log ("calling findIndex");
            iCatFound = aoCatsRead.findIndex(function (element) {
                return (element.sThisCat === asCatSub[j]);
            });
            //            }
            //            console.log ("iCatFound: ", iCatFound);
            if (iCatFound < 0) { // category doesn't exist - add it
                //                console.log("Found a new one", asCatSub[j]);
                aoCatsRead.push(new AoCats(sIsSubCatOf, asCatSub[j]));
            }
            sIsSubCatOf = asCatSub[j];
        }
    }
}
let iRows = 0;
let aoContacts; // could have "any" properties, since read from vcf
let iSavedCount;
module.exports.importNames = function (iCount = 0) {
    //console.log ('aoClength: ', aoContacts.length);
    if (iCount) {
        iSavedCount = iCount;
    }
    if (aoContacts.length === 0) { // done
        console.log(`Import names done - ${iRows} rows`);
        //        document.body.style.cursor  = 'default';
        return;
    }
    var oContact = {}; // have to do this to get oContact[sPropName] past TS
    oContact.id = 0;
    const nestedContent = aoContacts[0];
    //console.log ('nnn', nestedContent);
    //let docTitle: string;
    Object.keys(nestedContent).forEach(docTitle => {
        let givenName;
        let sPropName;
        //let sTemp: keyof typeof oContact;
        //sTemp = docTitle.replace(/ /g, "");
        sPropName = docTitle.replace(/ /g, "");
        if (sPropName === "GivenName") {
            givenName = nestedContent[docTitle]; // accessing property with []
            oContact.GivenName = givenName;
        }
        else if (sPropName === "FamilyName") {
            oContact.FamilyName = nestedContent[docTitle];
        }
        else if (sPropName === "GroupMembership") {
            let asFirstSplit;
            let asSecondSplit = [];
            let sValue = nestedContent[docTitle];
            // VCF file splits tags with ',' - CSV file with ':::'
            asFirstSplit = sValue.split(contactsSource === 'CSV' ? ' ::: ' : ',');
            for (let i = 0; i < asFirstSplit.length; i++) {
                let sTemp;
                //if (asFirstSplit[i][0] === ".") {
                //    asFirstSplit[i] = asFirstSplit[i].slice(1);
                //}
                // look for .locn and add "intl" if it"s not _USA
                if (asFirstSplit[i].indexOf(".loc_U") < 0) {
                    sTemp = asFirstSplit[i].replace(".loc", "intl");
                }
                else {
                    sTemp = asFirstSplit[i];
                }
                if (sTemp[0] === '.') { // remove .
                    sTemp = sTemp.slice(1);
                }
                asSecondSplit = asSecondSplit.concat(sTemp.split("_"));
                // replace short names with long
                for (let j = 0; j < asSecondSplit.length; j++) {
                    // replace short category names with long
                    let iTagPos = indexOfByKey(aoTagNames, 'sShortName', asSecondSplit[j]);
                    // console.log ("iTP: ", iTagPos);
                    if (iTagPos >= 0) {
                        asSecondSplit[j] = aoTagNames[iTagPos].sLongName;
                        //console.log ("sTS: ", req.body.sValue[0], sSearch);            
                    }
                }
            }
            //console.log ("Calling buildCats");
            buildCategories(asFirstSplit);
            oContact[sPropName] = arrayUnique(asSecondSplit);
        }
        else {
            let value = nestedContent[docTitle];
            //get rid of %, and the comma after thousands
            value = value.toString().replace(/[%,]/g, "");
            if (nestedContent[docTitle] !== "") {
                oContact[sPropName] = value;
            }
        }
    });
    // now put it into the database
    aoContacts.shift(); // remove the one used
    //    console.log ("aoC length: ", aoContacts.length);
    connFns.insertContact(oContact, aoContacts.length === 0); // iCount 0 except for first call
    iRows++;
    return;
};
