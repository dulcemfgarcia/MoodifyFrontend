import Navbar from "./components/Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Happy from "../assets/emotionPics/happy.png";
import Sad from "../assets/emotionPics/sad.png";
import Angry from "../assets/emotionPics/angry.png";
import Confused from "../assets/emotionPics/confused.png";
import Disgusted from "../assets/emotionPics/disgusted.png";
import Surprised from "../assets/emotionPics/surprised.png";
import Calm from "../assets/emotionPics/calm.png";
//import Unknown from "../assets/emotionPics/unknown.png";
import Fear from "../assets/emotionPics/fear.png";

import "../styles/history.css";

const emotions = [
    { name: "Happy", image: Happy },
    { name: "Sad", image: Sad },
    { name: "Angry", image: Angry },
    { name: "Confused", image: Confused },
    { name: "Disgusted", image: Disgusted },
    { name: "Surprised", image: Surprised },
    { name: "Calm", image: Calm },
    { name: "Fear", image: Fear },
  ];


export default function History() {

    const [allData, setAllData] = useState([]);
    const [selectedFeeling, setSelectedFeeling] = useState(null);
    const [currentCarruselPage, setCurrentCarruselPage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            let url = "https://api.moodifyproject.click/api/history";
            if (selectedFeeling) {   //Detectamos si hay una emoción seleccionada y la agregamos a la url
                url += `?feeling=${selectedFeeling}`;
            }

            const res = await fetch(url, 
                {
                    headers: {
                        "Authorization": "Bearer " + sessionStorage.getItem("token")
                    }
                });
            const data = await res.json();
            setAllData(data);
        };

        fetchData();
    }, [selectedFeeling]);
    
    const filteredData = allData;

    return (
        <>
            <div className="history-container">
                <Navbar />
                <div className="emotion-carousel">
                    {
                        emotions
                        .slice(currentCarruselPage * 3, currentCarruselPage * 3 + 3)
                        .map((emotion, index) => (
                            <div
                                key={index}
                                className={`emotion-item ${selectedFeeling === emotion.name ? "active" : ""}`}
                                onClick={() => setSelectedFeeling((prev) => (prev === emotion.name ? null : emotion.name))} //Deseleccionar la emoción y desfiltrar
                            >
                                <img src={emotion.image} alt={emotion.name} />
                                <p>{emotion.name}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="carrusel-buttons">
                    {/* Se mapea el page con un array para cambiar el currentCarruselPage para saber a qué página moverse con el recommendations.slice */}
                    {[0,1,2].map((page) => (
                        <div 
                            key={page}
                            className={`carrusel-button ${currentCarruselPage === page ? "active" : ""}`}
                            onClick={() => setCurrentCarruselPage(page)}
                        ></div>
                    ))}
                </div>

                {filteredData.length > 0 ? (
                    <table className="history-table">
                        <thead>
                            <tr>
                            <th>Feeling</th>
                            <th>Song</th>
                            <th>Artist</th>
                            <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.feeling}</td>
                                <td>{item.song}</td>
                                <td>{item.artist}</td>
                                <td>{item.date}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-history">
                        <p>
                            Oops.<br />
                            It seems like you don't have any recommendations.<br />
                            Make a recommendation and find it here later!
                        </p>
                        <button className="new-recommendation" onClick={() => navigate("/home")}> Get a recommendation </button>
                    </div>
                )}
            </div>
        </>
    );
}
