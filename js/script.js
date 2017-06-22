var visibleclues = [];
//Declare all of our Global variables for the project
var map, marker, infobox, userLocation, directionDisplay, closestMarker, OnScreenMarkers = [];
//Here are our initial 5 markers which we want to show on the screen
//The only thing which our markers definitly need is a lat and a lng
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
	}

];
//In this function is where we call everything we want to run when the map loads on the screen
function init(){
	var mapOptions = {
		center:{
			lat: -41.294049,
			lng: 174.783364
		},
		zoom: 16,
		disableDefaultUI: true,
		draggableCursor: "hand",
		draggingCursor: "hand",
		backgroundColor: "#64636C",
		styles: [
			{
				stylers:[
					{ hue: "#A8CA8D" },
					{ saturation: 0 }
				]
			},
			{
				featureType: "road",
		    elementType: "geometry",
		    stylers: [
		      { hue: "#A8CA8D" },
		      { lightness: -10 },
		      { visibility: "none" }
		        ]
			},
			{
				featureType: "water",
				stylers: [
					{ color: "#A8CA8D"}
				]
			},
			{
				featureType: "poi",
				stylers: [
					{visibility: "off"}
				]
			}
		]
	}
map = new google.maps.Map(document.getElementById("map"), mapOptions);
	addAllMarkers();
	marker.addListener("click", toggleBounce());
}
google.maps.event.addDomListener(window, 'load', init);


function addAllMarkers(){
	for (var i = 0; i < AllMarkers.length; i++) {
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

		OnScreenMarkers.push(marker);
		Allinfobox(marker);
	};
}

function toggleBounce(){
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


function showDirection(location, mode){
		if(directionDisplay){
		directionDisplay.setMap(null);
	}
	//Create a new instance of DirectionsService
	var directionService = new google.maps.DirectionsService();
	//Create a new instance of DirectionRendere
	//This draws the lines on the map
	//This was also initialised at the top of the page
	directionDisplay = new google.maps.DirectionsRenderer();

	//set what map you want it to show on
	directionDisplay.setMap(map);

	//The DirectionService only needs origin, destination and travelMode, but there are several other options you can add
	directionService.route({
		//What is the starting place (lat/lng)
		origin: userLocation.position,
		//What is the end place (lat/lng)
		destination: {location},
		//How is the user getting there
		travelMode: google.maps.TravelMode[mode],
	}, function(response, status){
		//When it comes back from the server you will get a response and a status
		//you should write a case for all of the different status
		//Have a look at the Google Maps API for all of them

		//If everything is all good
		if(status == "OK"){
			//Show the directions on the map
			directionDisplay.setDirections(response);
		} else if(status == "NOT_FOUND"){
			//If one of the start or end locations werent found

		} else if(status == "ZERO_RESULTS"){
			//If there is no results of how to get to the locations
		}
	});
}
