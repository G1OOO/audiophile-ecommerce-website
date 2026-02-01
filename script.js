let cart = JSON.parse(localStorage.getItem('audiophile-cart')) || [];

function addToCart(productId, name, price, image) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, name: name, price: price, image: image, quantity: 1 });
    }
    saveCart();
    renderCart();
}

function saveCart() {
    localStorage.setItem('audiophile-cart', JSON.stringify(cart));
}

function clearCart() {
    cart = [];
    saveCart();
    renderCart();
}

function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    if (!cartContainer) return;
    cartContainer.innerHTML = '';
    let total = 0;
    let count = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;
        cartContainer.innerHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <img src="${item.image}" width="64" style="border-radius: 8px;">
                    <div><p style="margin:0; font-weight: bold;">${item.name}</p><p style="margin:0; opacity: 0.5;">$ ${item.price.toLocaleString()}</p></div>
                </div>
                <div style="opacity: 0.5; font-weight: bold;">x${item.quantity}</div>
            </div>`;
    });
    if (cartCount) cartCount.innerText = count;
    if (cartTotal) cartTotal.innerText = `$ ${total.toLocaleString()}`;
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    const icon = document.querySelector('.cart-icon');
    if (icon) icon.onclick = toggleCart;
});