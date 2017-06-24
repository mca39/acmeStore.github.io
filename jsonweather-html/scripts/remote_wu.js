// Current Location Scripts
$(function () {

	var status = $('#status');

	(function getGeoLocation() {
		status.text('Getting Location...');
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				var lat = position.coords.latitude;
				var long = position.coords.longitude;

				// Call the getData function, send the lat and long
				getData(lat, long);

			});
		} else {
			status.text("Your browser doesn't support Geolocation or it is not enabled!");
		}

	})();

	// Get the data from the wunderground API
	function getData(lat, long) {
		$.ajax({
			url: "http://api.wunderground.com/api/b904d1c0aaaf88a0/geolookup/conditions/q/"+ lat + "," + long + ".json",
			dataType: "jsonp",
			success: function (parsed_json) {
				var location = parsed_json['location']['city'];
				var state = parsed_json['location']['state'];
				var temp_f = parsed_json['current_observation']['temp_f'];
				var curr_summary = parsed_json['current_observation']['weather'];
				var wind_speed = parsed_json['current_observation']['wind_mph'];
				var wind_dir = parsed_json['current_observation']['wind_dir'];
				var feels_like = parsed_json['current_observation']['feelslike_f'];

				$("#currentTemp").html(Math.round(temp_f) + "&#8457");
				$("#cityDisplay").text(location + "," + state);
				$("#summary").text(curr_summary);
				$("#add1").html("Feels Like: " + feels_like + "&#8457");
				$("#add2").text("Wind speed: " + wind_speed + ' mph');
				$("#add3").text("Wind direction: " + wind_dir);

				$("#cover").fadeOut(250);
			}
		});

	}

	// A function for changing a string to TitleCase
	function toTitleCase(str) {
		return str.replace(/\w+/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}
});
