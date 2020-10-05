import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './bingmap.css'

let map
let url
const seattle = [47.6062, -122.3321];
const pr = {
      'temp': 'AIRS_L2_Temperature_500hPa_Day',
      'particulate': 'Particulate_Matter_Below_2.5micrometers_2010-2012',
      'rain': 'A2_RainOcn_NRT',
      'wind': 'AMSR2_Wind_Speed_Day',
      'albedo': 'MERRA2_Surface_Albedo_Monthly',
      'elevation': 'ASTER_GDEM_Color_Index',
      'soil_moisture': 'Aquarius_Soil_Moisture_Daily',
      'pressure': 'MERRA2_Surface_Pressure_Monthly',
      'population': 'GPW_Population_Density_2020'
    }
  // 'MODIS_Terra_CorrectedReflectance_TrueColor',
  // 'VIIRS_Black_Marble',
  const atmosphereProducts = [
    'MODIS_Terra_Aerosol',
    'OMI_Absorbing_Aerosol_Optical_Thickness_MW_388',
    'MODIS_Terra_AOD_Deep_Blue_Land'
  ]
  const espgs = ['epsg4326', 'epsg3857']

  const BingMap = ({
  config,
  atmosP,
}) => {
  url = `https://www.bing.com/api/maps/mapcontrol?callback=GetBingMap&key=${config.bingAPIKey}`
  // eslint-disable-next-line
  window.GetBingMap = () => {
    // eslint-disable-next-line
    map = new window.Microsoft.Maps.Map('#bing-map', {
      // eslint-disable-next-line
      center: new window.Microsoft.Maps.Location(...seattle),
      // eslint-disable-next-line
      mapTypeId: window.Microsoft.Maps.MapTypeId.aerial,
      zoom: 2,
      showLocateMeButton: false,
      disableStreetside: true,
      disableBirdseye: true,
      disableKeyboardInput: true,
      showZoomButtons: false,
    })
    map.setOptions({
      showMapTypeSelector: false,
      showScalebar: false,
      allowHidingLabelsOfRoad: true,
      showMapLabels: false,
      // disableZooming: true,
      // disablePanning: true
    })

    var atmosphereTileSource = new window.Microsoft.Maps.TileSource({
      uriConstructor: tile => {
        return `https://gibs.earthdata.nasa.gov
/wmts/
${espgs[1]}
/best/
${atmosphereProducts[atmosP]}
/default/2014-04-09/GoogleMapsCompatible_Level6/
${tile.zoom}/${tile.y}/${tile.x}
.png`
      },
      minZoom: 1,
      maxZoom: 16,
    });

    var fireTileSource = new window.Microsoft.Maps.TileSource({
      uriConstructor: tile => {
        return `https://gibs.earthdata.nasa.gov/
wmts/epsg3857/best/MODIS_Terra_Aerosol/default/2014-04-09/GoogleMapsCompatible_Level6/
${tile.zoom}/${tile.y}/${tile.x}.png`
      },
      minZoom: 1,
      maxZoom: 16,
    });

    var tileSource = new window.Microsoft.Maps.TileSource({
      uriConstructor: tile => {
        return `https://map1.vis.earthdata.nasa.gov/wmts-geo/MODIS_Terra_CorrectedReflectance_TrueColor/default/2014-07-09/EPSG4326_250m/${tile.zoom}/${tile.y}/${tile.x}.jpg`
      },
      minZoom: 1,
      maxZoom: 16,
  });
    var katrinaTileSource = new window.Microsoft.Maps.TileSource({
      uriConstructor: (tile, b) => {
        return `https://bingmapsisdk.blob.core.windows.net/katrinatiles/${tile.quadKey}.png`        
      },
      minZoom: 1,
      maxZoom: 19,
      bounds: window.Microsoft.Maps.LocationRect.fromEdges(35.176, -101.065, 14.01, -80.538)
  });
    var layer = new window.Microsoft.Maps.TileLayer({
      mercator: atmosphereTileSource,
      opacity: 0.75
    });
    map.layers.insert(layer);    
  }
  useEffect(() => {
    const node = document.createElement('script')
    node.src = url
    document.getElementById('bing-map').appendChild(node)
  }, [])
  useEffect(() => {
    if(map) {
      var atmosphereTileSource = new window.Microsoft.Maps.TileSource({
        uriConstructor: tile => {
          return `https://gibs.earthdata.nasa.gov
/wmts/
${espgs[1]}
/best/
${atmosphereProducts[atmosP]}
/default/2014-04-09/GoogleMapsCompatible_Level6/
${tile.zoom}/${tile.y}/${tile.x}
.png`
        },
        minZoom: 1,
        maxZoom: 16,
      });
  
      var layer = new window.Microsoft.Maps.TileLayer({
        mercator: atmosphereTileSource,
        opacity: 1.0
      });
      map.layers.clear()
      map.layers.insert(layer);    
    }
  }, [atmosP])
  return (
    <div id="bing-map">&nbsp;</div>
  )
}
/* eslint-disable react/forbid-prop-types */
BingMap.propTypes = {
  config: PropTypes.object.isRequired,
  atmosP: PropTypes.number.isRequired,
}

export default BingMap
