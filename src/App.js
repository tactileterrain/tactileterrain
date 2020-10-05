import React, { useState } from 'react';
import {
  CommandBar,
  initializeIcons
} from '@fluentui/react'

import './App.css';
import BingMap from './BingMap'
import config from './config'

const items2 = [
  {
    key: 'zoom-in-leaflet',
    text: 'Display On Device',
    iconProps: { iconName: 'ArrowUpRight' },
    className: 'zoom-command-item-leaflet',
  }
]

initializeIcons()

function App() {
  const [atmosP, setAtmosP] = useState(null)

  const items = [
    {
    key: 'c',
    text: 'Layer',
    // iconProps: { iconName: 'ArrowUpRight' },
    subMenuProps: {
      items: [
        // { key: 'a', text: 'Fire', onClick: () => {
        //   setAtmosP(0)
        // }},
        { key: 'a', text: 'A', onClick: () => (setAtmosP(0)) },
        { key: 'b', text: 'B', onClick: () => (setAtmosP(1)) },
        { key: 'c', text: 'C', onClick: () => (setAtmosP(2)) },
        { key: 'd', text: 'D', onClick: () => (setAtmosP(3)) },
      ],
    }
  }
  ]  

  return (
    <div className="App">
      <header className="App-header">
          tactileterrain 
          <CommandBar
            className="command-bar"
            items={items}
            ariaLabel="Use left and right arrow keys to navigate between commands"
          />
          <CommandBar
            className="command-bar"
            items={items2}
            ariaLabel="Use left and right arrow keys to navigate between commands"
          />
      </header>
      <BingMap
            config={config}
            atmosP={atmosP}
          />
    </div>
  );
}

export default App;
