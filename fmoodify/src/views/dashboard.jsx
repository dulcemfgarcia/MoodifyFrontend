import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import WeekChart from "./components/WeekChart"
import "../styles/dashboard.css"
import Happy from "../assets/profilePics/Man1.png"
import Sad from "../assets/profilePics/Man2.png"
import Angry from "../assets/profilePics/Man3.png"
import Confused from "../assets/profilePics/man4.png"
import Disgusted from "../assets/profilePics/woman1.png"
import Surprised from "../assets/profilePics/woman2.png"
import Calm from "../assets/profilePics/woman3.png"
import Unknown from "../assets/profilePics/woman4.png"
import Fear from "../assets/profilePics/Man1.png"
import Negative from "../assets/Negative.png"
import Positive from "../assets/Positive.png"


export default function Dashboard() {
    const [loading, SetLoading] = useState(true);
    const [currentCarruselPage, setCurrentCarruselPage] = useState(0);

    const backendEmotion = [
        { emotion: "Happy", analisys: 10, image: Happy },
        { emotion: "Sad",  analisys: 8, image: Sad },
        { emotion: "Angry", analisys: 6, image: Angry },
        { emotion: "Confused", analisys: 5, image: Confused },
        { emotion: "Disgusted", analisys: 5, image: Disgusted },
        { emotion: "Surprised", analisys: 4, image: Surprised },
        { emotion: "Calm", analisys: 4, image: Calm },
        { emotion: "Unknown", analisys: 1, image: Unknown },
        { emotion: "Fear", analisys: 1, image: Fear },
    ];

    const week = [
        { day: "Monday", value: 15 },
        { day: "Tuesday", value: 8 },
        { day: "Wednesday", value: 5 },
        { day: "Thursday", value: 3 },
        { day: "Friday", value: 9 }
    ];

    const compareFeelings = [
        { feeling: 1, description: "Positive Feelings", quantity: 15 },
        { feeling: 2, description: "Negative Feelings", quantity: 6 }
    ];


    useEffect(() => {
        SetLoading(false);
    }, []);

    return (
        <>
        <div className="dashoard-container">
            <Navbar />
            <div className="dashboard-content">
                {loading ? 
                    <h1>Cargando...</h1>
                :
                <>
                    {currentCarruselPage === 0 ?
                        <>
                        <h1>Feelings this week</h1>
                        <div className="grid-container">
                            {backendEmotion.map((emotion , index) => (
                                <div key={index} className="grid-item">
                                    <div className="image-container">
                                        <img src={emotion.image} alt={emotion.emotion} />
                                        <div className="hover-overlay">
                                            <p>{emotion.analisys}</p>
                                        </div>
                                    </div>
                                    <p>{emotion.emotion}</p>
                                </div>
                            ))
                            }
                        </div>
                        </>
                    : currentCarruselPage === 1 ?
                        <>
                        <h1>Analisys this week</h1>
                        <WeekChart data={week} />
                        </>
                    :
                        <>
                        <h1>Feeling comparison</h1>
                        <div className="compare-feelings-container">
                            {compareFeelings.map((emotion, index) => (
                                <div className="compare-item-container">
                                    <img src={emotion.feeling === 1 ? Positive : Negative} alt={emotion.description} />
                                    <p>{emotion.description}</p>
                                    <p className="emotion-count">{emotion.quantity}</p>
                                </div>
                            ))}
                        </div>
                        </>
                    }
                    
                    <div className="carrusel-buttons">
                        {[0,1,2].map((page) => (
                            <div 
                                key={page}
                                className={`carrusel-button ${currentCarruselPage === page ? "active" : ""}`}
                                onClick={() => setCurrentCarruselPage(page)}
                            ></div>
                        ))}
                    </div>
                </> 
                }
            </div>
        </div>
        </>
    );
}