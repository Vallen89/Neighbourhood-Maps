import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class Listings extends Component {

state = {
      query: "",
}

updateQuery = (query) => {
  this.setState({query: query.trim() })
  var locations = [];
  this.props.locations.forEach(function(location) {
    if (location.id.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
      location.marker.setVisible(true);
      locations.push(location);
    } else {
      location.marker.setVisible(false);
    }
  })
}

  render() {
    const { query } = this.state
    const { locations } = this.props

    let showListing;
    if(query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showListing = locations.filter((place) => match.test(place.name))
    } else {
      showListing = locations
    }

showListing.sort(sortBy('name'))

    return (
      <div id="list-box">
      <input
      role="search"
      id="Search"
      type="text"
      placeholder="Search for a Location"
      value={query}
      onChange={(event) => this.updateQuery(event.target.value)}
      />
      <ul role="listbox" aria-label="List with locations">
      {showListing.map((place) => (
        <li role="button" aria-label="Location Listitems" tabIndex="0" className="LocationItems" key={place.name} onClick={this.props.populateInfoWindow.bind(this, place.marker)}>
        {place.name}
        </li>
      ))}
      </ul>
      </div>
    )
  }
}

export default Listings
