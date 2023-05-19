const movieTitleInput = document.getElementById('movieTitle');
const movieDesc = document.getElementById('movieDesc');

async function fetchMovie(movieTitle) {
  const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=258a2345`);
  if (response.ok) {
    const movieData = await response.json();
    return movieData;
  } else {
    throw new Error("Error fetching movie data.");
  }
}

function formatMovieData(movieData) {
  const formattedData = `
    <div>
      <strong>${movieData.Title}</strong>
    </div>
    <img src="${movieData.Poster}" alt="" height="400px">
    <div>
    <br>
      <strong>Director:</strong> ${movieData.Director}
    </div>
    <br>
    <div>
      <strong>Rating:</strong> ${movieData.Ratings[0].Value}
    </div>
  `;
  return formattedData;
}

function displayMovieDesc(movieTitle) {
  movieDesc.innerHTML = 'Loading...';
  fetchMovie(movieTitle)
    .then((movieData) => {
      const formattedMovieData = formatMovieData(movieData);
      movieDesc.innerHTML = formattedMovieData;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getMovie() {
  const movieTitle = movieTitleInput.value;
  displayMovieDesc(movieTitle);
}
