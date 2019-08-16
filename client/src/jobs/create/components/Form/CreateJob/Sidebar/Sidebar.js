import React, { Component } from 'react';

import { Link } from 'react-scroll'

import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    tabsRoot: {
        position: "sticky",
        top: 0,
        marginBottom: "32px",
        [theme.breakpoints.up('sm')]: {
            marginBottom: "0px"
        }
    },
    flexContainer: {
        flexDirection: 'column'
    },
    tabsIndicator: {
        display: 'none',
    },
    tabRoot: {
        textTransform: 'initial',
        color: theme.palette.primary.main,
        fontSize: "18px !important",
        fontWeight: "bold",
        maxWidth: "100%",
        '&:hover': {
            opacity: 1,
        },
        '&$tabSelected': {
            borderLeft: '4px solid #c8c7cc',
            backgroundColor: "#f9f9f9"
        },
        '&$tabSelected $labelContainer': {
            paddingLeft: "16px"
        }
    },
    labelContainer: {
        width: "auto",
        padding: "16px 20px",
        textAlign: "left"
    },
    labelWrapped: {
        fontSize: "18px",
    },
    tabSelected: {},
    wrapper: {
        alignItems: "start"
    },
    leftContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingRight: "12px",
        },
    },
});

const tabs = [
    {title: "Job Information", id: "job-information"},
    {title: "Job Details", id: "job-details"},
    {title: "Job Description", id: "job-description"},
    {title: "Candidate Requirements", id: "candidate-requirements"},
    {title: "Additional Information", id: "additional-information"}
];

class SidebarSection extends Component {

    state = {
        value: 0,
    };
    
    handleSetActive = (value) => () => this.setState({ value })
    
    render() {

        const { classes } = this.props;
        const { value } = this.state;

        return (
            <Grid 
                item
                xs={12}
                sm={3}
                className={classes.leftContainer}
            >
                <Tabs
                    value={value}
                    classes={{ 
                        root: classes.tabsRoot, 
                        indicator: classes.tabsIndicator, 
                        flexContainer: classes.flexContainer 
                    }}
                >
                    {tabs.map((value, index) => (
                        <Tab
                            key={index}
                            disableRipple
                            classes={{ 
                                root: classes.tabRoot, 
                                selected: classes.tabSelected, 
                                wrapper: classes.wrapper, 
                                labelContainer: classes.labelContainer, 
                                labelWrapped: classes.labelWrapped 
                            }}
                            label={value.title}
                            to={value.id}
                            component={Link}
                            spy={true}
                            onSetActive={this.handleSetActive(index)}
                            smooth={true}
                            offset={-100}
                            duration={500}
                        />
                    ))}
                </Tabs>
            </Grid>
        );
    }
}

export default withStyles(styles)(SidebarSection);