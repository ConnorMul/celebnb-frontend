import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import ListingCard from './ListingCard'

function MyMap({ listings }) {

  const position = [15.326572, -76.157227]

  // var greenIcon = new L.Icon({
  //   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  //   iconSize: [25, 41],
  //   iconAnchor: [12, 41],
  //   popupAnchor: [1, -34],
  //   shadowSize: [41, 41]
  // });
  
  // L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);

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
        <Marker key={listing.id} position={[listing.latitude, listing.longitude]} iconUrl='https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'>
          <Popup>
            <ListingCard listing={listing}/>
          </Popup>
        </Marker>
        ))}
    </MapContainer>
  )
}

export default MyMap