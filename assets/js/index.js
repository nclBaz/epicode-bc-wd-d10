function createMovieCard(movie) {
  const card = document.createElement("div")
  card.classList.add("movie-card")

  const cardImg = document.createElement("img")
  cardImg.src = movie.Poster
  cardImg.alt = movie.Title

  const movieInfoDiv = document.createElement("div")
  movieInfoDiv.classList.add("movie-info")

  const h3 = document.createElement("h3")
  h3.textContent = movie.Title

  const yearParagraph = document.createElement("p")
  yearParagraph.textContent = movie.Year

  movieInfoDiv.appendChild(h3)
  movieInfoDiv.appendChild(yearParagraph)

  const detailsLink = document.createElement("a")
  detailsLink.classList.add("details-button")
  detailsLink.href = "movie-details.html?id=" + movie.imdbID
  detailsLink.textContent = "Details"

  card.appendChild(cardImg)
  card.appendChild(movieInfoDiv)
  card.appendChild(detailsLink)

  return card
}

async function loadMovies(title) {
  const apikey = ""
  const response = await fetch("https://www.omdbapi.com/?apikey=" + apikey + "&s=" + title + "&type=movie")
  const responseBody = await response.json()
  if (responseBody.Response === "True") {
    const movies = responseBody.Search
    console.log(movies)

    const container = document.getElementById("resultsContainer")
    container.innerHTML = ""

    for (let index = 0; index < movies.length; index++) {
      const element = movies[index]
      // crea card contenente dati di quel film e aggiungila alla pagina
      const card = createMovieCard(element)
      container.appendChild(card)
    }
  } else {
    console.log("Non ho trovato nulla")
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  await loadMovies("batman")

  const searchBtn = document.getElementById("searchBtn")
  searchBtn.addEventListener("click", async function () {
    const inputField = document.getElementById("searchInput")

    const title = inputField.value
    if (title) await loadMovies(title)
  })
})
