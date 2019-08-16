import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import back from '../../../../../assets/back.svg';
import next from '../../../../../assets/next.svg';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    subtitleSection: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems:"center",
        marginTop: "24px",
        marginBottom: "16px",
        "&$subtitleSectionStart": {
            justifyContent: "start",
        }
    },
    subtitleSectionStart: {},
    subtitle: {
        fontSize: "16px",
        fontWeight: "bold",
    },
    button: {
        border: 0,
        padding: 0,
        minWidth: 0,
        fontSize: "16px",
        fontWeight: "normal",
        textTransform: "initial",
        boxShadow: "none !important",
        minHeight: "inherit",
        '&:disabled':{
            color: "#c8c7cc"
        },
        '&:hover':{
            backgroundColor: "transparent",
        },
    },
    backIcon: {
        marginRight: "16px"
    },
    nextIcon: {
        marginLeft: "16px"
    },
    iconDisabled:{
        opacity: 0.26
    },
    imagePreview: {
        maxHeight: "100%",  
        maxWidth: "100%", 
        objectFit: "cover",
        width: "100%",
        height: "140px",
        position: "absolute",  
        top: 0, 
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 0
    },
    imagePreviewContainer: {
        position: "relative",
        display: "table",
        width: "100%",
        height: "140px",
        borderRadius: "3px",
        backgroundColor: "white",
        border: "solid 2px #d8d8d8",
    },
    gridContainer: {
        marginRight: "-10px",
        marginLeft: "-10px",
        width: "unset"
    },
    gridItem: {
        paddingRight: "10px",
        paddingLeft: "10px",
    },
    gridItemPreview: {
        marginTop: "20px",
        [theme.breakpoints.up('md')]: {
            marginTop: "0px"
        },
    },
    clearUploadedImage: {
        width: "24px",
        height: "24px",
        objectFit: "contain",
        zIndex: 3,
        position: "absolute",
        cursor: "pointer",
        margin: "4px",
        top: 0,
        right: 0
    }
});

class OfficeField extends Component {

    state = {
        officePage: 0,
    }

    render() {

        let { officePage } = this.state;
        let { classes, ourOffice } = this.props;

        return(
            <Fragment>
                <div className={classNames((!ourOffice || !Array.isArray(ourOffice) || ourOffice.length === 0) && classes.subtitleSectionStart, classes.subtitleSection)}>
                    <Typography 
                        className={classes.subtitle}
                        color="primary"
                    >
                        Our Office
                    </Typography>
                    {!(!ourOffice || !Array.isArray(ourOffice) || ourOffice.length === 0) && <div>
                        <Button
                            className={classNames(classes.button)}
                            color="primary"
                            disableRipple={true}
                            disabled={(!ourOffice || !Array.isArray(ourOffice) || _.chunk(ourOffice, 3).length === 1 || officePage === 0) ? true : false}
                            onClick={() => this.setState({officePage: officePage-1})}
                        >
                            <img 
                                src={back} 
                                alt="back"
                                className={classNames(classes.backIcon, (!ourOffice || !Array.isArray(ourOffice) || _.chunk(ourOffice, 3).length === 1 || officePage === 0) && classes.iconDisabled)}
                            />
                        </Button>
                        <Button
                            className={classNames(classes.button)}
                            color="primary"
                            disableRipple={true}
                            disabled={(!ourOffice || !Array.isArray(ourOffice) || _.chunk(ourOffice, 3).length === 1 || officePage+1 === _.chunk(ourOffice, 3).length ) ? true : false}
                            onClick={() => this.setState({officePage: officePage+1})}
                        >
                            <img 
                                src={next} 
                                alt="next"
                                className={classNames(classes.nextIcon, (!ourOffice || !Array.isArray(ourOffice) || _.chunk(ourOffice, 3).length === 1 || officePage+1 === _.chunk(ourOffice, 3).length) && classes.iconDisabled)}
                            />
                        </Button>
                    </div>}
                </div>
                <Grid 
                    container
                    direction="row"
                    className={classes.gridContainer}
                > 
                    {
                        ourOffice && Array.isArray(ourOffice) && _.chunk(ourOffice, 3)[officePage] && 
                            _.chunk(ourOffice, 3)[officePage].map((image, index) => 
                                <Grid 
                                    item
                                    md={4}
                                    xs={12}
                                    className={classNames(classes.gridItem, classes.gridItemPreview)}
                                    key={index}
                                >
                                    <div className={classes.imagePreviewContainer}>
                                        <img 
                                            className={classes.imagePreview} 
                                            src={image} 
                                            alt="response"
                                        />
                                    </div>
                                </Grid>
                            )
                    }
                </Grid> 
            </Fragment>
        )
    }
}

export default withStyles(styles)(OfficeField);