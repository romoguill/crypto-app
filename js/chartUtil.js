import Cryptocurrency from './Cryptocurrency.js';
import bitcoinHistory from './data/bitcoinHistory.js';

const bitcoin = new Cryptocurrency('BTC', 'Bitcoin');

bitcoin.fetchHistory(bitcoinHistory);

const data = {
  labels: bitcoin.getDataForChart().labels,
  datasets: [
    {
      label: 'Wallet',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: bitcoin.getDataForChart().dataClosePrice,
    },
  ],
};

const config = {
  type: 'line',
  data: data,
  options: {},
};

const myChart = new Chart(document.getElementById('testChart'), config);
