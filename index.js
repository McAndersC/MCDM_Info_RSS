const TEST_RSS_URL = `https://www.tv2nord.dk/rss`;
const RSS_URL = `https://rss.nytimes.com/services/xml/rss/nyt/World.xml`;
const list = document.querySelector('.news-list');

const app = {};

app.TV2NORDtmpl = (el, index) => `<div>
    <h1>${index} - ${el.querySelector("title").textContent}</h1>
    <p>
      ${el.querySelector("description").textContent} <b>[${el.querySelector("category").textContent}]</b> 
    </p>
    <p>
        <a target="_blank" href="${el.querySelector("link").innerHTML}">${el.querySelector("link").innerHTML}</a>
    </p>
</div>`

app.NYTtmpl = (item, index) => `<div>
    <h1>${index} - ${item.querySelector("title").innerHTML})</h1>
    <img src="${item.querySelector("media\\:content")}" alt="">
    <span>Author: ${item.querySelector("creator").innerHTML}</span>
    <p>
        ${item.querySelector("description").textContent}
    </p>
   
    <p>
        <a target="_blank" href="${item.querySelector("link").innerHTML}">${item.querySelector("link").innerHTML}</a>
    </p>
</div>`

app.renderNewyorkTimes = (data) => {

    const items = data.querySelectorAll("item");
    items.forEach((item, index) => {

        list.innerHTML += app.NYTtmpl(item,index);
    });

}

app.renderTV2NORD = (data) => {

    const items = data.querySelectorAll("item");
    items.forEach((el, index) => {

        list.innerHTML += app.TV2NORDtmpl(el, index);
    });

}

app.init = () => {

    // Henter data fra RSS_URL.
    // fetch(RSS_URL)
    // .then(response => response.text())
    // .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    // .then(data => app.renderNewyorkTimes(data))

    fetch(TEST_RSS_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => app.renderTV2NORD(data))

    // Debugge RSS feed til consollen.
    fetch(TEST_RSS_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => console.log('Testing Feed', data))

};

app.init();

