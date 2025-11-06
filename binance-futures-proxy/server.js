const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// CORS allow
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Binance Futures Spot/Perpetual price endpoint
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

app.listen(PORT, () => {
  console.log(`Binance Futures proxy server running on http://localhost:${PORT}`);
});
