const accesskey = 'bZA5WIB7SNzlNUkG5HKmXhIBK-mIqTeo-wnEjRAxsBU';

const formEl = document.querySelector(".form");
const inputEL = document.querySelector("#search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more");

let inputData= "";
let page = 1;

async function searchImages(){ //async is used to resposne into fetch
    inputData = inputEL.value;
    

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`// dynamic url to search from unsplash

    const response = await fetch(url);// fetch is used tas response method according to query

    const data = await response.json();// json will store data inside results
  
    const results = data.results;
    if(page === 1 ){
        searchResults.innerHTML= "";
        
    }
    //to show result we have accessed div to create different boxes  
    results.map((result)=>{
        const imageWrapper =document.createElement('div')
        imageWrapper.classList.add("search-result")
        const image = document.createElement('img')// to get image 
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a')
        imageLink.href =  result.links.html;
        imageLink.target="_blank"
        imageLink.rextContent = result.alt_description;

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchResults.appendChild(imageWrapper)

    });

    page++
    if(page>1){
        showMore.style.display= "block";
    }
} 

formEl.addEventListener("submit",(event)=>{
    event.preventDefault()
    page=1;
    searchImages()
      
})

showMore.addEventListener("click",()=>{
    searchImages()
});