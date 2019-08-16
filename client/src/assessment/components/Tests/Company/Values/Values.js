import React from 'react';
import { getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import CompanyValuesTestForm from './Form';

import checked from '../../../../assets/checked.svg';

import assessmentData from '../../../../ducks/data'

import { setValues, changeValuesPage, clearValues } from '../../../../ducks/actions';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
        padding: "36px",
        borderRadius: "3px",
        marginBottom: "36px",
        boxShadow: "0 2px 6px 0 rgba(4, 19, 36, 0.1)"
    },
    paperContainer: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems:"start",
        [theme.breakpoints.up('sm')]: {
            flexDirection: "row",
            alignItems:"center",
        },
    },
    title: {
        fontSize: "28px",
        fontWeight: "bold",
    },
    description: {
        fontSize: "15px",
        fontWeight: "normal",
    },
    checkedIcon: {
        marginTop: "8px",
        marginRight: "12px"
    },
    titleContainer: {
        display: "flex",
        alignItems:"start",
    },
    button: {
        height: 50,
        borderRadius: 3,
        border: 0,
        padding: "0 36px",
        fontSize: "18px",
        fontWeight: 600,
        textTransform: "initial",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        marginTop: "16px",
        [theme.breakpoints.up('sm')]: {
            marginTop: "0px"
        },
    },
});

const nextPage = (changeValuesPage, page) => () => changeValuesPage(page+1)

const previousPage = (changeValuesPage, page) => () => changeValuesPage(page-1)

const clearPage = (clearValues, changeValuesPage) => () => {
    clearValues()
    changeValuesPage(0)
}

const submit = (setValues, changeValuesPage) => (result) => {
    setValues(result);
    changeValuesPage(0);
}

const CompanyValuesTest = ({ 
    values,
    classes, test = assessmentData.values, 
    setValues, 
    changeValuesPage, 
    clearValues,
    redux: { page, formValues }
}) => (
    <Paper className={classes.paper}>
        {page === 0 && 
            <div className={classes.paperContainer}> 
                <div className={classes.titleContainer}>
                    {!_.isEmpty(values) && <img src={checked} className={classes.checkedIcon} alt="checked"/>}
                    <div>
                        <Typography 
                            color="primary" 
                            className={classes.title}
                        >
                            Values
                        </Typography>
                        <Typography 
                            color="secondary" 
                            className={classes.description}
                        >
                            Approximate passing time 2 min 32 sec
                        </Typography>
                    </div>
                </div>
                <Button 
                    className={classes.button}
                    variant="contained" 
                    color="primary"
                    onClick={nextPage(changeValuesPage, page)}
                >
                    {values ? "Edit answers" : "Start test"}
                </Button>
            </div>
        }
        {page > 0 && 
            <CompanyValuesTestForm 
                amount={_.chunk(test, 12).length} 
                allAmount={test.length} 
                current={page-1}
                valuesData={values}
                initialValues={values}
                formValues={formValues}
                pageWithTest={_.chunk(test, 12)[page-1]} 
                previousPage={previousPage(changeValuesPage, page)} 
                onSubmit={_.chunk(test, 12).length === page ? submit(setValues, changeValuesPage) : nextPage(changeValuesPage, page)} 
                clearPage={clearPage(clearValues, changeValuesPage)}
            />
        }
    </Paper>                  
)

const mapStateToProps = (state) => ({
    redux: {
        formValues: getFormValues('CompanyValuesTestForm')(state),
        page: state.assessment.pages.values
    }
})

export default connect(
    mapStateToProps,
    {
        setValues, 
        changeValuesPage, 
        clearValues
    }
)(withStyles(styles)(CompanyValuesTest));