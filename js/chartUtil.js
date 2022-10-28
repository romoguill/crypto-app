import Cryptocurrency from './Cryptocurrency.js';
import bitcoinHistory from './data/bitcoinHistory.js';
import { getCryptocurrencyHistory } from './apis.js';
import Wallet from './Wallet.js';

const bitcoin = new Cryptocurrency('BTC', 'Bitcoin');

bitcoin.fetchHistory(bitcoinHistory);

const wallet = localStorage.getItem('wallet')
  ? Wallet.fromJSON(localStorage.getItem('wallet'))
  : new Wallet();

function getUKLines() {
  return Promise.all(
    wallet.cryptocurrencies.map(async (walletItem) => {
      const data = await getCryptocurrencyHistory(
        walletItem.cryptocurrency.token
      );
      const dateTimes = data.map((dayTicker) => dayTicker[0]);
      const closingPrices = data.map((dayTicker) => dayTicker[4]);
      return [dateTimes, closingPrices];
    })
  );
}

async function calculateWalletHistory() {
  const historyData = await getUKLines();

  // Date time will be the same for each crypto, so I'll take the first one
  const dateTimes = historyData[0][0];

  const totalValuesHistory = [];
  for (let i = 0; i < historyData.length; i++) {
    totalValuesHistory.push(
      historyData[i][1].map((cryptoValue) => {
        return cryptoValue * wallet.cryptocurrencies[i].quantity;
      })
    );
  }

  console.log(totalValuesHistory);

  const walletHistoryTotals = [];
  for (let i = 0; i < totalValuesHistory[0].length; i++) {
    let dailyTotal = 0;
    for (let j = 0; j < totalValuesHistory.length; j++) {
      dailyTotal += totalValuesHistory[j][i];
    }
    walletHistoryTotals.push(dailyTotal);
  }
  return walletHistoryTotals;
}

async function renderChart() {
  const historyData = await getUKLines();

  // Date time will be the same for each crypto, so I'll take the first one
  let dateTimes = historyData[0][0];

  dateTimes = dateTimes.map((date) => new Date(date).toDateString());

  const walletHistoryTotals = await calculateWalletHistory();

  console.log(walletHistoryTotals);
  const data = {
    labels: dateTimes,
    datasets: [
      {
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: walletHistoryTotals,
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };

  const myChart = new Chart(document.getElementById('testChart'), config);
}

renderChart();
