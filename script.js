const changemodeBtn = document.querySelector(".changemode");

changemodeBtn.addEventListener("click", () => {
  let body = document.body;
  let span = document.querySelector(".changemode span");
  if (body.classList.contains("light")) {
    body.classList.replace("light", "dark");
    span.innerHTML = "Light Mode";
  } else {
    body.classList.replace("dark", "light");
    span.innerHTML = "Dark Mode";
  }
});

let filter = document.querySelector(".filter");

filter.addEventListener("click", () => {
  let filterlist = document.querySelector(".filterlist");
  filterlist.classList.toggle("hidden");
});

let toparrow = document.querySelector(".toparrow");

toparrow.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

let allCountry;

async function fetchCountryData() {
  let res = await fetch(
    "https://backend-projects-bqbd.onrender.com/api.restcountry/v3/all"
  );

  let countryData = await res.json();
  console.log(countryData.results);

  allCountry = countryData.results;

  displayCountry(countryData.results);
}

window.addEventListener("load", fetchCountryData);

let page = 1;
const pageItems = 16;

let totalPage;

function displayCountry(counrty) {
  totalPage = Math.ceil(counrty.length / pageItems);

  let startIndex = (page - 1) * pageItems;
  let endIndex = page * pageItems;
  let newCountry = counrty.slice(startIndex, endIndex);
  let container = document.querySelector(".container");
  container.innerHTML = "";

  newCountry.forEach((element) => {
    let cards = document.createElement("div");
    cards.classList.add("card");

    cards.innerHTML = `<a href="./countryDetails.html?country=${element.name.common}"><img src="${element.flags.png}" alt="loading..."></a>
                <h1>${element.name.common}</h1>
                <p>Population: ${element.population}</span></p>
                <p>Region: <span>${element.region}</span></p>
                <p>Capital:${element.capital}</span></p>`;

    container.appendChild(cards);
  });
}

let search = document.querySelector(".inputdata");
search.addEventListener("input", (e) => {
  console.log(e.target.value);

  let newData = allCountry.filter((element) => {
    return element.name.common
      .toLowerCase()
      .includes(e.target.value.toLowerCase());
  });

  displayCountry(newData);
});

let prevBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");

if (page <= 1) {
  prevBtn.disabled = true;
}

nextBtn.addEventListener("click", () => {
  if (page < totalPage) {
    page++;
    prevBtn.disabled = false;
  }

  if (page >= totalPage) {
    nextBtn.disabled = true;
  }

  displayCountry(allCountry);
  console.log(page);
});

prevBtn.addEventListener("click", () => {
  if (page > 1) {
    page--;
    nextBtn.disabled = false;
  }

  if (page <= 1) {
    prevBtn.disabled = true;
  }

  displayCountry(allCountry);
});

let allRegion = document.querySelectorAll(".region");

allRegion.forEach((list) => {
  list.addEventListener("click", (e) => {
    console.log(e.target.innerHTML.toLowerCase());

    allCountry = allCountry.filter((elements) =>
      elements.region.toLowerCase().includes(e.target.innerHTML.toLowerCase())
    );

   
    displayCountry(allCountry);
  });
});


let allFilterBtn = document.querySelector('.allcountry')

allFilterBtn.addEventListener("click",()=>{
  page = 1
  fetchCountryData()
})