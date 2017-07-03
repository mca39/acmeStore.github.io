var returned;

$('#query').keyup(function () {
	var value = $('#query').val();
	var rExp = new RegExp(value, "i");
	$.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
		console.log(data);
		returned = data;
		var output = '<ol>';
		$.each(data.RESULTS, function (key, val) {
			if (val.name.search(rExp) != -1) {
				output += '<li>';
				output += '<a href="https//www.wunderground.com' + 'onclick="getData('+ val.lat + ', ' + val.lon + ')"' + 'title="Results for ' + val.name + '">' + val.name + '</a>';
				output += '</li>';
			}
		});//end each
		output += '</ol>';
		$("#searchResults").html(output); //send results to page
	}); //end getJSON
}); //end keyup



// Get weather data from wunderground.com
function getData(lat, lon) {
	// Get the data from the wunderground API
	$.ajax({
		url: "https://api.wunderground.com/api/b904d1c0aaaf88a0/geolookup/conditions/q/" + lat + ', ' + lon + ".json",
		dataType: "jsonp",
		success: function (parsed_json) {
			var location = parsed_json['location']['city'];
			var temp_f = parsed_json['current_observation']['temp_f'];
			$("#currentTemp").html(Math.round(temp_f) + '°');
			$("title").html(location + " | Weather Center");
			$("#cityDisplay").text(parsed_json.current_observation.display_location.full);
			$("#summary").text(toTitleCase(location.current_observation.weather));
//			$("#high").text('High: ' + Math.round(data.forecast.forecastday.high) + '°');
//			$("#low").text('Low: ' + Math.round(data.forecast.forecastday.low) + '°');
			$("#cover").fadeOut(250);
		}
	});
}

// Intercept the menu link clicks
$("#searchResults").on("click", "a", function (evt) {
	evt.preventDefault();
	$();
	// With the text value get the needed value from the weather.json file
	var jsonCity = $(this).text(); // Franklin, etc...
	console.log(jsonCity);
	index = $(this).index("a");
	getData(returned.RESULTS[index].name);
//	getData(index.lat, index.lon);
	//hide search results
	document.getElementById('searchResults').style.display = 'none';
});

// A function for changing a string to TitleCase
function toTitleCase(str) {
	return str.replace(/\w+/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}
