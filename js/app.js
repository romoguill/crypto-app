import Cryptocurrency from './Cryptocurrency.js';
import Wallet from './Wallet.js';

import bitcoinHistory from './data/bitcoinHistory.js';
import ethereumHistory from './data/ethereumHistory.js';

const wallet = new Wallet();

const bitcoin = new Cryptocurrency('BTC', 'Bitcoin', bitcoinHistory);
const ethereum = new Cryptocurrency('ETH', 'Ethereum', ethereumHistory);

function renderMainMenu() {
  let userInput;
  while (true) {
    userInput = prompt(`
      Bienvenido a tu billetera crypto.
      Seleccione una opcion:
        1. Fondear billetera.
        2. Consultar saldo.
        3. Salir.
    `);

    if (['1', '2', '3'].includes(userInput)) {
      break;
    }

    alert('Debe seleccionar una opcion valida. Intente nuevamente.');
  }
  return userInput;
}

function renderWalletMenu() {
  let bitcoinQuantity;
  let ethereumQuantity;

  bitcoinQuantity = parseInt(prompt('Ingrese la cantidad de bitcoins'));
  ethereumQuantity = parseInt(prompt('Ingrese la cantidad de ethereums'));

  return [bitcoinQuantity, ethereumQuantity];
}

function init() {
  while (true) {
    let userInput = renderMainMenu();
    switch (userInput) {
      case '1':
        const [bitcoinQuantity, ethereumQuantity] = renderWalletMenu();
        wallet.addCryptocurrency(bitcoin, bitcoinQuantity);
        wallet.addCryptocurrency(ethereum, ethereumQuantity);
        break;
      case '2':
        alert(wallet.printAccount());
        break;
      case '3':
        return;
    }
  }
}

// init();

// TESTS
wallet.addCryptocurrency(bitcoin, 4.32);
wallet.addCryptocurrency(ethereum, 23.66);
console.log(bitcoin.getDataForChart(7));
console.log(wallet.calculateTotalValue());
