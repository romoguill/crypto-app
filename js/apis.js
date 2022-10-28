async function getCryptocurrencyHistory(token) {
  const URL = `https://api.binance.com/api/v3/klines?symbol=${token}USDT&interval=1d`;
  const response = await fetch(URL);
  return response.json();
}

export { getCryptocurrencyHistory };
