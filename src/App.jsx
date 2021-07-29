/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { songs } from './songs';
import Progress from './components/Progress';
import Controls from './components/Controls';
import './App.css';

function App() {
  // State
  const [songIndex, setSongIndex] = useState(0);
  const [songProgress, setSongProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Destructuring for songs
  const { name, displayName, artist } = songs[songIndex];

  // Refs
  const audioRef = useRef(new Audio(`./assets/music/${name}.mp3`));
  const intervalRef = useRef();
  const isReady = useRef(false);

  // Destructuring for conciseness
  const { duration } = audioRef.current;

  const toPrevSong = () => {
    if (songIndex - 1 < 0) {
      setSongIndex(songs.length - 1);
    } else {
      setSongIndex(songIndex - 1);
    }
  }

  const toNextSong = () => {
    if (songIndex < songs.length - 1) {
      setSongIndex(songIndex + 1)
    } else {
      setSongIndex(0);
    }
  }

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextSong();
      } else {
        setSongProgress(audioRef.current.currentTime);
      }
    }, 1000);
  }

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
  }, []);

  // Handle setup when changing songs
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(`./assets/music/${name}.mp3`);
    setSongProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [songIndex]);

  const handleClick = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    const width = 360;
    const whereClicked = value.clientX;
    const whereStarts = value.target.offsetLeft;
    const clickX = whereClicked - whereStarts;
    audioRef.current.currentTime = (clickX / width) * duration;
    setSongProgress(audioRef.current.currentTime);
  }

  return (
    <div className="player-container">
      {/* Song  */}
      <div className="img-container">
        <img src={`../assets/img/${name}.jpg`} alt="Album Art" />
      </div>
      <h2>{displayName}</h2>
      <h3>{artist}</h3>
      <Progress
        isPlaying={isPlaying} 
        currentTime={songProgress} 
        duration={duration} 
        onClicked={(event) => handleClick(event)} 
        />
      <Controls
        isPlaying={isPlaying}
        onPrevClick={toPrevSong}
        onNextClick={toNextSong}
        onPlayPauseClick={setIsPlaying}
      />
    </div>
  );
}

export default App;
