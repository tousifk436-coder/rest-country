let back = document.querySelector('#back')
back.addEventListener('click',()=>{
    window.history.back()
})

let params = new URLSearchParams(document.location.search);
let countryName = params.get("country"); // is the string "Jonathan"
console.log(countryName);

async function fetchCountryData(){
  let res =await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  let data = await res.json()

  console.log(data[0]);
  
}

window.addEventListener('load', fetchCountryData)

 