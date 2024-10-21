
// Elementos del DOM

const fromCurrency = document.getElementById('from-currency');
const amountInput = document.getElementById('amount');
const toCurrency = document.getElementById('to-currency');
const amountResult = document.getElementById('result');

const rateElement = document.getElementById('rate');
const SwapButton = document.getElementById('swap');

const errorElment = document.getElementById('error');

const loadingElement = document.getElementById('loading');



// Función para realizar la covnersión

function calcularExchange() {
    const currencyOne = fromCurrency.value;
    const currencyTwo = toCurrency.value;

    const amountValue = parseFloat(amountInput.value);

    errorElment.classList.add('hidden');
    errorElment.innerText = '';

    loadingElement.classList.remove('hidden');

    if(isNaN(amountValue) || amountValue <= 0){
        alert('Introduce un número positivo.');
        loadingElement.classList.add('hidden');
        return;
    }


    fetch(`https://v6.exchangerate-api.com/v6/fcfa1f62262f1762591c9667/latest/${currencyOne}`)

        .then(res => {
            if (!res.ok) {
                throw new Error(`Error en la API: ${res.status} ${res.statusText}`);
                
            }
            return res.json();
        })

        .then(data => {

            const rate = data.conversion_rates[currencyTwo];
            rateElement.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
            amountResult.value = (amountInput.value * rate).toFixed(2);

            setTimeout(() => {
                loadingElement.classList.add('hidden');
            }, 1000);
            
        })

        .catch(error => {
            errorElment.classList.remove('hidden');
            errorElment.innerText = `Error en el cambio de moneda: ${error.message}`;
            console.error('Error en el cambio de moneda:', error);

            loadingElement.classList.add('hidden');
        });
        
}



// Eventos de cambio en los campos de la moneda y cantidad

fromCurrency.addEventListener('change', calcularExchange);
amountInput.addEventListener('input', calcularExchange);
toCurrency.addEventListener('change', calcularExchange);
amountResult.addEventListener('input', calcularExchange);



// Evento para intercambiar las monedas

SwapButton.addEventListener('click', () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    calcularExchange();
})



// Llamada inicial a la función principal

calcularExchange();