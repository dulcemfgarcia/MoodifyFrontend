import React, { useState } from "react";
import Navbar from "./components/Navbar";
import DropFileInput from "./components/dropFileInput";
import ModalTakePhoto from "./components/ModalTakePhoto";
import "../styles/home.css";

export default function Home() {
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const onFileChange = (file) => {
        console.log(file);
        setImage(URL.createObjectURL(file));
    };

    const onTakePhoto = (photo) => {
        setImage(photo);
    }

    return (
        <>
        <div className="home-container">
            <Navbar />
            <div className="content">
                {(!image) && (
                    <>
                    <h1>Listen what you feeling</h1>
                    <p>
                        First, take a picture of yourself or upload one from your files
                        <br />
                        Then you get music recommendations that match your feelings
                    </p>
    
                    <DropFileInput onFileChange={(files => onFileChange(files))} />
                    <button className="capture" onClick={() => setShowModal(!showModal)}>Take a picture</button>
                    </>
                )}
                {showModal && (
                    <ModalTakePhoto
                        onClose={() => setShowModal(false)}
                        onTake={onTakePhoto}
                    />
                )}
                {image && (
                    <img src={image} alt="Uploaded" className="uploaded-image" />
                )}
            </div>
        </div>
        </>
    );
}