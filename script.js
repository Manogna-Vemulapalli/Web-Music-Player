const songs = [
  {
    title: "Nuvvunte Chaley.mp3",
    image: "images/nuvvunte.jpg",
    artist: "Anirudh Ravichander",
    movie: "Andhra King Taluka"
  },
  {
    title: "Ammaye Sannaga.mp3",
    image: "images/ammaye.jpg",
    artist: "Udit Narayan and Kavita Krishnamurthy",
    movie: "Kushi"
  },
  {
    title: "Srimathi Garu.mp3",
    image: "images/srimathi.jpg",
    artist: "Vishal Mishra and Swetha Mohan",
    movie: "Lucky Baskhar"
  },
  {
    title: "Kollagottinadhiro.mp3",
    image: "images/kollagottinadhiro.jpg",
    artist: "Rahul Sipligunj, Mangli, Ramya Behara and Yamini Ghantasala",
    movie: "Hari Hara Veera Mallu"
  },
  {
    title: "Koyila.mp3",
    image: "images/koyila.jpg",
    artist: "Vijay Bulganin",
    movie: "Album Song"
  },
  {
    title: "Monica.mp3",
    image: "images/monica.jpg",
    artist: "Anirudh Ravichander, Subhashini and Asal Kolaar",
    movie: "Coolie"
  },
  {
    title: "RANU BOMBAI KI RANU.mp3",
    image: "images/ranu.jpg",
    artist: "Ramu Rathod and Likhitha",
    movie: "Telugu Folk Song (Album)"
  },
  {
    title: "Sommasilli Pothunnave.mp3",
    image: "images/sommasilli.jpg",
    artist: "Ramu Rathod",
    movie: "Album Song"
  },
  {
    title: "Taara Taara.mp3",
    image: "images/taara.jpg",
    artist: "Lipsika Bhashyam and Adithya Iyengar",
    movie: "Hari Hara Veera Mallu"
  },
  {
    title: "Tujh Mein Rab Dikhta Hai.mp3",
    image: "images/thujMein.jpg",
    artist: "Salim Sulaiman",
    movie: "Rab Ne Bana Di Jodi"
  }
];

const songList = document.getElementById("song-list");
const modal = document.getElementById("song-modal");
const modalAudio = document.getElementById("modal-audio");
const modalTitle = document.getElementById("modal-title");
const modalPlay = document.getElementById("modal-play");
const modalNext = document.getElementById("modal-next");
const modalPrev = document.getElementById("modal-prev");
const modalVolume = document.getElementById("modal-volume");
const closeBtn = document.querySelector(".close");

let currentSongIndex = 0;

// Render song cards (grid)
songs.forEach((songObj, index) => {
  const card = document.createElement("div");
  card.className = "song-card";
  card.innerHTML = `
    <img src="${songObj.image}" alt="${songObj.title}" />
    <div class="song-title">${songObj.title.replace(".mp3", "")}</div>
    <div class="song-movie">${songObj.movie}</div>
  `;
  card.addEventListener("click", () => {
    currentSongIndex = index;
    openModal();
  });
  songList.appendChild(card);
});

function openModal() {
  const songObj = songs[currentSongIndex];
  modalAudio.src = `songs/${songObj.title}`;
  modalTitle.textContent = `Now Playing: ${songObj.title.replace(".mp3", "")}`;

  let img = modal.querySelector(".modal-image");
  if (!img) {
    img = document.createElement("img");
    img.className = "modal-image";
    modalTitle.insertAdjacentElement("beforebegin", img);
  }
  img.src = songObj.image;
  img.alt = songObj.title;

  // Add artist name below modal title
  let artistInfo = modal.querySelector(".modal-artist");
  if (!artistInfo) {
    artistInfo = document.createElement("div");
    artistInfo.className = "modal-artist";
    modalTitle.insertAdjacentElement("afterend", artistInfo);
  }
  artistInfo.textContent = `Artist: ${songObj.artist}`;

  modal.style.display = "block";
  modalAudio.play();
}

modalPlay.addEventListener("click", () => {
  if (modalAudio.paused) {
    modalAudio.play();
  } else {
    modalAudio.pause();
  }
});

modalNext.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  openModal();
});

modalPrev.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  openModal();
});

modalVolume.addEventListener("input", () => {
  modalAudio.volume = modalVolume.value;
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  modalAudio.pause();
});
