
const deviceLocation={


    getLocation:function(){

        let locationOptions = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 3600000
        }
        navigator.geolocation.getCurrentPosition(
            function (position) {
                deviceLocation.onLocation(position)
            },
            function (error) {
                deviceFunctions.showCurrentState("Location error: " +error)
                return

            },
            locationOptions
        )

    },
    onLocation:function(position){

        let locationInfo={
            "latitude":position.coords.latitude,
            "longitude":position.coords.longitude ,
            "altitude":position.coords.altitude,//null
            "accuracy":position.coords.accuracy,
            "altitudeAccuracy":position.coords.altitudeAccuracy,//null
            "heading":position.coords.heading,//null
            "speed":position.coords.speed,//null
            "timestamp":position.timestamp
        }
        //        $("#latitudeCell").text(locationInfo.latitude)
        //        $("#longitudeCell").text(locationInfo.longitude)
        //        $("#latitudeLabel").text("Latitude")
        //        $("#longitudeLabel").text("Longitude")
        },

    getWeather:function(){
        let latitude=deviceSpeed._lat
        let longitude=deviceSpeed._long
        //        let latitude=Number($("#latitudeCell").text());
        //        let longitude=Number($("#longitudeCell").text());

        let weatherKey="aa928f2867a6ea5b7bd2e4a51dcb7146"
        let queryString =
            'http://api.openweathermap.org/data/2.5/weather?lat='+ latitude + '&lon=' + longitude + '&appid=' + weatherKey + '&units=imperial' //implement protection of max 60 time/minute

        $.getJSON(queryString, function (results) {

            if (results.weather.length) {
                $.getJSON(queryString, function (results) {

                    if (results.weather.length) {

                        let weatherInfo={
                            "description":results.name,
                            "temp":Math.round((results.main.temp-32)/1.8),//F to ºC
                            "wind":results.wind.speed,
                            "humidity":results.main.humidity,
                            "visibility":results.weather[0].main,

                        }
                        $("#nameCell").text(weatherInfo.description)
                        $("#tempCell").text(weatherInfo.temp)
                        $("#windCell").text(weatherInfo.wind)
                        $("#humidityCell").text(weatherInfo.humidity)
                        $("#visibilityCell").text(weatherInfo.visibility)


                        $("#nameLabel").text("Name")
                        $("#tempLabel").text("Temperature")
                        $("#windLabel").text("Wind")
                        $("#humidityLabel").text("Humidity")
                        $("#visibilityLabel").text("Visibility")


                    }
                })
            }
        }).fail(function () {
            deviceFunctions.showCurrentState('code: ' + error.code + ',' +
                                             'message: ' + error.message)
        });   

    },


    getMap:function(){
        let latitude=deviceSpeed._lat
        let longitude=deviceSpeed._long
        //        let latitude=Number($("#latitudeCell").text());
        //        let longitude=Number($("#longitudeCell").text());

        var mapOptions = {
            center: new google.maps.LatLng(0, 0),
            zoom: 1,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };


        map = new google.maps.Map
        (document.getElementById("mapScreen"), mapOptions);


        var latLong = new google.maps.LatLng(latitude, longitude);

        var marker = new google.maps.Marker({
            position: latLong
        });

        marker.setMap(map);
        map.setZoom(15);
        map.setCenter(marker.getPosition());
        try{
            coordinates= {lat: latitude, lng: longitude}
            deviceLocation._routeCoordinates.push(coordinates)
            var routePath = new google.maps.Polyline({
                path: deviceLocation._routeCoordinates,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            routePath.setMap(map);
        }catch(e){alert("error: "+e)}

    },

    _routeCoordinates:[]

    //    watchPosition:function () {
    //
    //        let locationOptions = {
    //            enableHighAccuracy: true,
    //            timeout: 10000
    //        }
    //
    //        return navigator.geolocation.watchPosition(
    //            function (position) {
    //                deviceLocation.onWatch(position)
    //            },
    //            function (error) {
    //                deviceFunctions.showCurrentState("Watch error:" +error)
    //                return
    //
    //            },
    //            locationOptions
    //        )
    //    },
    //
    //    onWatch:function(position){
    //        let latitude=Number($("#latitudeCell").text())
    //        let longitude=Number($("#longitudeCell").text())
    //
    //        let updatedLatitude = position.coords.latitude;
    //        let updatedLongitude = position.coords.longitude;
    //        if (updatedLatitude != latitude && updatedLongitude != longitude) {
    //
    //            let distance=deviceFunctions.getDistance(latitude,longitude,updatedLatitude,updatedLongitude)
    //            this._prevDistance = this._distance
    //            this._prevTime = this._time
    //            deviceFunctions.updateDistance(distance)
    //            this._distance = distance
    //            this._time = new Date()
    //            
    //            $("#latitudeCell").text(updatedLatitude)
    //            $("#longitudeCell").text(updatedLongitude)
    //            
    //            deviceLocation.getWeather()
    //            deviceLocation.getMap()
    //
    //
    //        }

}




//    let mapOptions = {
//    center: new google.maps.LatLng(0, 0),
//    zoom: 1,
//    mapTypeId: google.maps.MapTypeId.ROADMAP
//};
//
//map = new google.maps.Map
//(document.getElementById("mapScreen"), mapOptions);
//
//
//let latLong = new google.maps.LatLng(locationInfo.latitude, locationInfo.longitude);
//
//let marker = new google.maps.Marker({
//    position: latLong
//});
//
//marker.setMap(map);
//map.setZoom(15);
//map.setCenter(marker.getPosition());



//    // Success callback for watching your changing position
//
//    var onMapWatchSuccess = function (position) {
//
//    var updatedLatitude = position.coords.latitude;
//    var updatedLongitude = position.coords.longitude;
//
//    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {
//
//    Latitude = updatedLatitude;
//    Longitude = updatedLongitude;
//
//    getMap(updatedLatitude, updatedLongitude);
//}
//},
//
//    // Error callback
//
//    function onMapError(error) {
//        console.log('code: ' + error.code + '\n' +
//                    'message: ' + error.message + '\n');
//    },
//
//        // Watch your changing position
//
//        function watchMapPosition() {
//
//            return navigator.geolocation.watchPosition
//            (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
//        }


