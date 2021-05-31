import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-mapa-p',
  templateUrl: './mapa-p.component.html',
  styleUrls: ['./mapa-p.component.css']
})
export class MapaPComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if('geolocation' in navigator){
        navigator.geolocation.watchPosition(function(position){
          console.log(position)
          console.log(position.coords.latitude);

    mapboxgl.accessToken = 'pk.eyJ1IjoibXUxMjMiLCJhIjoiY2tvZXBvZ3I3MDBhaTJ2bnNraTV1MjJlbCJ9.EmhtHQ56ddv8bkOT8gIEUw';
    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 10,
    center: [position.coords.longitude, position.coords.latitude]
    });

    // Fetch clinicas from API
    async function getClinicasP() {
        const res = await fetch('http://localhost:3000/api/v1/clinicasP');
        const data = await res.json();

        const clinicasP = data.data.map(clinicaP => {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [
                clinicaP.location.coordinates[0],
                clinicaP.location.coordinates[1]
              ]
            },
            properties: {
              'clinicaPId': clinicaP.clinicaPId,
              'icon': 'hospital',
              'description':
              `<strong>${clinicaP.clinicaPId}</strong><p>${clinicaP.description}</p>`,

            }
          };
        });

        loadMap(clinicasP);
      }
    // Load map with stores
    function loadMap(clinicasP) {
        map.on('load', function() {
          map.addSource('places', {

              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: clinicasP,

              }
            });
            map.addLayer({
              id: 'places',
              type: 'symbol',
              source: 'places',
            layout: {
              'icon-image': '{icon}-15',
              'icon-size': 1.5,
              'text-field': '{clinicaPId}',
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 0.9],
              'text-anchor': 'top'
            }
          });

          var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
           });

           map.on('mouseenter', 'places', function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.on('mouseleave', 'places', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });

        });


      }

      getClinicasP();

    }, function(error){
      console.log(error)
    }, {enableHighAccuracy: true, maximumAge: 30000, timeout: 30000})
    }else{
    alert('ops, deu erro')
    }
  }

}
