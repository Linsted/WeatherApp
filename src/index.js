
const url = `api.openweathermap.org/data/2.5/forecast?appid=4ef0639981daea9d7a2bed8d621b5b88&units=metric&q=kyiv&cnt=1`
import Notiflix from 'notiflix';


console.log(1);


const refs = {
    form: document.querySelector(`.weather__form`),
    ul: document.querySelector(`.weather__list`),
}
let markUp = ``;

refs.form.addEventListener('submit', onSubmit)

function onSubmit(evt) {
    evt.preventDefault()
    refs.ul.innerHTML = ``
    const cityName = evt.currentTarget.elements.input.value.trim();
    if (!cityName) {Notiflix.Notify.warning('Enter your city, please.')
        return
    };

    fetchForecast(cityName)
}

function fetchForecast(city) {

    return fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=4ef0639981daea9d7a2bed8d621b5b88`)
    .then(response => {
            if (!response.ok) {Notiflix.Notify.warning('We can`t find this city')}
            return response.json()})
    .then(data => {markUpWeather(data)})
        .catch(error => {
            console.log(error)
            Notiflix.Notify.warning('Sorry, an error ocured')
        })
}



function markUpWeather({name, weather, main,sys}) {
    markUp =`
    <li class='weather__item'>
        <img class='weather__img' width='150' height='150' src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}" />
            <h1>${name}, ${sys.country}</h1>
            <p class='weather__temp'> ${Math.ceil(main.temp)}℃</p>
            <p><b>Weather:</b> ${weather[0].description}</p>
    </li>`
    refs.ul.innerHTML = markUp;
}


