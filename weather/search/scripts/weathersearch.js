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
				output += '<a href="//www.wunderground.com' + val.l + '"title="Results for ' + val.name + '">' + val.name + '</a>';
				output += '</li>';
			}
		});
		output += '</ol>';
		$("#searchResults").html(output);
	}); //end getJSON
}); //end keyup

// Get weather data from wunderground.com
function getData(input) {
	// Get the data from the wunderground API
	$.ajax({
		url: "https://api.wunderground.com/api/b904d1c0aaaf88a0/geolookup/conditions/q/" +
		input + ".json",
		dataType: "jsonp",
		success: function (data) {
			console.log(data);
			var location = data.display_location.full;
			var temp_f = data.current_observation.temp_f;
			console.log('Location is: ' + location);
			console.log('Temp is: ' + temp_f);
			$("#cityDisplay").text(location);
			$("title").html(location + " | Weather Center");
			$("#currentTemp").html(Math.round(temp_f) + '°');
		 $("#summary").text(toTitleCase(data.current_observation.weather));
			$("#high").text(data.forecast.forecastday.high);
			$("#low").text(data.forecast.forecastday.low);
//			$("#high").text('High': + data.current_observation.icon);
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
	//hide search results
	document.getElementById('searchResults').style.display = 'none';
});



// A function for changing a string to TitleCase
function toTitleCase(str) {
	return str.replace(/\w+/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}
