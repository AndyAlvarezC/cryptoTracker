import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CryptoList from './features/crypto/CryptoList';
import './index.css'

function App() {

  return (
    <div className="bg-[var(--color-background)] mt-6">
      <div className="grid grid-cols-3 text-center gap-5 p-4">
        <h1 className="text-[var(--color-text-primary)] text-3xl font-bold transition-transform duration-300 hover:scale-105 hover:text-[var(--color-accent)] cursor-pointer">CryptoTracker</h1>
        <Navbar />
        <SearchBar />
      </div>
      <div>
        <CryptoList />
      </div>
    </div>
  );
}

export default App
