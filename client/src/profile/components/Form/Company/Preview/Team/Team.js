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
    },
    editUploadedImage: {
        width: "24px",
        height: "24px",
        objectFit: "contain",
        zIndex: 3,
        position: "absolute",
        cursor: "pointer",
        margin: "4px",
        top: 0,
        right: 32
    },
    memberName: {
        wordBreak: "break-word",
        marginTop: "12px",
        fontSize: "15px",
        fontWeight: 500,
    },
    memberPosition: {
        wordBreak: "break-word",
        fontSize: "15px",
        fontWeight: "normal",
    },
    addIcon: {
        width: "24px",
        height: "24px",
        objectFit: "contain",
        marginRight: "5px"
    },
    addMemberButton: {
        border: 0,
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: "8px",
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
    }
});

class TeamField extends Component {

    state = {
        teamPage: 0,
    }

    render() {

        let { teamPage } = this.state
        let { members, classes } = this.props

        return (
            <Fragment>
                <div className={classNames((!members|| !Array.isArray(members) || members.length === 0) && classes.subtitleSectionStart, classes.subtitleSection)}>
                    <Typography 
                        className={classes.subtitle}
                        color="primary"
                    >
                        Our Team
                    </Typography>
                    {!(!members|| !Array.isArray(members) || members.length === 0) && <div>
                        <Button
                            className={classNames(classes.button)}
                            color="primary"
                            disableRipple={true}
                            disabled={(!members|| !Array.isArray(members) || _.chunk(members, 3).length === 1 || teamPage === 0) ? true : false}
                            onClick={this.previousPage}
                        >
                            <img 
                                src={back} 
                                alt="back"
                                className={classNames(classes.backIcon, (!members|| !Array.isArray(members) || _.chunk(members, 3).length === 1 || teamPage === 0) && classes.iconDisabled)}
                            />
                        </Button>
                        <Button
                            className={classNames(classes.button)}
                            color="primary"
                            disableRipple={true}
                            disabled={(!members || !Array.isArray(members) || members.length === 0 || _.chunk(members, 3).length === 1 || teamPage+1 === _.chunk(members, 3).length) ? true : false}
                            onClick={this.nextPage} 
                        >
                            <img 
                                src={next} 
                                alt="next"
                                className={classNames(classes.nextIcon, (!members || !Array.isArray(members) || members.length === 0 || _.chunk(members, 3).length === 1 || teamPage+1 === _.chunk(members, 3).length) && classes.iconDisabled)}
                            />
                        </Button>
                    </div>}
                </div>
                <Grid 
                    container
                    direction="row"
                    className={classes.gridContainer}
                >
                    {members && Array.isArray(members) && _.chunk(members, 3)[teamPage] &&
                        _.chunk(members, 3)[teamPage].map((member, index) => {
                            return (
                                <Grid 
                                    item
                                    md={4}
                                    xs={12}
                                    className={classes.gridItem}
                                    key={index}
                                >
                                    <div className={classes.imagePreviewContainer}>
                                        <img className={classes.imagePreview} src={member.avatar} alt="response"/>
                                    </div>
                                    <Typography className={classes.memberName} color="primary">{member.name}</Typography>
                                    <Typography className={classes.memberPosition} color="secondary">{member.position}</Typography>
                                </Grid>
                            )})
                    }
                </Grid>
            </Fragment>
        )
    }
}

export default withStyles(styles)(TeamField);