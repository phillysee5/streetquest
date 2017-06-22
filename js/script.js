var visibleclues = [];
//Declare all of our Global variables for the project
var map, marker, infobox, userLocation, directionDisplay, closestMarker, OnScreenMarkers = [];
//Here are our initial 5 markers which we want to show on the screen
//The only thing which our markers definitly need is a lat and a lng
var sandwiches = [];
// console.log(sandwiches);
// sandwiches.push("apples");
// sandwiches.push("pears");
// console.log(sandwiches);
var AllMarkers = [
	{
		lat: -41.294166,
		lng: 174.783121,
		title: "Cool Guy",
		description: "This guy is wearing shades, he seems pretty cool",
    icon: "img/8bit-coolguy-icon.png",
    image: "img/8bit-coolguy.jpg",
		speech: "Hey there dude, let me tell you a thing or two. When the chips are down, you've got to keep your COOL.",
		clue: "COOL"
	},
  {
		lat: -41.293132,
		lng: 174.783173,
		title: "Bearded Man",
		description: "You are inexorably drawn to this man's luxurious beard",
    icon: "img/8bit-beardedman-icon.png",
    image: "img/8bit-beardedman.jpg",
		speech: "Ho there stranger, let me tell you a tale. If your beard is both COARSE and thick then you will never fail.",
		clue: "COARSE"
	},
  {
		lat: -41.293755,
		lng: 174.781769,
		title: "Black Mage",
		description: "You get the tingles just looking at this mysterious fellow",
    icon: "img/8bit-blackmage-icon.png",
    image: "img/8bit-blackmage.jpg",
		speech: "When the sun is bright, life is like a flower. But in the darkest hour - remember your POWER.",
		clue: "POWER"
	},
  {
		lat: -41.293100,
		lng: 174.779868,
		title: "Einstein",
		description: "This strange man looks completely out of time and place",
    icon: "img/8bit-einstein-icon.png",
    image: "img/8bit-einstein.jpg",
		speech: "Do you have the TIME by chance? I can never seem to keep track of it - to me it's all relative.",
		clue: "TIME"
	},
  {
		lat: -41.292612,
		lng: 174.779431,
		title: "One Eyed Bandit",
		description: "This rugged woman gives you a piercing one-eyed glance",
    icon: "img/8bit-eyepatch-icon.png",
    image: "img/8bit-eyepatch.png",
		speech: "If it's a fight you want, it's a FIGHT you'll get. The day's not been done till the bloods been let.",
		clue: "FIGHT"
	},
	{
		lat: -41.292519,
		lng: 174.778701,
		title: "Kirby",
		description: "A pink fuzzball gives you a cheerful smile",
		icon: "img/8bit-kirby-icon.png",
		image: "img/8bit-kirby.jpg",
		speech: "I weigh almost nothing. If you want to FLY dear traveller, you'll have to take yourself lightly.",
		clue: "FLY"
	},
	{
		lat: -41.291459,
		lng: 174.777692,
		title: "Old Man",
		description: "There's a mad sparkle in his eye",
		icon: "img/8bit-oldman-icon.png",
		image: "img/8bit-oldman.png",
		speech: "The years they pass, chopped down like grass. I gave all of my teeth for a GLASS and half. Ho ho he he.",
		clue: "GLASS"
	},
	{
		lat: -41.291421,
		lng: 174.776820,
		title: "Pikachu",
		description: "You feel a crackling in the air",
		icon: "img/8bit-pikachu-icon.png",
		image: "img/8bit-pikachu.png",
		speech: "Pika pika pikachu. You know I can say more than my NAME, but I get more of what I want by playing this game.",
		clue: "NAME"
	},
	{
		lat: -41.290532,
		lng: 174.777194,
		title: "Sonic",
		description: "He seems restless",
		icon: "img/8bit-sonic-icon.png",
		image: "img/8bit-sonic.jpg",
		speech: "I've got a real need for speed, even when there's no real need. If you want to go fast like me - take care of your FEET.",
		clue: "FEET"
	},
	{
		lat: -41.290538,
		lng: 174.775826,
		title: "Yao Ming",
		description: "This large man seems amused",
		icon: "img/8bit-yaoming-icon.png",
		image: "img/8bit-yaoming.png",
		speech: "Hello little person, are you reaching for some kind of goal? If you're getting frustrated, have a laugh - because laughter is GOLD.",
		clue: "GOLD"
	},

];
//In this function is where we call everything we want to run when the map loads on the screen
function init(){

	//All of the options for the map
	var mapOptions = {
		//Set where the Map starts
		center:{
			lat: -41.294049,
			lng: 174.783364
		},
		//states what the initial zoom for the map is.
		zoom: 17,
		//Turn off all of the User Interface for the Map
		disableDefaultUI: false,
		//Turn off the ability to zoom with clicks
		disableDoubleClickZoom: false,
		//Turn off the ability to zoom with scroll wheel
		scrollwheel: true,
		//Turn off the ability to drag the map around
		draggable: true,
		//sets the cursor for when we are able to drag
		draggableCursor: "hand",
		//sets the cursor for when we are dragging
		draggingCursor: "hand",
		//set the background colour of the map
		backgroundColor: "grey",
		//sets where on the map we want the UI element to be
		mapTypeControlOptions: {
			position: google.maps.ControlPosition.TOP_CENTER
		},
		//This is the section where we can completly style the map
		//Have a look at the Google Maps API Reference to see everything you can do
		styles: [
			{
				//This is setting the overall style to the whole map
				stylers:[
					{ hue: "#A8CA8D" },
					{ saturation: 0 }
				]
			},
			{
				//Just changing all the roads
		        featureType: "road",
		        elementType: "geometry",
		        stylers: [
		        	{ hue: "#A8CA8D" },
		        	{ lightness: -10 },
		          	{ visibility: "none" }
		        ]
			},
			{
				//Changing all the labels for transits
				featureType: "transit",
				elementType: "labels",
				stylers: [
				]
			},
			{
				//Changing the water colour
				featureType: "water",
				stylers: [
					{ color: "#A8CA8D"}
				]
			},
			{
				//Turning off all of the points of intereset
				featureType: "poi",
				stylers: [
					{visibility: "off"}
				]
			}
		]
	}
	//Telling the map where you want to render it
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	// // This function is for Geoloaction and figures out where the current user is
		// // This function is adding all of our markers onto the page
	addAllMarkers();
	// // This function is toggleing the bounce animation on a marker we place
	// marker.addListener("click", toggleBounce);

	// // This function is for adding the infoboxes to the screen
  // console.log(OnScreenMarkers);
}

//Calls when the window has loaded the run the init function which will show the map
google.maps.event.addDomListener(window, 'load', init);



//Placing all the markers on the map
function addAllMarkers(){
	//Loop over every marker in our array
	for (var i = 0; i < AllMarkers.length; i++) {
		//Create a new instance of google maps Marker
		marker = new google.maps.Marker({
			position:{
				lat: AllMarkers[i].lat,
				lng: AllMarkers[i].lng
			},
			map: map,
			animation: google.maps.Animation.DROP,
			title: AllMarkers[i].title,
			description: AllMarkers[i].description,
      icon: AllMarkers[i].icon,
      image: AllMarkers[i].image,
			speech: AllMarkers[i].speech,
			clue: AllMarkers[i].clue
		})
		//We are creating an array for all the markers that are actually on the screen
		//Push each of those into that array
		OnScreenMarkers.push(marker);
		//Link an infobox to this specific marker
		Allinfobox(marker);
	};
}
//Adding only 1 marker onto the page
function addSingleMaker(){
	marker = new google.maps.Marker({
		position:{
			lat: -41.295005,
			lng: 174.78362
		},
		map: map,
		animation: google.maps.Animation.DROP,
		icon: "images/icon.png",
		title : "Yoobee School of Design",
		description: "Description for Yoobee School of Design"
	})
}
//Toggle on and of the bounce function
function toggleBounce(){
	//Check to see if there is already an animation linked onto that marker
	//If there isnt then add Bounce and if there is then remove Bounce
	if(marker.getAnimation() === null){
		marker.setAnimation(google.maps.Animation.BOUNCE);
	} else {
		marker.setAnimation(null);
	}
}

//The reason we can use the exact same code as above is that we are passing through
// a variable and calling it marker
//This is for all the markers to have infowindows.
//We also check to see if one is already open and if it is then we close it before creating a new one
function Allinfobox(marker){
	if(infobox){
		infobox.close();
	}
	infobox = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, "click", function(){
		infobox.setContent("<div><strong>"+marker.title+"</strong></div><hr>"

			);
    var hudimg = document.getElementById("hudimg");
		var charspeech = document.getElementById("hudtext");
		var clue = marker.clue;
		hudimg.src = marker.image;
		charspeech.innerText = marker.speech;

		if($.inArray(clue, visibleclues) == -1){
		$("#theclues").append("<li>"+clue+"</li>");
		visibleclues.push(clue)
		}
		// if(visibleclues.length > 4){
		// 	append
		console.log(visibleclues);
		// }
		infobox.open(map, marker);
	});
}

//Turning all of the markers on or off
//In the HTML there is a button which has a click event for this function
var toggleMarkerOn = true;
function toggleMarkers(){
	//Loop over all of the markers in the markers (the ones on the screen) array
	for (var i = 0; i < markers.length; i++) {
		//if the global variable is on then turn them all off
		//and if not turn then all on
		if(toggleMarkerOn === true){
			markers[i].setMap(null);
		} else {
			markers[i].setMap(map);
		}
	};
	//Change the global varaible value for the next time the button is clicked
	if(toggleMarkerOn === true){
		toggleMarkerOn = false;
	} else {
		toggleMarkerOn = true;
	}
}

//Find the current location for the user
function FindUser(){
	//navigator is an object in the browser which holds information
	//what we are looking for is geolocation. Not all devices have geolocation so you only want this to work if it does have it
	if(navigator.geolocation){
		//Get the current position of the user
		navigator.geolocation.getCurrentPosition(function(position){
			//Create a new marker on the map at their current position and save that map to the userLocation variable
			userLocation = new google.maps.Marker({
				position:{
					lat: position.coords.latitude,
					lng: position.coords.longitude
				},
				map: map,
				animation: google.maps.Animation.DROP,
				icon: "images/icon.png"
			});

			//Move the map to focus on the current location of the user
			map.panTo(userLocation.position);
			//Find the closest marker to the user
			FindClosestMarker();
			//Show the directions to that marker that the user can walk to
			showDirection(closestMarker.position, "WALKING");
		})
	} else{

	}

}
