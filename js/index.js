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

function renderMainTable() {
  const tableDOM = tableData
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

renderMainTable();
