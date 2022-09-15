const tableElement = document.getElementById('main-table');
const tableBodyElement = document.querySelector('#main-table tbody');
const searchInputElement = document.getElementById('search-input');

const tableData = [
  {
    token: 'BTC',
    name: 'Bitcoin',
    price: 23532.43,
    change: '4.22%',
    marketCap: '1.234T',
    volume: 234094,
    chart: 'chart',
  },
  {
    token: 'ETH',
    name: 'Ethereum',
    price: 1394.12,
    change: '12.31%',
    marketCap: '340204',
    volume: 109429,
    chart: 'chart',
  },
];

function renderMainTable(data) {
  let noDataElement = document.getElementById('error-fetching-data');

  if (data.length === 0 && !noDataElement) {
    noDataElement = document.createElement('div');
    noDataElement.setAttribute('id', 'error-fetching-data');
    noDataElement.className = 'text-center text-muted h4';
    noDataElement.textContent = "Sorry we couldn't find any data";
    tableElement.insertAdjacentElement('afterend', noDataElement);
  } else if (data.length !== 0) {
    noDataElement && noDataElement.remove();
  }

  const tableDOM = data
    .map((tableRow) => {
      return `
      <tr>
      <td>${tableRow.name} <span>${tableRow.token}</span></td>
      <td>
        <div class="d-flex justify-content-end me-3">
          <span>${tableRow.price}</span>
        </div>
      </td>
      <td>
        <div class="d-flex justify-content-end me-3">
          <span>${tableRow.change}</span>
        </div>
      </td>
      <td>
        <div class="d-flex justify-content-end me-3">
          <span>${tableRow.marketCap}</span>
        </div>
      </td>
      <td>
        <div class="d-flex justify-content-end me-3">
          <span>${tableRow.volume}</span>
        </div>
      </td>
      <td>${tableRow.chart}</td>
    </tr>
    `;
    })
    .join('');

  tableBodyElement.innerHTML = tableDOM;
}

function filterData(searchedCrypto) {
  return tableData.filter(
    (dailyData) =>
      dailyData.name.toLowerCase().includes(searchedCrypto.toLowerCase()) ||
      dailyData.token.toLowerCase().includes(searchedCrypto.toLowerCase())
  );
}

searchInputElement.addEventListener('input', function () {
  const filteredData = filterData(this.value);
  renderMainTable(filteredData);
});

renderMainTable(tableData);
