import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'

class App extends Component {

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
    let map;
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 48.776247, lng: 9.188887},
      zoom: 12
    });

    let Stuggi = {lat: 48.776247, lng: 9.188887}
    var marker = new window.google.maps.Marker({
      position: Stuggi,
      map: map,
      title: 'Stuggi Try'
    });
    var infoWindow = new window.google.maps.InfoWindow({
      content: 'Do whatever you want'
    });
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
  }

  render() {
    return (
      <div className="App">
          <div className="list-box">
            <h1>Stuttgart Locations</h1>
            <input type="text" />
          </div>
          <div id="map"></div>
      </div>
    );
  }
}


export default App;
