import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import {
    Label,
    FormGroup,
    FormFeedback,
} from 'reactstrap';
import * as urlUtils from 'utils/urlUtils';

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        resolve(event.target.result);
    };
    reader.onerror = (error) => {
        reject(error);
    };
    reader.readAsDataURL(file);
});

const ImageEditor = (props) => {
    const [path, setPath] = useState('');
    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        setPath(file.path);
        const dataURL = await toBase64(file);
        const image = new Image();
        image.src = dataURL;
        image.onload = () => {
            file.width = Number(image.width);
            file.height = Number(image.height);
            props.onChange([file]);
        };
    }, [props]);

    const getClasses = () => {
        const classes = ['mt-1', 'w-75', 'form-control'];
        if (!props.valid) {
            classes.push('is-invalid');
        }
        return classes.join(' ');
    };

    return (
        <FormGroup>
            <Label>{props.label}</Label>
            <div>
                {props.value.uRL ? (
                <img className="p-1 img img-thumbnail" alt="" src={urlUtils.getWrappedURL(props.value.uRL)} style={{ maxHeight: '200px' }} />
                ) : null}
            </div>
            <Dropzone onDrop={onDrop} multiple={false} invalid={!props.valid}>
                {({ getRootProps, getInputProps }) => (
                    <div className={getClasses()} style={{ height: '8rem' }}
                      {...getRootProps()}>
                        <input {...getInputProps()} accept="image/x-png,image/gif,image/jpeg" />
                        <p>Drag {"'n"} drop an image here, or click to select images</p>
                    </div>
                )}
            </Dropzone>
            {path ? <Label><strong>{(`File: ${path}`)}</strong></Label> : null}
            {!props.valid ? <FormFeedback invalid="true">{props.error}</FormFeedback> : null}
        </FormGroup>
    );
};


ImageEditor.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    valid: PropTypes.bool,
    error: PropTypes.string,
};


export default ImageEditor;
