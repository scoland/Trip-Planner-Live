function addMarker(location, opts, markerArray) {
    if (typeof opts !== 'object') {
      opts = {};
    }
    opts.position = new google.maps.LatLng(location[0], location[1]);
    opts.map = window.map;
    var marker = new google.maps.Marker(opts);
    markerArray.push(marker);
 }

 var hotelIconPath = '/images/lodging_0star.png';
 var restaurantIconPath = '/images/restaurant.png';
 var activityIconPath = '/images/star-3.png';


$( document ).ready(function() {
	//adding hotels, restaurants, activities
	var markerIndexArray = [];
	var itineraryHTML = {};
	var emptyDay = $('.itinerary').html();
	$('.addPanel').on('click', '.pull-right', function(event){
		var $selected = $(this).prev().find(':selected');
		var selectedVal = $(this).prev().val();
		var markerIndex = markerIndexArray.length;
		var htmlStr = "<div class='itinerary-item'><span class='title'>" + selectedVal + "</span><button class='btn btn-xs btn-danger remove btn-circle' data-marker-index='" + markerIndex + "'>x</button></div>";

		var iconPath;
		var location;

		if ($(this).hasClass('plusHotel')) {
			$('.hotelList').append(htmlStr);
			iconPath = hotelIconPath;
			location = [$selected.data('lat'), $selected.data('long')];
			addMarker(location, {
				icon: iconPath,
			}, markerIndexArray);
		}
		if ($(this).hasClass('plusRestaurant')) {
			$('.restaurantList').append(htmlStr);
			iconPath = restaurantIconPath;
			location = [$selected.data('lat'), $selected.data('long')];
			addMarker(location, {
				icon: iconPath,
			}, markerIndexArray);
		}
		if ($(this).hasClass('plusActivity')) {
			$('.activityList').append(htmlStr);
			iconPath = activityIconPath;
			location = [$selected.data('lat'), $selected.data('long')];
			addMarker(location, {
				icon: iconPath,
			}, markerIndexArray);
		}

	});
	
	//removing hotels, restaurants, activities
	$('.itinerary').on('click', '.btn-danger', function(event) {
		$(this).parent().remove();
		var iconToRemove = $(this).data('marker-index');
		markerIndexArray[iconToRemove].setMap(null);
	});

	//adding more days
	$('.day-buttons').on('click', '.add-day', function(event) {
		var nextNumDay = Number($(this).prev().text()) + 1;
		$(this).before('<button class="btn btn-circle day-btn added-day">' + nextNumDay + '</button>');
	});

	//save current day itinerary, then switch day
	$('.day-buttons').on('click', '.day-btn', function(event) {
		itineraryHTML[$('#day-num').text()] = $('.itinerary').html();
		var dayString = 'Day ' + $(this).text();
		$('#day-num').text(dayString);
		if (itineraryHTML[dayString]) {
			$('.itinerary').html(itineraryHTML[dayString]);
		} else {
			$('.itinerary').html(emptyDay);
		}
	});
	


});