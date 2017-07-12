//when the document is ready and done loading, call the getData function
$(document).ready(function () {
	getData();
	$('#productWrapper').hide();
});

function getData() {
	$.ajax({
		url: "js/acme.json",
		dataType: "json",
		success: function (data) {
			console.log(data);
			//fill the empty list items in the html with the navigation link names in the JSON Navigation object
			$("#li1").html(data.Navigation.link1);
			$("#li2").html(data.Navigation.link2);
			$("#li3").html(data.Navigation.link3);
			$("#li4").html(data.Navigation.link4);
			$("#li5").html(data.Navigation.link5);
		}
	});
}

// Intercept the menu link clicks
$("#pageNav").on("click", "a", function (evt) {
	// Intercept the menu link clicks
	evt.preventDefault();
	//get the link that was clicked on
	var link = $(this).text();
	console.log(link);

	//hide home page and show the product page
	if (link != 'Home') {
		$('#homepageWrapper').hide();
		$('#productWrapper').show();

	$.ajax({
		url: "js/acme.json",
		dataType: "json",
		success: function (data) {
			console.log(data);
			//find the path to the +product .png
			var picPath=(data[link].path);
			console.log(picPath);
			//insert the product content
			$('#contentTitle').text(data[link].name);
			$("#productImg").html("<img src='" + picPath + "'>");
			$('#description').text(data[link].description);
			$('#madeBy').text(' ' + data[link].manufacturer);
			$('#reviewScores').text(data[link].reviews + '/5 stars');
			$('#price').text('Price: $' + data[link].price);
		}
	});
	}
	else{
		$('#homepageWrapper').show();
		$('#productWrapper').hide();
		$('#contentTitle').text("Welcome to Acme!");

	}
});
