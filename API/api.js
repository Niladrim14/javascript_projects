document.addEventListener('DOMContentLoaded',()=>{
   const cityinput =document.getElementById("city-input");
   const getweatherbtn =document.getElementById("get-weather-btn");
   const weatherinfo  = document.getElementById("weather-info");
   const citynamed  = document.getElementById("city-name");
   const tempd  = document.getElementById("temperature");
   const desd = document.getElementById("description");
   const errord = document.getElementById("error-message"); 
    const apikey = "7191eb93ab1f495e87559043343e1adc";


      getweatherbtn.addEventListener('click',async ()=>{
        const city = cityinput.value.trim();
        if(!city) return;

        try {
            const weatherdata = await fetchWeather (city);
            displayw (weatherdata);

        } catch (error) {
            errorf();
        }


      });

     async function fetchWeather(city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apikey}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(typeof data);
      console.log("Response", data);
      return data;
    }
      function displayw (data){
        const{name,main,weather}= data;

        citynamed.textContent = name;
        tempd.textContent =`Temparature : ${main.temp}`;
        desd.textContent =`Weather: ${weather[0].description}`;

        
        weatherinfo.classList.remove("hidden");
        errord.classList.add("hidden");

        

      }
      function errorf (){
        weatherinfo.classList.add('hidden');
        errord.classList.remove('hidden');
      }


})