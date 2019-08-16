import React, { Fragment } from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';

import forbes from '../../assets/forbes.png'
import forbes2x from '../../assets/forbes@2x.png'
import forbes3x from '../../assets/forbes@3x.png'
import businessInsider from '../../assets/business-insider.png'
import businessInsider2x from '../../assets/business-insider@2x.png'
import businessInsider3x from '../../assets/business-insider@3x.png'
import britishAirways from '../../assets/british-airways.png'
import britishAirways2x from '../../assets/british-airways@2x.png'
import britishAirways3x from '../../assets/british-airways@3x.png'
import hdruk from '../../assets/hdruk.png'
import hdruk2x from '../../assets/hdruk@2x.png'
import hdruk3x from '../../assets/hdruk@3x.png'
import recruiter from '../../assets/recruiter.png'
import recruiter2x from '../../assets/recruiter@2x.png'
import recruiter3x from '../../assets/recruiter@3x.png'

const styles = theme => ({
    title: {
        fontSize: "30px",
        fontWeight: "bold",
        marginBottom: "48px"
    },
    clientsSection: {
        marginBottom: "100px"
    }
});

const LandingPage = ({ classes }) => (
    <Fragment>
        <Typography 
            color="primary" 
            className={classes.title}
        >
            Our Clients
        </Typography>
        <Grid
            className={classes.clientsSection}
            container 
            spacing={32}
        >
            <Grid 
                item 
                xs
            >
                <img 
                    src={forbes} 
                    srcSet={`${forbes2x} 2x, ${forbes3x} 3x`} 
                    alt="forbes-logo"
                />
            </Grid>
            <Grid 
                item 
                xs
            >
                <img 
                    src={businessInsider} 
                    srcSet={`${businessInsider2x} 2x, ${businessInsider3x} 3x`} 
                    alt="business-insider-logo"
                />
            </Grid>
            <Grid 
                item 
                xs
            >
                <img 
                    src={britishAirways} 
                    srcSet={`${britishAirways2x} 2x, ${britishAirways3x} 3x`}
                    alt="british-airways-logo"
                />
            </Grid>
            <Grid 
                item 
                xs
            >
                <img 
                    src={hdruk} 
                    srcSet={`${hdruk2x} 2x, ${hdruk3x} 3x`} 
                    alt="hdruk-logo"
                />
            </Grid>
            <Grid 
                item 
                xs
            >
                <img 
                    src={recruiter} 
                    srcSet={`${recruiter2x} 2x, ${recruiter3x} 3x`}
                    alt="recruiter-logo"
                />
            </Grid>
        </Grid>
    </Fragment>
)

export default withStyles(styles)(LandingPage);