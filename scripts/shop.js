let productList = [];
let currentCart = [];
let cartContainer;
let subtotal = 0;
let discount = 0;
let total = 0;
let quantity = 0;

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('input-search');
    const clearSearch = document.getElementById('clear-search');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        clearSearch.style.display = searchTerm ? 'inline' : 'none';

        const filtered = productList.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );

        renderProductList(filtered);
    });

    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        clearSearch.style.display = 'none';
        renderProductList(productList);
    });
});

function renderProductList(products) {
    const container = document.getElementById("product-container");
    container.innerHTML = '';

    if (products.length === 0) {
        container.innerHTML = '<p class="empty-list">No se encontraron productos.</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement("div");
        const formattedPrice = product.price.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'});
        card.className = "product-card";

        card.innerHTML = `
          <div class="image-profile-container">
            <img src="${product.urlImage}" alt="imagen de perfil de ${product.name}" class="logo-image">
          </div>
          <div class="description-card-container">
            <div class="name">${product.name}</div>
            <div class="description">${product.description}</div>
            <span class="one-line">
                <div class="stock">Stock: ${product.stock}</div>
                <div class="price">Precio: ${formattedPrice}</div>
            </span>
            <button class="generic-button add-button" onclick="addToCart(${product.id})">Agregar</button>
          </div>
        `;

        container.appendChild(card);
    });
}

setTimeout(() => {
    fetch(CONFIG.PRODUCTS_API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo JSON");
            }
            return response.json();
        })
        .then(products => {
            productList = products;
            renderProductList(productList);
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });

    cartContainer = document.getElementById('cart-container');
    renderCart();
}, 100);


function renderCart() {
    const cart = getCart();
    currentCart = cart;
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Carrito vacío.</p>';
    } else {
        cart.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'cart-item-card';

            const formattedPrice = item.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
            const itemSubtotal = (item.price * item.quantity).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });

            card.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.urlImage}" alt="${item.name}" />
        </div>
        <div class="cart-item-info">
            <div class="name">${item.name}</div>
            <div class="description">${item.description}</div>
            <span class="one-line">
                <div class="price">P.U.: ${formattedPrice}</div>
                <div class="quantity-container">
                    <span>Cantidad:</span>
                    <button class="decrease-button" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-button" data-index="${index}">+</button>
                </div>
            </span>
            
            <div class="item-subtotal">Subtotal: ${itemSubtotal}</div>
            <button class="remove-button" data-index="${index}">Eliminar</button>
        </div>
    `;

            cartContainer.appendChild(card);
        });

        document.querySelectorAll('.increase-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                increaseQuantity(index);
            });
        });

        document.querySelectorAll('.decrease-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                decreaseQuantity(index);
            });
        });

        document.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    }

    updateTotals();
}

function increaseQuantity(index) {
    const cart = getCart();
    cart[index].quantity += 1;
    saveCart(cart);
    renderCart();
}

function decreaseQuantity(index) {
    const cart = getCart();
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        saveCart(cart);
        renderCart();
    }
}

function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

function getCart() {
    const cart = sessionStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const product = productList.find(p => p.id == productId);
    let updatedCart = getCart();

    const existingItem = updatedCart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        updatedCart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart(updatedCart);
    renderCart();
}

function updateTotals() {
    subtotal = currentCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    discount = subtotal >= CONFIG.DISCOUNT_LIMIT ? subtotal * (CONFIG.DISCOUNT_PERCENTAGE / 100) : 0;
    total = subtotal - discount;
    quantity = currentCart.reduce((acc, item) => acc + item.quantity, 0)

    const formattedSubtotal = subtotal.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
    const formattedDiscount = discount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
    const formattedTotal = total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });

    document.getElementById('subtotal-value').textContent = formattedSubtotal;
    document.getElementById('discount-value').textContent = formattedDiscount;
    document.getElementById('total-value').textContent = formattedTotal;
    document.getElementById('quantity-value').textContent = quantity;

    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.disabled = total <= 0;
    }
}
