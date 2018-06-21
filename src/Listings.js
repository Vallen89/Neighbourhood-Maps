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
  this.props.locations.filter(function(location) {
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
      <div>
      <input
      type="text"
      placeholder="Search for a Location"
      value={query}
      onChange={(event) => this.updateQuery(event.target.value)}
      />
      <ul>
      {showListing.map((place) => (
        <li key={place.name}>
        {place.name}
        </li>
      ))}
      </ul>
      </div>
    )
  }
}

export default Listings
