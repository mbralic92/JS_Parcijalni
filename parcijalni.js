  var searchInput = document.querySelector(".search");
  searchInput.addEventListener("input", (e) => {
  const input = e.target.value;
    
                  
  const apiURL = `https://api.tvmaze.com/search/shows?q=${input}`;

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {

      const tbody = document.querySelector("#results tbody");
      tbody.innerHTML = "";

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
    })
    .catch((error) => console.error(error));
});