const CART_KEY = 'munchly_cart';

// Load cart from localStorage
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Add item to cart
function addToCart(name, price) {
  const cart = loadCart();
  const idx = cart.findIndex(item => item.name === name);

  if (idx > -1) {
    cart[idx].qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  saveCart(cart);
  alert(`${name} added to cart!`);
  renderCart(); // Safe to call even if not on cart page
}

// Change quantity of item
function changeQty(index, delta) {
  const cart = loadCart();
  if (!cart[index]) return;

  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);

  saveCart(cart);
  renderCart();
}

// Remove item from cart
function removeItem(index) {
  const cart = loadCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

// Clear entire cart
function clearCart() {
  saveCart([]);
  renderCart();
}

// Render cart items and total
function renderCart() {
  const wrap = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if (!wrap || !totalEl) return;

  const cart = loadCart();
  wrap.innerHTML = '';
  let total = 0;

  cart.forEach((item, i) => {
    const row = document.createElement('div');
    row.className = 'cart-row';
    total += item.price * item.qty;

    row.innerHTML = `
      <span>${item.name}</span>
      <span class="qty">
        <button onclick="changeQty(${i}, -1)">-</button>
        <strong>${item.qty}</strong>
        <button onclick="changeQty(${i}, 1)">+</button>
      </span>
      <span>₹${item.price * item.qty}</span>
      <span><button class="remove" onclick="removeItem(${i})">Remove</button></span>
    `;
    wrap.appendChild(row);
  });

  totalEl.textContent = total.toString();
}

// Handle checkout form
const form = document.getElementById('checkoutForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cart = loadCart();
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    alert('Order placed successfully! (Demo)');
    clearCart();
    form.reset();
  });
}

// Clear cart button
const clearBtn = document.getElementById('clearCart');
if (clearBtn) {
  clearBtn.addEventListener('click', clearCart);
}

// Auto-render cart on page load
document.addEventListener('DOMContentLoaded', renderCart);