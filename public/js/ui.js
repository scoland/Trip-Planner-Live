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
	var emptyDay = $('.itinerary').html();
	var markerIndexArray = [];
	var itineraryHTML = [emptyDay];
	$('.addPanel').on('click', '.pull-right', function(event){
		var $selected = $(this).prev().find(':selected');
		var selectedVal = $(this).prev().val();
		var markerIndex = markerIndexArray.length;
		var htmlStr = "<div class='itinerary-item'><span class='title'>" + selectedVal + "</span><button class='btn btn-xs btn-danger remove btn-circle elephant' data-markerindex='" + markerIndex + "'>x</button></div>";

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
		var iconToRemove = $(this).data('markerindex');
		markerIndexArray[iconToRemove].setMap(null);
	});

	//adding more days
	$('.day-buttons').on('click', '.add-day', function(event) {
		var curDayNum = Number($(this).prev().text());
		var nextNumDay = curDayNum + 1;
		$(this).before('<button class="btn btn-circle day-btn added-day">' + nextNumDay + '</button>');
		itineraryHTML.push(emptyDay);
	});

	//save current day itinerary, then switch day
	$('.day-buttons').on('click', '.day-btn', function(event) {
		for (var i = 0; i < markerIndexArray.length; i++) {
			markerIndexArray[i].setMap(null);
		}

		var curItineraryIndex = Number($('#day-num').text().split(' ')[1]) - 1;

		itineraryHTML[curItineraryIndex] = $('.itinerary').html();

		var otherDayIndex = Number($(this).text()) - 1;

		var dayString = 'Day ' + $(this).text();
		$('#day-num').text(dayString);

		$('.itinerary').html(itineraryHTML[otherDayIndex]);

		$('.elephant').each(function(index, value) {
			markerIndexArray[value.dataset.markerindex].setMap(window.map);
		});

	});

	$('.remove-day').on('click', function(event) {
		for (var i = 0; i < markerIndexArray.length; i++) {
			markerIndexArray[i].setMap(null);
		}
		if (itineraryHTML.length === 1) {
			$('.itinerary').html(emptyDay);
			return;
		}
		var curDay = Number($('#day-num').text().split(' ')[1]);
		var curItineraryIndex = curDay - 1;

		/* If current day is the last day and we are removing the last day*/
		if (curDay === itineraryHTML.length) {
			$('.day-btn').each(function (index, value) { //remove that numbered button
				if (Number($(this).text()) === curDay) {
					$(this).remove();
				}
			});
			itineraryHTML.pop();
			$('#day-num').text('Day ' + curItineraryIndex);
			$('.itinerary').html(itineraryHTML[itineraryHTML.length - 1]);
			$('.elephant').each(function(index, value) {
				markerIndexArray[value.dataset.markerindex].setMap(window.map);
			});

		} else {  //if removing not the last day

			// Deal with the buttons
			$('.day-btn').each(function (index, value) {
				if (Number($(this).text()) === curDay) {
					$(this).remove();
					// $('.elephant').each(function(index, value) {
					// 	markerIndexArray[value.dataset.markerindex].setMap(window.map);
					// });
				}
				else { //change all buttons after current day which is being removed
					if (Number($('#day-num').text().split(' ')[1]) < (Number($(this).text()))) { //all buttons numbered greater than the one being removed
						$(this).text(Number($(this).text() - 1));
					}
				}
			});

			// Remove the day form the itineraryHTML array
			itineraryHTML.splice(curItineraryIndex,1);
			$('.itinerary').html(itineraryHTML[curItineraryIndex]);
			$('.elephant').each(function(index, value) {
				markerIndexArray[value.dataset.markerindex].setMap(window.map);
			});
		}
		
	});
	


});