import 'animate.css';
import Notiflix from 'notiflix';


console.log(1);



const refs = {
    form: document.querySelector(`.weather__form`),
    ul: document.querySelector(`.weather__list`),
    cityList: document.querySelector(`.city__list`),
    input: document.querySelector(`.weather__input`),
    button: document.querySelector(`.city__button`),
    loader: document.querySelector(`.loader`),

}
let markUp = ``;
refs.input.value = localStorage.getItem(`city`);

// refs.loader.hidden = false;


function addToLocalStorage(city) {
    localStorage.setItem("city", `${city}`);
}

refs.form.addEventListener('submit', onSubmit);
refs.cityList.addEventListener(`click`, onClick);


function onClick(evt) {
    if (evt.target.nodeName !== `BUTTON`) return;
    refs.ul.innerHTML = ``;
    refs.loader.hidden = false;

    const city = evt.target.textContent;
    
    refs.input.value = city;
    
    fetchForecast(city)
        .then(data => {
            refs.loader.hidden = true;
            addToLocalStorage(city);
            markUpWeather(data);
        })
        .catch(console.log);


    
}

function onSubmit(evt) {
    evt.preventDefault();
    
    refs.ul.innerHTML = ``
    const cityName = evt.currentTarget.elements.input.value.trim();
    if (!cityName) {Notiflix.Notify.warning('Enter your city, please.')
        return};
    refs.loader.hidden = false;
    
    fetchForecast(cityName)
        .then(data => {
            refs.loader.hidden = true;
            addToLocalStorage(cityName);
            markUpWeather(data);
        })
        .catch(console.log);
}

function fetchForecast(city) {

    return fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=4ef0639981daea9d7a2bed8d621b5b88`)
    .then(response => {
        if (!response.ok) {
            Notiflix.Notify.warning('We can`t find this city.');
            refs.loader.hidden = true;
            throw new Error(error.message)}
            return response.json()})
    
}



function markUpWeather({name, weather, main,sys}) {
    markUp =`
    <li class='weather__item animate__animated animate__zoomIn'>
        <img class='weather__img' width='150' height='150' src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}" />
            <h1>${name}, ${sys.country}</h1>
            <p class='weather__temp'> ${Math.ceil(main.temp)}℃</p>
            <p><b>Weather:</b> ${weather[0].description}</p>
    </li>`
    refs.ul.innerHTML = markUp;
}


