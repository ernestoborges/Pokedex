import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PokemonListProvider } from './providers/PokemonListProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PokemonListProvider>
      <App />
    </PokemonListProvider>
  </React.StrictMode>,
)
