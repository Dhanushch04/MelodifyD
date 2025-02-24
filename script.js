let playPauseBtn = document.getElementById("playPauseBtn");
let nextBtn = document.getElementById("nextBtn");
let prevBtn = document.getElementById("prevBtn");
let audio = document.getElementById("audio");
let songName = document.getElementById("songName");
let songSearch = document.getElementById("songSearch");
let settingsBtn = document.getElementById("settingsBtn");
let settingsPanel = document.getElementById("settingsPanel");
let volumeControl = document.getElementById("volume");

let songs = [
    "songs/Run.mp3",
    "songs/Ria.mp3",
    "songs/Kung Fu Kumaari.mp3",
    "songs/Laychalo.mp3",
    "songs/Bruce Lee.mp3"
];

let currentSongIndex = 0;

// Function to play or pause the song correctly
function playPause() {
    if (audio.paused || audio.ended) {
        audio.play();
        playPauseBtn.textContent = "Pause";
    } else {
        audio.pause();
        playPauseBtn.textContent = "Play";
    }
}

// Function to switch to the next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong();
}

// Function to switch to the previous song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong();
}

// Function to load a song and play it
function loadSong() {
    audio.src = songs[currentSongIndex];
    audio.load();
    audio.play();
    playPauseBtn.textContent = "Pause"; // Ensure button updates correctly
    songName.textContent = songs[currentSongIndex];
}

// Event listeners for button clicks
playPauseBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Reset button to "Play" when the song ends
audio.addEventListener("ended", () => {
    playPauseBtn.textContent = "Play";
});

// Toggle settings panel
settingsBtn.addEventListener("click", () => {
    settingsPanel.classList.toggle("settings-panel");
});

// Update volume when slider is moved
volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

// Load the first song when the page loads
loadSong();
