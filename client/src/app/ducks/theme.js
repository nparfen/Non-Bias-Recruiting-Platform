import { createMuiTheme } from '@material-ui/core/styles';

const primary = '#666666';
const secondary = '#a1a1a1';
const lightSecondary = '#efeff4';
const darkSecondary = '#8a8a8f';
const lightAction = '#f9f9f9';
const separator = '#d8d8d8';
const blue = '#179bff';
const yellow = '#ffcc00';
const green = '#2fcc71';
const border = '#c8c7cc';

const lightGreen = '#4cd964';
const lightBlue = '#5ac8fa';


const MuiTheme = createMuiTheme({
    palette: {
        primary: {
            main: primary,
        },
        secondary: {
            main: secondary,
            dark: darkSecondary,
            light: lightSecondary
        },
        action: {
            main: lightAction,
        },
        border: {
            main: border,
        },
        separator: {
            main: separator,
        },
        badge: {
            main: blue,
            yellow: yellow,
            green: green,
        },
        badgeLight: {
            main: lightBlue,
            gray: border,
            green: lightGreen,
        },
        background: {
            default: "white"
        }
    },
    typography: {
        useNextVariants: true,
        fontFamily: 'SF Display'
    },
    overrides: {
        MuiButtonBase: {
            root: {
                outline: "none !important",
            }
        }
    }
});

export default MuiTheme;