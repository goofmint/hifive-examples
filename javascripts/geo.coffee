$ ->
  h5.api.geo.getCurrentPosition()
  .then (data) ->
    $('#map1').gmap3
      map:
        latLng: [data.coords.latitude, data.coords.longitude]
        options:
          zoom: 15
      marker:
        latLng: [data.coords.latitude, data.coords.longitude]

  h5.api.geo.watchPosition(
    timeout
  .progress (data) ->
    $('#map2').gmap3
      map:
        latLng: [data.coords.latitude, data.coords.longitude]
        options:
          zoom: 15
      marker:
        latLng: [data.coords.latitude, data.coords.longitude]
  
