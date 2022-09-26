import Cryptocurrency from './Cryptocurrency.js';

class Wallet {
  constructor() {
    this.cryptocurrencies = [];
  }

  addCryptocurrency(cryptocurrency, quantity = 0) {
    this.cryptocurrencies.push({ cryptocurrency, quantity });
  }

  removeCryptocurrency(identifier) {
    this.cryptocurrencies = this.cryptocurrencies.filter(
      (walletItem) =>
        walletItem.cryptocurrency.token !== identifier &&
        walletItem.cryptocurrency.name !== identifier
    );
  }

  modifyQuantity(identifier, newQuantity) {
    this.cryptocurrencies.forEach((walletItem) => {
      if (
        walletItem.cryptocurrency.token === identifier ||
        walletItem.cryptocurrency.name === identifier
      ) {
        walletItem.quantity = newQuantity;
      }
    });
  }

  calculateTotalValue() {
    return this.cryptocurrencies.reduce((acum, walletItem) => {
      const history = walletItem.cryptocurrency.history;
      return (
        acum + history[history.length - 1].closePrice * walletItem.quantity
      );
    }, 0);
  }

  hasToken(token) {
    return this.cryptocurrencies.some(
      (walletItem) => walletItem.cryptocurrency.token === token
    );
  }

  hasCryptocurrency(name) {
    return this.cryptocurrencies.some(
      (walletItem) => walletItem.cryptocurrency.name === name
    );
  }

  toJSON() {
    return this.cryptocurrencies;
  }

  static fromJSON(storage) {
    const parsedWallet = JSON.parse(storage);
    const wallet = new Wallet();

    parsedWallet.forEach((parsedItem) => {
      const cryptocurrency = new Cryptocurrency(
        parsedItem.cryptocurrency.token,
        parsedItem.cryptocurrency.name
      );
      wallet.addCryptocurrency(cryptocurrency, parsedItem.quantity);
    });
    return wallet;
  }

  printAccount() {
    if (this.cryptocurrencies.length === 0) {
      return 'Su billetera se encuentra vacia';
    }

    const walletStatus = this.cryptocurrencies
      .map((walletItem) => {
        return `  - ${walletItem.cryptocurrency.name}: ${walletItem.quantity} ${walletItem.cryptocurrency.token}.`;
      })
      .join('\n');

    return `Resumen de tu saldo:\n${walletStatus}\nEl valor total segun el utlimo precio de cierre es: $USD ${this.calculateTotalValue().toFixed(
      2
    )}`;
  }
}

export default Wallet;
