document
  .getElementById("weatherSubmit")
  .addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector("body").style.overflowY = "scroll";
    const value = document.getElementById("weatherInput").value;
    if (value === "") return;
    console.log(value);
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      value +
      ",US&units=imperial" +
      "&APPID=da2775a8aa189c2f0d22a5517da65b39";
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        let results = "";
        results += "<h2>Weather in " + json.name + "</h2>";
        for (let i = 0; i < json.weather.length; i++) {
          results +=
            '<img src="https://openweathermap.org/img/w/' +
            json.weather[i].icon +
            '.png"/>';
        }
        results += "<h2>" + json.main.temp + " &deg;F</h2>";
        results += "<p>";
        for (let i = 0; i < json.weather.length; i++) {
          results += json.weather[i].description;
          if (i !== json.weather.length - 1) results += ", ";
        }
        results += "</p>";
        document.getElementById("weatherResults").innerHTML = results;
      });

    const url2 =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      value +
      ",US&units=imperial" +
      "&APPID=da2775a8aa189c2f0d22a5517da65b39";
    fetch(url2)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        let forecast = "";
        for (let i = 0; i < json.list.length; i++) {
          forecast +=
            "<h2>" +
            moment(json.list[i].dt_txt).format("MMMM Do YYYY, h:mm:ss a") +
            "</h2>";
          forecast +=
            "<p>Temperature: " + json.list[i].main.temp + " &deg;F</p>";
          forecast +=
            '<img src="https://openweathermap.org/img/w/' +
            json.list[i].weather[0].icon +
            '.png"/>';
          forecast += "<hr>";
        }
        document.getElementById("forecastResults").innerHTML = forecast;
        document
          .getElementById("forecastResults")
          .classList.add("transparentBackground");
        document
          .getElementById("weatherResults")
          .classList.add("transparentBackground");
      });
  });
