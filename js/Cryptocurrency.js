class Cryptocurrency {
  constructor(token, name) {
    this.token = token;
    this.name = name;
    this.history = [];
  }

  fetchHistory(historyArray) {
    this.history = historyArray.map((infoDay) => {
      return {
        date: new Date(infoDay[0]),
        openPrice: parseFloat(infoDay[1]),
        highPrice: parseFloat(infoDay[2]),
        lowPrice: parseFloat(infoDay[3]),
        closePrice: parseFloat(infoDay[4]),
        volume: parseFloat(infoDay[5]),
      };
    });
    return this.history;
  }

  // Devuelve un objeto del historico de los ultimos n dias (days). Se usara para ChartJS.
  getDataForChart(days) {
    const historyFiltered = this.history.slice(this.history.length - days);
    return {
      labels: historyFiltered.map((historyItem) => historyItem.date),
      dataOpenPrice: historyFiltered.map(
        (historyItem) => historyItem.openPrice
      ),
      datahighPrice: historyFiltered.map(
        (historyItem) => historyItem.highPrice
      ),
      dataLowPrice: historyFiltered.map((historyItem) => historyItem.lowPrice),
      dataClosePrice: historyFiltered.map(
        (historyItem) => historyItem.closePrice
      ),
      dataVolume: historyFiltered.map((historyItem) => historyItem.volume),
    };
  }

  toJSON() {
    return JSON.stringify({ token: this.token, name: this.name });
  }
}

export default Cryptocurrency;
