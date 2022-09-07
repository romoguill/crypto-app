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

  // Devuelve un array de los ultimos n dias (days). Se usara para ChartJS.
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
}

export default Cryptocurrency;
