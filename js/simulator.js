import Wallet from './Wallet.js';
import Cryptocurrency from './Cryptocurrency.js';

let wallet = new Wallet();

const bitcoin = new Cryptocurrency('BTC', 'Bitcoin');
const ethereum = new Cryptocurrency('ETH', 'Ethereum');

const walletListElement = document.getElementById('wallet-items-list');
const editWalletFormElement = document.getElementById('edit-wallet-form');
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
    walletItemContainerElement.className = 'container mb-2';
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
          <i class="bi bi-x text-danger" role="button"></i>
        </div>
      </div>
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

  localStorage.setItem('wallet', JSON.stringify(wallet));

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

const walletStr = localStorage.getItem('wallet');
console.log(walletStr);
wallet = Wallet.fromJSON(walletStr);
console.log(wallet);
