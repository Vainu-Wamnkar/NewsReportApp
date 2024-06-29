const API_KEY="e5641dde513a4dd7926ef0393ab17cd7";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=> fetchNews("india"));

async function fetchNews(query){
const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
const data= await res.json();
console.log(data);
bindData(data.articles);
}

function bindData(articles){
    const cardsContainer=document.getElementById('card-container');
    const newsCardTemplet=document.getElementById('template-news-card');
    cardsContainer.innerHTML="";
    articles.forEach(article =>{
     if(!article.urlToImage)return;
     const cardClone=newsCardTemplet.content.cloneNode(true);
     fillDataInCard(cardClone,article)
     cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector("#news-img")
    const newsTitle=cardClone.querySelector("#news-title")
    const newsSource=cardClone.querySelector("#news-source")
    const newsDesc=cardClone.querySelector("#news-desc");

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=`${article.source.name} :${date}`;
    
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })

}

let curSelectedNav=null;
function onNavItemClick(id){
fetchNews(id);
const navItem=document.getElementById(id);
curSelectedNav?.classList.remove('active');
curSelectedNav=navItem;
curSelectedNav.classList.add('active');
}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');
 searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query)return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;

 })
 function reload(){
    window.location.reload();
 }