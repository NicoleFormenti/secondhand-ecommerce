const ul = document.querySelector('#dvd_list');

//this displays the list of movies with a title, img, year, quantity available and price
//add to cart and remove from cart buttons need to be appended too

function appendChild(title, year, quantity, price, imageSource) {
    const h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const h4 = document.createElement('h4');
    const img = document.createElement('img');
    const btn = document.createElement('button');    
    const remove = document.createElement('button');
    h1.classList.add('titles');
    h1.innerHTML = title;
    h2.innerHTML = year;
    h3.innerHTML = quantity;
    h4.innerHTML = price;
    img.src = imageSource;
    btn.innerHTML = 'Add to cart';
    btn.classList.add('addcart');
    remove.innerHTML = 'Remove from cart';
    remove.classList.add('removecart');
    h2.insertAdjacentText = h2.insertAdjacentText('afterbegin', 'Production Year:');
    h3.insertAdjacentText = h3.insertAdjacentText('afterbegin', 'Available Stock:');
    h4.insertAdjacentText = h4.insertAdjacentText('afterbegin', 'Price in £:');
    
    ul.appendChild(h1);
    h1.appendChild(img);
    h1.appendChild(h2);
    h2.appendChild(h3);
    h3.appendChild(h4);
    h4.appendChild(btn);
    h4.appendChild(remove);

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

//pagination: sliced the array and appended to the ul element
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
        btn.innerHTML = `Add to cart`;
        btn.classList.add('addcart');
        h4.appendChild(btn);
        let remove = document.createElement('button');
        remove.innerHTML = 'Remove from cart';
        h4.appendChild(remove);
        remove.classList.add('removecart');
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
        btn.innerHTML = `Add to cart`;
        btn.classList.add('addcart');
        h4.appendChild(btn);
        let remove = document.createElement('button');
        remove.innerHTML = 'Remove from cart';
        h4.appendChild(remove);
        remove.classList.add('removecart');
    }
    document.getElementById('dvd_list').append(newUl);
}
//search bar : (only working on current page)
function searchMovie() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let search_title = document.getElementsByClassName('titles');
      
    for (i = 0; i < search_title.length; i++) { 
        if (!search_title[i].innerHTML.toLowerCase().includes(input)) {
            search_title[i].style.display="none";
        }
        else {
            search_title[i].style.display="flex";       
            search_title[i].style.flexdirection = "column";          
        }
    }
}

// add to cart: onclick event that calls a function with a localStorage.setItem, item and length of the storage visible in console log
let element = document.getElementsByClassName('addcart');
let itemtoadd = [];
const count = document.querySelector('#cart-count');
let p = document.createElement('p'); //element created so that the array length can be displayed under the basket
if (document.getElementById('counter' !== undefined)) { //this makes the last value be displayed by itself
    let oldP = document.getElementById('counter');
    oldP.innerText = '';
}
for( let i = 0; i < element.length; i++ ){
    element[i].addEventListener("click", () => {
        
        itemtoadd.push(JSON.stringify(movieList[i]));
        localStorage.setItem('movie', JSON.stringify(itemtoadd));
        //once clicked, the button should say 'added to cart' and change color
        element[i].innerHTML = 'Added to cart';
        element[i].style.color = 'black';
        element[i].style.backgroundColor = 'yellow';
        //get the item from the storage
        let data = JSON.parse(localStorage.getItem('movie'));
        let len = data.length;
        console.log(data);
        console.log(len);
        //so far, this function stores the item in the local storage once we click on add to item, 
        //display it on the cart button:
        p.id = 'counter';
        p.innerHTML = `(${len})`;
        count.appendChild(p);
        
  }); 
}
//see cart - this shows what's in the local storage
let cart = document.getElementsByClassName("btn btn-primary");
for (i = 0; i < cart.length; i++) {
    cart[i].addEventListener("click", () => {

    });
}

// clear cart: localStorage.clear(), getting the add to cart btn back to normal, displaying 0 in the innerhtml
function clearCart() {
    if (document.getElementById('counter' !== undefined)) { //displaying (0) under the basket
        let oldP = document.getElementById('counter');
        oldP.innerText = '';
    }
    for (i = 0; i < element.length; i++){
    element[i].innerHTML = 'Add to cart';
    element[i].style.color = 'white';
    element[i].style.backgroundColor = '#696969';
    }
    itemtoadd = [];
    window.localStorage.clear();
    console.log(localStorage);
    let oldP = document.getElementById('counter');
    oldP.innerText = '(0)';
    p.id = 'counter';
    let p = document.createElement('p');
    p.innerHTML = `(0)`;
    count.append(p);
}
// remove from cart: localStorage.removeItem('movie')
let cancel = document.getElementsByClassName('removecart');
for (i = 0; i < cancel.length; i++){
    cancel[i].addEventListener("click", () => {
        itemtoadd = [];
        localStorage.removeItem(JSON.stringify(itemtoadd)); //this removes the item from the storage
        console.log(localStorage);
        //the number under the basket must change
        //the added to cart button goes back to its original text:
        for (i = 0; i < element.length; i++){
            element[i].innerHTML = 'Add to cart';
            element[i].style.color = 'white';
            element[i].style.backgroundColor = '#696969';
            }
})
}

