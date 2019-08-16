import React from 'react';
import { connect } from 'react-redux';
import { FieldArray, getFormValues } from 'redux-form';
import classNames from 'classnames';
import _ from 'lodash';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';

import CheckboxField from './fields/Checkbox';
import NumberField from './fields/Number';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
        padding: "36px",
        borderRadius: "3px",
        marginBottom: "24px",
        boxShadow: "0 2px 6px 0 rgba(4, 19, 36, 0.1)"
    },
    title: {
        fontSize: "20px",
        fontWeight: "bold",
    },
    description: {
        fontSize: "15px",
        fontWeight: "normal",
        marginBottom: '24px'
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
    },
    tableBodyTitle: {
        fontSize: "18px",
        fontWeight: "500",
    },
    tableBodyDesc: {
        fontSize: "15px",
        fontWeight: "normal",
    },
    numericCell: {
        paddingLeft: "24px",
        paddingRight: "16px"
    },
    numberField: {
        paddingLeft: "24px",
    },
    helperText: {
        marginTop: "8px"
    }
});

const valuesIsBetween = (min, max) =>  (value, previousValue, allValues) => {
    if (!value) {
        return "";
    } else {
        let perksSum = _.reduce(allValues.perks, (sum, perk) => (sum + Number(perk.value)), 0);
        if (Number(value) < min || Number(value) > max || perksSum > max) {
            return previousValue
        }
        return value
    }
}

const QuestionField = ({ classes, fields, formValues, perksAmount, meta: { error } }) => (
    <div className={classes.rootForTable}>
        <Table className={classes.table}>
            <TableHead className={classes.tableMain}>
                <TableRow>
                    <TableCell 
                        numeric 
                        className={classNames(classes.tableMainCell, classes.numericCell)}
                    >
                        #
                    </TableCell>
                    <TableCell className={classes.tableMainCell}>
                        My future company…
                    </TableCell>
                    <TableCell className={classNames(classes.tableMainCell, classes.numericCell)}>
                        Points
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    fields.map((field, i) => (
                        <TableRow key={i}>
                            <TableCell 
                                className={classNames(classes.tableBodyCell, classes.numericCell)}
                                numeric
                            >
                                {i+1}.
                            </TableCell>
                            <TableCell className={classes.tableBodyCell}>
                                <Typography 
                                    color="primary"
                                    className={classes.tableBodyTitle}
                                >
                                    {_.get(formValues, `${field}.title`, "")}
                                </Typography>
                                <Typography
                                    color="secondary"
                                    className={classes.tableBodyDesc}
                                >
                                    {_.get(formValues, `${field}.description`, "")}
                                </Typography>
                            </TableCell>
                            <TableCell className={classNames(classes.tableBodyCell, classes.numberField)}>
                                <NumberField 
                                    name={`${field}.value`}
                                    label="0"
                                    sumValues={perksAmount}
                                    normalize={valuesIsBetween(1,100)}
                                />
                            </TableCell>
                            
                        </TableRow>
                    ))
                }
            </TableBody>
            <TableFooter className={classes.tableMain}>
                <TableRow>
                    <TableCell className={classes.tableMainCell}  />
                    <TableCell className={classes.tableMainCell}>
                        Sum
                    </TableCell>
                    <TableCell className={classNames(classes.tableMainCell, classes.numericCell)}>
                        {perksAmount}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
        {error && <Typography className={classes.helperText} color="error"><small>{error}</small></Typography>}
    </div>
)

const PerksAndBenefitsSection = ({ classes, formValues }) => {

    const perksAmount = 100 - _.reduce(_.get(formValues, 'perks'), (sum, perk) => (sum + Number(perk.value)), 0);

    return (
        <Paper 
            id="perks-and-benefits" 
            className={classes.paper}
        >
            <Typography 
                className={classes.title}
                color="primary"
            >
                Perks and Benefits
            </Typography>
            <Typography 
                className={classes.description}
                color="secondary"
            >
                You may divide the 100 points in any way among the five alternatives in each question. Some alternatives may get zero points, for example. Remember that the total must equal 100.
            </Typography>
            <FieldArray 
                name="perks" 
                classes={classes}
                perksAmount={perksAmount}
                formValues={formValues}
                component={QuestionField}
            />
            {perksAmount === 0 && <CheckboxField 
                name="preferredperksandbenefits"
                label="Show preferred perks and benefits in public profile"
            />
            }
        </Paper>
    )
}

const mapStateToProps = (state, ownProps) => ({
    formValues: getFormValues(ownProps.formName)(state),
})

export default connect(mapStateToProps,{})(withStyles(styles)(PerksAndBenefitsSection));