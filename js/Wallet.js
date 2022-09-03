class Wallet {
  constructor() {
    this.cryptocurrencies = [];
  }

  addCryptocurrency(cryptocurrency, quantity) {
    this.cryptocurrencies.push({ cryptocurrency, quantity });
  }
}

export default Wallet;
