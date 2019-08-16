import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import SocialField from './Social';

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
        marginBottom: "8px"
    },
    socialContainer: {
        flexDirection: "row",
        display: "flex",
        alignItems: "baseline"
    }
});

const SocialNetworksSection = ({ classes, addSocial, formName }) => (
    <Paper 
        id="social-networks" 
        className={classes.paper}
    >
        <Typography 
            className={classes.title}
            color="primary"
        >
            Social Networks
        </Typography>
        <Grid 
            container
            direction="row"
        > 
            <Grid 
                item
                xs={12}
                className={classes.socialContainer}
            >  
                <SocialField 
                    name="linkedin"
                    label="Linkedin"
                    formName={formName}
                    addSocial={addSocial}
                />
            </Grid>
            <Grid 
                item
                xs={12}
                className={classes.socialContainer}
            >  
                <SocialField 
                    name="facebook"
                    label="Facebook"
                    formName={formName}
                    addSocial={addSocial}
                />
            </Grid>
            <Grid 
                item
                xs={12}
                className={classes.socialContainer}
            >  
                <SocialField 
                    name="twitter"
                    label="Twitter"
                    formName={formName}
                    addSocial={addSocial}
                />
            </Grid>
            <Grid 
                item
                xs={12}
                className={classes.socialContainer}
            >  
                <SocialField 
                    name="pinterest"
                    label="Pinterest"
                    formName={formName}
                    addSocial={addSocial}
                />
            </Grid>
            <Grid 
                item
                xs={12}
                className={classes.socialContainer}
            >  
                <SocialField 
                    name="youtube"
                    label="Youtube"
                    formName={formName}
                    addSocial={addSocial}
                />
            </Grid>
            <Grid 
                item
                xs={12}
                className={classes.socialContainer}
            >  
                <SocialField 
                    name="instagram"
                    label="Instagram"
                    formName={formName}
                    addSocial={addSocial}
                />
            </Grid>
            <Grid 
                item
                xs={12}
                className={classes.socialContainer}
            >  
                <SocialField 
                    name="telegram"
                    label="Telegram"
                    formName={formName}
                    addSocial={addSocial}
                />
            </Grid>
            <Grid 
                item
                xs={12}
                className={classes.socialContainer}
            >  
                <SocialField 
                    name="angel"
                    label="Angel List"
                    formName={formName}
                    addSocial={addSocial}
                />
            </Grid>
            <Grid 
                item
                xs={12}
                className={classes.socialContainer}
            >  
                <SocialField 
                    name="glassdoor"
                    label="Glassdoor"
                    formName={formName}
                    addSocial={addSocial}
                />
            </Grid>
        </Grid>
    </Paper>
);

export default withStyles(styles)(SocialNetworksSection);