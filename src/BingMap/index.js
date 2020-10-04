import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './bingmap.css'

let map
let url
const seattle = [47.6062, -122.3321];
const BingMap = ({
  config,
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
      zoom: 10,
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
      disableZooming: true,
      disablePanning: true
    })
  }
  useEffect(() => {
    const node = document.createElement('script')
    node.src = url
    document.getElementById('bing-map').appendChild(node)
  }, [])

  return (
    <div id="bing-map">&nbsp;</div>
  )
}
/* eslint-disable react/forbid-prop-types */
BingMap.propTypes = {
  config: PropTypes.object.isRequired,
}

export default BingMap
