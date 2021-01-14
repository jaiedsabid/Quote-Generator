// Selecting Elements

const newQuoteButtonElement = document.getElementById('new-quote');
const twitterBtnElement = document.getElementById('twitter');
const containerElement = document.getElementById('container');
const quoteTextElement = document.getElementById('quote');
const authorTextElement = document.getElementById('author');

// Required Functions

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
}


async function getQuote() {
    /* Fetch Quotes from API */
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


// Performing Actions

newQuoteButtonElement.addEventListener('click', getQuote);
twitterBtnElement.addEventListener('click', tweetQuote);

// Page on load
getQuote();