import React from 'react';
import './Controls.css';

function Controls({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick
}) {
  return (
    <div className="player-controls">
      <i className="fas fa-step-backward" title="Previous" onClick={onPrevClick}></i>
      {isPlaying ? (<i className="fas fa-pause-circle main-button" title="Pause" onClick={() => onPlayPauseClick(false)}></i>
      ) : (
        <i className="fas fa-play-circle main-button" title="Play" onClick={() => onPlayPauseClick(true)}></i>
      )}
      <i className="fas fa-step-forward" title="Next" onClick={onNextClick}></i>
    </div>
  )
}

export default Controls;