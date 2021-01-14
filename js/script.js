// Selecting Elements

const newQuoteButtonElement = document.getElementById('new-quote');
const twitterBtnElement = document.getElementById('twitter');
const containerElement = document.getElementById('container');
const quoteTextElement = document.getElementById('quote');
const authorTextElement = document.getElementById('author');
const loaderScreenElement = document.getElementById('loader');
const copyBtnElement = document.getElementById('copy');

// Required Functions

function showLoadingScreen() {
    /* Show loading screen */
    loaderScreenElement.hidden = false;
    containerElement.hidden = true;
}

function removeLoadingScreen() {
    /* Show result after completing loading and hide loading screen */
    loaderScreenElement.hidden = true;
    containerElement.hidden = false;
}

function viewDataInHTML(data) {
    /* Manipulate DOM */
    // Filter Author data
    if(data.quoteAuthor === '') {
        authorTextElement.innerHTML = 'Unknown';
    }
    else {
        authorTextElement.innerHTML = data.quoteAuthor;
    }
    // Make font size smaller for long Quotes
    if(data.quoteText.length > 100) {
        quoteTextElement.classList.add('long-quote-text');
    }
    else {
        quoteTextElement.classList.remove('long-quote-text');
    }
    quoteTextElement.innerHTML = data.quoteText;
    //
    removeLoadingScreen();
}


async function getQuote() {
    /* Fetch Quotes from API */
    // Show loading Screen
    showLoadingScreen();
    try {
        const proxyURL = 'https://cors-anywhere.herokuapp.com/'
        const URL = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
        const jsonData = await fetch(proxyURL + URL);
        const data = await jsonData.json();
        viewDataInHTML(data);
    } catch (e) {
        getQuote();
        console.error(e.message);
    }
}

function tweetQuote() {
    const quoteText = quoteTextElement.innerText;
    const authorText = authorTextElement.innerText;
    const tweetURL = `https://twitter.com/intent/tweet?text=${quoteText} - ${authorText}`;
    window.open(tweetURL, '_blank');
}

async function copyQuote() {
    let textContent = `${quoteTextElement.innerText} - ${authorTextElement.innerText}`;
    await navigator.clipboard.writeText(textContent);
}


// Performing Actions

newQuoteButtonElement.addEventListener('click', getQuote);
twitterBtnElement.addEventListener('click', tweetQuote);
copyBtnElement.addEventListener('click', copyQuote);

// Page on load
getQuote();