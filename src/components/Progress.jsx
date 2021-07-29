import React from 'react';
import './Progress.css';

function Progress({ isPlaying, currentTime, duration, onClicked }) {

  // Update progress bar width
  const currentPercentage = (currentTime / duration) * 100;
  // Calculate display for duration
  const durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);
  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`
  }
  // Calculate display for currentTime
  const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime  % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

  return (
    <div className="progress-container" onClick={onClicked}>
            <div className="progress" style={{width: {isPlaying} ? `${currentPercentage}%` : `0%`}}></div>
            <div className="duration-wrapper">
                <span>{`${currentMinutes}:${currentSeconds}`}</span>
                <span>{durationSeconds ? `${durationMinutes}:${durationSeconds}` : `0`}</span>
            </div>
    </div>
  );
}

export default Progress;