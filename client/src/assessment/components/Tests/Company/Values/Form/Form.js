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

import RadioField from './fields/Radio';

import back from '../../../../../assets/back.svg'
import next from '../../../../../assets/next.svg'

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
    pages: {
        fontSize: "24px",
        fontStyle: "italic",
        fontWeight: 600,
        whiteSpace: "nowrap",
        color: theme.palette.secondary.dark,
        marginLeft: "0px",
        marginTop: "16px",
        [theme.breakpoints.up('sm')]: {
            marginLeft: "16px",
            marginTop: "0px",
        },
    },
    descriptionContainer: {
        marginBottom: "24px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems:"start",
        [theme.breakpoints.up('sm')]: {
            flexDirection: "row",
            alignItems:"center",
        },
    },
    buttonsSection: {
        marginTop: "36px",
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
        '&$buttonMarginLeft':{
            marginLeft: "18px"
        },
        '&:hover':{
            backgroundColor: "transparent",
            textDecoration: "underline",
        },
    },
    button: {
        border: 0,
        padding: 0,
        fontSize: "20px",
        fontWeight: "bold",
        textTransform: "initial",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        '&:disabled':{
            color: "#c8c7cc"
        },
        '&$buttonMarginLeft':{
            marginLeft: "18px"
        },
        '&$buttonMarginRight':{
            marginRight: "18px"
        },
        '&:hover':{
            backgroundColor: "transparent"
        },
    },
    buttonMarginLeft: {},
    buttonMarginRight: {},
    backIcon: {
        marginRight: "16px"
    },
    nextIcon: {
        marginLeft: "16px"
    },
    iconDisabled:{
        opacity: 0.26
    },
    rootForTable: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    tableBodyCell: {
        fontSize: "17px",
        fontWeight: "normal",
        color: theme.palette.secondary.dark,
        padding: "16px 0",
        borderBottom: "none"
    },
    questionCell: {
        width: "531px"
    },
    oddRow: {
        backgroundColor: "#f9f9f9"
    },
    numericCell: {
        width: "56px",
        fontSize: "18px",
        padding: "16px",
        fontWeight: 500,
    },
    radioCell: {
        textAlign: "center"
    }
});

let CompanyValuesTestForm = ({ 
    classes, 
    formValues, valuesData, allAmount, current, amount, pageWithTest, 
    handleSubmit, previousPage, submitting, invalid,
    destroy, clearPage
}) => {

    const allSelected = _.size(_.omitBy(_.get(formValues, "result"), _.isNil)) === allAmount ? true : false;

    return (
        <form onSubmit={handleSubmit}>
            <Typography
                color="primary"
                className={classes.title}
            >
                Values
            </Typography>
            <div className={classes.descriptionContainer}>
                <div>
                    <Typography
                        color="primary"
                        className={classes.mainDescription}
                    >
                        Which statements best represent your organisation
                    </Typography>
                    <Typography
                        color="secondary"
                        className={classes.secondaryDescription}
                    >
                        Approximate passing time 2 min 32 sec
                    </Typography>
                </div>
                <Typography className={classes.pages}>
                    {current + 1 + " / " + amount}
                </Typography>
            </div>
            <div className={classes.rootForTable}>
                <Table className={classes.table}>
                    <TableBody>
                        {pageWithTest.map((value,i) => (
                            <TableRow 
                                key={i}
                                className={className(((i%2) === 0) && classes.oddRow)}>
                                <TableCell 
                                    className={className(classes.tableBodyCell, classes.numericCell)}
                                    numeric
                                >
                                    {i+1+(current*12)}.
                                </TableCell>
                                <TableCell className={className(classes.tableBodyCell, classes.questionCell)}>
                                    {value}
                                </TableCell>                            
                                <TableCell className={className(classes.tableBodyCell, classes.radioCell)}>
                                    <FormSection name="result">
                                        <RadioField name={(i+(current*12)).toString()} />
                                    </FormSection>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className={className(classes.buttonsSection, !_.isEmpty(valuesData) && classes.buttonsSectionEnd)}>
                {_.isEmpty(valuesData) && 
                    <Typography
                        color="secondary"
                        className={classes.skipTest}
                        onClick={() => { destroy(); clearPage(); }}
                    >
                        Skip test
                    </Typography>
                }
                <div>
                    <Button 
                        className={className(classes.button, classes.buttonMarginRight)}
                        color="primary"
                        disableRipple={true}
                        onClick={previousPage}
                        disabled={current === 0 || submitting}
                    >
                        <img 
                            className={className(classes.backIcon, (current === 0 || submitting) && classes.iconDisabled)} 
                            src={back} 
                            alt="back"
                        />
                        Back
                    </Button>
                    {current + 1 === amount ? 
                        <Button 
                            type="submit"
                            className={className(classes.nextTest, classes.buttonMarginLeft)}
                            color="secondary"
                            disableRipple={true}
                            disabled={submitting || invalid || !allSelected}
                        >
                            Done
                        </Button>
                        :
                        <Button 
                            type="submit"
                            className={className(classes.button, classes.buttonMarginLeft)}
                            color="primary"
                            disableRipple={true}
                            disabled={submitting || invalid || !formValues || (formValues && _.size(_.omitBy(formValues.result, _.isNil)) < (current+1)*12)}
                        >
                            Next
                            <img 
                                className={className(classes.nextIcon, (submitting || invalid || !formValues || (formValues && _.size(_.omitBy(formValues.result, _.isNil)) < (current+1)*12)) && classes.iconDisabled)} 
                                src={next} 
                                alt="next"
                            />
                        </Button>
                    }
                </div>
            </div>
        </form>
    )
};

CompanyValuesTestForm = reduxForm({
    form: 'CompanyValuesTestForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true,
})(CompanyValuesTestForm);

export default withStyles(styles)(CompanyValuesTestForm);