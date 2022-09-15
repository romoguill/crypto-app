import Wallet from './Wallet.js';
import Cryptocurrency from './Cryptocurrency.js';

import bitcoinHistory from './data/bitcoinHistory.js';
import ethereumHistory from './data/ethereumHistory.js';

const wallet = new Wallet();

const bitcoin = new Cryptocurrency('BTC', 'Bitcoin', bitcoinHistory);
const ethereum = new Cryptocurrency('ETH', 'Ethereum', ethereumHistory);

const walletListElement = document.getElementById('wallet-items-list');
const walletFormModalElement = document.getElementById('walletFormModal');
const editWalletFormElement = document.getElementById('edit-wallet-form');
const openModalButtonElement = document.getElementById('open-modal-button');

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

openModalButtonElement.addEventListener('click', () => {
  const fragment = document.createDocumentFragment();

  wallet.cryptocurrencies.forEach((walletItem) => {
    const walletItemContainerElement = document.createElement('div');
    walletItemContainerElement.className =
      'container d-flex justify-content-between align-items-center mb-2';
    walletItemContainerElement.innerHTML = `
      <span class="h5 mb-0">${walletItem.cryptocurrency.name}</span>
      <input
        type="number"
        class="text-end form-control w-50"
        value=${walletItem.quantity}
      />
    `;

    fragment.appendChild(walletItemContainerElement);
  });

  editWalletFormElement.appendChild(fragment);
});

renderWallet();
