import React, { useState } from "react";
import Navbar from "./components/Navbar";
import DropFileInput from "./components/dropFileInput";
import ModalTakePhoto from "./components/ModalTakePhoto";
import loadingIcon from "../assets/loading.gif";
import Ansiedades from "../assets/temp/Ansiedades.jpeg";
import Blue from "../assets/temp/Blue.jpg";
import TheShade from "../assets/temp/WhoCares.jpeg";
import Chromakopia from "../assets/temp/CHROMAKOPIA.jpeg"
import Qwerty from "../assets/temp/qwerty ii.jpeg"
import OkComputer from "../assets/temp/OK Computer.jpeg"

import "../styles/home.css";

export default function Home() {
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, SetLoading] = useState(false);
    const [recommendations, SetRecommendations] = useState(null);
    const [currentCarruselPage, setCurrentCarruselPage] = useState(0);

    const onFileChange = (file) => {
        console.log(file);
        setImage(URL.createObjectURL(file));
    };

    const onTakePhoto = (photo) => {
        setImage(photo);
    }

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

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
                {
                    title: "Like Him",
                    artist: "Tyler, The Creator",
                    album: "CHROMAKOPIA",
                    image: Chromakopia,
                },
                {
                    title: "A BOUTIQUE FOR YOUR 180 FACE",
                    artist: "Saya Gray",
                    album: "QWERTY II",
                    image: Qwerty,
                },
                {
                    title: "Exit Music",
                    artist: "Radiohead",
                    album: "Ok Computer",
                    image: OkComputer,
                }
            ]);
        }, 3000);
    }

    const handleNewRecommendationbutton = () => {
        setImage(null);
        SetRecommendations(null);
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
                            <h1>You feel Happy</h1>
                            <div className="recommendation-list ">
                                {/*Se utiliza .rec para acceder a cada elemento dentro del arreglo <recommendations>*/}
                                {
                                    recommendations
                                    .slice(currentCarruselPage * 3, currentCarruselPage * 3 + 3)
                                    .map((rec, index) => (
                                        <div key={index} className="recommendation-item">
                                            <div className="recommendation-image">
                                                <img src={rec.image} alt={rec.title} />
                                            </div>
                                            <div className="recommendation-info">
                                                <h2>{truncateText(rec.title, 20)}</h2>
                                                <p>{truncateText(rec.album, 25)}</p>
                                                <p>{truncateText(rec.artist, 20)}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="carrusel-buttons">
                                {/* Se mapea el page con un array para cambiar el currentCarruselPage para saber a qué página moverse con el recommendations.slice */}
                                {[0,1].map((page) => (
                                    <div 
                                        key={page}
                                        className={`carrusel-button ${currentCarruselPage === page ? "active" : ""}`}
                                        onClick={() => setCurrentCarruselPage(page)}
                                    ></div>
                                ))}
                            </div>
                            <div className="button-container">
                                <button className="new-recommendation-button" onClick={handleNewRecommendationbutton}>New Recommendation</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
