const searchInput=document.querySelector(".search"),loader=document.querySelector("#loader"),table=document.querySelector("#results"),tbody=document.querySelector("#results tbody"),body=document.querySelector("body"),messageElement=document.querySelector("#poruka");var dataLength=0;searchInput.focus(),loader.style.display="none",table.style.display="none";let debounceTimeout;function clearDebounceTimeout(){debounceTimeout&&(clearTimeout(debounceTimeout),debounceTimeout=null)}searchInput.addEventListener("input",e=>{loader.style.display="block",body.classList.contains("loader-active")||body.classList.add("loader-active");let t=e.target.value;if(""===t){loader.style.display="none",table.style.display="none",body.classList.contains("loader-active")&&body.classList.remove("loader-active");return}messageElement.innerHTML="",clearDebounceTimeout(),debounceTimeout=setTimeout(()=>{let e=`https://api.tvmaze.com/search/shows?q=${t}`;fetch(e).then(e=>e.json()).then(e=>{tbody.innerHTML="",0===(dataLength=e.length)?(table.style.display="none",messageElement.textContent="Nema rezultata"):e.forEach(e=>{let t=document.createElement("tr"),a=document.createElement("td");a.innerText=e.show.name;let l=document.createElement("td");l.innerText=e.show.rating.average;let n=document.createElement("td");n.innerText=e.show.genres;let o=document.createElement("td");o.innerHTML=e.show.summary,t.appendChild(a),t.appendChild(l),t.appendChild(n),t.appendChild(o),tbody.appendChild(t)})}).finally(()=>{loader.style.display="none",dataLength>0&&(table.style.display="table"),body.classList.contains("loader-active")&&body.classList.remove("loader-active")}).catch(e=>{console.error(e)})},600)});