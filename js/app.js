import Cryptocurrency from './Cryptocurrency.js';
import Wallet from './Wallet.js';

const wallet = new Wallet();

const bitcoin = new Cryptocurrency('BTC', 'bitcoin', [
  {
    date: new Date('2022-05-13').toUTCString(),
    openPrice: 23456,
    closePrice: 25436,
    highPrice: 26500,
    lowPrice: 22341,
    volume: 3940192,
  },
  {
    date: new Date('2022-05-13').toUTCString(),
    openPrice: 23456,
    closePrice: 25436,
    highPrice: 26500,
    lowPrice: 22341,
    volume: 3940192,
  },
  {
    date: new Date('2022-05-13').toUTCString(),
    openPrice: 23456,
    closePrice: 25436,
    highPrice: 26500,
    lowPrice: 22341,
    volume: 3940192,
  },
  {
    date: new Date('2022-05-13').toUTCString(),
    openPrice: 23456,
    closePrice: 25436,
    highPrice: 26500,
    lowPrice: 22341,
    volume: 3940192,
  },
  {
    date: new Date('2022-05-13').toUTCString(),
    openPrice: 23456,
    closePrice: 25436,
    highPrice: 26500,
    lowPrice: 22341,
    volume: 3940192,
  },
  {
    date: new Date('2022-05-13').toUTCString(),
    openPrice: 23456,
    closePrice: 25436,
    highPrice: 26500,
    lowPrice: 22341,
    volume: 3940192,
  },
  {
    date: new Date('2022-05-13').toUTCString(),
    openPrice: 23456,
    closePrice: 25436,
    highPrice: 26500,
    lowPrice: 22341,
    volume: 3940192,
  },
  {
    date: new Date('2022-05-13').toUTCString(),
    openPrice: 23456,
    closePrice: 25436,
    highPrice: 26500,
    lowPrice: 22341,
    volume: 3940192,
  },
  {
    date: new Date('2022-05-13').toUTCString(),
    openPrice: 23456,
    closePrice: 25436,
    highPrice: 26500,
    lowPrice: 22341,
    volume: 3940192,
  },
  {
    date: new Date('2022-05-13').toUTCString(),
    openPrice: 23456,
    closePrice: 25436,
    highPrice: 26500,
    lowPrice: 22341,
    volume: 3940192,
  },
  {
    date: new Date('2022-05-13').toUTCString(),
    openPrice: 23456,
    closePrice: 25436,
    highPrice: 26500,
    lowPrice: 22341,
    volume: 3940192,
  },
  {
    date: new Date('2022-05-13').toUTCString(),
    openPrice: 23456,
    closePrice: 25436,
    highPrice: 26500,
    lowPrice: 22341,
    volume: 3940192,
  },
  {
    date: new Date('2022-05-13').toUTCString(),
    openPrice: 23456,
    closePrice: 25436,
    highPrice: 26500,
    lowPrice: 22341,
    volume: 3940192,
  },
  {
    date: new Date('2022-05-13').toUTCString(),
    openPrice: 23456,
    closePrice: 25436,
    highPrice: 26500,
    lowPrice: 22341,
    volume: 3940192,
  },
  {
    date: new Date('2022-05-13').toUTCString(),
    openPrice: 23456,
    closePrice: 25436,
    highPrice: 26500,
    lowPrice: 22341,
    volume: 3940192,
  },
  {
    date: new Date('2022-05-13').toUTCString(),
    openPrice: 23456,
    closePrice: 25436,
    highPrice: 26500,
    lowPrice: 22341,
    volume: 3940192,
  },
  {
    date: new Date('2022-05-13').toUTCString(),
    openPrice: 23456,
    closePrice: 25436,
    highPrice: 26500,
    lowPrice: 22341,
    volume: 3940192,
  },
]);

wallet.addCryptocurrency(bitcoin, 2.3);
console.log(wallet);

console.log(wallet[0].date);
