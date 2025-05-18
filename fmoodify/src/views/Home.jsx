import React, { useState } from "react";
import Navbar from "./components/Navbar";
import DropFileInput from "./components/dropFileInput";
import ModalTakePhoto from "./components/ModalTakePhoto";
import loadingIcon from "../assets/loading.gif";

import "../styles/home.css";

export default function Home() {
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState(null);
    const [emotionLabel, setEmotionLabel] = useState("");
    const [currentCarruselPage, setCurrentCarruselPage] = useState(0);

    const onFileChange = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result); // base64
        };
        reader.readAsDataURL(file);
    };

    const onTakePhoto = (photo) => {
        setImage(photo);
    }

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    const handleStart = async () => {
        if (!image) return;

        setCurrentCarruselPage(0);
        setImage(null);
        setLoading(true);

        try {

            const res = await fetch("http://localhost:5000/api/recommend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: image })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Error");

            setEmotionLabel(data.emotion);
            setRecommendations(data.songs);

        } catch (err) {

            console.error(err);
            alert("Error generating recommendation: " + err.message);

        } finally { // Se ejecuta siempre, independientemente de si hubo error o no, seteando elementos a falso o null

            setLoading(false);
            setShowModal(false);
            setImage(null);

        }
    };

    const handleNew = () => { //Manejar generar una nueva recomendación "Al darle click a New Recommendation"

        setImage(null);
        setRecommendations(null);
        setEmotionLabel("");
        setCurrentCarruselPage(0);

    };

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
                                    <button onClick={() => setImage(null)} className="cancel-button">Cancel</button>
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
                            <h1>You feel {emotionLabel}</h1>
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
                                <button className="new-recommendation-button" onClick={handleNew}>New Recommendation</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
