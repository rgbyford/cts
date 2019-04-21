"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
//import Toolbar from 'material-ui';
//import * as MUI from 'material-ui';
//import Grid from 'material-ui';
var Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var SharedStyles_1 = require("./SharedStyles");
//import styled from 'styled-components';
//const Button = styled.button`
//  &:hover {
//    background:teal;
//  }
//`;
/*
const styleButton = {
    margin: '50px 50px 10px auto',
    fontWeight: '800',
    padding: '5px',
    border: '#1565C0',
    borderStyle: 'solid',
    borderRadius: '10%',
    backgroundColor: '#EA9A40',
    color: 'black'
};
*/
function Header() {
    return (<div>
      <Toolbar_1.default style={SharedStyles_1.styleToolbar}>
        <Grid_1.default container direction="row" justify="space-around" alignItems="center">
          <Grid_1.default item sm={9} xs={8} style={{ paddingTop: '20px', textAlign: 'center' }}>
          <Button_1.default variant='raised' href='/load'>Load</Button_1.default>
          <Button_1.default variant='raised' href='/search'>Search</Button_1.default>
          </Grid_1.default>
        </Grid_1.default>
      </Toolbar_1.default>
    </div>);
}
exports.default = Header;
