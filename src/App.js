import React, { Component } from 'react';
import Listings from './Listings.js'
import './App.css';

class App extends Component {

constructor(props) {
  super(props);
  this.state = {
    locations: [
      {name: 'Stadtbibliothek Stuttgart', type: "Bibliothek", lat: 48.790024, lng: 9.182994},
      {name: 'Porsche Arena', type: "Stadium", lat: 48.793226, lng: 9.228262},
      {name: 'Castle Solitude', type: "Castle", lat: 48.790240, lng: 9.084604},
      {name: 'Fernsehturm Stuttgart', type: "Attraction", lat: 48.758434, lng: 9.190020},
      {name: 'Ludwigsburg Palace', type: "Attraction", lat: 48.899407, lng: 9.196029},
    ],
    map: '',
    InfoWindow: ''
    }
    this.initMap = this.initMap.bind(this);
    this.populateInfoWindow = this.populateInfoWindow.bind(this);
  }

  componentDidMount() {
    window.initMap = this.initMap;
    const script = document.createElement('script')
    script.async = true;
    script.defer = true;
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA657C7_s9cl3eWiKQWDeDEVenuQBMfSN0&libraries=places&callback=initMap';
    script.onerror = function() {
      alert('Sorry, Google Maps could not be loaded');
    }

    document.body.appendChild(script);
  }

initMap() {
  var self = this;
    let map;
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 48.826206, lng: 9.183652},
      mapTypeControl: false,
      zoom: 11
    });


    var largeInfowindow = new window.google.maps.InfoWindow({});

    window.google.maps.event.addListener(largeInfowindow, "closeclick", function() {
      self.closeWindow(largeInfowindow);
    });

    this.setState({
      map: map,
      InfoWindow: largeInfowindow
    });

    var locations = [];
      this.state.locations.forEach(function(location) {
      var id = location.name;
      var marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(location.lat, location.lng),
        latitude: location.lat,
        longitude: location.lng,
        map: map,
        title: location.name,
      })
      location.id = id;
      location.marker = marker;
      locations.push(location);

      marker.addListener('click', function() {
        self.populateInfoWindow(marker);
      });
    });
    this.setState({
      locations: locations
    })
  }

populateInfoWindow(marker) {
    let infowindow = this.state.InfoWindow;
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div><strong>Loading...</strong></div>');
      infowindow.open(this.state.map, marker);
      this.foursquareApi(marker, infowindow);
    }
    else {
      infowindow.marker = "";
      infowindow.close()
    }
  }

  closeWindow(infowindow) {
    infowindow.marker = "";
  }

  foursquareApi(marker, infowindow) {
    var clientId = "QP1H1XSEX5VXHW5JOTJQT3AYE0JGZQWJPASSBYV0LATTMM3N";
    var clientSecret = "A3JEWLVCSM54R1EA5J1QKFUIGY3NGDSYEF4Y1KBLMAX1AYWE";

    var url =
    'https://api.foursquare.com/v2/venues/search?client_id=' +
    clientId + '&client_secret=' + clientSecret + '&v=20180323&ll=' + marker.latitude + ',' + marker.longitude + '&limit=1'

    fetch(url).then(function(response) {
      response.json().then(function(data) {
        let infos = data.response.venues[0];
        infowindow.setContent(
          '<div id="infobox"><h2>'+infos.name+'</h2>'+
          '<p>'+ infos.location.formattedAddress[0] + '</br>' + infos.location.formattedAddress[1] + '</br>' + infos.location.formattedAddress[2] + '</p>'

          +'</div>' )
      })
    }).catch(function(error) {
      infowindow.setContent("Infos could not be loaded")
    })
  }

  render() {
    return (
      <div className="App">
          <div className="wrapper">
            <h1 id="Side-Heading">Stuttgart Locations</h1>
            <Listings locations={this.state.locations} populateInfoWindow={this.populateInfoWindow}/>
          </div>
          <div id="map" role="application" aria-label="Map with locations"></div>
      </div>
    );
  }
}


export default App;
