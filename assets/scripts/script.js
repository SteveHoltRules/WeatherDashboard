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
              if(uvIndex < 3) {
                $(".uvIndex").empty().append(uvIndex)
                $(".uvIndex").addClass("rounded bg-success");
              } else if (uvIndex < 6) {
                $(".uvIndex").empty().append(uvIndex)
                $(".uvIndex").addClass("rounded bg-warning");
              } else if (uvIndex < 8) {
                $(".uvIndex").empty().append(uvIndex)
                $(".uvIndex").attr("style", "background-color: orange");
                $(".uvIndex").addClass("rounded");
              } else if (uvIndex < 11) {
                $(".uvIndex").empty().append(uvIndex)
                $(".uvIndex").addClass("rounded bg-danger");
              } else {
                $(".uvIndex").empty().append(uvIndex)
                $(".uvIndex").addClass("rounded");
                $(".uvIndex").attr("style", "background-color: violet");
              }
              var mwicon = data.current.weather[0].icon;
              var iconApi = `http://openweathermap.org/img/wn/${mwicon}@2x.png`;
              console.log(iconApi);
              $("#mwicon").attr('src', iconApi);
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
      alert("Error: Open Weather is not found");
    }
  })
    .catch(function (error) {
      //notice this catch getting changed out to the end of the .then()
      alert("Unable to connect to Open Weather");
    });
};

var searchHistory = localStorage.getItem('#searchCity');
console.log(searchHistory);

var defOrLocal = function(){
  console.log(searchHistory);
  if (searchHistory){
    var city = searchHistory.split(', ');
    document.getElementById("searchCity").innerHTML = city[0];
    mainWeather(city[0], city[1]);
    calledWeather(...city);
    console.log("Search History Exists");
  }else {
    mainWeather("Dallas", "Texas");
    calledWeather("Dallas", "Texas");
    document.getElementById("searchCity").innerHTML = "Dallas";
  }
};

defOrLocal();

// $(document).click("#searchSubmit", function() {
//   var searchIn = $("#searchCityState").val();
//   console.log(searchIn);
//   localStorage.setItem("#searchCity", searchIn);

//   const searchCity = document.getElementsByClassName("searchCity");
//   document.getElementsByClassName("searchCity").innerHTML = "Houston";
// });


// $(document).click("#searchSubmit", function() {
//   document.getElementById("searchCity").innerHTML = "Houston";
//   console.log("Houston");
// });

var arr = []

var places = function () {
  arr.push('city');
}

places()
  localStorage.setItem('history', arr);

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







// $("#btnDallas").click(function () {
//   document.getElementById("searchCity").innerHTML = "Dallas";
//   mainWeather("Dallas", "Texas");
//   calledWeather("Dallas", "Texas");
// });

// $("#btnElPaso").click(function () {
//   document.getElementById("searchCity").innerHTML = "El Paso";
//   mainWeather("El Paso", "Texas");
//   calledWeather("El Paso", "Texas");
// });

// $("#btnAustin").click(function () {
//   document.getElementById("searchCity").innerHTML = "Austin";
//   mainWeather("Austin", "Texas");
//   calledWeather("Austin", "Texas");
// });

// $("#btnMarfa").click(function () {
//   document.getElementById("searchCity").innerHTML = "Marfa";
//   mainWeather("Marfa", "Texas");
//   calledWeather("Marfa", "Texas");
// });

// $("#btnCorpus").click(function () {
//   document.getElementById("searchCity").innerHTML = "Corpus";
//   mainWeather("Corpus Christi", "Texas");
//   calledWeather("Corpus Christi", "Texas");
// });
