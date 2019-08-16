import React, { Component, Fragment } from 'react';
import { getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import classNames from 'classnames';
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Clear from '@material-ui/icons/Clear';

import UploadImage from './UploadImage';

import back from '../../../../../assets/back.svg'
import next from '../../../../../assets/next.svg'

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

    constructor(props) {
        super(props) 
        this.state = {
            page:0,
            dropzoneError: "",
            imageIsLoading: false
        }
    }

    nextPage = () => this.setState({page: this.state.page+1})

    previousPage = () => this.setState({page: this.state.page-1})

    setDropzoneError = (value) => this.setState({dropzoneError: value})

    setImageLoading = (bool) => this.setState({imageIsLoading: bool})

    clearImage = (index) => () => {
        let { addPhotos, name, formValues } = this.props;
        let { page } = this.state
        let newArray = _.reduce(_.get(formValues, name, []), function(result, value, key) {
            if(key !== index) {
                result.push(value)
            }
            return result;
        }, [])
        if(newArray.length === 0){
            addPhotos([])
        } else {
            addPhotos(newArray)
        }
        if(_.chunk(newArray, 3).length === page && page !== 0) {
            this.setState({page:page-1});
        }
    }


    render() {

        let { page, dropzoneError, imageIsLoading } = this.state
        let { formValues, name, classes, addPhotos, token } = this.props;

        const photos = _.get(formValues, name, []);

        return (
            <Fragment>
                <div className={classNames((!photos || !Array.isArray(photos) || photos.length === 0) && classes.subtitleSectionStart, classes.subtitleSection)}>
                    <Typography 
                        className={classes.subtitle}
                        color="primary"
                    >
                        Our Office
                    </Typography>
                    {!(!photos || !Array.isArray(photos) || photos.length === 0 ) && <div>
                        <Button
                            className={classNames(classes.button)}
                            color="primary"
                            disableRipple={true}
                            disabled={(!photos || !Array.isArray(photos) || _.chunk(photos, 3).length === 1 || page === 0) ? true : false}
                            onClick={this.previousPage}
                        >
                            <img 
                                src={back} 
                                alt="back"
                                className={classNames(classes.backIcon, (!photos || !Array.isArray(photos) || _.chunk(photos, 3).length === 1 || page === 0) && classes.iconDisabled)}
                            />
                        </Button>
                        <Button
                            className={classNames(classes.button)}
                            color="primary"
                            disableRipple={true}
                            disabled={(!photos || !Array.isArray(photos) || _.chunk(photos, 3).length === 1 || page+1 === _.chunk(photos, 3).length ) ? true : false}
                            onClick={this.nextPage} 
                        >
                            <img 
                                src={next} 
                                alt="next"
                                className={classNames(classes.nextIcon, (!photos || !Array.isArray(photos) || _.chunk(photos, 3).length === 1 || page+1 === _.chunk(photos, 3).length ) && classes.iconDisabled)}
                            />
                        </Button>
                    </div>}
                </div>
                <Grid 
                    container
                    direction="row"
                    className={classes.gridContainer}
                >  
                    <Grid 
                        item
                        md={3}
                        xs={12}
                        className={classes.gridItem}
                    > 
                        <UploadImage 
                            name={name}
                            token={token}
                            addPhotos={addPhotos}
                            formValues={formValues}
                            imageIsLoading={imageIsLoading}
                            dropzoneError={dropzoneError}
                            setDropzoneError={this.setDropzoneError}
                            setImageLoading={this.setImageLoading}
                        />
                    </Grid>
                    {
                        photos && Array.isArray(photos) && _.chunk(photos, 3)[page] && 
                            _.chunk(photos, 3)[page].map((image, index) => 
                                <Grid 
                                    item
                                    md={3}
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
                                        {
                                            !imageIsLoading && 
                                            <Clear 
                                                onClick={this.clearImage(index+((page)*3))} 
                                                color="secondary" 
                                                className={classes.clearUploadedImage}
                                            />
                                        }
                                    </div>
                                </Grid>
                            )
                    }
                </Grid> 
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    formValues: getFormValues(ownProps.formName)(state),
    token: state.auth.token
})

export default connect(mapStateToProps,{})(withStyles(styles)(OfficeField));