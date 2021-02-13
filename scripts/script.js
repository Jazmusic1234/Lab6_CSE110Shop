// Script.js
let url = 'https://fakestoreapi.com/products';

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  if(window.localStorage.length == 1) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        for(const product of data.products) {
          localStorage.setItem('item', JSON.stringify(product));
        }
      })  
  }
    
});