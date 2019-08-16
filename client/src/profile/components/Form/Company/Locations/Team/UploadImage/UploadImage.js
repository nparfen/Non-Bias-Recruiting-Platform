import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import loadImage from 'blueimp-load-image';
import classNames from 'classnames';
import axios from "axios";

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import Clear from '@material-ui/icons/Clear';

import upload from '../../../../../../assets/upload.svg'

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
        position: "relative",
        marginBottom: "24px",
        [theme.breakpoints.up('md')]: {
            marginBottom: "0px"
        }
    },
    dropZone: {
        display: "table",
        cursor: "pointer",
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
    },
});

class UploadImage extends Component {

    onDropAccepted = (file) => {

        let { setAvatar, setAvatarError, setImageLoading, token } = this.props;

        setAvatarError("");
        setImageLoading(true);

        const loadImageOptions = { canvas: true }
        loadImage.parseMetaData(file[0], (data) => {
            if (data.exif && data.exif.get('Orientation')) {
                loadImageOptions.orientation = data.exif.get('Orientation')
            }
            loadImage(file[0], (canvas) => {
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
                        setAvatar(fileUrl);
                        setImageLoading(false);
                    }).catch(function (error) {
                        setAvatarError(error.response.data.message)
                    })
                }, file[0].type);
            }, loadImageOptions)
        }) 
    }
    
    onDropRejected = () => {
        let { setAvatarError } = this.props;
        setAvatarError("Maximum image size is 5 MB. Formats: png, jpeg, jpg.");
    }

    clearImage = () => {
        let { setAvatarError, setAvatar } = this.props;
        setAvatarError("");
        setAvatar("");
    }

    render() {

        let { avatar, avatarError, imageIsLoading, classes } = this.props

        return (
            <div className={classes.dropZoneContainer}>
                <Dropzone
                    name="avatar"
                    onDropAccepted={this.onDropAccepted}
                    onDropRejected={this.onDropRejected}
                    ref={(node) => { this.dropzoneRef = node; }}
                    maxSize={5242880}
                    multiple={false}
                    accept="image/png,image/jpeg"
                    className={classNames(classes.dropZone, avatar && classes.dropZoneActive)}
                >
                    {
                        imageIsLoading ? 
                            <div className={classes.imageContainer}>
                                <CircularProgress color="secondary" size={36}/>
                            </div> 
                            : 
                            avatar ? 
                                <div className={classNames(classes.imageContainer, classes.imageContainerBottom)}>
                                    <img className={classes.uploadIcon} src={upload} alt="upload" /><br/>
                                    <Typography color="secondary">Replace photo</Typography>
                                </div>
                                :
                                <div className={classes.imageContainer}>
                                    <img className={classes.uploadIcon} src={upload} alt="upload" /><br/>
                                    <Typography color="secondary">Upload photo</Typography>
                                </div>
                    }
                    {avatar && <img className={classes.imagePreview} src={avatar} alt="response"/>}
                </Dropzone>
                {avatar && !imageIsLoading && <Clear onClick={this.clearImage} color="secondary" className={classes.clearUploadedImage}/> }
                {avatarError && <Typography color="error"><small>{avatarError}</small></Typography>}
            </div>
        )
    }
}

export default withStyles(styles)(UploadImage);