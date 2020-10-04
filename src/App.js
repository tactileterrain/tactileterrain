import React from 'react';
import {
  CommandBar,
  initializeIcons
} from '@fluentui/react'

import './App.css';
import BingMap from './BingMap'
import config from './config'

const items = [
  {
  key: 'c',
  text: 'Layer',
  // iconProps: { iconName: 'ArrowUpRight' },
  subMenuProps: {
    items: [
      { key: 'seattle', text: 'Fire' },
      { key: 'los-angeles', text: 'Cloud' },
      { key: 'miami', text: 'Traffic' }
    ],
  }
}
]
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
          />
    </div>
  );
}

export default App;
