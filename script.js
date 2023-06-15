const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const quoteTweet = document.getElementById('twitter');
const quoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

let apiQuotes = [];


function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading

function hideLoadingSpinner(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}
//Show New Quote
function newQuote() {
    showLoadingSpinner();
   const quotes = apiQuotes[Math.floor(Math.random() *apiQuotes.length)]
   //Check if author field is blank and replace it with 'unknown'
   if (quotes.author  == ""){
        authorText.textContent = 'Unknown';
   }else {
   authorText.textContent = quotes.author;
//    quoteText.textContent = quotes.text;
   }

   //Check quote length to determine styling
   if(quotes.text.length > 120){
    quoteText.classList.add('long-quote');}
    else{
        quoteText.classList.remove('long-quote');
    }
    //Set quote, hide loader
        quoteText.textContent = quotes.text;
        hideLoadingSpinner();
   }


//Get Quote from API

async function getQuotes(){
    showLoadingSpinner();
    //Get api and save it in variable
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        //Save variable in a await fetch the api var
        const response = await fetch(apiUrl);
        //Save variable to put api in json format
        apiQuotes = await response.json();
        //Call new quote function
        newQuote();

        
    } catch (error) {
        getQuotes();
        
    }
}



//Tweet Quote
function tweetQuote(){
    const twitterURL = `https://twitter.com/intent/tweet?tweet=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

//Event Listeners

quoteTweet.addEventListener('click', tweetQuote );
quoteBtn.addEventListener('click', newQuote);

//On Load
getQuotes();


showLoadingSpinner()