import { useEffect, useState } from "react";
import { fetchTop100Cryptos } from "./useCryptoAPI";

type CryptoProps = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
};

export default function CryptoList() {
  const [cryptos, setCryptos] = useState<CryptoProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCryptos = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTop100Cryptos();
        setCryptos(data);
      } catch (err) {
        setError("Error al cargar las criptomonedas");
      } finally {
        setLoading(false);
      }
    };

    loadCryptos();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>
  if (error)
    return <div className="text-center mt-8 text-red-600">{error}</div>

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <ul className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cryptos.map((crypto) => (
          <li
            key={crypto.id}
            className="flex items-center bg-[var(--color-surface)] gap-4 p-4 border border-[var(--color-border)] rounded transition-transform duration-300 hover:scale-102 cursor-pointer"
          >
            <img src={crypto.image} alt={crypto.name} className="w-10 h-10" />
            <div className="text-[var(--color-text-secondary)]">
              <p className="font-semibold">
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </p>
              <p>
                Precio: <span className="font-bold text-[var(--color-gain)]">${crypto.current_price.toLocaleString()}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
