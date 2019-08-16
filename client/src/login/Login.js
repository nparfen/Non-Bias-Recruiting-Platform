import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { login, linkedInLogin } from './ducks/actions';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { CandidateLoginForm, CompanyLoginForm } from './components/Form';

import { withStyles } from '@material-ui/core/styles';

import aspireLogo from '../app/assets/aspire-logo.svg';

const styles = theme => ({
    header: {
        width: "auto",
        display: "flex",
        justifyContent: "center"
    },
    logo: {
        marginTop: "60px",
        marginBottom: "40px",
        width: "70px",
        height: "70px",
        objectFit: "contain"
    },
    paper: {
        maxWidth: "450px",
        padding: "40px",
        paddingTop: "34px",
        marginLeft: '24px',
        marginRight: '24px',
        borderRadius: "3px",
        marginBottom: "290px",
        boxShadow: "0 2px 6px 0 rgba(4, 19, 36, 0.1)"
    },
    tabsRoot: {
        borderBottom: '1px solid '+ theme.palette.secondary.light,
    },
    tabsIndicator: {
        backgroundColor: theme.palette.secondary.dark,
    },
    tabRoot: {
        fontSize: "18px",
        fontWeight: "bold",
        textTransform: 'capitalize',
        color: "#c8c7cc",
        '&:hover': {
            color: theme.palette.secondary,
            opacity: 1,
        },
        '&$tabSelected': {
            color: theme.palette.primary.main
        },
    },
    tabSelected: {},
    labelWrapped: {
        fontSize: "18px",
    }
});

class LoginPage extends Component {

    constructor(props) {
        super(props);
        let value = "company";
        if (props.location.state !== undefined && props.location.state.type !== undefined){
            value = props.location.state.type;
        }
        this.state = {
            value: value,
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {

        let { value } = this.state;
        let { classes, login, linkedInLogin } = this.props;

        return (
            <Grid 
                container
                alignItems="center"
                direction="row"
                justify="center"
            >
                <Grid 
                    item 
                    xs={12}
                    className={classes.header}
                >
                    <Link to="/">
                        <img 
                            src={aspireLogo} 
                            className={classes.logo} 
                            alt="logo"
                        />
                    </Link>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <Tabs
                            fullWidth
                            value={value} 
                            onChange={this.handleChange}
                            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                        >
                            <Tab
                                disableRipple
                                value="company"
                                classes={{ root: classes.tabRoot, selected: classes.tabSelected, labelWrapped: classes.labelWrapped }}
                                label="I’m Enterprise"
                            />
                            <Tab
                                disableRipple
                                value="candidate"
                                classes={{ root: classes.tabRoot, selected: classes.tabSelected, labelWrapped: classes.labelWrapped }}
                                label="I’m Candidate"
                            />
                        </Tabs>
                        {value === "company" && <CompanyLoginForm onSubmit={(values) => login(values.email, values.password, "company", "companyLoginForm")} />}
                        {value === "candidate" && 
                            <CandidateLoginForm 
                                onSubmit={(values) => login(values.email, values.password, "candidate", "candidateLoginForm")}
                                linkedInLogin={(token) => linkedInLogin(token, "candidateLoginForm")}
                            />
                        }
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default connect(
    null,
    {
        login, linkedInLogin
    }
)(withStyles(styles)(LoginPage));