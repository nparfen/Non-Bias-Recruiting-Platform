import React, { Fragment } from 'react';

import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';

import HeaderSection from './components/Header';
import MainSection from './components/Main';
import DescriptionSection from './components/Description';
import ClientsSection from './components/Clients';
import ActionSection from './components/Action';

import Footer from '../app/layouts/Footer';

const styles = theme => ({
    landingSection: {
        marginTop: "100px",
        width: 'auto',
        marginLeft: '24px',
        marginRight: '24px',
        [theme.breakpoints.up(1200)]: {
            width: 1200,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    }
});

const LandingPage = ({ classes }) => (
    <Fragment>
        <HeaderSection />
        <MainSection />
        <Grid
            container
            className={classes.landingSection}
            alignItems="center"
            direction="row"
            justify="center"
        >
            <DescriptionSection />
            <ClientsSection />
            <ActionSection />
        </Grid>
        <Footer />
    </Fragment>
)

export default withStyles(styles)(LandingPage);