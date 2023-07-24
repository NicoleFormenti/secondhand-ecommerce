const ul = document.querySelector('#dvd_list');

//this displays the list of movies with a title, img, year, quantity available and price

function appendChild(title, year, quantity, price, imageSource) {
    const h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const h4 = document.createElement('h4');
    const img = document.createElement('img');
    const btn = document.createElement('button');    
    h1.classList.add('titles');
    h1.innerHTML = title;
    h2.innerHTML = year;
    h3.innerHTML = quantity;
    h4.innerHTML = price;
    img.src = imageSource;
    btn.innerHTML = 'Add to cart';
    btn.classList.add('addcart');
    h2.insertAdjacentText = h2.insertAdjacentText('afterbegin', 'Production Year:');
    h3.insertAdjacentText = h3.insertAdjacentText('afterbegin', 'Available Stock:');
    h4.insertAdjacentText = h4.insertAdjacentText('afterbegin', 'Price in £:');
    
    ul.appendChild(h1);
    h1.appendChild(img);
    h1.appendChild(h2);
    h2.appendChild(h3);
    h3.appendChild(h4);
    h4.appendChild(btn);

    //only 10 movies should appear on page 1 so we splice the array
    //console.log(movieList.slice(0, 10));
    return movieList.slice(0, 10);

}
    
for (
    let i = 0;
    i < 10;
    i++
){
    appendChild(movieList[i].title, movieList[i].year, movieList[i].quantity, movieList[i].price, movieList[i].imageSource);
}

// sort array by year of production:
function sortYear() {
    const sortedList = movieList.sort( (a, b) => { //the sorted list is the "new" array
        return a.year - b.year;
    });
    console.log(sortedList);
    ul.innerHTML = '';
    for(let i = 0; i < sortedList.length; i++){  
        appendChild(sortedList[i].title, sortedList[i].year, sortedList[i].quantity, sortedList[i].price, sortedList[i].imageSource); // adding both label and category
    }
}

//sort by price:
function sortPrice() {
    const newList = movieList.sort( (a, b) => { 
        return a.price - b.price;
        
    });
    console.log(newList);
    ul.innerHTML = '';
    for(let i = 0; i < newList.length; i++){  
        appendChild(newList[i].title, newList[i].year, newList[i].quantity, newList[i].price, newList[i].imageSource); // adding both label and category
    }
}

//pagination:
function pageOne() {
    const page = 1;
    const step = 10;
    const start = page * step - step;
    const end = start + step;
    
    const firstpage = movieList.slice(start, end);
    console.log(firstpage);
    let oneUl = document.createElement('ul');
    oneUl.classList.add('paginationstyle');
    
    for (let i = 0; i < firstpage.length; i++) {
        ul.innerHTML = '';
        let h1 = document.createElement('h1');
        h1.classList.add('titles');
        h1.innerHTML = `${firstpage[i].title}`;
        oneUl.appendChild(h1);
        let img = document.createElement('img');
        img.src = `${firstpage[i].imageSource}`;
        h1.appendChild(img);
        let h2 = document.createElement('h2');
        h2.innerHTML = `Production Year: ${firstpage[i].year}`;
        h1.appendChild(h2);
        let h3 = document.createElement('h3');
        h3.innerHTML = `Available stock: ${firstpage[i].quantity}`;
        h2.appendChild(h3);
        let h4 = document.createElement('h4');
        h4.innerHTML = `Price in £: ${firstpage[i].price}`;
        h3.appendChild(h4);
        let btn = document.createElement('button'); 
        btn.innerHTML = `<button>Add to cart</button>`;
        h4.appendChild(btn);
    }
    document.getElementById('dvd_list').append(oneUl);
}


function pageTwo() {
    const page = 2;
    const step = 10;
    const start = page * step - step;
    const end = start + step;
    
    const secondpage = movieList.slice(start, end);
    console.log(secondpage);
    let newUl = document.createElement('ul');
    newUl.classList.add('paginationstyle');
    for (let i = 0; i < secondpage.length; i++) {
        ul.innerHTML = '';
        let h1 = document.createElement('h1');
        h1.classList.add('titles');
        h1.classList.add('titles');
        h1.innerHTML = `${secondpage[i].title}`;
        newUl.appendChild(h1);
        let img = document.createElement('img');
        img.src = `${secondpage[i].imageSource}`;
        h1.appendChild(img);
        let h2 = document.createElement('h2');
        h2.innerHTML = `Production Year: ${secondpage[i].year}`;
        h1.appendChild(h2);
        let h3 = document.createElement('h3');
        h3.innerHTML = `Available stock: ${secondpage[i].quantity}`;
        h2.appendChild(h3);
        let h4 = document.createElement('h4');
        h4.innerHTML = `Price in £: ${secondpage[i].price}`;
        h3.appendChild(h4);
        let btn = document.createElement('button'); 
        btn.innerHTML = `<button id="b">Add to cart</button>`;
        h4.appendChild(btn);
    }
    document.getElementById('dvd_list').append(newUl);
}
//search bar : 
function searchMovie() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let search_title = document.getElementsByClassName('titles');
      
    for (i = 0; i < search_title.length; i++) { 
        if (!search_title[i].innerHTML.toLowerCase().includes(input)) {
            search_title[i].style.display="none";
        }
        else {
            search_title[i].style.display="list-item";                 
        }
    }
}

// CART
// add to cart: onclick event that calls a function with a localStorage.setItem('movieList', 'title')
// remove from cart: localStorage.removeItem('title')
// clear cart: localStorage.clear()

//add to cart, the amount of titles added should appear here: <span class="total-count"></span>
let element = document.getElementsByClassName('addcart');
for( let i = 0; i < element.length; i++ ){
    element[i].addEventListener("click", function populateCart(){
    localStorage.setItem('title', movieList[i].title);
    localStorage.setItem('price', movieList[i].price);
    console.log(localStorage);
  }); //so far, this sends title and price in the local storage, but still separate
}
// view what's in the cart, getting the items from the storage
function viewCart() {
    localStorage.getItem('title', movieList.title);
    localStorage.getItem('price', movieList.price);
    console.log(localStorage);
}
//clear cart
function clearCart() {
    localStorage.clear();
    console.log(localStorage);
}