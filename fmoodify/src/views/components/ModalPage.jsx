import React, { useState } from 'react';
import '../../styles/modalPage.css';
import icon1 from '../../assets/profilePics/Man1.png';
import icon2 from '../../assets/profilePics/Man2.png';
import icon3 from '../../assets/profilePics/Man3.png';
import icon4 from '../../assets/profilePics/man4.png';
import icon5 from '../../assets/profilePics/woman1.png';
import icon6 from '../../assets/profilePics/woman2.png';
import icon7 from '../../assets/profilePics/woman3.png';
import icon8 from '../../assets/profilePics/woman4.png';

const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8];

export default function ModalPage({ onClose, onSelect }) {
  const [selected, setSelected] = useState({
    idProfilePicture: 0,
    profilePicture: undefined
  });

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <p>Select an Image</p>

        <div className="icon-grid">
          {icons.map((icon, index) => (
            <div
              key={index}
              className={`icon-wrapper ${selected.profilePicture === icon ? 'selected' : ''}`}
              onClick={() => setSelected({
                idProfilePicture: index + 1,
                profilePicture: icon
              })}
            >
              <img src={icon} alt={`icon-${index}`} />
            </div>
          ))}
        </div>

        <button
          className="select-button"
          disabled={!selected}
          onClick={() => onSelect(selected)}
        >
          Select Profile Picture
        </button>
      </div>
    </div>
  );
}
