const cryptoSelect = document.getElementById('crypto-select');
const checkPriceButton = document.getElementById('check-price');
const cryptoPrice = document.getElementById('crypto-price');

// Fetch cryptocurrency options and populate the select element
fetch('https://api.coingecko.com/api/v3/coins/list')
    .then(response => response.json())
    .then(data => {
        data.forEach(crypto => {
            const option = document.createElement('option');
            option.value = crypto.id;
            option.text = crypto.name;
            cryptoSelect.appendChild(option);
        });
    });

// Add a click event listener to the "Check Price" button
checkPriceButton.addEventListener('click', () => {
    const selectedCryptoId = cryptoSelect.value;
    
    // Fetch the price of the selected cryptocurrency
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${selectedCryptoId}&vs_currencies=usd`)
        .then(response => response.json())
        .then(data => {
            const price = data[selectedCryptoId].usd;
            cryptoPrice.textContent = `Price: $${price}`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});