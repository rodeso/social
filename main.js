// --- Dark Mode Toggle ---
const themeBtn = document.getElementById("toggle-theme");
const root = document.documentElement;

function setTheme(mode) {
  if (mode === "dark") {
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    root.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}

// Init theme from localStorage or system
if (localStorage.getItem("theme")) {
  setTheme(localStorage.getItem("theme"));
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  setTheme("dark");
} else {
  setTheme("light");
}

themeBtn.addEventListener("click", () => {
  if (root.classList.contains("dark")) {
    setTheme("light");
  } else {
    setTheme("dark");
  }
});

// --- Last.fm Now Playing ---
const lastfmUser = "YOUR_LASTFM_USERNAME";
const apiKey = "YOUR_LASTFM_API_KEY"; // get one at https://www.last.fm/api
const nowPlayingDiv = document.getElementById("now-playing");

async function fetchNowPlaying() {
  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${r0dri_5}&api_key=${apiKey}&format=json&limit=1`
    );
    const data = await res.json();
    const track = data.recenttracks.track[0];

    if (!track) {
      nowPlayingDiv.innerHTML = "<p>No recent tracks found.</p>";
      return;
    }

    const isNowPlaying = track["@attr"] && track["@attr"].nowplaying === "true";
    const title = track.name;
    const artist = track.artist["#text"];
    const albumArt = track.image.pop()["#text"];

    nowPlayingDiv.innerHTML = `
      <div class="flex items-center gap-3">
        <img src="${albumArt}" alt="Album art" class="w-12 h-12 rounded shadow" />
        <div class="text-left">
          <p class="text-sm font-semibold">${title}</p>
          <p class="text-xs opacity-70">${artist}</p>
          <p class="text-xs mt-1 ${isNowPlaying ? "text-green-500" : "opacity-50"}">
            ${isNowPlaying ? "▶ Now Playing" : "Last Played"}
          </p>
        </div>
      </div>
    `;
  } catch (err) {
    nowPlayingDiv.innerHTML = "<p class='text-red-500'>Error fetching track.</p>";
    console.error(err);
  }
}

fetchNowPlaying();
