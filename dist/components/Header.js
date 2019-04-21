import * as React from 'react';
//import Toolbar from 'material-ui';
//import * as MUI from 'material-ui';
//import Grid from 'material-ui';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { styleToolbar } from './SharedStyles';
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
    return (React.createElement("div", null,
        React.createElement(Toolbar, { style: styleToolbar },
            React.createElement(Grid, { container: true, direction: "row", justify: "space-around", alignItems: "center" },
                React.createElement(Grid, { item: true, sm: 9, xs: 8, style: { paddingTop: '20px', textAlign: 'center' } },
                    React.createElement(Button, { variant: 'raised', href: '/load' }, "Load"),
                    React.createElement(Button, { variant: 'raised', href: '/search' }, "Search"))))));
}
export default Header;
//# sourceMappingURL=Header.js.map