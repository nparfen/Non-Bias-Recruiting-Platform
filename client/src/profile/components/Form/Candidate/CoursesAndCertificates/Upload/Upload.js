import React, { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone';
import loadImage from 'blueimp-load-image';
import axios from "axios";

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import Clear from '@material-ui/icons/Clear';

import upload from '../../../../../assets/upload.svg'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    dropzone: {
        display: "inline-block",
        marginTop: "20px",
    },
    clearUploadedFile: {
        verticalAlign: "bottom",
        width: "24px",
        height: "24px",
        objectFit: "contain",
        zIndex: 3,
        cursor: "pointer",
        marginLeft: "5px",
    },
    fileName: {
        fontSize: "15px",
        fontWeight: "normal"
    },
    fileLink:{
        color: "inherit"
    },
    uploadIcon: {
        width: "24px",
        height: "24px",
        objectFit: "contain",
        marginRight: "5px"
    },
    uploadButton: {
        border: 0,
        paddingLeft: 0,
        paddingRight: 0,
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
});

class Upload extends Component {

    onDropAccepted = (file) => {

        let { setFile, setFileError, setFileLoading, token } = this.props;

        setFileError("");
        setFileLoading(true);

        const loadImageOptions = { canvas: true }
        if( file[0].type === "application/pdf") {
            const formData = new FormData();
            formData.append('file', file[0]);
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
                setFile(fileUrl);
                setFileLoading(false);
            }).catch(function (error) {
                setFileError(error.response.data.message)
            })
        } else {
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
                            setFile(fileUrl);
                            setFileLoading(false);
                        }).catch(function (error) {
                            setFileError(error.response.data.message)
                        })
                    }, file[0].type);
                }, loadImageOptions)
            })
        }
    }
    
    onDropRejected = () => {
        let { setFileError } = this.props;
        setFileError("Maximum file size is 5 MB. Formats: png, jpeg, jpg, pdf.");
    }

    clearImage = () => {
        let { setFileError, setFile } = this.props;
        setFileError("");
        setFile("");
    }

    render() {

        let { file, fileError, fileIsLoading, classes } = this.props

        return (
            <Fragment>
                <Dropzone
                    name="file"
                    onDropAccepted={this.onDropAccepted}
                    onDropRejected={this.onDropRejected}
                    ref={(node) => { this.dropzoneRef = node; }}
                    maxSize={5242880}
                    multiple={false}
                    style={{}}
                    className={classes.dropzone}
                    accept="application/pdf,image/png,image/jpeg"
                >
                    <Button
                        color="secondary" 
                        className={classes.uploadButton} 
                    >
                        {fileIsLoading ? <CircularProgress className={classes.uploadIcon} color="secondary" size={24}/> : <img className={classes.uploadIcon} src={upload} alt="upload" />}
                        {file ? "Replace certificate" : "Upload certificate" }
                    </Button>
                </Dropzone>
                
                {
                    file && <Typography
                        color="secondary" 
                        className={classes.fileName}
                    >
                        <a 
                            className={classes.fileLink}
                            href={file} 
                            target="_blank"
                            rel='noopener noreferrer'
                        >
                            {file.replace('https://storage.googleapis.com/aspire-mvp/','')}
                        </a>
                        {file && !fileIsLoading && <Clear onClick={this.clearImage} color="secondary" className={classes.clearUploadedFile}/>}
                    </Typography>
                }
                {fileError && <Typography color="error"><small>{fileError}</small></Typography>}
            </Fragment>
        )
    }
}

export default withStyles(styles)(Upload);