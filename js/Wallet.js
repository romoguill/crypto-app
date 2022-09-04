class Wallet {
  constructor() {
    this.cryptocurrencies = [];
  }

  addCryptocurrency(cryptocurrency, quantity) {
    this.cryptocurrencies.push({ cryptocurrency, quantity });
  }

  removeCryptocurrency(token) {
    this.cryptocurrencies = this.cryptocurrencies.filter(
      (cryptocurrency) => cryptocurrency.token !== token
    );
  }
}

export default Wallet;
