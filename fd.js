
const movieList = document.getElementById("movieList");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const sortSelect = document.getElementById("sortSelect");
const videoPlayer = document.getElementById("videoPlayer");
const videoTitle = document.getElementById("videoTitle");
const videoDescription = document.getElementById("videoDescription");
const emptyMessage = document.getElementById("emptyMessage");

const movies = Array.from(
    document.querySelectorAll(".movie-item")
);

// Chon phim de phat
function selectMovie(movie) {
    const videoId = movie.dataset.video;
    const title = movie.dataset.title;

    videoPlayer.src =
        "https://www.youtube-nocookie.com/embed/" + videoId;

    videoTitle.textContent = title;
    videoDescription.textContent =
        "Ban dang xem phim " + title + ".";

    document.querySelectorAll(".movie-item").forEach(item => {
        item.classList.remove("active");
    });

    movie.classList.add("active");

    document.getElementById("player").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Tim kiem va sap xep phim
function updateMovies() {
    const keyword = searchInput.value.trim().toLowerCase();
    const sortType = sortSelect.value;

    const filteredMovies = movies.filter(movie => {
        return movie.dataset.title
            .toLowerCase()
            .includes(keyword);
    });

    filteredMovies.sort((a, b) => {
        if (sortType === "views") {
            return Number(b.dataset.views) -
                   Number(a.dataset.views);
        }

        return Number(b.dataset.date) -
               Number(a.dataset.date);
    });

    movieList.replaceChildren();

    filteredMovies.forEach(movie => {
        movieList.appendChild(movie);
    });

    emptyMessage.hidden = filteredMovies.length !== 0;

    const activeMovie = document.querySelector(".movie-item.active");

    if (
        activeMovie &&
        !filteredMovies.includes(activeMovie)
    ) {
        document.querySelectorAll(".movie-item").forEach(item => {
            item.classList.remove("active");
        });
    }
}

// Bam nut tim kiem
searchButton.addEventListener("click", updateMovies);

// Tim kiem khi go phim
searchInput.addEventListener("input", updateMovies);

// Sap xep danh sach
sortSelect.addEventListener("change", updateMovies);

// Bam vao phim trong danh sach
movieList.addEventListener("click", event => {
    const movie = event.target.closest(".movie-item");

    if (movie) {
        selectMovie(movie);
    }
});

// Khoi tao danh sach theo thu tu moi nhat
updateMovies();
