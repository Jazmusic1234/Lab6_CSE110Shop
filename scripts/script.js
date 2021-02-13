// Script.js
const url = 'https://fakestoreapi.com/products';

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  if(window.localStorage.getItem(1) != null) {
    window.localStorage.clear();
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      for(const product of data) {
        window.localStorage.setItem(product.id, JSON.stringify(product));
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
        item.shadowRoot.querySelector('button').addEventListener("click", () => {
          let cartCount = parseInt(document.getElementById('cart-count').innerHTML);
          if(window.localStorage.getItem(`cartItem${id}`)) {
            window.localStorage.removeItem(`cartItem${id}`);
            document.getElementById('cart-count').innerHTML = cartCount - 1;
            item.shadowRoot.querySelector('button').innerHTML = 'Add to Cart';
          } else {
            window.localStorage.setItem(`cartItem${id}`, id);
            document.getElementById('cart-count').innerHTML = cartCount + 1;
            item.shadowRoot.querySelector('button').innerHTML = 'Remove from Cart';
          }
        });
        document.getElementById('product-list').appendChild(item);
      } 
    })
    .catch(error => {
      console.error('Error:', error);
    });



});