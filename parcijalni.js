var searchInput = document.querySelector(".search");
var loader = document.querySelector("#loader");
loader.style.display = "none"; // Loader skriven na početku

searchInput.addEventListener("input", (e) => {
  const input = e.target.value;

  // Startaj bez poruke i bez loadera
  const messageElement = document.querySelector("#poruka");
  messageElement.innerHTML = "";
  loader.style.display = "none";

   setTimeout(() => {
    const apiURL = `https://api.tvmaze.com/search/shows?q=${input}`;

    // Pokazi loader animaciju u trenutku pretrage APIa
    loader.style.display = "block";

    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        const tbody = document.querySelector("#results tbody");
        tbody.innerHTML = "";

        if (data.length === 0) {
          // Ako nema rezultata prikazi sljedeću poruku
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

        // Sakri loader kada se prikaže rezultat
        loader.style.display = "none";
      })
      .catch((error) => {
        console.error(error);        
      });
  }, 1000); 
});
