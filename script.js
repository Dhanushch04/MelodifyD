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
    "songs/KungFuKumaari.mp3",
    "songs/Laychalo.mp3",
    "songs/Bruce Lee.mp3"
];

let currentSongIndex = 0;

// Function to update the song display correctly
function updateSongInfo() {
    let songPath = songs[currentSongIndex];
    songName.textContent = songPath.substring(songPath.lastIndexOf("/") + 1, songPath.lastIndexOf("."));
}

// Function to play or pause the song correctly
function playPause() {
    if (!audio.src || audio.src === "") {
        console.log("No audio source loaded");
        return;
    }

    if (audio.paused || audio.ended) {
        audio.play().catch(error => console.log("Playback error:", error)); // Catch any playback errors
        playPauseBtn.textContent = "Pause";
    } else {
        audio.pause();
        playPauseBtn.textContent = "Play";
    }
}


// Function to switch to the next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(true);
}

// Function to switch to the previous song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(true);
}

// Function to load a song and play it
function loadSong(autoPlay = false) {
    audio.src = songs[currentSongIndex];
    audio.load();
    updateSongInfo();

    if (autoPlay) {
        audio.play();
        playPauseBtn.textContent = "Pause";
    } else {
        playPauseBtn.textContent = "Play";
    }
}

// Event listeners for button clicks
playPauseBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Reset button to "Play" when the song ends
audio.addEventListener("ended", () => {
    console.log("Audio ended event triggered"); // Debugging
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
function loadSong(autoPlay = false) {
    audio.src = songs[currentSongIndex];
    audio.load();  // Ensure the new source is properly loaded

    audio.onloadeddata = () => {  // Ensure audio is ready before playing
        updateSongInfo();
        if (autoPlay) {
            audio.play();
            playPauseBtn.textContent = "Pause";
        } else {
            playPauseBtn.textContent = "Play";
        }
    };
}
