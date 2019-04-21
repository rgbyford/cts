import React from 'react';
import PropTypes from 'prop-types';
//import { MuiThemeProvider } from 'material-ui/styles';
//import CssBaseline from 'material-ui/CssBaseline';
import getContext from './context';
//import Header from '../components/Header';
function withLayout(BaseComponent) {
    class App extends React.Component {
        constructor(props, context) {
            super(props, context);
            this.pageContext = this.props.pageContext || getContext();
        }
        componentDidMount() {
            const jssStyles = document.querySelector('#jss-server-side');
            if (jssStyles && jssStyles.parentNode) {
                jssStyles.parentNode.removeChild(jssStyles);
            }
        }
        render() {
            return (React.createElement(MuiThemeProvider, { theme: this.pageContext.theme, sheetsManager: this.pageContext.sheetsManager },
                React.createElement(CssBaseline, null),
                React.createElement("div", null,
                    React.createElement(Header, Object.assign({}, this.props)),
                    React.createElement(BaseComponent, Object.assign({}, this.props)))));
        }
    }
    App.propTypes = {
        pageContext: PropTypes.object,
    };
    App.defaultProps = {
        pageContext: null,
    };
    App.getInitialProps = (ctx) => {
        if (BaseComponent.getInitialProps) {
            return BaseComponent.getInitialProps(ctx);
        }
        return {};
    };
    return App;
}
export default withLayout;
//# sourceMappingURL=withLayout.js.map