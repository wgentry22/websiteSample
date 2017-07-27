$(document).ready(function() {
  var $menu = $("#sidebar-wrapper");

  $(document)
    .on("click", ".js-menu-open", function(evt) {
      $menu.addClass("open");

      return evt.target.tagName === "A";
    })
    .on("click", ".js-menu-close", function(evt) {
      $menu.removeClass("open");

      return evt.target.tagName === "A";
    });

  getWeather();

  function getWeather() {
    $.ajax({
      url : "http://api.wunderground.com/api/4e1fe0d302980707/geolookup/conditions/q/GA/Atlanta.json",
      dataType : "jsonp",
      success : function(parsed_json) {
        var conditions = parsed_json.current_observation.weather;
        loadImage(conditions);
      }
    });
  }

  function getTimeOfDay() {
    var time = new Date();
    var hours = time.getHours();
    var timeOfDay;

    if(hours > 17) {
      timeOfDay = "night";
    } else if (hours > 12) {
      timeOfDay = "afternoon";
    } else {
      timeOfDay = "morning";
    }

    return timeOfDay;
  }

  function loadImage(conditions) {
    var imageSRC = "img/weather/hero-"
    var validConditions = ["clear", "cloudy", "rain", "snow"];
    var timeOfDay = getTimeOfDay();
    conditions = conditions.toLowerCase();

    if (validConditions.indexOf(conditions) == -1) {
      conditions = "cloudy";
    }

    imageSRC = imageSRC + conditions + "-" + timeOfDay + ".jpg";
    $("#intro").css("background-image", "url("+ imageSRC + ")");
  }

});
