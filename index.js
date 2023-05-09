// const RSS_URL = `https://www.dr.dk/nyheder/service/feeds/senestenyt`;
const RSS_URL = `https://rss.nytimes.com/services/xml/rss/nyt/World.xml`;
const list = document.querySelector('.news-list');


const app = {};

app.tmpl = (el, index) => `<div>
    <h1>${index} - ${el.querySelector("title").innerHTML})</h1>
    <div>Author: ${el.querySelector("creator").innerHTML}</div>
    <p>
        <a target="_blank" href="${el.querySelector("link").innerHTML}">${el.querySelector("link").innerHTML}</a>
    </p>
</div>`

app.renderNewyorkTimes = (data) => {
    console.log(data)
  
    const items = data.querySelectorAll("item");
    items.forEach((el, index) => {

    
        list.innerHTML += app.tmpl(el,index);
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

