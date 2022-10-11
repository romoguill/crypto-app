import Wallet from './Wallet.js';
import availableCryptocurrencies from './data/availableCryptocurrencies.js';

const API_AVG_PRICE_URL = 'https://api.binance.com/api/v3/avgPrice';

const wallet = localStorage.getItem('wallet')
  ? Wallet.fromJSON(localStorage.getItem('wallet'))
  : new Wallet();

const walletListElement = document.getElementById('wallet-items-list');
const editWalletFormElement = document.getElementById('edit-wallet-form');
const addItemButtonElement = document.getElementById('add-item');
const saveFormButtonElement = document.getElementById('save-form');
const openFormButtonElement = document.getElementById('open-modal-button');

function getAvgPrices(tokens) {
  return Promise.all(
    tokens.map(async (token) => {
      const response = await fetch(`${API_AVG_PRICE_URL}?symbol=${token}USDT`);
      const data = await response.json();
      return Math.round(data.price * 100) / 100;
    })
  );
}

async function renderWallet() {
  const walletTokens = wallet.getAllTokens();
  const avgPrices = await getAvgPrices(walletTokens);

  let fragment = document.createDocumentFragment();

  wallet.cryptocurrencies.forEach((walletItem, i) => {
    const liElement = document.createElement('li');
    liElement.classList.add('list-group-item');
    liElement.innerHTML = `
        <div class="d-flex justify-content-between align-items-center my-2">
          <span>${walletItem.cryptocurrency.name}</span>
          <div class="d-flex flex-column align-items-center">
            <span>${walletItem.quantity}</span>
            <span>$${(avgPrices[i] * walletItem.quantity).toFixed(2)}</span>
            
          </div>
          
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
      const cryptocurrency = availableCryptocurrencies.find(
        (el) => el.name === name
      );
      if (cryptocurrency) {
        wallet.addCryptocurrency(cryptocurrency, quantity);
      } else {
        alert(`${name} is not a valid Cryptocurrency`);
      }
    }
  }

  localStorage.setItem('wallet', JSON.stringify(wallet));

  resetWallet();
  renderWallet();

  Toastify({
    text: 'The wallet has been updated',
    duration: 2000,
    close: true,
    gravity: 'top',
    position: 'right',
    stopOnFocus: true,
    offset: {
      y: '4em',
    },
    style: {
      background:
        'linear-gradient(90deg, rgba(33,28,28,1) 0%, rgba(88,72,67,1) 100%)',
      borderRadius: '4px',
    },
  }).showToast();
}

function handleAddItem() {
  // Create DOM node for the container that will host 2 inputs
  const walletItemContainerElement = document.createElement('div');
  walletItemContainerElement.className = 'container mb-2';

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

  // Dynamically set the name input so that the FormData object can read them
  const inputNameElement = walletItemContainerElement.querySelector(
    'input[placeholder="Cryptocurrency"]'
  );
  const inputQuantityElement = walletItemContainerElement.querySelector(
    'input[placeholder="Quantity"]'
  );

  inputNameElement.addEventListener('input', function () {
    inputQuantityElement.setAttribute('name', this.value);
  });
}

function handleDelete(e) {
  if (e.target.classList.contains('btn-delete-item')) {
    const walletItemElement = e.target.closest('[data-cryptocurrency]');
    walletItemElement.remove();
  }
}

openFormButtonElement.addEventListener('click', renderForm);

saveFormButtonElement.addEventListener('click', handleSave);

addItemButtonElement.addEventListener('click', handleAddItem);

editWalletFormElement.addEventListener('click', handleDelete);

renderWallet();
renderForm();
