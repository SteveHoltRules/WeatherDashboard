var getWeather = function () {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=dallas,texas&units=imperial&appid=cc7ed6f786635293096d197e16858884`;
  console.log(apiUrl);
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        console.log(data.main.feels_like);
      });
    } else {
      alert("Error: IEX quote is not found");
    }
  })
    .catch(function (error) {
      //notice this catch getting changed out to the end of the .then()
      alert("Unable to connect to IEX");
    });
};

getWeather();
