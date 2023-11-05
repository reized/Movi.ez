const apiKey = "19735c9a";
const apiEndpoint = "http://www.omdbapi.com/";

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "card";

  const posterCont = document.createElement("div");
  posterCont.className = "poster-cont";

  const poster = document.createElement("img");
  poster.src = movie.Poster;
  poster.title = movie.Title;
  poster.className = "poster";
  posterCont.appendChild(poster);

  const title = document.createElement("h1");
  title.className = "title";
  title.textContent = movie.Title;

  const detail = document.createElement("div");
  detail.className = "detail";

  const ratingCont = document.createElement("div");
  ratingCont.className = "rating-cont";

  const starIcon = document.createElement("img");
  starIcon.src = "img/star.png";

  const rating = document.createElement("p");
  rating.className = "rating";
  rating.textContent = movie.imdbRating;
  ratingCont.appendChild(starIcon);
  ratingCont.appendChild(rating);

  const year = document.createElement("p");
  year.className = "year";
  year.textContent = movie.Year;
  
  detail.appendChild(ratingCont);
  detail.appendChild(year);
  card.appendChild(posterCont);
  card.appendChild(title);
  card.appendChild(detail);
  return card;
}

function fetchPopularMovies() {
  axios
    .get(`${apiEndpoint}?apikey=${apiKey}&s=avengers&type=movie`)
    .then((response) => {
      const popularMovies = response.data.Search.slice(0, 6);
      const movieList = document.querySelector("#list");
      popularMovies.forEach((movie) => {
        const card = createMovieCard(movie);
        movieList.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching popular movies:", error);
    });
}

function OnChangeSearch(searchParam) {
  axios
    .get(`${apiEndpoint}?apikey=${apiKey}&s=${searchParam}&type=movie`)
    .then(function (response) {
      const searchList = document.querySelector("#search-result");
      clearSearchResults();
      if (response.data.Search) {
        response.data.Search.forEach((movie) => {
          const card = createMovieCard(movie);
          searchList.appendChild(card);
        });
        const movieBanner = document.querySelector("#slide");
        const popularMovies = document.querySelector("#category");
        movieBanner.style.display = "none";
        popularMovies.style.display = "none";
        searchList.style.display = "flex";
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function clearSearchResults() {
  const searchList = document.querySelector("#search-result");
  searchList.innerHTML = "";
}

function showSearchResult() {
  clearSearchResults();
  OnChangeSearch(input.value);
}

const input = document.querySelector("#search");
input.addEventListener("blur", function () {
  showSearchResult();
});

fetchPopularMovies();