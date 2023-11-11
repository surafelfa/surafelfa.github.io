const
wrapper = document.querySelector('.wrapper'),
inputPart = wrapper.querySelector('.input-part'),
infoTxt = inputPart.querySelector('.info-txt'),
inputField = inputPart.querySelector('input'),
locationBtn = inputPart.querySelector('button'),
wIcon = document.querySelector(".weather-part img"),
arrowBack = wrapper.querySelector('header i'),
apikey = ''

inputField.addEventListener('keyup', event=>{
    if(event.key == "Enter" && inputField.value != "")
    {
        requestApi(inputField.value);
    }
})

function onSuccess(position){
    const {latitude, longitude} = position.coords;

    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`
    fetchData(api)
}
function onError(error){
    infoTxt.textContent = error.message;
    infoTxt.classList.add('error')
}

locationBtn.addEventListener('click', ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }else{
        alert('Your browser not support geolocation api')
    }
})

function requestApi(city)
{
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    fetchData(api)
}

function fetchData(api){
    infoTxt.textContent = 'Getting weather details....'
    infoTxt.classList.add('pending');

    fetch(api)
    .then(response => response.json())
    .then(result => weatherDetails(result))
}

function weatherDetails(info){
    infoTxt.classList.replace('pending', 'error')
    if(info.cod == "404"){
        infoTxt.textContent = `${inputField.value} is not a valid city name`
    }else{

        const 
        city = info.name,
        country = info.sys.country,
        {description, id} = info.weather[0],
        {feels_like, humidity, temp} = info.main
        
        if(id == 800){
            wIcon.src = 'icons/clear.png'
        }
        else if(id >= 200 && id<= 232){
            wIcon.src = 'icons/storm.png'
        }
        else if(id >= 600 && id<= 622){
            wIcon.src = 'icons/snow.png'
        }
        else if(id >= 701 && id<= 781){
            wIcon.src = 'icons/haze.png'
        }
        else if(id >= 801 && id<= 804){
            wIcon.src = 'icons/cloud.png'
        }
        else if((id >= 300 && id<= 321) || id>= 500 && id<= 531){
            wIcon.src = 'icons/rain.png'
        }



        wrapper.querySelector('.temp .numb').textContent = Math.floor(temp);
        wrapper.querySelector('.weather').textContent = description;
        wrapper.querySelector('.location span').textContent = `${city}, ${country}`;
        wrapper.querySelector('.temp .numb-2').textContent = Math.floor(feels_like);
        wrapper.querySelector('.humidity span').textContent = `${humidity}%`;
        infoTxt.classList.remove('pending', 'error')
        wrapper.classList.add('active')
    }
}
arrowBack.addEventListener('click', ()=>{
    wrapper.classList.remove('active')
})