import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';

import CheckboxField from './fields/Checkbox';

import { Radar } from 'react-chartjs-2';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    topRow: {
        marginBottom: "36px"
    },
    paper: {
        padding: "36px",
        borderRadius: "3px",
        marginBottom: "24px",
        boxShadow: "0 2px 6px 0 rgba(4, 19, 36, 0.1)"
    },
    title: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "24px"
    },
    subtitle: {
        fontSize: "16px",
        fontWeight: "bold",
    },
    description: {
        fontSize: "15px",
        fontWeight: "normal",
        marginBottom: '24px'
    },
    rightContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingLeft: "12px",
        },
    },
    leftContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingRight: "12px",
        },
    },
    button: {
        height: 40,
        borderRadius: 2,
        border: 0,
        padding: "0 16px",
        fontSize: "15px",
        fontWeight: 500,
        textTransform: "initial",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        color: "white",
        '&:disabled':{
            color: "#f9f9f9"
        },
    },
    rootForTable: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 386,
    },
    tableHeaderCell: {
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 0",
        borderBottom: "1px solid #efeff4",
        "&:last-child": {
            paddingRight: "0px"
        },
    },
    tableFooterCell: {
        fontSize: "16px",
        fontWeight: "bold",
        padding: "10px 0",
        borderBottom: "none",
        "&:last-child": {
            paddingRight: "0px"
        },
    },
    tableBodyCell: {
        fontSize: "16px",
        fontWeight: "normal",
        color: theme.palette.secondary.dark,
        padding: "10px 0",
        borderBottom: "1px solid #efeff4",
        verticalAlign: "top",
        "&:last-child": {
            paddingRight: "0px"
        },
    },
    numericCell: {
        paddingLeft: "24px",
        paddingRight: "16px"
    }
});

const AssessmentSection = ({ classes, assessmentResult:{ culture }  }) => {

    let currentSum = _.reduce(culture, function(sum, n) {
        return sum + n.data[0].current;
    }, 0);

    let preferredSum = _.reduce(culture, function(sum, n) {
        return sum + n.data[1].preferred;
    }, 0);

    let allLabels = _.reduce(culture, function(labels, n) {
        labels.push(n.type.toUpperCase());
        return labels
    }, []);
    
    let allCurrentData = _.reduce(culture, function(data, n) {
        data.push(n.data[0].current); 
        return data
    }, []);

    let allPreferredData = _.reduce(culture, function(data, n) {
        data.push(n.data[1].preferred); 
        return data
    }, []);

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <Paper 
            id="assessment" 
            className={classes.paper}
        >
            <Typography 
                className={classes.title}
                color="primary"
            >
                Assessment
            </Typography>
            <Grid 
                container
                direction="row"
                className={classes.topRow}
            >  
                <Grid 
                    item
                    xs={12}
                    md={6}
                    className={classes.leftContainer}
                >
                    <Typography 
                        className={classes.subtitle}
                        color="primary"
                    >
                        Your Culture
                    </Typography>
                    <Typography 
                        className={classes.description}
                        color="secondary"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Typography>
                    <div className={classes.rootForTable}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHeaderCell}>
                                        Culture
                                    </TableCell>
                                    <TableCell className={classes.tableHeaderCell} style={{color:"#007aff"}}>
                                        Current
                                    </TableCell>
                                    <TableCell className={classes.tableHeaderCell} style={{color:"#ff2d55"}}>
                                        Preferred
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {culture.map((item, index) =>
                                    (index <= 3) && 
                                        <TableRow key={index}>
                                            <TableCell className={classes.tableBodyCell}>
                                                {capitalize(item.type)}
                                            </TableCell>
                                            <TableCell className={classes.tableBodyCell}>
                                                {item.data[0].current}
                                            </TableCell>
                                            <TableCell className={classes.tableBodyCell}>
                                                {item.data[1].preferred}
                                            </TableCell>
                                        </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell className={classes.tableFooterCell}>
                                        Total
                                    </TableCell>
                                    <TableCell className={classes.tableFooterCell}>
                                        {currentSum}
                                    </TableCell>
                                    <TableCell className={classes.tableFooterCell}>
                                        {preferredSum}
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                    <CheckboxField 
                        name="preferredcompanyculture"
                        label="Show preferred company culture type in public profile"
                    />
                </Grid>
                <Grid 
                    item
                    xs={12}
                    md={6}
                >
                    <Radar height={320} options={{
                        scale:{
                            ticks: {
                                beginAtZero: true,
                                stepSize: 5
                            },
                            angleLines:{
                                color: "#c8c7cc"
                            },
                            pointLabels:{
                                fontColor:"#c8c7cc",
                                fontSize:12
                            }
                        },
                        legend: {
                            display: false
                        },
                        layout: {
                            padding: {
                                left: 8,
                                right: 8,
                                top: 8,
                                bottom: 8
                            },
                        },
                        responsive: true
                    }} data={{
                        labels: allLabels,
                        datasets: [
                            {
                                label: 'Current',
                                backgroundColor: 'rgba(0, 122, 255, 0.3)',
                                borderColor: '#007aff',
                                pointBackgroundColor: '#007aff',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: '#007aff',
                                data: allCurrentData
                            },
                            {
                                label: 'Preferred',
                                backgroundColor: 'rgba(255, 45, 85, 0.3)',
                                borderColor: '#ff2d55',
                                pointBackgroundColor: '#ff2d55',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: '#ff2d55',
                                data: allPreferredData
                            }
                        ]
                    }} />
                </Grid>
            </Grid>
            <Grid 
                container
                direction="row"
            >  
                <Grid 
                    item
                    xs={12}
                >
                    <Typography 
                        className={classes.subtitle}
                        color="primary"
                    >
                        Your Personality
                    </Typography>
                    <Typography 
                        className={classes.description}
                        color="secondary"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Typography>
                    <Button 
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        component={Link} 
                        to="assessment"
                    >
                        Pass test
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default withStyles(styles)(AssessmentSection);