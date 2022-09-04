class Cryptocurrency {
  constructor(token, name, historyArray) {
    this.token = token;
    this.name = name;
    this.history = this.fetchHistory(historyArray);
  }

  fetchHistory(historyArray) {
    return historyArray.map((infoDay) => {
      return {
        date: new Date(infoDay[0]),
        openPrice: parseFloat(infoDay[1]),
        highPrice: parseFloat(infoDay[2]),
        lowPrice: parseFloat(infoDay[3]),
        closePrice: parseFloat(infoDay[4]),
        volume: parseFloat(infoDay[5]),
      };
    });
  }
}

export default Cryptocurrency;
