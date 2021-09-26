var weatherboardDates = function () {
  var curDate = moment().format("L");
  var datePlus1 = moment().add(1, "d").format("L");
  var datePlus2 = moment().add(2, "d").format("L");
  var datePlus3 = moment().add(3, "d").format("L");
  var datePlus4 = moment().add(4, "d").format("L");
  var datePlus5 = moment().add(5, "d").format("L");

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
  // console.log(apiUrl);
  fetch(apiUrl)
    .then(function (response) {
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
                // console.log(typeof uvIndex);

                if (uvIndex < 3.0) {
                  $(".uvIndex")
                    .empty()
                    .addClass("uvIndex rounded bg-success")
                    .append(uvIndex);
                } else if (uvIndex < 6.0) {
                  $(".uvIndex")
                    .empty()
                    .addClass("uvIndex rounded bg-warning")
                    .append(uvIndex);
                } else if (uvIndex < 8.0) {
                  $(".uvIndex")
                    .empty()
                    .addClass("uvIndex rounded")
                    .append(uvIndex)
                    .attr("style", "background-color: orange");
                } else if (uvIndex < 11.0) {
                  $(".uvIndex")
                    .empty()
                    .addClass("uvIndex rounded bg-danger")
                    .append(uvIndex);
                } else {
                  $(".uvIndex")
                    .empty()
                    .addClass("uvIndex rounded")
                    .append(uvIndex)
                    .attr("style", "background-color: violet");
                }
                var mwicon = data.current.weather[0].icon;
                var iconApi = `http://openweathermap.org/img/wn/${mwicon}@2x.png`;
                // console.log(iconApi);
                $("#mwicon").attr("src", iconApi);
              });
            }
          });
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

  fetch(apiUrl)
    .then(function (response) {
      // console.log("In fetch of calledWeather");
      if (response.ok) {
        response.json().then(function (data) {
          for (var i = 0; i < 5; i++) {
            // console.log("In loop of calledWeather");
            j = 8 * i + 4;
            // console.log("Select the array of weather");
            // console.log(j);
            k = i + 1;
            var wicon = data.list[j].weather[0].icon;
            // console.log("Weather Icon");
            // console.log(wicon);
            var iconApi = "";
            iconApi = `http://openweathermap.org/img/wn/${wicon}@2x.png`;
            $(`.wicon${k}`).attr("src", iconApi);
            var temp = data.list[j].main.temp;
            // console.log(temp);
            $(`.temp${k}`).empty().append(temp);
            var wind = data.list[j].wind.speed;
            // console.log(wind);
            $(`.wind${k}`).empty().append(wind);
            var humid = data.list[j].main.humidity;
            // console.log(humid);
            $(`.humid${k}`).empty().append(humid);
          }
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

var searchHistory = localStorage.getItem("#searchCity");
// console.log(searchHistory);

var defOrLocal = function () {
  // console.log(searchHistory);
  if (searchHistory) {
    var city = searchHistory;
    document.getElementById("searchCity").innerHTML = city;
    mainWeather(city);
    calledWeather(city);
    // console.log("Search History Exists");
  } else {
    mainWeather("Dallas");
    calledWeather("Dallas");
    document.getElementById("searchCity").innerHTML = "Dallas";
  }
};

defOrLocal();

$("#searchSubmit").click(function () {
  //sets the weather dashboard
  var searchIn = $("#searchCityState").val();

  // console.log(searchIn);

  localStorage.setItem("#searchCity", searchIn);
  document.getElementById("searchCity").innerHTML = searchIn;
  mainWeather(searchIn);
  calledWeather(searchIn);

  //Button press is not sending outside the function - functions can either return a value, or call a function,
  //but the iteration is not working inside another function

  if (buttonPress <= 4) {
    buttonPress += 1;
    console.log("buttonPress");
    console.log(buttonPress);
    postSearch(searchIn);
    return buttonPress;
  } else {
    console.log("In greater than 4");
    buttonPress = 0;
    console.log("buttonPress");
    console.log(buttonPress);
    postSearch(searchIn);
    return buttonPress;
  }
});

let buttonPress = -1;
//How do I get the postSearch to run?

var postSearch = function (city) {
  //the purpose of this function is to post the latest search into the next button
  //The iterator is in the submitsearch button function
  console.log("Button Press");
  console.log(buttonPress);
  console.log(`btn${buttonPress}`);
  console.log(city);
  //Now assign search in to the top button up to 5 searches, after 5 start over...
  //This is using the DOM, but not local storage
  document.getElementById(`btn${buttonPress}`).innerHTML = `${city}`;

  //Defining Local Storage

  localStorage.setItem(`history${buttonPress}`, city);
};

$("#btn0").click(function () {
  console.log("In Button 0");

  console.log("City");
  var city = localStorage.getItem("history0");
  if (!city) {
    city = document.getElementById("btn0").innerHTML;
    console.log(city);
    document.getElementById("searchCity").innerHTML = city;
    mainWeather(city);
    calledWeather(city);
  } else {
    console.log(city);
    document.getElementById("searchCity").innerHTML = city;
    mainWeather(city);
    calledWeather(city);
  }
});

$("#btn1").click(function () {
  console.log("In Button 1");

  console.log("City");
  var city = localStorage.getItem("history1");
  if (!city) {
    var defcity = document.getElementById("btn1").innerHTML;
    console.log(defcity);
    document.getElementById("searchCity").innerHTML = defcity;
    mainWeather(defcity);
    calledWeather(defcity);
  } else {
    console.log(city);
    document.getElementById("searchCity").innerHTML = city;
    mainWeather(city);
    calledWeather(city);
  }
});

$("#btn2").click(function () {
  console.log("In Button 2");

  console.log("City");
  var city = localStorage.getItem("history2");
  if (!city) {
    var defcity = document.getElementById("btn2").innerHTML;
    console.log(defcity);
    document.getElementById("searchCity").innerHTML = defcity;
    mainWeather(defcity);
    calledWeather(defcity);
  } else {
    console.log(city);
    document.getElementById("searchCity").innerHTML = city;
    mainWeather(city);
    calledWeather(city);
  }
});

$("#btn3").click(function () {
  console.log("In Button 3");

  console.log("City");
  var city = localStorage.getItem("history3");
  if (!city) {
    var defcity = document.getElementById("btn3").innerHTML;
    console.log(defcity);
    document.getElementById("searchCity").innerHTML = defcity;
    mainWeather(defcity);
    calledWeather(defcity);
  } else {
    console.log(city);
    document.getElementById("searchCity").innerHTML = city;
    mainWeather(city);
    calledWeather(city);
  }
});

$("#btn4").click(function () {
  console.log("In Button 4");

  console.log("City");
  var city = localStorage.getItem("history4");
  if (!city) {
    var defcity = document.getElementById("btn4").innerHTML;
    console.log(defcity);
    document.getElementById("searchCity").innerHTML = defcity;
    mainWeather(defcity);
    calledWeather(defcity);
  } else {
    console.log(city);
    document.getElementById("searchCity").innerHTML = city;
    mainWeather(city);
    calledWeather(city);
  }
});

//When I load the page, how do I set the page based on local storage instead of default values?

// $("#btnCorpus").click(function () {
//   document.getElementById("searchCity").innerHTML = "Corpus";
//   mainWeather("Corpus Christi", "Texas");
//   calledWeather("Corpus Christi", "Texas");
// });

//I want to use cityHist when I am first setting up the page
// var cityHist = JSON.parse(localStorage.getItem("history0"));
