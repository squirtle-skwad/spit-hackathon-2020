import React,{ useState, useCallback } from 'react';
import PropTypes from 'prop-types';


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

const ImageCustom = (props) => {
    const [uploadedImage,setImage] = useState(props.value)
    const inputStyle = {
        width: 0.1,
        height: 0.1,
        opacity: 0,
        overflow: 'hidden',
        position: 'absolute',
        zIndex: -1,
      };

    const imageStyle = {
        width:props.width||"200px",
        height: props.height||"200px",
        borderRadius: props.radius||"50%"
    }

    const labelStyle =  {
        // fontSize: '1.25em',
        fontWeight: '700',
        color: 'black',
        display: 'inline-block',
        fontFamily: 'sans-serif',
        cursor: 'pointer',
        lineHeight: props.height||'200px' 
      }
    
    

    const borderStyle = {
        border: '2px solid #12B6A6',
        borderRadius: props.radius||'50%',
        textAlign: 'center',
        width:props.width||"200px",
        height:props.height||"200px"
      }

    const onFileLoad = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles.target.files[0];
        const base64EncodedImage = await toBase64(file);
        setImage(base64EncodedImage)
        props.getValue(base64EncodedImage);
    }, [props]);

    
    return ( 
    <div style={borderStyle}>
    {
        (uploadedImage) 
        ?(
        <>
        <img className="p-1 img-fluid" alt="Uploaded" src={uploadedImage} style={imageStyle}></img>
        <input
        onChange={(e) => onFileLoad(e)}
        name={"loaderId"} type="file"
        id={"loaderId"}
        style={inputStyle}
        accept={'image/jpeg,image/png'}
        />
        <label htmlFor={"loaderId"}>{"Edit"}</label>
        </>
        )
        :(
        <>
        <input
        onChange={(e) => onFileLoad(e)}
        name={"loaderId"} type="file"
        id={"loaderId"}
        style={inputStyle}
        accept={'image/jpeg,image/png'}
        />
        <label htmlFor={"loaderId"} style={labelStyle}>{"Choose a file"}</label>
        </>)
    }
    </div>
                   
     );
}

ImageCustom.propTypes = {
    value: PropTypes.string.isRequired,
    getValue: PropTypes.func.isRequired,
    height: PropTypes.string,
    width: PropTypes.string
  };
 
export default ImageCustom;