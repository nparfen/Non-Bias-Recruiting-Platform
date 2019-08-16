import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import loadImage from 'blueimp-load-image';
import axios from "axios";
import _ from 'lodash';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import upload from '../../../../../../assets/upload.svg'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    dropZoneContainer: {
        position: "relative"
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
    },
    imageContainer: {
        position: "relative",
        zIndex: 2,
        display: "table-cell",
        verticalAlign: "middle"
    },
    uploadIcon: {
        width: "24px",
        height: "24px",
        objectFit: "contain"
    }
});

class UploadImage extends Component {

    onDropAccepted = (file) => {

        let { addPhotos, setDropzoneError, setImageLoading, formValues, name, token } = this.props;

        setDropzoneError("");
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
                        let newPhotos = _.concat(fileUrl, _.get(formValues, name, []));
                        addPhotos(newPhotos);
                        setImageLoading(false);
                    }).catch(function (error) {
                        setDropzoneError(error.response.data.message)
                    })
                }, file[0].type);
            }, loadImageOptions)
        }) 
    }

    onDropRejected = () => {
        let { setDropzoneError } = this.props;
        setDropzoneError("Maximum image size is 5 MB. Formats: png, jpeg, jpg.");
    }


    render() {

        let { name, imageIsLoading, dropzoneError, classes } = this.props;

        return (
            <div className={classes.dropZoneContainer}>
                <Dropzone
                    name={name}
                    onDropAccepted={this.onDropAccepted}
                    onDropRejected={this.onDropRejected}
                    maxSize={5242880}
                    multiple={false}
                    accept="image/png,image/jpeg"
                    className={classes.dropZone}
                >
                    {
                        imageIsLoading ? 
                            <div className={classes.imageContainer}>
                                <CircularProgress color="secondary" size={36}/>
                            </div> 
                            : 
                            <div className={classes.imageContainer}>
                                <img className={classes.uploadIcon} src={upload} alt="upload" /><br/>
                                <Typography color="secondary">Upload photos</Typography>
                            </div>
                    }
                </Dropzone>
                {dropzoneError && <Typography color="error"><small>{dropzoneError}</small></Typography>}
            </div>
        )
    }
}

export default withStyles(styles)(UploadImage);