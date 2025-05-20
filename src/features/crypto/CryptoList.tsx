import { useEffect, useState, useRef } from "react"
import { fetchTopCryptos } from "./useCryptoAPI";

type CryptoProps = {
  id: string
  name: string
  symbol: string
  current_price: number
  image: string
};

export default function CryptoList() {
  const [cryptos, setCryptos] = useState<CryptoProps[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)

  const observer = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const loadCryptos = async () => {
    if (loading || !hasMore) return;

    setLoading(true)
    setError(null)

    try {
      const nextPage = page

      const data = await fetchTopCryptos(nextPage)

      if (data.length === 0) {
        setHasMore(false)
      } else {
        setCryptos((prev) => [...prev, ...data])
        setPage((prev) => prev + 1)
      }
    } catch (err) {
      setError("Error al cargar las criptomonedas.")
    } finally {
      setLoading(false)
    }
  };
  

  useEffect(() => {
    loadCryptos()
  }, []);

  useEffect(() => {
    if (loading) return

    const observerInstance = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadCryptos();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (loadMoreRef.current) {
      observerInstance.observe(loadMoreRef.current);
    }

    observer.current = observerInstance;

    return () => {
      if (observer.current && loadMoreRef.current) {
        observer.current.unobserve(loadMoreRef.current);
      }
    };
  }, [loading, hasMore]);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      {error && <p className="text-center text-red-600 mb-4">{error}</p>}

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
                Precio:{" "}
                <span className="font-bold text-[var(--color-gain)]">
                  ${crypto.current_price.toLocaleString()}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div ref={loadMoreRef} className="h-10"></div>

      {loading && <p className="text-center text-sm mt-4">Cargando más...</p>}
    </div>
  );
  
}
