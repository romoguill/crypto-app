import Wallet from './Wallet.js';
import Cryptocurrency from './Cryptocurrency.js';

import bitcoinHistory from './data/bitcoinHistory.js';
import ethereumHistory from './data/ethereumHistory.js';

const wallet = new Wallet();

const bitcoin = new Cryptocurrency('BTC', 'Bitcoin', bitcoinHistory);
const ethereum = new Cryptocurrency('ETH', 'Ethereum', ethereumHistory);

const walletListElement = document.getElementById('wallet-items-list');

wallet.addCryptocurrency(bitcoin, 3.43);
wallet.addCryptocurrency(ethereum, 45.12);

function renderWallet() {
  let fragment = document.createDocumentFragment();

  wallet.cryptocurrencies.forEach((walletItem) => {
    const liElement = document.createElement('li');
    liElement.classList.add('list-group-item');
    liElement.innerHTML = `
        <div class="d-flex justify-content-between">
          <p>${walletItem.cryptocurrency.name}</p>
          <p>${walletItem.quantity}</p>
        </div>
    `;
    fragment.appendChild(liElement);
  });
  walletListElement.append(fragment);
}

renderWallet();
