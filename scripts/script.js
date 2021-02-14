// Script.js
const url = 'https://fakestoreapi.com/products';

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  if(window.localStorage.length > 1) {
    let cartCount = window.localStorage.length - 20;
    document.getElementById('cart-count').innerHTML = cartCount;
  }

  else if(window.localStorage.getItem(21) == null) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        for(const product of data) {
          window.localStorage.setItem(product.title, JSON.stringify(product));
        } 
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  for(let i = 1; i < 20; i++) {
    const product = JSON.parse(window.localStorage.getItem(i));
    const id = product.id;
    const image = product.image;
    const imagealt = product.description;
    const title = product.title;
    const price = product.price;
    const item = document.createElement('product-item');
    item.shadowRoot.querySelector('img').setAttribute('src', image);
    item.shadowRoot.querySelector('img').setAttribute('alt', imagealt);
    item.shadowRoot.querySelector('.title').innerHTML = title;
    item.shadowRoot.querySelector('.price').innerHTML = price;
    if(window.localStorage.getItem(`cartItem${id}`)) {
      item.shadowRoot.querySelector('button').innerHTML = 'Remove from Cart';
    }
    item.shadowRoot.querySelector('button').addEventListener("click", () => {
      cartCount = parseInt(document.getElementById('cart-count').innerHTML);
      if(window.localStorage.getItem(`cartItem${id}`)) {
        alert('Removed from Cart!');
        window.localStorage.removeItem(`cartItem${id}`);
        document.getElementById('cart-count').innerHTML = cartCount - 1;
        item.shadowRoot.querySelector('button').innerHTML = 'Add to Cart';
      } else {
        alert('Added to Cart!');
        window.localStorage.setItem(`cartItem${id}`, id);
        document.getElementById('cart-count').innerHTML = cartCount + 1;
        item.shadowRoot.querySelector('button').innerHTML = 'Remove from Cart';
      }
    });
    document.getElementById('product-list').appendChild(item);
  }

});