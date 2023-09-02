const API_KEY = `c91b904553ccfdffc0e368c75a0a2cef`;
const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");
// const API = `https://api.openweathermap.org/data/2.5/weather?
// q=${city}&appid=${API_KEY}&units=metric`
// const IMG_URL = `https: //openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
const getWeather = async (city) => {
  weather.innerHTML = `<img id="loading" src="./img/loading.gif" alt="Loading...">`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return showWeather(data);
};

const showWeather = (data) => {
  let today_date = Date().slice(4, 15);
  console.log(today_date);
  let temp_ferh = data.main.temp * (9 / 5) + 32;
  console.log(temp_ferh);
  if (data.cod == "404") {
    weather.innerHTML = `<b> City Not Found <b>`;
    return;
  }
  weather.innerHTML = `
  <div class="W_data">
  <div class="triangle-up"></div>
  <b class="Todays_date">${today_date}</b>
    <div>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    </div>
      <div>
      <h2>${data.name + "," + data.sys.country}</h2>
      <h2>${
        data.main.temp + " &#8451; / "
      }<b class="ferh_temp"> ${temp_ferh} &#8457;</b></h2>
      <h3> ${data.weather[0].main} </h3>
      <h4>Description: ${data.weather[0].description} </h4>
      </div>
      <div>
      <h4>Feels Like:${data.main.feels_like + " &#8451;"}</h4>
      <h4>Temprature Max:${data.main.temp_max + " &#8451;"}</h4>
      <h4>Temprature Min:${data.main.temp_min + " &#8451;"}</h4>
      </div>
      </div>

    `;
};

form.addEventListener("submit", function (event) {
  getWeather(search.value);
  event.preventDefault();
});
