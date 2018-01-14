<template>
  <div>
    <div id='map' style='width:100%;height:400px;'></div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
const apiKey = 'AIzaSyDqdHSer3K4o_QAT1nKuo3ScTrJiaU3SSE'
const googleMap = require('google-maps-api')(apiKey)
const maps = require('google-maps-api/map')
export default {
  name: 'location',
  data() {
    return {
      msg: 'This is ' + this.$route.name,
      mapInstance: null,
      mapMarker: null,
      citymap: {
        chicago: {
          center: { lat: 41.878, lng: -87.629 },
          population: 2714856
        },
        newyork: {
          center: { lat: 40.714, lng: -74.005 },
          population: 8405837
        },
        losangeles: {
          center: { lat: 34.052, lng: -118.243 },
          population: 3857799
        },
        vancouver: {
          center: { lat: 49.25, lng: -123.1 },
          population: 603502
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'geoLocation'
    ])
  },
  methods: {
    ...mapMutations([
      'setLocation'
    ]),
    getCircle: function (rvMaps, magnitude) {
      return {
        path: rvMaps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: 0.2,
        scale: Math.pow(2, magnitude) / 2,
        strokeColor: 'white',
        strokeWeight: 0.5
      }
    }
  },
  mounted: function () {
    let self = this
    googleMap().then(rvMaps => {
      console.log(rvMaps)
      maps({
        element: document.getElementById('map'),
        center: { lat: -34.397, lng: 150.644 },
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          {
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#212121'
              }
            ]
          },
          {
            'elementType': 'labels.icon',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#757575'
              }
            ]
          },
          {
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#212121'
              }
            ]
          },
          {
            'featureType': 'administrative',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#757575'
              }
            ]
          },
          {
            'featureType': 'administrative.country',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#9e9e9e'
              }
            ]
          },
          {
            'featureType': 'administrative.locality',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#bdbdbd'
              }
            ]
          },
          {
            'featureType': 'poi',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#757575'
              }
            ]
          },
          {
            'featureType': 'poi.business',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'poi.park',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#181818'
              }
            ]
          },
          {
            'featureType': 'poi.park',
            'elementType': 'labels.text',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'poi.park',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#616161'
              }
            ]
          },
          {
            'featureType': 'poi.park',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#1b1b1b'
              }
            ]
          },
          {
            'featureType': 'road',
            'elementType': 'geometry.fill',
            'stylers': [
              {
                'color': '#2c2c2c'
              }
            ]
          },
          {
            'featureType': 'road',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#8a8a8a'
              }
            ]
          },
          {
            'featureType': 'road.arterial',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#373737'
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#3c3c3c'
              }
            ]
          },
          {
            'featureType': 'road.highway.controlled_access',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#4e4e4e'
              }
            ]
          },
          {
            'featureType': 'road.local',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#616161'
              }
            ]
          },
          {
            'featureType': 'transit',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#757575'
              }
            ]
          },
          {
            'featureType': 'water',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#000000'
              }
            ]
          },
          {
            'featureType': 'water',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#3d3d3d'
              }
            ]
          }
        ]
      }).then(result => {
        self.mapInstance = result
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            this.setLocation(pos)
            console.log(pos)
            self.mapInstance.setCenter(pos)
            self.mapMarker = new rvMaps.Marker({
              map: self.mapInstance,
              position: pos
            })
          })
        }
        for (var city in self.citymap) {
          // Add the circle for this city to the map.
          var cityCircle = new rvMaps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: self.mapInstance,
            center: self.citymap[city].center,
            radius: Math.sqrt(self.citymap[city].population) * 100
          })
          console.log(cityCircle)
        }
      })
    })
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style 'scoped'>

</style>
