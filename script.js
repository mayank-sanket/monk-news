
// url sample: "https://newsapi.org/v2/everything?q=tesla&from=2024-12-19&sortBy=publishedAt&apiKey=05274b9f9ba24ed087457157a0f766d1"

const API_KEY = "05274b9f9ba24ed087457157a0f766d1";
const url = "https://newsapi.org/v2/everything?q=";


window.addEventListener('load', () => {
    fetchNews(query = "Tech");

});

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();

    bindData(data.articles);

}

function bindData(articles) {
    const cardsContainer = document.getElementById('cardsContainer');
    const newsCardTemplate = document.getElementById('templateNewsCard');

    cardsContainer.innerHTML = ""; // so that the div becomes empty before filling of new data

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true); // this is necessary in order to deep clone the card

        fillDataInCards(cardClone, article);
        cardsContainer.appendChild(cardClone);


    })

}

function fillDataInCards(cardClone, article) {
    const newsImage = cardClone.querySelector('#newsImage');
    const newsTitle = cardClone.querySelector('#newsTitle');
    const newsSource = cardClone.querySelector('#newsSource');
    const newsDescription = cardClone.querySelector('#newsDescription');


    newsImage.src = `${article.urlToImage}`;

    newsTitle.innerHTML = article.title;
    newsDescription.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-us', {
        timezone: "Asia/Kolkata"
    })

    newsSource.innerHTML = `${article.source} • ${date}`;
    
    cardClone.firstElementChild.addEventListener('click', ()=>{
        window.open(article.url, "_blank");
    })






}

// handling nav items click (could be done using inline onclick attribute also)

let selectedNavLink = null; 

const navLinks = document.querySelectorAll('#navLinks');
navLinks.forEach((navLink)=> {
    navLink.addEventListener('click', (e)=>{
    //    ---- add active and visited links logic ----
        


    // ------                                 -----
        const queryParam = e.target.innerHTML;
        fetchNews(queryParam)
    })
})


// handling search box logic | to do: remove active class from other links


document.querySelector('#searchButton').addEventListener('click', (e)=>{
    const searchedValue = `${document.getElementById('newsInput').value}`;
    if(searchedValue) fetchNews(searchedValue);
    else alert('Please enter a valid query!')
})


// handling enter key logic in search box | | to do: remove active class from other links


document.querySelector("#newsInput").addEventListener('keydown', (e)=>{
    if(!document.getElementById('newsInput').value) return;
    if((document.getElementById('newsInput').value) && e.key === 'Enter'){
        fetchNews(document.getElementById('newsInput').value);
    }
})


