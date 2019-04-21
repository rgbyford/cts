"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var ListChoose = /** @class */ (function (_super) {
    __extends(ListChoose, _super);
    function ListChoose(props) {
        var _this = _super.call(this, props) || this;
        _this.aoCats = [];
        console.log("LC props: ", props);
        return _this;
        //        this.state = {
        //            aoCats: OCat[] = []
        //        };
    }
    ListChoose.prototype.makeCatsList = function (isSubCatOf) {
        console.log("makeCatsList - subCatsOf: |" + isSubCatOf + "|");
        var aoCatsList = [];
        //let j: number = 0;
        //        let aoCats = load.getCats();
        //console.log ("this.props: ", this.props);
        var aoCatsLocal = this.aoCats;
        console.log("aoCats: " + aoCatsLocal);
        // for (let i = 0; i < aoCats.length; i++) {
        //     if (aoCats[i].isSubCatOf === iSubCatOf) {
        //         aoCatsList.push(aoCats[i]);
        //         //            aoCatsList[j].key = j++;
        //     }
        // }
        console.log("aoCL length: " + aoCatsList.length);
        return (aoCatsList);
    };
    //    let aoCatsList = makeCatsList ("");
    ListChoose.prototype.render = function () {
        return (<div>
            <select> {this.makeCatsList("").map(function (x, y) { return <option key={y}> {x} </option>; })}
            </select>
            </div>);
    };
    return ListChoose;
}(React.Component));
//                this.makeCatsList("").map((x, y) => <option key = {y.sThisCat}> {x} </option>)}
exports.default = ListChoose;
