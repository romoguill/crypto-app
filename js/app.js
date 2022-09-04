import Cryptocurrency from './Cryptocurrency.js';
import Wallet from './Wallet.js';

import bitcoinHistory from './data/bitcoinHistory.js';
import ethereumHistory from './data/ethereumHistory.js';

const wallet = new Wallet();

const bitcoin = new Cryptocurrency('BTC', 'bitcoin', bitcoinHistory);
const ethereum = new Cryptocurrency('ETH', 'ethereum', ethereumHistory);

wallet.addCryptocurrency(bitcoin, 2.32);
wallet.addCryptocurrency(ethereum, 15.65);
console.log(wallet);
