const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Example endpoint: /price?symbol=BTCUSDT
app.get("/price", async (req, res) => {
  const symbol = req.query.symbol;
  if (!symbol) return res.status(400).json({ error: "Symbol is required" });

  try {
    const response = await axios.get(`https://fapi.binance.com/fapi/v1/ticker/price?symbol=${symbol}`);
    res.json({
      symbol: response.data.symbol,
      price: response.data.price
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching price", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
