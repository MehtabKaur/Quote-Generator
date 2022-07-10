const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading, hide quote container
function loading() {
    // Show loader and hide quote
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide Loading, show quote container
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    }
    else {
        authorText.textContent = quote.author;
    }

    // Check Quote length to determine styling
    if (quote.text.length > 100) {
        // add the long-quote css class
        quoteText.classList.add('long-quote');
    }
    else {
        // remove the long-quote css class
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}
// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        // fetch request
        const response = await fetch(apiUrl);
        // get json from Api as a response and turn into json object and pass into global variable, apiQuotes
        apiQuotes = await response.json();
        newQuote();
    } 
    catch (error) {
        // Catch Error Here 
    }
}

// Tweet a Quote
function tweetQuote() {
    // a template string uses back ticks ``
    // template string allows you to pass in a variable which will be converted into a string
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    // open twitter window in a new tab
    window.open(twitterUrl, "_blank")

}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();