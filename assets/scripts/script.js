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

var mainWeather = function (city) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=cc7ed6f786635293096d197e16858884`;
  console.log(apiUrl);
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var tempMain = data.main.temp;
        $(`.temp0`).empty().append(tempMain);
        // console.log(tempMain);
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
              // console.log(data);
              var uvIndex = data.current.uvi;
              console.log(typeof uvIndex);

              if (uvIndex < 3.00) {
                $(".uvIndex").empty().addClass("uvIndex rounded bg-success").append(uvIndex);
              } else if (uvIndex < 6.00) {
                $(".uvIndex").empty().addClass("uvIndex rounded bg-warning").append(uvIndex);
              } else if (uvIndex < 8.00) {
                $(".uvIndex").empty().addClass("uvIndex rounded").append(uvIndex).attr("style", "background-color: orange");
              } else if (uvIndex < 11.00) {
                $(".uvIndex").empty().addClass("uvIndex rounded bg-danger").append(uvIndex);
              } else {
                $(".uvIndex").empty().addClass("uvIndex rounded").append(uvIndex).attr("style", "background-color: violet");
              }
              var mwicon = data.current.weather[0].icon;
              var iconApi = `http://openweathermap.org/img/wn/${mwicon}@2x.png`;
              // console.log(iconApi);
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

var calledWeather = function (city) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=cc7ed6f786635293096d197e16858884`;

  fetch(apiUrl).then(function (response) {
    // console.log("In fetch of calledWeather");
    if (response.ok) {
      response.json().then(function (data) {
        for (var i = 0; i < 5; i++) {
          // console.log("In loop of calledWeather");
          j = ((8 * i) + 4);
          // console.log("Select the array of weather");
          // console.log(j);
          k = i + 1;
          var wicon = data.list[j].weather[0].icon;
          // console.log("Weather Icon");
          // console.log(wicon);
          var iconApi = '';
          iconApi = `http://openweathermap.org/img/wn/${wicon}@2x.png`;
          $(`.wicon${k}`).attr('src', iconApi);
          var temp = data.list[j].main.temp
          // console.log(temp);
          $(`.temp${k}`).empty().append(temp);
          var wind = data.list[j].wind.speed;
          // console.log(wind);
          $(`.wind${k}`).empty().append(wind);
          var humid = data.list[j].main.humidity;
          // console.log(humid);
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

var defOrLocal = function () {
  console.log(searchHistory);
  if (searchHistory) {
    var city = searchHistory;
    document.getElementById("searchCity").innerHTML = city;
    mainWeather(city);
    calledWeather(city);
    console.log("Search History Exists");
  } else {
    mainWeather("Dallas", "Texas");
    calledWeather("Dallas", "Texas");
    document.getElementById("searchCity").innerHTML = "Dallas";
  }
};

defOrLocal();

var btnArray = [];
//I am storing the array into the local storage, but the array cannot be returned
//because it is not the right type. I have to store a string, and then retrieve the string

//I have clear the local storage, but now I can't seem to put it back together.
var places = function (city) {
  localStorage.setItem('history','');

  // console.log("in places")

  let savedCity = JSON.stringify(city);
  btnArray.push(savedCity);

  // console.log(btnArray);

  localStorage.setItem('history', btnArray);
}

console.log(btnArray);

// var cityBtn = localStorage.setItem('history', btnArray);

const buttonPress = 0;

var postSearch = function () {
  //the purpose of this function is to post the latest search into the next button 
  //The iterator is in the submitsearch button function
  console.log("Button Press");
  console.log(buttonPress);
  
  var cityStoreStr = [];
  var cityHist = JSON.parse(localStorage.getItem('history'));
  console.log(cityHist);

  for (var i = 0; i < cityHist.length; i++) {
    console.log("In first loop of postSearch");
    cityStoreStr.push(cityHist[i]);
  }
  console.log(cityStoreStr);
  for (var i = 0; i < cityStoreStr.length; i++) {
    console.log("In second loop of postSearch");
    var searchIn = cityStoreStr[i];
    console.log(searchIn);
    document.getElementById(`btn${i}`).innerHTML = "";
    document.getElementById(`btn${i}`).innerHTML = searchIn;
  }
};

//I need an iterator to cycle through the button clicks so that the names will be added to the buttons. Can I get one working?

$("#searchSubmit").click(function () {
  //sets the weather dashboard
  var searchIn = $("#searchCityState").val();

  // console.log(searchIn);

  localStorage.setItem("#searchCity", searchIn);
  document.getElementById("searchCity").innerHTML = searchIn;
  mainWeather(searchIn);
  calledWeather(searchIn);

  //Setting the places function as a response with the submitsearch function
  places(searchIn);
  buttonPress += 1;
});

$("#btn0").click(postSearch());

$("#btn1").click(function () {
  document.getElementById("searchCity").innerHTML = "El Paso";
  // var city = searchHistory.split(', ');
  // document.getElementById("searchCity").innerHTML = city[0];
  mainWeather("El Paso", "Texas");
  calledWeather("El Paso", "Texas");
});

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
