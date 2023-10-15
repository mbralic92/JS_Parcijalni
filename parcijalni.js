const searchInput = document.querySelector(".search");
const loader = document.querySelector("#loader");
const table = document.querySelector("#results");
const tbody = document.querySelector("#results tbody");
const body = document.querySelector("body");
const messageElement = document.querySelector("#poruka");
var dataLength = 0;
searchInput.focus();

loader.style.display = "none"; // Loader skriven na početku
// Hide the table while the loader is displayed
table.style.display = "none";
let debounceTimeout;

// Function to clear the debounce timeout
function clearDebounceTimeout() {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
    debounceTimeout = null;
  }
}

searchInput.addEventListener("input", (e) => {
  // Pokazi loader animaciju u trenutku pretrage APIa
  loader.style.display = "block";
  // i want background color to change when loader is active to transparent black
  if (!body.classList.contains("loader-active"))
    body.classList.add("loader-active");

  const input = e.target.value;
  if (input === "") {
    // Ako je input prazan, sakrij loader i tablicu
    loader.style.display = "none";
    table.style.display = "none";

    // remove loader active class
    if (body.classList.contains("loader-active"))
      body.classList.remove("loader-active");

    return;
  }

  // Startaj bez poruke i bez loadera
  messageElement.innerHTML = "";

  // Clear the previous debounce timeout, if any
  clearDebounceTimeout();

  debounceTimeout = setTimeout(() => {
    const apiURL = `https://api.tvmaze.com/search/shows?q=${input}`;

    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        tbody.innerHTML = "";
        dataLength = data.length;

        if (dataLength === 0) {
          // Ako nema rezultata prikazi sljedeću poruku
          table.style.display = "none";
          messageElement.textContent = "Nema rezultata";
        } else {
          data.forEach((element) => {

            const row = document.createElement("tr");

            const seriesElement = document.createElement("td");
            seriesElement.innerText = element.show.name;
            const ratingElement = document.createElement("td");
            ratingElement.innerText = element.show.rating.average;
            const genresElement = document.createElement("td");
            genresElement.innerText = element.show.genres;
            const descriptionElement = document.createElement("td");
            descriptionElement.innerHTML = element.show.summary;

            row.appendChild(seriesElement);
            row.appendChild(ratingElement);
            row.appendChild(genresElement);
            row.appendChild(descriptionElement);

            tbody.appendChild(row);
          });
        }
      })
      .finally(() => {
        // Sakri loader kada se prikaže rezultat
        loader.style.display = "none";
        // Show the table
        if (dataLength > 0)
          table.style.display = "table";
        // remove loader active class
        if (body.classList.contains("loader-active"))
          body.classList.remove("loader-active");
      })
      .catch((error) => {
        console.error(error);
      });
  }, 600);
});