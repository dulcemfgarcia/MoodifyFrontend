import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import WeekChart from "./components/WeekChart"
import "../styles/dashboard.css"
import Happy from "../assets/emotionPics/happy.png"
import Sad from "../assets/emotionPics/sad.png"
import Angry from "../assets/emotionPics/angry.png"
import Confused from "../assets/emotionPics/confused.png"
import Disgusted from "../assets/emotionPics/disgusted.png"
import Surprised from "../assets/emotionPics/surprised.png"
import Calm from "../assets/emotionPics/calm.png"
//import Unknown from "../assets/emotionPics/unknown.png"
import Fear from "../assets/emotionPics/fear.png"
import Negative from "../assets/Negative.png"
import Positive from "../assets/Positive.png"


export default function Dashboard() {
    const [loading, SetLoading] = useState(true);
    const [currentCarruselPage, setCurrentCarruselPage] = useState(0);
    const [backendEmotion, setBackendEmotion] = useState([]);
    const [week, setWeek] = useState([]);
    const [compareFeelings, setCompareFeelings] = useState([]);

    const getImageForEmotion = (emotion) => {
        const map = {
            HAPPY: Happy,
            SAD: Sad,
            ANGRY: Angry,
            CONFUSED: Confused,
            DISGUSTED: Disgusted,
            SURPRISED: Surprised,
            CALM: Calm,
            FEAR: Fear
        };

        return map[emotion.toUpperCase()];
    };

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
            const res = await fetch("http://localhost:5000/api/dashboard", {
                headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
            });
            const data = await res.json();
            //Se obtiene la data proviniente del backend y se mapea a los campos emotion, analisys(conteo por emoción) e image
            const mapped = data.emotions.map(e => ({
                emotion: e.emotion,
                analisys: e.count,
                image: getImageForEmotion(e.emotion)
            }));

            setBackendEmotion(mapped);

            //Se ordena week conforme a los días de la semana
            const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            const orderedWeek = data.week
            .map(d => ({ day: d.day, value: d.count }))
            .sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

            setWeek(orderedWeek);

            //Se obtiene la data de comparación de emociones
            setCompareFeelings([
                { feeling: 1, description: "Positive Feelings", quantity: data.comparison.positive },
                { feeling: 2, description: "Negative Feelings", quantity: data.comparison.negative }
            ]);
            } catch (err) {
                console.error(err);
            } finally {
            SetLoading(false);
            }
        };

        fetchDashboard();
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