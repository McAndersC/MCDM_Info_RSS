// const RSS_URL = `https://www.dr.dk/nyheder/service/feeds/senestenyt`;
const RSS_URL = `https://rss.nytimes.com/services/xml/rss/nyt/World.xml`;
const list = document.querySelector('.news-list');


const app = {};

app.renderNewyorkTimes = (data) => {
    console.log(data)
  
    const items = data.querySelectorAll("item");
    items.forEach((el, index) => {
        list.innerHTML += `<h1>${index} - ${el.querySelector("title").innerHTML})</h1>`
    });
}

app.init = () => {

    // Henter data fra RSS_URL.
    fetch(RSS_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => app.renderNewyorkTimes(data))

};

app.init();

