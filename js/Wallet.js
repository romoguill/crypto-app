class Wallet {
  constructor() {
    this.cryptocurrencies = [];
  }

  addCryptocurrency(cryptocurrency, quantity = 0) {
    this.cryptocurrencies.push({ cryptocurrency, quantity });
  }

  removeCryptocurrency(token) {
    this.cryptocurrencies = this.cryptocurrencies.filter(
      (walletItem) => walletItem.cryptocurrency.token !== token
    );
  }

  modifyQuantity(token, newQuantity) {
    this.cryptocurrencies.forEach((walletItem) => {
      if (walletItem.cryptocurrency.token === token) {
        walletItem.quanity = newQuantity;
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

  printAccount() {
    if (this.cryptocurrencies.length === 0) {
      return 'Su billetera se encuentra vacia';
    }

    const walletStatus = this.cryptocurrencies
      .map((walletItem) => {
        return `  - ${walletItem.cryptocurrency.name}: ${walletItem.quantity} ${walletItem.cryptocurrency.token}.`;
      })
      .join('\n');

    return 'Resumen de tu saldo:\n' + walletStatus;
  }
}

export default Wallet;
