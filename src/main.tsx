import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PokemonListProvider } from './providers/PokemonListProvider.tsx'
import { CryAudioProvider } from './providers/CryAudioProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PokemonListProvider>
    <CryAudioProvider>
      <App />
    </CryAudioProvider>
  </PokemonListProvider>
)
