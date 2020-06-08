let map;
let marker;
let myLatLng = {lat: 49.2327800, lng: 28.4809700};
let weatherAPI = "https://api.openweathermap.org/data/2.5/weather?lat="+myLatLng.lat+"&lon="+myLatLng.lng+"&lang=ru&appid=0b93cd070c7162d5291e75495a66f000";
let baseWeather;
	getWeather(weatherAPI);
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          zoom: 10,
          styles: [{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}]
        });

        map.addListener('center_changed', function() {
          window.setTimeout(function() {
            map.panTo(marker.getPosition());
          }, 5000);
        });

        marker = new google.maps.Marker({
    		position: myLatLng,
    		map: map,
    		icon:'marker.png',
          	animation: google.maps.Animation.DROP,
    		title: 'Marker'
		});

        marker.addListener('click', function() {
          map.setZoom(15);
          map.setCenter(marker.getPosition());
          if (marker.getAnimation() !== null) {
	          marker.setAnimation(null);
	          map.setZoom(10);
	        } else {
	          marker.setAnimation(google.maps.Animation.BOUNCE);
	       }
        });
        map.addListener('click', function(e) {
        placeMarker(e.latLng, map);
        myLatLng.lat = e.latLng.lat();
        myLatLng.lng = e.latLng.lng();
        var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?lat="+myLatLng.lat+"&lon="+myLatLng.lng+"&lang=ru&appid=0b93cd070c7162d5291e75495a66f000";
        getWeather(weatherAPI);
        });
 		function placeMarker(location) {
        if (marker == null){
            marker = new google.maps.Marker({
            position: myLatLng,
            map: map
          });
          }else {
              marker.setPosition(location);
            }
    	}   
    }

	function getWeather(weatherAPI){
          fetch(weatherAPI)  
		  .then(  
		    function(response) {  
		      if (response.status !== 200) {  
		        console.log('Looks like there was a problem. Status Code: ' + response.status);  
		        return;  
		      }  
		      response.json().then(function(data) {  
		        baseWeather = data;
            	showWeather();
            	console.log(baseWeather);  
		      });  
		    }  
		  )  
		  .catch(function(err) {  
		    console.log('Fetch Error :-S', err);  
		  });
        }
        function showWeather(){
          contentInfo = 
          "<br>"+"    Обране місто : "+"<br>"+baseWeather.name +"<br>"+"<br>"+"  Погода :"+"<br>"+baseWeather.weather[0].description +"<br>"+"<br>"+
          "  Температура : " +"<br>"+ Math.floor(baseWeather.main.temp - 273.15) +" °C"+"<br>"+"<br>";
          document.getElementById('display').innerHTML=contentInfo +"<br>"+'<image src="http://openweathermap.org/img/w/'+baseWeather.weather[0].icon+'.png" hspace="65" height="70" width="70">';
        }
