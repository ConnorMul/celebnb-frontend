import React from 'react'
import { icon } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import ListingCard from './ListingCard'

function MyMap({ listings }) {

  const position = [15.326572, -76.157227]

  const mapIcon = icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
    iconSize: [30, 50],
    iconAnchor: [20, 48],
    popupAnchor: [0, -28]
  })

  return (
    <MapContainer
      className="map"
      center={position}
      zoom={3}
      style={{ width: '1500px', height: '750px' }}
    >
      <TileLayer
        url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      {listings.map(listing => (
        <Marker key={listing.id} position={[listing.latitude, listing.longitude]} icon={mapIcon}>
          <Popup>
            <ListingCard listing={listing}/>
          </Popup>
        </Marker>
        ))}
    </MapContainer>
  )
}

export default MyMap