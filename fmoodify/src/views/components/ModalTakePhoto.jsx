import React, { useRef } from 'react';
import WebCam from 'react-webcam';
import '../../styles/modalTakePhoto.css';

export default function ModalPage({ onClose, onTake }) {
  const webcamRef = useRef(null);

  function takePhoto() {
    const imageSrc = webcamRef.current.getScreenshot();
    onTake(imageSrc);
    onClose();
  }

  const handleOverlayClick = (event) => {
    console.log(event.target.classList);
    if (event.target.classList.contains("modal-overlay-take-photo")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay-take-photo" onClick={handleOverlayClick}>
        <div className="modal-content-take-photo">
            <div className='webcam-container'>
                <WebCam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpg"
                    videoConstraints={{
                        facingMode: "user",
                        width: 980,
                        height: 720,
                    }}
                    className='responsive-webcam'
                />
            </div>
        </div>
        <div className='container-takephoto-button'>
            <button className="takePhoto-button" onClick={takePhoto}></button>
        </div>
    </div>
  );
}
