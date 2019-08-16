import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import aspireLogo from '../../assets/aspire-logo.svg';

const styles = theme => ({
    footer: {
        width: 'auto',
        padding: '70px 0',
        backgroundColor: theme.palette.secondary.light
    },
    container: {
        width: 'auto',
        marginLeft: '24px',
        marginRight: '24px',
        [theme.breakpoints.up(1200)]: {
            width: 1200,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    title: {
        fontSize: "20px",
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    subtitle: {
        fontSize: "16px",
        color: theme.palette.secondary.dark,
        textDecoration: "none",
        "&:hover": {
            color: theme.palette.primary.main,
        }
    },
    logo: {
        width: "120px",
        height: "120px",
        objectFit: "contain"
    },
    logoContainer: {
        textAlign: "center",
        [theme.breakpoints.up('sm')]: {
            textAlign: "left"
        },
    }
})

const footerLinks = [
    {
        title: "Aspire",
        subtitles: [{subtitle:"Features",url:"#"},{subtitle:"Pricing",url:"#"},{subtitle:"Support",url:"#"},{subtitle:"About",url:"#"}]
    },
    {
        title: "Hubs",
        subtitles: [{subtitle:"Join a hub",url:"#"},{subtitle:"Create a hub",url:"#"},{subtitle:"View hubs",url:"#"}]
    },
    {
        title: "For Recruiters",
        subtitles: [{subtitle:"Post a job",url:"/jobs/create"},{subtitle:"Company profile",url:"/profile"},{subtitle:"Find candidates",url:"/candidates"},{subtitle:"Sign in",url:"/login"}]
    },
    {
        title: "For Candidates",
        subtitles: [{subtitle:"Browse jobs",url:"/jobs"},{subtitle:"Personal profile",url:"/profile"},{subtitle:"View hubs",url:"#"},]
    }
]

const Footer = ({ classes, redux: { locationPathname } }) => (
    <footer className={classes.footer}>
        <Grid
            container 
            spacing={24} 
            className={classes.container}
        >
            <Grid 
                item 
                className={classes.logoContainer}
                xs={12}
                sm={6}
                md
            >
                <img 
                    src={aspireLogo} 
                    className={classes.logo} 
                    alt="logo"
                />
            </Grid>
            {footerLinks.map((section, index) => 
                <Grid 
                    key={index} 
                    item 
                    xs={12}
                    sm={6}
                    md
                >
                    <Typography 
                        className={classes.title} 
                        color="primary" 
                        gutterBottom
                    >
                        {section.title}
                    </Typography>
                    {section.subtitles.map((element, index) => 
                        <Typography 
                            key={index}
                            component={Link} 
                            to={element.url} 
                            replace={element.url === locationPathname}
                            className={classes.subtitle} 
                            gutterBottom
                        >
                            {element.subtitle}
                        </Typography>
                    )}
                </Grid>
            )}
        </Grid>
    </footer>
)

const mapStateToProps = (state) => ({
    redux : {
        locationPathname: state.router.location.pathname,
    }
})

export default connect(mapStateToProps, {})(withStyles(styles)(Footer));