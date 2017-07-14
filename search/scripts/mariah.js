var returned;
// Build the search results list
$('#query').keyup(function () {
 console.log('Starting Process. Listening for Keyup events');
var value = $('#query').val();
var rExp = new RegExp(value, "i");
$.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
 console.log('Keyup events have begun. Data returned is:');
console.log(data);
returned = data;
var output = '<ol>';
$.each(data.RESULTS, function (key, val) {
if (val.name.search(rExp) != -1) {
output += '<li>';
//output += '<a href="https//www.wunderground.com' + ' onclick="getData('+ val.lat + ', ' + val.lon + '.json)"' + 'title="Results for ' + val.name + '">' + val.name + '</a>';
 output += '<a href="https://www.wunderground.com' +val.l+'"' + ' title="Results for ' + val.name + '">' + val.name + '</a>';
output += '</li>';
}
});//end each
output += '</ol>';
$("#searchResults").html(output); //send results to page
}); //end getJSON
}); //end keyup

// Intercept the menu link clicks
$("#searchResults").on("click", "a", function (evt) {
 evt.preventDefault();
 console.log('A link was clicked. Default action stopped.');
 // With the text value get the needed value from the weather.json file - Not needed for this assessment
// var jsonCity = $(this).text(); // Franklin, etc...
// console.log(jsonCity); Used in menu activity, not needed here
 var index = $(this).index("a");
 console.log('Index clicked is: '+index); // See what you clicked
 console.log('This is the information about the link that was clicked: '+$(this)[index]);
 //getData(returned.RESULTS[index].name);
 //	getData(index.lat, index.lon);
 console.log('Sending the href of the clicked link to the getData function.');
 // Get the query portion of the href by spliting the href on the "q"
 var query = $(this)[index].href.split('q',2);
 console.log('The query is: '+query[1]);
 getData(query);
 //hide search results
 document.getElementById('searchResults').style.display = 'none';
});

// Get weather data from wunderground.com
//function getData(lat, lon) {
function getData(input) {
 console.log('Now in the getData function.');
// Get the data from the wunderground API
$.ajax({
 url: "https://api.wunderground.com/api/b904d1c0aaaf88a0/geolookup/conditions/q/" + input + ".json",
//url: "https://api.wunderground.com/api/b904d1c0aaaf88a0/geolookup/conditions/q/" + lat + ', ' + lon + ".json",
dataType: "jsonp",
success: function (parsed_json) {
 console.log('It worked. Here is the json returned:');
 console.log(parsed_json);
var location = parsed_json['location']['city'];
var temp_f = parsed_json['current_observation']['temp_f'];
$("#currentTemp").html(Math.round(temp_f) + '°');
$("title").html(location + " | Weather Center");
$("#cityDisplay").text(parsed_json.current_observation.display_location.full);
// $("#summary").text(toTitleCase(location.current_observation.weather)); location is wrong, should be parsed_json, see below:
 $("#summary").text(toTitleCase(parsed_json.current_observation.weather));
//			$("#high").text('High: ' + Math.round(data.forecast.forecastday.high) + '°');
//			$("#low").text('Low: ' + Math.round(data.forecast.forecastday.low) + '°');
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
