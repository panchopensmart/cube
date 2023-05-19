import React from 'preact/compat';
import Scene from './game/Scene';
import './app.css';
export function App() {
    return (
      <div className='app'>
          <h1>Cube Racing</h1>
          <Scene />
      </div>
  )
}
