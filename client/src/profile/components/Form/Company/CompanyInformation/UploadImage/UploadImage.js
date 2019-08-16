import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import Dropzone from 'react-dropzone';
import loadImage from 'blueimp-load-image';
import classNames from 'classnames';
import axios from "axios";
import _ from 'lodash';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Clear from '@material-ui/icons/Clear';

import upload from '../../../../../assets/upload.svg'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
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
    dropZoneContainer: {
        marginBottom: "24px",
        position: "relative"
    },
    dropZone: {
        display: "table",
        cursor: "pointer",
        marginBottom: "24px",
        width: "100%",
        height: "140px",
        borderRadius: "3px",
        backgroundColor: "white",
        border: "dashed 2px #d8d8d8",
        textAlign: "center",
        "&$dropZoneActive":{
            border: "solid 2px #d8d8d8"
        }
    },
    dropZoneActive: {},
    imageContainer: {
        position: "relative",
        zIndex: 2,
        display: "table-cell",
        verticalAlign: "middle",
        "&$imageContainerBottom":{
            verticalAlign: "bottom",
        }
    },
    imageContainerBottom: {},
    uploadIcon: {
        width: "24px",
        height: "24px",
        objectFit: "contain"
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

class UploadImage extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            dropError: "",
            isLoading: false
        }
        this.dropzoneRef = {};
    }

    onDropAccepted = (file) => {
        let { addImage, token } = this.props;
        this.setState({dropError: "", isLoading: true});
        const loadImageOptions = { canvas: true }
        loadImage.parseMetaData(file[0], (data) => {
            if (data.exif && data.exif.get('Orientation')) {
                loadImageOptions.orientation = data.exif.get('Orientation')
            }
            loadImage(file[0], (canvas) => {
                let self = this;
                canvas.toBlob(function(blob) {
                    const formData = new FormData();
                    formData.append('file', blob);
                    axios({
                        method: "post",
                        url: process.env.REACT_APP_API_URL+"/upload",
                        headers: {
                            'authorization': token,
                            'Content-Type': 'multipart/form-data'
                        },
                        data: formData
                    }).then(function (response) {
                        const fileUrl = response.data.fileUrl;
                        addImage(fileUrl);
                        self.setState({isLoading: false})
                    }).catch(function (error) {
                        self.setState({dropError: error.response.data.message})
                    })
                }, file[0].type);
            }, loadImageOptions)
        }) 
    }
    
    onDropRejected = () => this.setState({dropError: "Maximum image size is 5 MB. Formats: png, jpeg, jpg."})

    clearImage = () => {
        let { addImage } = this.props;
        this.setState({dropError: ""});
        addImage("");
    }

    render() {

        let { dropError, isLoading } = this.state
        let { formValues, name, label, classes } = this.props;

        const photo = _.get(formValues, name, "");

        return (
            <div className={classes.dropZoneContainer}>
                <Dropzone
                    name={name}
                    onDropAccepted={this.onDropAccepted}
                    onDropRejected={this.onDropRejected}
                    ref={(node) => { this.dropzoneRef = node; }}
                    maxSize={5242880}
                    multiple={false}
                    accept="image/png,image/jpeg"
                    className={classNames(classes.dropZone, photo ? classes.dropZoneActive : null)}
                >
                    {
                        isLoading ? 
                            <div className={classes.imageContainer}>
                                <CircularProgress color="secondary" size={36}/>
                            </div> 
                            : 
                            photo ? 
                                <div className={classNames(classes.imageContainer, classes.imageContainerBottom)}>
                                    <img className={classes.uploadIcon} src={upload} alt="upload" /><br/>
                                    <Typography color="secondary">Replace {label}</Typography>
                                </div>
                                :
                                <div className={classes.imageContainer}>
                                    <img className={classes.uploadIcon} src={upload} alt="upload" /><br/>
                                    <Typography color="secondary">Upload {label}</Typography>
                                </div>
                    }
                    {photo && <img className={classes.imagePreview} src={photo} alt="response"/>}
                </Dropzone>
                {photo && !isLoading && <Clear onClick={this.clearImage} color="secondary" className={classes.clearUploadedImage}/>}
                {dropError && <Typography color="error"><small>{dropError}</small></Typography>}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    formValues: getFormValues(ownProps.formName)(state),
    token: state.auth.token
})

export default connect(mapStateToProps,{})(withStyles(styles)(UploadImage));