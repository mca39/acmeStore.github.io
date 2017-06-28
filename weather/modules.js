// Include modules into the html file
// Pathes may need altered depending on site structure
$(function () {
	$("#page-header").load("/weather/modules/header.html");
	$("#page-nav").load("/weather/modules/navigation.html");
	$("#footer-content").load("/weather/modules/footer.html");
});
