import {TronWeb} from 'tronweb';

// Initialize TronWeb
const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io', // TronGrid API endpoint
  headers: { 'TRON-PRO-API-KEY': process.env.TRON_API_KEY }, // Add your TronGrid API key
});

export default tronWeb;