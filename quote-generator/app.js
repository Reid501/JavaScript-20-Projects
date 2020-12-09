const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const quoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading 

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loader

function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote from API

async function getQuote() {
    const proxyUrl = 'https://protected-ocean-89794.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        loading();
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If Author is Blank add 'Unkown'
        if (data.quoteAuthor === ''){
            authorText.innerText = 'Unknown'
        } else {
            authorText.innerText = data.quoteAuthor;
        };
        // Reduce Font Size for Long Quotes
        if (data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop Loader and Show Quote
        complete();
    } catch(error) {
        getQuote();
    }
}

// Tweet Function
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
quoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();