import Wallet from './Wallet.js';
import Cryptocurrency from './Cryptocurrency.js';

const wallet = new Wallet();

const bitcoin = new Cryptocurrency('BTC', 'Bitcoin');
const ethereum = new Cryptocurrency('ETH', 'Ethereum');

const walletListElement = document.getElementById('wallet-items-list');
const walletFormModalElement = document.getElementById('walletFormModal');
const editWalletFormElement = document.getElementById('edit-wallet-form');
const openModalButtonElement = document.getElementById('open-modal-button');
const addItemButtonElement = document.getElementById('add-item');
const saveFormButtonElement = document.getElementById('save-form');

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

function resetWallet() {
  walletListElement.innerHTML = '';
}

function renderForm() {
  const fragment = document.createDocumentFragment();
  editWalletFormElement.innerHTML = '';

  wallet.cryptocurrencies.forEach((walletItem) => {
    const walletItemContainerElement = document.createElement('div');
    walletItemContainerElement.className =
      'container d-flex justify-content-between align-items-center mb-2';
    walletItemContainerElement.innerHTML = `
        <span class="h5 mb-0">${walletItem.cryptocurrency.name}</span>
        <input
          name="${walletItem.cryptocurrency.name}"
          type="number"
          class="text-end form-control w-50 quantity-input"
          value=${walletItem.quantity}
        />
      `;

    fragment.appendChild(walletItemContainerElement);
  });

  editWalletFormElement.appendChild(fragment);
}

function handleSave() {
  let formData = new FormData(document.getElementById('edit-wallet-form'));

  for (let [name, quantity] of formData.entries()) {
    if (wallet.hasCryptocurrency(name)) {
      wallet.modifyQuantity(name, parseFloat(quantity));
    } else {
      // TODO: Pensar la logica sobre si permitir crear una nueva crypto o restringir a una lista determinada
    }
  }

  resetWallet();
  renderWallet();
}

function handleDelete() {
  // TODO
}

addItemButtonElement.addEventListener('click', () => {
  console.warn('TODO: todavia no esta implementadas otras cryptos');
  const walletItemContainerElement = document.createElement('div');
  walletItemContainerElement.className =
    'container d-flex justify-content-between align-items-center mb-2';
  walletItemContainerElement.innerHTML = `
    <input
      type="text"
      class="form-control cryptocurrency-input"
      placeholder="Cryptocurrency"
    />
    <input
      type="number"
      class="form-control quantity-input"
      placeholder="Quantity"
    />
  `;

  editWalletFormElement.appendChild(walletItemContainerElement);
});

saveFormButtonElement.addEventListener('click', handleSave);

renderWallet();
renderForm();
console.log(JSON.stringify(bitcoin));
console.log(JSON.stringify(wallet));
