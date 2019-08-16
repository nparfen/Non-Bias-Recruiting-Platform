import React, { Component }  from 'react';
import { reduxForm } from 'redux-form';
import { toast } from 'react-toastify';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import validate from './validation';

import PasswordField from './fields/Password';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginTop: "32px",
        marginBottom: "24px"
    },
    button: {
        height: 50,
        marginTop: "24px",
        borderRadius: 3,
        border: 0,
        padding: "0 36px",
        fontSize: "18px",
        fontWeight: 600,
        textTransform: "capitalize",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        '&:disabled':{
            color: "#f9f9f9"
        }
    },
    subtitle: {
        marginBottom: "4px",
        fontSize: "16px",
        fontWeight: "bold"
    }
});

class SettingsForm extends Component {

    componentDidMount() {
        toast.warn("😔 Unfortunately, the settings change function is currently not available.", { autoClose: 10000 })
    }

    render() {

        const { classes, handleSubmit, pristine, submitting, invalid } = this.props;

        return (
            <Grid 
                container
                direction="row"
            >
                <Grid 
                    item
                    xs={12}
                >
                    <Typography 
                        color="primary" 
                        className={classes.title}
                    >
                        Settings
                    </Typography>
                </Grid>
                <Grid 
                    item
                    lg={4}
                    md={6}
                    sm={8}
                    xs={12}
                >
                    <Typography 
                        color="primary" 
                        className={classes.subtitle}
                    >
                        Change Password
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <PasswordField 
                            name="oldpassword" 
                            label="Old password" 
                        />
                        <PasswordField 
                            name="newpassword" 
                            label="New password" 
                        />
                        <PasswordField 
                            name="confirmnewpassword" 
                            label="Confirm new password" 
                        />
                        <Button 
                            className={classes.button}
                            type="submit"
                            variant="contained" 
                            color="primary"
                            disabled={pristine || submitting || invalid}
                        >
                            Change password
                        </Button>
                    </form>
                </Grid>
            </Grid>
        )
    }
}

export default reduxForm({
    form: 'SettingsForm',
    validate
})(withStyles(styles)(SettingsForm))