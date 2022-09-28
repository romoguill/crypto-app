import Wallet from './Wallet.js';
import Cryptocurrency from './Cryptocurrency.js';

let wallet = new Wallet();

const bitcoin = new Cryptocurrency('BTC', 'Bitcoin');
const ethereum = new Cryptocurrency('ETH', 'Ethereum');
const binance = new Cryptocurrency('BNB', 'Binance');
const xrp = new Cryptocurrency('XRP', 'XRP');

const walletListElement = document.getElementById('wallet-items-list');
const editWalletFormElement = document.getElementById('edit-wallet-form');
const addItemButtonElement = document.getElementById('add-item');
const saveFormButtonElement = document.getElementById('save-form');
const openFormButtonElement = document.getElementById('open-modal-button');

wallet.addCryptocurrency(bitcoin, 3.43);
wallet.addCryptocurrency(ethereum, 45.12);

function renderWallet() {
  let fragment = document.createDocumentFragment();

  wallet.cryptocurrencies.forEach((walletItem) => {
    const liElement = document.createElement('li');
    liElement.classList.add('list-group-item');
    liElement.innerHTML = `
        <div class="d-flex justify-content-between align-items-center my-2">
          <span>${walletItem.cryptocurrency.name}</span>
          <span>${walletItem.quantity}</span>
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
    walletItemContainerElement.className = 'container mb-2';
    walletItemContainerElement.setAttribute(
      'data-cryptocurrency',
      walletItem.cryptocurrency.name
    );
    walletItemContainerElement.innerHTML = `
      <div class="row align-items-center">
        <div class="col-6">
          <span class="h5 mb-0">${walletItem.cryptocurrency.name}</span>
        </div>
        <div class="col-5">
          <input
            name="${walletItem.cryptocurrency.name}"
            type="number"
            class="text-end form-control quantity-input"
            value=${walletItem.quantity}
          />
        </div>
        <div class="col-1">
          <i class="bi bi-x text-danger btn-delete-item" role="button"></i>
        </div>
      </div>
      `;

    fragment.appendChild(walletItemContainerElement);
  });

  editWalletFormElement.appendChild(fragment);
}

function handleSave() {
  let formData = new FormData(document.getElementById('edit-wallet-form'));

  // First check if there was an item deleted
  wallet.cryptocurrencies = wallet.cryptocurrencies.filter((walletItem) =>
    formData.has(walletItem.cryptocurrency.name)
  );

  // Then check if there was a change in the quantity or if its a new crypto
  for (let [name, quantity] of formData.entries()) {
    if (wallet.hasCryptocurrency(name)) {
      wallet.modifyQuantity(name, parseFloat(quantity));
    } else {
      // TODO: Pensar la logica sobre si permitir crear una nueva crypto o restringir a una lista determinada
    }
  }

  localStorage.setItem('wallet', JSON.stringify(wallet));

  resetWallet();
  renderWallet();
}

function handleDelete(e) {
  if (e.target.classList.contains('btn-delete-item')) {
    const walletItemElement = e.target.closest('[data-cryptocurrency]');
    walletItemElement.remove();
  }
}

function handleAddItem() {
  const walletItemContainerElement = document.createElement('div');
  walletItemContainerElement.className = 'container mb-2';
  // walletItemContainerElement.setAttribute(
  //   'data-cryptocurrency',
  //   walletItem.cryptocurrency.name
  // );
  walletItemContainerElement.innerHTML = `
      <div class="row align-items-center">
        <div class="col-6">
          <input 
            type="text" 
            class="text-start form-control quantity-input" 
            placeholder="Cryptocurrency"
          >
        </div>
        <div class="col-5">
          <input
            type="number"
            class="text-end form-control quantity-input"
            placeholder="Quantity"
          />
        </div>
        <div class="col-1">
          <i class="bi bi-x text-danger btn-delete-item" role="button"></i>
        </div>
      </div>
      `;

  editWalletFormElement.appendChild(walletItemContainerElement);
}

openFormButtonElement.addEventListener('click', renderForm);

saveFormButtonElement.addEventListener('click', handleSave);

addItemButtonElement.addEventListener('click', handleAddItem);

editWalletFormElement.addEventListener('click', handleDelete);

renderWallet();
renderForm();
