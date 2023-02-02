getData()
async function getData(){
    const response = await fetch ('/api')
    const data = await response.json()

    console.log(data);


    data.forEach(mood => {
        const mood_container = document.createElement('div')
        mood_container.classList.add('mood')

        let aqiClass
        let aqiText
        //air Quality color
        if (mood.aqi < 51){
            aqiClass = "Good"
            aqiText = "Good"
        } 
        else if (mood.aqi > 50 && (mood.aqi < 101)){
            aqiClass = "Moderate"
            aqiText = "Moderate"
        }
        else if (mood.aqi > 100 && (mood.aqi < 151)){
            aqiClass = "unhealthySensitive"
            aqiText = "unhealthySensitive"
        }
        else if (mood.aqi > 150 && (mood.aqi < 201)){
            aqiClass = "unhealthy"
            aqiText = "unhealthy"
        }
        else if (mood.aqi > 200 && (mood.aqi < 301)){
            aqiClass = "veryunhealthy"
            aqiText = "veryunhealthy"
        }
        else if (mood.aqi > 299 ){
            aqiClass = "hazardous"
            aqiText = "hazardous"
        }

        const template = `
        <img src="${mood.image64}" alt="${mood.mood}"></h2>
        <h2>${mood.mood}</h2>
        <ul>
        <li>Temperature: ${mood.temp}</li>
        <li>${mood.description}</li>
        <li class="aqi ${aqiClass}">Air Quality: ${mood.aqi} - ${aqiText}</li>
        </ul>
        <small>${new Date(mood.timestamp)}</small>
        `

        mood_container.innerHTML = template;
        document.querySelector('.content').appendChild(mood_container);
    })


 
    
    
    
}



