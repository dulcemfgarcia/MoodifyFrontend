import Navbar from "./components/Navbar";
import "../styles/home.css";

export default function home() {
    return (
        <>
        <div className="home-container">
            <Navbar />
            <div className="content">
                <h1>Listen what you feeling</h1>
                <p>First, take a picture of yourself or upload one from your files
                Then you get music recommendations that match your feelings</p>

                <div className="upload-box">
                <div className="upload-icon">⬆️</div>
                <p>Drag and Drop your files <br /> or Click to browse files</p>
                </div>

                <button className="capture-btn">Take a picture</button>
            </div>
        </div>
        </>
    );
}