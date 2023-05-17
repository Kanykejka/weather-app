import conditions from './condition.js'
const keyApi = 'f71c070e94a84c67922150312230304';


const header = document.querySelector('#header');
const form = document.querySelector('#form');
const input = document.querySelector('#input');

function showCard ({name, country, temp, condition, imgPath}) {
    const html = `
                <div class="card">
                    <div class="card-city">${name}</div>
                    <div class="card-country">${country}</div>
                    <div class="card-description">
                        <div class="card-temp">${temp}°c</div> 
                        <img class="card-img" src="${imgPath}" alt="Weather">
                    </div>
                    <div class="card-weather">${condition}</div>
                </div>
    `;

    header.insertAdjacentHTML('afterend', html);
}

function removePrevCard() {
    const prevCard = document.querySelector('.card');
    if(prevCard) prevCard.remove();
} 

form.onsubmit = (event) => {
    event.preventDefault();
    
    let city = input.value;
    const url = `http://api.weatherapi.com/v1/current.json?key=${keyApi}&q=${city}`;

    fetch(url).then((responce) => {
        return responce.json()
    }).then((data) => {
        if(data.error) {
            removePrevCard();
            const html = `<div class="card">${data.error.message}</div>`;
            header.insertAdjacentHTML('afterend', html);
        } else {

            removePrevCard();
    
            const filePath = './img/' + (data.current.is_day ? 'day' : 'night') + '/';
            const fileName = `${data.current.condition.text}` + '.png'
            const imgPath = filePath + fileName; 
            
            const info = conditions.find((el) => {
                return el.code === data.current.condition.code
            })

            console.log(info.languages[23].day_text)
            // console.log(data.location)
            // console.log(data.current.condition)
            
            const weatherData = {
                name: data.location.name,
                country: data.location.country,
                temp: data.current.temp_c,
                condition: data.current.is_day
                    ? info.languages[23].day_text
                    : info.languages[23].night_text,
                imgPath: imgPath,

            }
    
            showCard(weatherData);
        }
        // console.log(data)

    })
}

console.log(conditions)



