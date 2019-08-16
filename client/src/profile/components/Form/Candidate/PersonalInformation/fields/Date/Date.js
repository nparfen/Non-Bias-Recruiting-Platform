import React from 'react';
import format from 'date-fns/format';
import { DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';

class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
        return format(date, 'd MMM yyyy');
    }
}

const styles = theme => ({
    formControl: {
        marginBottom: "8px"
    },
    inputField: {
        height: 50,
        color: theme.palette.primary.main,
        borderRadius: 2,
        border: 0,
        background: theme.palette.secondary.light,
        padding: "0 24px",
        fontSize: "16px",
        fontWeight: "normal"
    },
    inputLabel: {
        zIndex: 1,
        color: theme.palette.secondary.main,
        transform: "translate(24px, 33px) scale(1)",
        pointerEvents: "none"
    },
    formLabelFocused: {
        color: theme.palette.secondary.main + "!important"
    },
    inputLabelShrink: {
        transform: "translate(0px, 0px) scale(0.75)",
        transformOrigin: "top left"
    },
});

const DateField = ({ formValues, name, setDate, label, classes }) => {

    const date = _.get(formValues, name, null);

    return (
        <MuiPickersUtilsProvider utils={LocalizedUtils}>
            <DatePicker
                clearable
                disableFuture
                openToYearSelection
                placeholder={label}
                label={label}
                format="d MMM yyyy"
                fullWidth={true}
                InputProps={{ disableUnderline: true, className: classes.inputField }}
                InputLabelProps={{ FormLabelClasses: { focused: classes.formLabelFocused }, className: classes.inputLabel, classes:{ shrink: classes.inputLabelShrink }}}
                classes={{ root: classes.formControl }}
                value={date}
                onChange={setDate}
            />
        </MuiPickersUtilsProvider>
    )
}

export default withStyles(styles)(DateField);