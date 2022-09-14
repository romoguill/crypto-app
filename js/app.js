import Cryptocurrency from './Cryptocurrency.js';
import Wallet from './Wallet.js';

function renderMainMenu() {
  let userInput;
  while (true) {
    userInput = prompt(`
      Bienvenido a tu billetera crypto.
      Seleccione una opcion:
        1. Configurar billetera.
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
  // let bitcoinQuantity;
  // let ethereumQuantity;
  let userInput;
  while (true) {
    userInput = prompt(`
      Configuracion de billetera.
      Seleccione una opcion:
        1. Agregar/Modificar.
        2. Eliminar.
        3. Volver.
    `);
    if (['1', '2', '3', '4'].includes(userInput)) {
      break;
    }

    alert('Debe seleccionar una opcion valida. Intente nuevamente.');
  }
  return userInput;

  // bitcoinQuantity = parseInt(prompt('Ingrese la cantidad de bitcoins'));
  // ethereumQuantity = parseInt(prompt('Ingrese la cantidad de ethereums'));

  // return [bitcoinQuantity, ethereumQuantity];
}

function renderAddMenu() {
  let tokenInput;
  let quantityInput;

  while (true) {
    tokenInput = prompt(
      'Seleccionar token. Por ahora solo aceptamos "BTC" y "ETH".'
    ).toUpperCase();

    if (tokenInput === 'BTC' || tokenInput === 'ETH') {
      quantityInput = parseFloat(prompt('Ingrese la cantidad'));
      break;
    }

    alert('Debe seleccionar una opcion valida. Intente nuevamente.');
  }

  return [tokenInput, quantityInput];
}

function renderRemoveMenu() {
  let tokenInput;

  while (true) {
    tokenInput = prompt(
      'Seleccionar token. Por ahora solo aceptamos "BTC" y "ETH".'
    ).toUpperCase();

    if (tokenInput === 'BTC' || tokenInput === 'ETH') {
      break;
    }

    alert('Debe seleccionar una opcion valida. Intente nuevamente.');
  }

  return tokenInput;
}

function init() {
  while (true) {
    let mainMenuInput = renderMainMenu();
    switch (mainMenuInput) {
      case '1':
        const walletMenuInput = renderWalletMenu();
        let tokenInput;
        let quantityInput;

        switch (walletMenuInput) {
          case '1':
            [tokenInput, quantityInput] = renderAddMenu();

            if (wallet.hasToken(tokenInput)) {
              wallet.modifyQuantity(tokenInput, quantityInput);
            } else {
              const name = tokenInput === 'BTC' ? 'Bitcoin' : 'Ethereum';
              const history =
                tokenInput === 'BTC' ? bitcoinHistory : ethereumHistory;
              const cryptocurrency = new Cryptocurrency(
                tokenInput,
                name,
                history
              );
              wallet.addCryptocurrency(cryptocurrency, quantityInput);
            }
            break;
          case '2':
            tokenInput = renderRemoveMenu();
            wallet.removeCryptocurrency(tokenInput);
            break;
          case '3':
            break;
        }
        // const [bitcoinQuantity, ethereumQuantity] = renderWalletMenu();
        // wallet.addCryptocurrency(bitcoin, bitcoinQuantity);
        // wallet.addCryptocurrency(ethereum, ethereumQuantity);
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
// wallet.addCryptocurrency(bitcoin, 4.32);
// wallet.addCryptocurrency(ethereum, 23.66);
// console.log(bitcoin.getDataForChart(7));
// console.log(wallet.calculateTotalValue());
// wallet.removeCryptocurrency('BTC');
// console.log(wallet);
// wallet.modifyQuantity('ETH', 30);
// console.log(wallet);
