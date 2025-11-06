// ...existing code...
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// CORS allow
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Binance Spot Price Endpoint
// Example: GET /spot/BTCUSDT
app.get('/spot/:symbol', async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;

  try {
    const response = await axios.get(url);
    res.json({ symbol: response.data.symbol, price: response.data.price });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Cannot fetch data from Binance Spot API' });
  }
});

// Binance USDT-M Futures Price Endpoint
// Example: GET /futures/BTCUSDT
app.get('/futures/:symbol', async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const url = `https://fapi.binance.com/fapi/v1/ticker/price?symbol=${symbol}`;

  try {
    const response = await axios.get(url);
    res.json({ symbol: response.data.symbol, price: response.data.price });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Cannot fetch data from Binance Futures API' });
  }
});

// Optional: List some popular spot symbols
app.get('/spot', async (req, res) => {
  const url = `https://api.binance.com/api/v3/exchangeInfo`;
  try {
    const response = await axios.get(url);
    const symbols = response.data.symbols
      .filter(s => s.status === "TRADING")
      .map(s => s.symbol);
    res.json({ symbols });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Cannot fetch Binance symbols' });
  }
});

app.listen(PORT, () => {
  console.log(`Binance Spot proxy server running on port ${PORT}`);
});
// ...existing code...