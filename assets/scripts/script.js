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

var weatherboardDates = function () {

  var curDate = moment().format('L');
  var datePlus1 = moment().add(1, 'd').format('L');
  var datePlus2 = moment().add(2, 'd').format('L');
  var datePlus3 = moment().add(3, 'd').format('L');
  var datePlus4 = moment().add(4, 'd').format('L');
  var datePlus5 = moment().add(5, 'd').format('L');

  $(".tile1").append(datePlus1);
  $(".tile2").append(datePlus2);
  $(".tile3").append(datePlus3);
  $(".tile4").append(datePlus4);
  $(".tile5").append(datePlus5);

};

weatherboardDates();

var mainWeather = function () {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=dallas,texas&units=imperial&appid=cc7ed6f786635293096d197e16858884`;
  console.log(apiUrl);
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var tempMain = data.main.temp;
        $(".temp").append(tempMain);
        console.log(tempMain);
        var wind = data.wind.speed;
        $(".wind").append(wind);
        var humid = data.main.humidity;
        $(".humid").append(humid);

        var longitude = data.coord.lon;
        var latitude = data.coord.lat;

        var uvApi= `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=cc7ed6f786635293096d197e16858884`;
        fetch(uvApi).then(function(response) {
          if(response.ok) {
            response.json().then(function(data) {
              console.log(data);
              var uvIndex = data.current.uvi;
              console.log(uvIndex);
              $(".uvIndex").append(uvIndex);
            })
          }
        })
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

mainWeather();

var calledWeather = function () {
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=dallas,texas&units=imperial&appid=cc7ed6f786635293096d197e16858884`;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var wicon = data.list[4].weather[0].icon;
        console.log(wicon);
        var iconApi = '';
        iconApi = `http://openweathermap.org/img/wn/${wicon}@2x.png`;
        console.log(iconApi);
        $(".wicon0").attr('src', iconApi);

        var wicon1 = data.list[12].weather[0].icon;
        console.log(wicon1);
        var iconApi1 = '';
        iconApi1 = `http://openweathermap.org/img/wn/${wicon1}@2x.png`;
        console.log(iconApi1);
        $(".wicon1").attr('src', iconApi1);

        var wicon2 = data.list[20].weather[0].icon;
        console.log(wicon2);
        var iconApi2 = '';
        iconApi2 = `http://openweathermap.org/img/wn/${wicon2}@2x.png`;
        console.log(iconApi2);
        $(".wicon2").attr('src', iconApi2);

        var wicon3 = data.list[28].weather[0].icon;
        console.log(wicon3);
        var iconApi3 = '';
        iconApi3 = `http://openweathermap.org/img/wn/${wicon3}@2x.png`;
        console.log(iconApi);
        $(".wicon3").attr('src', iconApi3);

        var wicon4 = data.list[36].weather[0].icon;
        console.log(wicon4);
        var iconApi = '';
        iconApi4 = `http://openweathermap.org/img/wn/${wicon4}@2x.png`;
        console.log(iconApi4);
        $(".wicon4").attr('src', iconApi4);


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

calledWeather();

// $(document).click("#searchSubmit", function() {
//   var searchIn = $("#searchCityState").val();
//   console.log(searchIn);
//   localStorage.setItem("#searchCity", searchIn);

//   const searchCity = document.getElementsByClassName("searchCity");
//   document.getElementsByClassName("searchCity").innerHTML = "Houston";
// });

var searchSubmit = function() {
  document.getElementById("searchCity").innerHTML = "Houston";
  console.log("Houston");
};

// $(document).click("#searchSubmit", function() {
//   document.getElementById("searchCity").innerHTML = "Houston";
//   console.log("Houston");
// });

$(document).click("#searchSubmit", function () {
  var searchIn = $("#searchCityState").val();
  console.log(searchIn);
  localStorage.setItem("#searchCity", searchIn);
  console.log("Houston");
  document.getElementById("searchCity").innerHTML = searchIn;
});

//next steps - create the logic to split the city from the state
  //find the comma or the space, if there is neither, throw an error
  //If there is a comma, find the length, and extract all the text prior to the comma
  //If there is a comma and a space, find the space, and delete it and pass the remainder to the city
  //There is error handling on the api call which will reject it if it is not valid.
//In the header, only display the city name
//Pass the city and the state into the api
