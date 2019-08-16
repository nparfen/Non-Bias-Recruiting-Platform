import React from 'react';
import { FormSection, reduxForm } from 'redux-form';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import className from 'classnames';
import _ from 'lodash';

import CheckPaperField from './fields/CheckPaper';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    title: {
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "24px"
    },
    mainDescription: {
        maxWidth: "824px",
        fontSize: "20px",
        fontWeight: "bold",
    },
    secondaryDescription: {
        maxWidth: "656px",
        fontSize: "15px",
        fontWeight: "normal",
    },
    descriptionContainer: {
        marginBottom: "24px"
    },
    buttonsSection: {
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems:"start",
        [theme.breakpoints.up('sm')]: {
            flexDirection: "row",
            alignItems:"center",
        },
        "&$buttonsSectionEnd": {
            justifyContent: "flex-end",
        }
    },
    buttonsSectionEnd: {},
    skipTest: {
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "500",
        textDecoration: "underline",
        "&:hover": {
            color: theme.palette.secondary.dark,
        },
        marginBottom: "16px",
        [theme.breakpoints.up('sm')]: {
            marginBottom: "0px"
        },
    },
    nextTest: {
        border: 0,
        padding: 0,
        fontSize: "18px",
        fontWeight: "500",
        textDecoration: "underline",
        textTransform: "initial",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        '&:disabled':{
            color: "#c8c7cc"
        },
        '&:hover':{
            backgroundColor: "transparent",
            textDecoration: "underline",
        },
    },
    rootForTable: {
        width: '100%',
        overflowX: 'auto',
    },
    tableBodyCell: {
        padding: "4px 0px",
        borderBottom: "none",
        "&:last-child": {
            paddingRight: "0px"
        }
    },
});

let CompanyPersonalitiesTestForm = ({
    classes, 
    personalities, formValues, pageWithTest,
    handleSubmit, submitting, invalid,
    destroy, clearPage
}) => {

    const amountOfSelected = _.size(_.reduce(_.omitBy(_.get(formValues, "result"), _.isNil), function(result = [], value, key) {
        value === true && result.push(value)
        return result;
    }, []));

    const odd = _.reduce(pageWithTest, function(result, value, key) {
        key % 2 === 0 && result.push(value)
        return result;
    }, []);

    const even = _.reduce(pageWithTest, function(result, value, key) {
        key % 2 !== 0 && result.push(value)
        return result;
    }, []);

    const testArray = [odd, even];

    return (
        <form onSubmit={handleSubmit}> 
            <Typography
                color="primary"
                className={classes.title}
            >
                Personalities
            </Typography>
            <div className={classes.descriptionContainer}>
                <Typography
                    color="primary"
                    className={classes.mainDescription}
                >
                    What are the main personality traits among your current team?<br/>Select 7 groups from the list below
                </Typography>
                <Typography
                    color="secondary"
                    className={classes.secondaryDescription}
                >
                    Approximate passing time 1 min 48 sec
                </Typography>
            </div>
            <div className={classes.rootForTable}>
                <Table>
                    <TableBody>
                        {testArray.map((testRow,y) => (
                            <TableRow key={y}>
                                {testRow.map((values, i) => 
                                    <TableCell className={classes.tableBodyCell} key={i}>
                                        <FormSection name="result">
                                            <CheckPaperField 
                                                name={(testRow.length*y+i).toString()}
                                                amountOfSelected={amountOfSelected}
                                                options={{ values: values, value: false }}
                                            /> 
                                        </FormSection>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                    
                </Table>
            </div>
            <div className={className(classes.buttonsSection, !_.isEmpty(personalities) && classes.buttonsSectionEnd)}>
                {_.isEmpty(personalities) && 
                    <Typography
                        color="secondary"
                        className={classes.skipTest}
                        onClick={() => { destroy(); clearPage(); }}
                    >
                        Skip test
                    </Typography>
                }
                <Button 
                    type="submit"
                    className={classes.nextTest}
                    color="secondary"
                    disableRipple={true}
                    disabled={submitting || invalid || amountOfSelected !== 7}
                >
                    Next test
                </Button>
            </div>
        </form>
    )
};

CompanyPersonalitiesTestForm = reduxForm({
    form: 'CompanyPersonalitiesTestForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true,
})(CompanyPersonalitiesTestForm);

export default withStyles(styles)(CompanyPersonalitiesTestForm);