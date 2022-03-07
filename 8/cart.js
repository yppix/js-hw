'use strict';

const cartImg = document.querySelector('.cartIconWrap');
const cartHeader = document.querySelector('.header_cart');
const cardParent = document.querySelectorAll('.featuredItem');
const cartTotalPrice = document.querySelector('.header_cart_total_price');
const cartCountSpan = document.getElementById('item_count');
const cartCostEnd = document.getElementById('costEnd');

let cart = {};

/**
 Function open and close cart container
 **/
cartImg.addEventListener('click', () => {
    cartHeader.classList.toggle('hidden');
})

/**
 Function get button click and send parameters from dataset to
 function that add items to cart
 **/
cardParent.forEach(el => el.addEventListener('click', event => {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }
    cartHeader.classList.remove('hidden');
    addCartItem(+el.dataset.id, el.dataset.name, +el.dataset.price);
    showRowCart(+el.dataset.id);
}))

/**
 Function add items to cart
 @param {number} id product id
 @param {string} name product name
 @param {number} price product price
 **/
function addCartItem(id, name, price) {

    if (!(id in cart)) {
        cart[id] = {
            id: id,
            name: name,
            price: price,
            count: 0
        }
    }

    cart[id].count++;
    cartCountSpan.textContent = getTotalCount(cart);
    cartCostEnd.textContent = getTotalPrice(cart) + '$';
}

/**
 * Function that get total count of product in cart
 * @param cart cart object with all values
 * @return {number} total count of products in cart
 */
function getTotalCount(cart) {
    const valuesArray = Object.values(cart);
    let sum = 0;

    for (let value of valuesArray) {
        sum += value.count;
    }
    return sum;
}

/**
 * Function that get total price of product in cart
 * @param cart cart object with all values
 * @return {number} total price of products in cart
 */
function getTotalPrice(cart) {
    const valuesArray = Object.values(cart);
    let price = 0;

    for (let value of valuesArray) {
        price += value.count * value.price;
    }
    return price;
}

/**
 * Function render update row in car with product information
 * @param {number} productId product id.
 */
function showRowCart(productId) {
    if (!(document.querySelector(`.header_cart_item[data-id="${productId}"]`))) {
        showNewRowCart(productId);
        return;
    }

    const item = cart[productId];
    document.querySelector('.productCount').innerHTML
        = item.count;
    document.querySelector('.productTotalRow').innerHTML
        = (item.count * item.price).toFixed(2);
}

/**
 * Function render new row in car with product information
 * @param {number} productId product id.
 */
function showNewRowCart(productId) {
    const productRow = `
    <div class="header_cart_item" data-id="${productId}">
      <div>${cart[productId].name}</div>
      <div>
        <span class="productCount">${cart[productId].count}</span> шт.
      </div>
      <div>${(cart[productId].price).toFixed(2)}$</div>
      <div>
        <span class="productTotalRow">${(cart[productId].price * cart[productId].count).toFixed(2)}</span>$
      </div>
    </div>
    `;
    cartTotalPrice.insertAdjacentHTML("beforebegin", productRow);
}