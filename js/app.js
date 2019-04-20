var Model = {
    map: null,
    // Create a new blank array for all the markers
    markers: [],
    // map options
    options: {
        center: {lat: 30.0444, lng: 31.2357},
        zoom: 13
    },
    // Create markers on the map
    locations: [
        {
            title: "Sheikh Zayed City",
            location: {lat: 30.044810, lng: 30.977892},
            content: "El-Mehawr Al-Markzy, Giza governorate"
        },
        {
            title: "Giza",
            location:{lat: 30.016525, lng:  31.207540},
            content: "Oula, Giza governorate"
        },
        {
            title: "Al Mansoria",
            location:{lat: 30.135727, lng: 31.069210},
            content: "Imbaba, Giza governorate"
        },
        {
            title: "Ausim",
            location:{lat: 30.116404, lng: 31.136542},
            content: "Madinet Osim, Awsim, Giza governorate"
        },
        {
            title: "Ain Shams",
            location:{lat: 30.128542, lng: 31.326469},
            content: "Qism Ain Shams, Cairo Governorate"
        },
        {
            title: "Dokki",
            location:{lat: 30.039695, lng: 31.205186},
            content: "Ad Doqi, Giza Governorate"
        },
        {
            title: "Agriculture Cairo University",
            location:{lat: 30.017934, lng: 31.207895},
            content: "Inside Cairo Uni, Oula, Giza"
        },
        {
            title: "Giza Pyrmaids",
            location:{lat: 29.980549, lng: 31.138535},
            content: "Al Haram, Giza Governorate"
        },
        {
            title: "Great sphinx of Giza",
            location:{lat: 29.980773, lng: 31.136819},
            content: "Al Haram, Giza Governorate"
        },
        {
            title: "Abou Ghaleb",
            location:{lat: 30.273583, lng: 30.936300},
            content: "Imbaba, Giza Governorate"
        },
        {
            title: "Al Qnater Al Khyriya",
            location:{lat: 30.190280, lng: 31.132363},
            content: "Cairo governorate"
        },
        {
            title: "New Cairo City",
            location:{lat: 30.007720, lng: 31.489513},
            content: "South Investors Area, Cairo Governorate"
        },
        {
            title: "The 5th Settlement",
            location:{lat: 30.004767, lng: 31.427374},
            content: "The 5th Settlement Cairo Governorate"
        },
        {
            title: "Garden City",
            location:{lat: 30.038025, lng: 31.232827},
            content: "Qasr an Nile, Cairo Governorate"
        },
        {
            title: "El Sayeda Zeinab",
            location:{lat: 30.029518, lng: 31.232183},
            content: "El-Sayeda Zainab, Cairo Governorate"
        }
    ]
};

var ViewModel = {
    // Intialize Map function
    initMap: function(){
        map = new google.maps.Map(
            document.getElementById("map"),
            Model.options
            );
        var bounds = new google.maps.LatLngBounds();
        for(i = 0; i<Model.locations.length; i++){
            // Store the postion and location in two variables
            var position = Model.locations[i].location;
            var title = Model.locations[i].title;
            var content = Model.locations[i].content;
            // Create a marker per loop
            var marker = new google.maps.Marker({
                position: position,
                title: title,
                buborek: content,
            });
            // Fill markers empty array with objects of markers
            Model.markers.push(marker);
            // Create an info Window on each marker
            var infoWindow = new google.maps.InfoWindow({
            });
            google.maps.event.addListener(marker, "click", function(){
                infoWindow.setContent(this.buborek)
                infoWindow.open(map, this);
            });
        };
        // Diplay markers on the map
        for(i = 0; i<Model.markers.length; i++){
            Model.markers[i].setMap(map);
            // Extend the map to fit for all markers
            bounds.extend(Model.markers[i].position);
        };
        map.fitBounds(bounds);
    },
    // Processing on the map
    MapProcess: function(){
        // Import Nodes to be used in filtering function
        var ulNodes = document.getElementsByClassName("markers")[0];
        var liNodes = ulNodes.children;
        var notFound = document.getElementById("Not-Found");
        // Variable connected to the search field
        LocTitle =  "";
        // Filtering location search and Markers based on the text input
        this.filtering = function(){
            notFound.style.display = "none";
            var count = 0;
            for(i = 0; i<Model.markers.length; i++){
                if (LocTitle == ""){
                    liNodes[i].style.display = "block";
                    Model.markers[i].setMap(map);
                }
                else if (Model.markers[i].title.includes(LocTitle) == false){
                    liNodes[i].style.display = "none";
                    Model.markers[i].setMap(null);
                    count++;
                }
            };
            if (count == 15){
                notFound.innerHTML = "No location with this name Found";
                notFound.style.display = "block";
            };
            LocTitle = "";
            ViewModel.initMap;
        };
        // Pop up marker details on the map
        this.titleClick = function(data, titleName){
            for(i = 0; i<Model.markers.length; i++){
                if (titleName.target.textContent == Model.markers[i].title){
                    var infoWindow = new google.maps.InfoWindow({
                    });
                    infoWindow.setContent(Model.markers[i].buborek)
                    infoWindow.open(map, Model.markers[i]);
                    break;
                };
            };
        };
    }
};
ko.applyBindings(new ViewModel.MapProcess);
