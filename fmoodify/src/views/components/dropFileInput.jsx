import React, { useRef } from "react";
import PropTypes from "prop-types";
import icono from "../../assets/uploadImage.png";
import "../../styles/dropFileInput.css";

const DropFileInput = props => {
    const wrapperRef = useRef(null);
    const onDragEnter = () => wrapperRef.current.classList.add('dragover'); 
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        var fileExtension = newFile.name.split('.').pop().toLowerCase();
        let allowedExtensions = ['jpg', 'jpeg', 'png'];
        if (newFile && allowedExtensions.indexOf(fileExtension) !== -1) {
            props.onFileChange(newFile);
        } else {
            alert("Please upload a valid image file (jpg, jpeg, png)");
        }
    }
    return (
        <>
        <div className="drop-file-input_container">
            <div
                className="drop-file-input"
                ref={wrapperRef}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input_text">
                    <img src={icono} alt="upload" className="upload-icon" />
                    <p>
                        Drag and Drop your files
                        <br />
                        here or Click to browse files
                    </p>
                </div>
                <input type="file" className="drop-file-input_input" accept="image/jpg, image/png" onChange={onFileDrop}/>
            </div>
        </div>
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func,
};

export default DropFileInput;