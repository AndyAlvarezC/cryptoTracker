import axios from "axios";

export async function fetchTopCryptos(page: number = 1) {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 50,
          page,
          sparkline: false,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cryptos:", error);
    throw error;
  }
}
