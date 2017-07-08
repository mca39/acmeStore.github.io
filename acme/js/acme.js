//when the document is ready and done loading, call the getData function
$(document).ready(function(){
	getData();
});

function getData() {
	$.ajax({
		url: "js/acme.json",
		dataType: "json",
		success: function (data) {
			console.log(data);
			//fill the empty list items in the html with the navigation link names in the JSON Navigation object
			$("#li1").text(data.Navigation.link1);
			$("#li2").text(data.Navigation.link2);
			$("#li3").text(data.Navigation.link3);
			$("#li4").text(data.Navigation.link4);
			$("#li5").text(data.Navigation.link5);
		}
	});
}

//// Intercept the menu link clicks
//$("#pageNav").on("click", "a", function () {
//	//get the link (object)that was clicked on
//	var currentPage = ;
//	var linkName =  $(this); //.text();
//	console.log(linkName);
//	//Replace the contents of home
//	$("pageNav").click(function(){
//		if(currentPage = home){
//			//hide content of home
//			$("hero").hide();
//			$("featuredRecipes").hide();
//			$("rocketReviews").hide();
//			//insert info and images for linkName here:
//
//		}
//		else{
////this is for the product image: $(currentPage.name).replaceWith(linkName.name);
//		$(currentPage.name).replaceWith(linkName.name);
//		$(currentPage.path).replaceWith(linkName.path);
//		$(currentPage.description).replaceWith(linkName.description);
//		$(currentPage.manufacturer).replaceWith(linkName.manufacturer);
//		$(currentPage.price).replaceWith(linkName.price);
//		$(currentPage.reviews).replaceWith(linkName.reviews);
//		}
//	});
//});
