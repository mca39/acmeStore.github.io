

$('#query').keyup(function() {
	var value = $('#query').val();
	var rExp = new RegExp(value, "i");
	$.getJSON("https://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function(data) {
		console.log(data);
		var output = '<ol>';
		$.each(data.RESULTS, function(key, val) {
			if (val.name.search(rExp) != -1) {
				output += '<li>';
				output += '<a href="https://www.wunderground.com' + val.l + '" title="Results for ' + val.name + '">' + val.name + '</a>';
				output += '</li>';
			}
		});
		output += '</ol>';
		$("#searchResults").html(output);
	});//end getJSON
});

$('#searchResults').on("click", "a", function (evt) {
	evt.preventDefault();
	var index = $(this).index("a"); // what line was clicked?
	console.log('index: ' + index);
	var jsonCity = $(this).text();
	console.log("city: " + jsonCity);
	var query = $(this)[index].href;
	console.log("query: " + query);
	var station = query.split("q", 2);
	console.log('station: ' + station);
	$.ajax({
		url: "https://api.wunderground.com/api/b904d1c0aaaf88a0/geolookup/conditions/" + station + ".json",
		dataType: "jsonp",
		success: function (data) {
			//Data from wunderground API
			//			$('searchResults').hide();
			console.log(data);
			console.log(data[jsonCity]);
			var l = data[jsonCity].l;
			console.log(l);
			getData(l);
		}
	});
});

// Get weather data from wunderground.com
function getData(input) {
	// Get the data from the wunderground API
	$.ajax({
		url: "https://api.wunderground.com/api/b904d1c0aaaf88a0/geolookup/conditions/q/" +
		input + ".json",
		dataType: "jsonp",
		success: function (data) {
			console.log(data);
			var location = data.location.city + ', ' + data.location.state;
			var temp_f = data.current_observation.temp_f;
			console.log('Location is: ' + location);
			console.log('Temp is: ' + temp_f);
			$("#cityDisplay").text(location);
			$("title").html(location + " | Weather Center");
			$("#currentTemp").html(Math.round(temp_f) + '°');
			$("#summary").text(toTitleCase(data.current_observation.icon));
		}
	});
}



// A function for changing a string to TitleCase
function toTitleCase(str) {
	return str.replace(/\w+/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}
