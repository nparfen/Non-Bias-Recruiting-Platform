import React from 'react';
import { FormSection, reduxForm } from 'redux-form';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Typography from '@material-ui/core/Typography';

import className from 'classnames';
import _ from 'lodash';

import NumberField from './fields/Number';

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
    tableMain: {
        backgroundColor: "#f9f9f9"
    },
    tableMainCell: {
        fontSize: "18px",
        fontWeight: 600,
        padding: "14px 0",
        borderBottom: "none"
    },
    tableBodyCell: {
        fontSize: "18px",
        fontWeight: "normal",
        color: theme.palette.secondary.dark,
        padding: "16px 0",
        borderBottom: "1px solid #efeff4",
        verticalAlign: "top",
        "&:last-child": {
            paddingRight: "72px"
        },
        "&$numberField": {
            paddingRight: "48px"
        },
        "&$numericForInput": {
            paddingTop: "22px"
        }
    },
    numericCell: {
        paddingLeft: "24px",
        paddingRight: "16px"
    },
    numberField: {},
    numericForInput: {},
});

const nowValuesIsBetween = (current, min, max) =>  (value, previousValue, allValues) => {
    if (!value) {
        return "";
    } else {
        let nowSum = _.reduce(allValues.result[current].now, (sum, value) => (sum + Number(value)), 0);
        if (Number(value) < min || Number(value) > max || nowSum > max) {
            return previousValue
        }
        return value
    }
}

const futureValuesIsBetween = (current, min, max) => (value, previousValue, allValues) => {
    if (!value) {
        return "";
    } else {
        let futureSum = _.reduce(allValues.result[current].future, (sum, value) => (sum + Number(value)), 0);
        if (Number(value) < min || Number(value) > max || futureSum > max) {
            return previousValue
        } 
        return value
    }   
}

let CompanyCultureTestForm = ({ 
    classes,
    culture, formValues, current, amount, pageWithTest, 
    handleSubmit, previousPage, submitting, invalid,
    destroy, clearPage
}) => {

    const futureSum = _.reduce(_.get(formValues, `result[${current}].future`), (sum, value) => (sum + Number(value)), 0);
    const nowSum = _.reduce(_.get(formValues, `result[${current}].now`), (sum, value) => (sum + Number(value)), 0);

    const futureAmount = 100 - futureSum;
    const nowAmount = 100 - nowSum;

    return (
        <form onSubmit={handleSubmit}> 
            <Typography
                color="primary"
                className={classes.title}
            >
                Culture
            </Typography>
            <div className={classes.descriptionContainer}>
                <div>
                    <Typography
                        color="primary"
                        className={classes.mainDescription}
                    >
                        These six questions ask you to identify the way you experience your organization right now, and, separately, the way you think it should be in the future
                    </Typography>
                    <Typography
                        color="secondary"
                        className={classes.secondaryDescription}
                    >
                        You may divide the 100 points in any way among the four alternatives in each question. Some alternatives may get zero points, for example. Remember that the total must equal 100.
                    </Typography>
                </div>
                <Typography className={classes.pages}>
                    {current + 1 + " / " + amount}
                </Typography>
            </div>
            <div className={classes.rootForTable}>
                <Table className={classes.table}>
                    <TableHead className={classes.tableMain}>
                        <TableRow>
                            <TableCell 
                                numeric 
                                className={className(classes.tableMainCell, classes.numericCell)}
                            >
                                #
                            </TableCell>
                            <TableCell className={classes.tableMainCell}>
                                {pageWithTest.title}
                            </TableCell>
                            <TableCell 
                                numeric 
                                className={className(classes.tableMainCell, classes.numericCell)}
                            >
                                #
                            </TableCell>
                            <TableCell className={classes.tableMainCell}>
                                Now
                            </TableCell>
                            <TableCell 
                                numeric 
                                className={className(classes.tableMainCell, classes.numericCell)}
                            >
                                #
                            </TableCell>
                            <TableCell className={classes.tableMainCell}>
                                Future
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pageWithTest.test.map((value,i) => (
                            <TableRow key={i}>
                                <TableCell 
                                    className={className(classes.tableBodyCell, classes.numericCell)}
                                    numeric
                                >
                                    {value.key}.
                                </TableCell>
                                <TableCell className={classes.tableBodyCell}>
                                    {value.question}
                                </TableCell>
                                <TableCell 
                                    className={className(classes.tableBodyCell, classes.numericCell, classes.numericForInput)}
                                    numeric
                                >
                                    {value.key}.
                                </TableCell>
                                <TableCell className={className(classes.tableBodyCell, classes.numberField)}>
                                    <FormSection name={`result.${current}.now`}>
                                        <NumberField 
                                            name={value.key}
                                            label="0"
                                            sumOfNowValues={nowAmount}
                                            normalize={nowValuesIsBetween(current,1,100)}
                                        />
                                    </FormSection>
                                </TableCell>
                                <TableCell 
                                    className={className(classes.tableBodyCell, classes.numericCell, classes.numericForInput)}
                                    numeric
                                >
                                    {value.key}.
                                </TableCell>
                                <TableCell className={className(classes.tableBodyCell, classes.numberField)}>
                                    <FormSection name={`result.${current}.future`}>
                                        <NumberField 
                                            name={value.key}
                                            label="0"
                                            sumOfFutureValues={futureAmount}
                                            normalize={futureValuesIsBetween(current,1,100)}
                                        />
                                    </FormSection>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter className={classes.tableMain}>
                        <TableRow>
                            <TableCell className={classes.tableMainCell}  />
                            <TableCell 
                                className={classes.tableMainCell} 
                                colSpan={2}
                            >
                                Sum
                            </TableCell>
                            <TableCell 
                                className={classes.tableMainCell} 
                                colSpan={2}
                            >
                                {nowAmount}
                            </TableCell>
                            <TableCell className={classes.tableMainCell}>
                                {futureAmount}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
            <div className={className(classes.buttonsSection, !_.isEmpty(culture) && classes.buttonsSectionEnd)}>
                {_.isEmpty(culture) && 
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
                            disabled={submitting || invalid || nowAmount !== 0 || futureAmount !== 0}
                        >
                            Next test
                        </Button>
                        :
                        <Button 
                            type="submit"
                            className={className(classes.button, classes.buttonMarginLeft)}
                            color="primary"
                            disableRipple={true}
                            disabled={submitting || invalid || nowAmount !== 0 || futureAmount !== 0}
                        >
                            Next
                            <img 
                                className={className(classes.nextIcon, (submitting || invalid || nowAmount !== 0 || futureAmount !== 0) && classes.iconDisabled)} 
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

CompanyCultureTestForm = reduxForm({
    form: 'CompanyCultureTestForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true,
})(CompanyCultureTestForm);

export default withStyles(styles)(CompanyCultureTestForm);