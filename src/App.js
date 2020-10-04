import React from 'react';
import './App.css';
import BingMap from './BingMap'
import config from './config'

function App() {
  return (
    <div className="App">
      <header className="App-header">
          tactileterrain
      </header>
      <BingMap
            config={config}
          />
    </div>
  );
}

export default App;
