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

  $(".tdate").append(curDate);

  $(".tile1").append(datePlus1);
  $(".tile2").append(datePlus2);
  $(".tile3").append(datePlus3);
  $(".tile4").append(datePlus4);
  $(".tile5").append(datePlus5);

};

weatherboardDates();

var mainWeather = function (city, state) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&units=imperial&appid=cc7ed6f786635293096d197e16858884`;
  console.log(apiUrl);
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var tempMain = data.main.temp;
        $(`.temp0`).empty().append(tempMain);
        console.log(tempMain);
        var wind = data.wind.speed;
        $(".wind0").empty().append(wind);
        var humid = data.main.humidity;
        $(".humid0").empty().append(humid);

        var longitude = data.coord.lon;
        var latitude = data.coord.lat;

        var uvApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=cc7ed6f786635293096d197e16858884`;
        fetch(uvApi).then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              console.log(data);
              var uvIndex = data.current.uvi;
              console.log(uvIndex);
              $(".uvIndex").empty().append(uvIndex);
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

mainWeather("Dallas", "Texas");

var calledWeather = function (city, state) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state}&units=imperial&appid=cc7ed6f786635293096d197e16858884`;

  fetch(apiUrl).then(function (response) {
    console.log("In fetch of calledWeather");
    if (response.ok) {
      response.json().then(function (data) {
        for (var i = 0; i < 5; i++) {
          console.log("In loop of calledWeather");
          j = ((8 * i) + 4);
          console.log("Select the array of weather");
          console.log(j);
          k= i+1;
          console.log(data);
          var wicon = data.list[j].weather[0].icon;
          console.log("Weather Icon");
          console.log(wicon);
          var iconApi = '';
          iconApi = `http://openweathermap.org/img/wn/${wicon}@2x.png`;
          console.log(iconApi);
          $(`.wicon${k}`).attr('src', iconApi);
          var temp = data.list[j].main.temp
          console.log(temp);
          $(`.temp${k}`).empty().append(temp);
          var wind = data.list[j].wind.speed;
          console.log(wind);
          $(`.wind${k}`).empty().append(wind);
          var humid = data.list[j].main.humidity;
          console.log(humid);
          $(`.humid${k}`).empty().append(humid);
        };
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

calledWeather("Dallas", "Texas");

// $(document).click("#searchSubmit", function() {
//   var searchIn = $("#searchCityState").val();
//   console.log(searchIn);
//   localStorage.setItem("#searchCity", searchIn);

//   const searchCity = document.getElementsByClassName("searchCity");
//   document.getElementsByClassName("searchCity").innerHTML = "Houston";
// });

var searchSubmit = function () {
  document.getElementById("searchCity").innerHTML = "Houston";
  console.log("Houston");
};

// $(document).click("#searchSubmit", function() {
//   document.getElementById("searchCity").innerHTML = "Houston";
//   console.log("Houston");
// });

$("#searchSubmit").click(function () {
  var searchIn = $("#searchCityState").val();
  console.log(searchIn);
  var city = searchIn.split(', ');
  console.log(city[0]);
  console.log(city[1]);
  localStorage.setItem("#searchCity", searchIn);
  document.getElementById("searchCity").innerHTML = city[0];
  mainWeather(city[0], city[1]);
  calledWeather(city[0], city[1]);
});

$("#btnDallas").click(function () {
  document.getElementById("searchCity").innerHTML = "Dallas";
  mainWeather("Dallas", "Texas");
  calledWeather("Dallas", "Texas");
});

$("#btnElPaso").click(function () {
  document.getElementById("searchCity").innerHTML = "El Paso";
  mainWeather("El Paso", "Texas");
  calledWeather("El Paso", "Texas");
});

$("#btnAustin").click(function () {
  document.getElementById("searchCity").innerHTML = "Austin";
  mainWeather("Austin", "Texas");
  calledWeather("Austin", "Texas");
});

$("#btnMarfa").click(function () {
  document.getElementById("searchCity").innerHTML = "Marfa";
  mainWeather("Marfa", "Texas");
  calledWeather("Marfa", "Texas");
});

$("#btnCorpus").click(function () {
  document.getElementById("searchCity").innerHTML = "Corpus";
  mainWeather("Corpus Christi", "Texas");
  calledWeather("Corpus Christi", "Texas");
});

//next steps - create the logic to split the city from the state - done
//There is a problem with the click function - it is not clearing
  //If there is a comma and a space, find the space, and delete it and pass the remainder to the city
  //How do I clear out the prior information? 
  //There is error handling on the api call which will reject it if it is not valid.
//Pass the city and the state into the api - Done
//Need to clean-up and display more information on the 5 day forecast
//Make the links clickable - still left to do 
  //to make them clickable, I guess an event listener for these specific locations? (hardcoded to these locations - this shouldn't take too long, then turn it in.
  //It won't have the local storage, but it is good enough for now. 
