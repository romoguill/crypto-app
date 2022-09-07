class Wallet {
  constructor() {
    this.cryptocurrencies = [];
  }

  addCryptocurrency(cryptocurrency, quantity = 0) {
    this.cryptocurrencies.push({ cryptocurrency, quantity });
  }

  removeCryptocurrency(token) {
    this.cryptocurrencies = this.cryptocurrencies.filter(
      (cryptocurrency) => cryptocurrency.token !== token
    );
  }

  calculateTotalValue() {
    return this.cryptocurrencies.reduce((acum, walletItem) => {
      const history = walletItem.cryptocurrency.history;
      return (
        acum + history[history.length - 1].closePrice * walletItem.quantity
      );
    }, 0);
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
