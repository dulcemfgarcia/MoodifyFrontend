import React, { useState } from "react";
import Navbar from "./components/Navbar";
import DropFileInput from "./components/dropFileInput";
import ModalTakePhoto from "./components/ModalTakePhoto";
import loadingIcon from "../assets/loading.gif";
import Ansiedades from "../assets/temp/Ansiedades.jpeg";
import Blue from "../assets/temp/Blue.jpg";
import TheShade from "../assets/temp/WhoCares.jpeg";

import "../styles/home.css";

export default function Home() {
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, SetLoading] = useState(false);
    const [recommendations, SetRecommendations] = useState(null);

    const onFileChange = (file) => {
        console.log(file);
        setImage(URL.createObjectURL(file));
    };

    const onTakePhoto = (photo) => {
        setImage(photo);
    }

    const handleStart = () => {
        setImage(null);
        SetLoading(true);
        setTimeout(() => {
            SetLoading(false);
            SetRecommendations([
                {
                    title: "Ansiedades",
                    artist: "Mora",
                    album: "Metro Boomin Presents Spider Man Across the Spider-Verse",
                    image: Ansiedades,
                },
                {
                    title: "blue",
                    artist: "yung kai",
                    album: "blue",
                    image: Blue,    
                },
                {
                    title: "The Shade",
                    artist: "Rex Orange County",
                    album: "WHO CARES?",
                    image: TheShade,
                },
            ]);
        }, 3000);
    }

    return (
        <>
        <div className="home-container">
            <Navbar />
            <div className="content">
                {(!image && !loading && !recommendations) && (
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
                    <>
                    <div className="image-preview-container">
                        <img src={image} alt="Uploaded" className="uploaded-image" />
                        <div className="buttons">
                            <button onClick={() => setImage(false)} className="cancel-button">Cancel</button>
                            <button onClick={handleStart} className="start-button">Start</button>
                        </div>
                    </div>
                    
                    </>
                )}
                {loading && (
                    <div className="loading-overlay">
                        <img src={loadingIcon} className="loading-image" alt="Loading..."></img>
                        <p>
                            Listening to music isn't like taking pain medicine, but its effect can be just as
                            <br />
                            powerful. Why? Because when you focus on the music, the pain is no longer the
                            <br />
                            focus of your attention.
                        </p>
                    </div>
                )}
                {recommendations && (
                    <div className="recommendations">
                        <h1>Recommendations</h1>
                        <div className="recommendation-list">
                            {recommendations.map((rec, index) => (
                                <div key={index} className="recommendation-item">
                                    <img src={rec.image} alt={rec.title} className="recommendation-image" />
                                    <div className="recommendation-info">
                                        <h2>{rec.title}</h2>
                                        <p>{rec.artist}</p>
                                        <p>{rec.album}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="new-recommendation-button">New Recommendation</button>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}