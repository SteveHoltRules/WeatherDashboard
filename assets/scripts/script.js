var getWeather = function () {
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=dallas,texas&units=imperial&appid=cc7ed6f786635293096d197e16858884`;
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

var weatherDashBoard = function () {

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

weatherDashBoard();

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



